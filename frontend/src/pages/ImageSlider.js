import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import { useParams } from "react-router-dom";
import Image from 'material-ui-image'
import "../css/ImageSlider.css";
import undrawCancel from '../images/undrawCancel.svg';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { IconButton } from '@material-ui/core';
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import {Link} from 'react-router-dom';
import useStyles from '../styles/ImageSliderStyles';
import ImageUploading from 'react-images-uploading';
import Button from '@material-ui/core/Button';
// import Viewer from 'viewerjs';

export default function ImageSlider() {
  const classes = useStyles();
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const {year, location, imgId} = useParams();        // params from url e.g.: 2015/Poland/2, imgId optional
  const [image, setImage] = useState(undrawCancel);
  const [imagesNames, setImagesNames] = useState(['???']);
  const [imageName, setImageName] = useState('???');
  const [numberOfImages, setNumberOfImages] = useState(0); // None
  const [currentImgId, setCurrentImgId] = useState(); //imgId
  const [thumbnails, setThumbnails] = useState([]); // useState([])
  const [canInsertThumbnails, setCanInsertThumbnails] = useState(false);
  const {setBackNavPage, tokenValue} = useContext(AppContext);
  const [uploadedImages, setUploadedImages] = useState([]);

  const fetchImageContent = async (imgIdToGet) => {
    // console.log(`Triggered: ${imgIdToGet}`);
    try {
      const response = await fetch(
        `/api/images/content/${year}/${location}/${imgIdToGet}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response);
      const imgData = await response.blob();
      setImage(URL.createObjectURL(imgData));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchImagesNames = async () => {
    try {
      const response = await fetch(
        `/api/images/names/${year}/${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const imgData = await response.json();
      console.log("Images names");
      console.log(imgData['img_names'])
      if (Array.isArray(imgData['img_names']) && imgData['img_names'].length)
      {
        setImagesNames(imgData['img_names']);
        setNumberOfImages(imgData['img_names'].length);
      }
      else
      {
        setImagesNames([]);
        setNumberOfImages(0);
      }
      console.log(`Number of imgs: ${numberOfImages}`)

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchThumbnail = async (imgIdToGet) => {
    try {
    const response = await fetch(
      `/api/images/thumbnail/${year}/${location}/${imgIdToGet}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      const imgData = await response.blob();
      const thumbUrl = URL.createObjectURL(imgData);
      console.log(`Fetch id: ${imgIdToGet}, Thumbnails before change: ${thumbnails}, len: ${thumbnails.length}`)

      const thumbsTemp = thumbnails;
      thumbsTemp[imgIdToGet-1] = thumbUrl;
      setThumbnails(thumbsTemp);
      console.log(`Fetch id: ${imgIdToGet}, Thumbnails after change: ${thumbnails}, len: ${thumbnails.length}`)
    }
    catch (error) {
      console.error('Error: ', error);
    };
};

  const fetchThumbnails = () => {
    setThumbnails(new Array(numberOfImages).fill(undrawCancel)); 
    setCanInsertThumbnails(true);  

    console.log(thumbnails)
    console.log(`Thumbnails before fetches: ${thumbnails}, len: ${thumbnails.length}`)
    for(var i=1; i <= numberOfImages; i++) fetchThumbnail(i);
    console.log(`Thumbnails after fetches: ${thumbnails}, len: ${thumbnails.length}`)
  }

  // TODO add token bearer and years/locations
  const uploadImages = async () => {
    // console.log("uploaded on front: ");
    // console.log(uploadedImages);
    const formData = new FormData();
    for(var i=0;i<uploadedImages.length;i++) formData.append('new_pictures', uploadedImages[i].file);
    
    try {
      const response = await fetch(
        `/api/images/upload/${year}/${location}`, // /${year}/${location}
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: formData
        }
      );
      // console.log(response);
      console.log(response);
      
    } catch (error) {
      console.error("Error: ", error);
    }
  };



  const nextImg = () => {
    if(parseInt(currentImgId) + 1 <= numberOfImages)
      setCurrentImgId(parseInt(currentImgId) + 1);
    else setCurrentImgId(1);
  };

  const prevImg = () => {
    if(parseInt(currentImgId) - 1 >= 1)
      setCurrentImgId(parseInt(currentImgId) - 1);
    else setCurrentImgId(numberOfImages);
  };

  useEffect(() => {
    setBackNavPage(`/${year}`);
    fetchImagesNames(); // also set number of images
  }, []);

  useEffect(() => {
    fetchThumbnails();
  }, [numberOfImages]); //add fetchThunmbnails

  useEffect(() => {
    if (!numberOfImages) return; // ! do not make a request if there are no images
    // console.log(`Img id: ${imgId}`)
    //console.log("Triggered [currentImgId, imagesNames]");
    if (currentImgId === undefined)
    {
      setCurrentImgId(1);
      setImageName(imagesNames[0]);
      // currentImgId was modified so useEffect will trigger again
    } 
    else{
      fetchImageContent(parseInt(currentImgId));
      setImageName(imagesNames[parseInt(currentImgId)-1]);
    }
  }, [currentImgId, imagesNames]); // add fetchImageContetn

  useEffect(() => {
    console.log("Triggered [imgId]");
    console.log(imgId);
    setCurrentImgId(imgId); // test it out
  }, [imgId])


  const getThumbnails = () => {
    let content = [];
    for (let i = 0; i < numberOfImages; i++) {
      content.push(
      <Link to={`/${year}/${location}/${i+1}`} key={`/${year}/${location}/${i+1}`}> 
        <div className="thumbnail"> 
          <Image src={thumbnails[i]} key={thumbnails[i]} aspectRatio={4/3} alt="xd"/> 
        </div> 
      </Link>
      );
    }
    return content;
  };

  const onUploadChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setUploadedImages(imageList);
  };


  if (tokenValue && !numberOfImages)
  {
    return (
      <>
        <div>
          <ImageUploading
            multiple
            value={uploadedImages}
            onChange={onUploadChange}
            maxNumber={69}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>

                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>Update</button>
                      <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </ImageUploading>
        </div>
        <Button 
        color="inherit" 
        // className={classes.adminButton}
        onClick={uploadImages}
        >
        Upload images
      </Button>
     </>
    );
  }

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {year} {">>"} {location}

        <div id="thumbnailsContainer"> 
          {canInsertThumbnails ? (
            getThumbnails()
            ) : (console.log("Not loaded")) 
          }
        </div>
       
      </Drawer>

      {imageName} {/*imgId*/} <br></br>

      <div id="imageContainer">
        <Image
          src={image}
          aspectRatio={4/3} // change aspect ratio per photo + css
          // cover={true}
        />
      </div>

      <ThemeProvider theme={basicTheme}>
        <div id="imageConsole">

          <IconButton color="primary" onClick={prevImg}>
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton color="primary" onClick={nextImg}>
            <NavigateNextIcon />
          </IconButton>

          <IconButton color="primary" onClick={null}>
            <PlayArrowIcon />
          </IconButton>

          <IconButton color="primary" onClick={null}>
            <PauseIcon />
          </IconButton>
          
        </div>
      </ThemeProvider>

    </div>
  );
}
