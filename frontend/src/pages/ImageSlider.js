import React, { useEffect, useState } from "react";
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
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

// import Viewer from 'viewerjs';

export default function ImageSlider() {
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const {year, location, imgId} = useParams();        // params from url e.g.: 2015/Poland/2, imgId optional
  const [image, setImage] = useState(undrawCancel);
  const [imagesNames, setImagesNames] = useState(['???']);
  const [imageName, setImageName] = useState('???');
  const [numberOfImages, setNumberOfImages] = useState();
  const [currentImgId, setCurrentImgId] = useState(); //imgId
  const [thumbnails, setThumbnails] = useState([]); // useState([])
  const [canInsertThumbnails, setCanInsertThumbnails] = useState(false);

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
      setImagesNames(imgData['img_names']);
      setNumberOfImages(imgData['img_names'].length);
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
    //console.log("Number of imgs: ".concat(numberOfImages));
    setThumbnails(new Array(numberOfImages).fill(undrawCancel)); //.fill(0)
    setCanInsertThumbnails(true);  

    console.log(thumbnails)
    console.log(`Thumbnails before fetches: ${thumbnails}, len: ${thumbnails.length}`)
    for(var i=1; i <= numberOfImages; i++) fetchThumbnail(i);
    console.log(`Thumbnails after fetches: ${thumbnails}, len: ${thumbnails.length}`)

    //setCanInsertThumbnails(true); 
  }


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
    fetchImagesNames(); // also set number of images
  }, []);

  useEffect(() => {
    fetchThumbnails();
  }, [numberOfImages]); //add fetchThunmbnails

  useEffect(() => {
    // console.log(`Img id: ${imgId}`)
    console.log("Triggered [currentImgId, imagesNames]");
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

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
      
    },
    drawerPaper: {
      width: drawerWidth,
      background: '#bcbec2',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const getThumbnails = () => {
    let content = [];
    for (let i = 0; i < numberOfImages; i++) {
      content.push(
      <Link to={`/images/view/${year}/${location}/${i+1}`} key={`/images/view/${year}/${location}/${i+1}`}> 
        <div className="thumbnail"> 
          <Image src={thumbnails[i]} key={thumbnails[i]} aspectRatio={4/3} alt="xd"/> 
        </div> 
      </Link>
      );
    }
    return content;
  };

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
