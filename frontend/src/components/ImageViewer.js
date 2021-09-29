import Image from 'material-ui-image'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { IconButton } from '@material-ui/core';
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';
import "../css/ImageViewer.css";
import "../css/General.css";
import React, { useEffect, useState} from "react";
import undrawCancel from '../images/undrawCancel.svg';

export default function ImageViewer(props) {

    const [image, setImage] = useState(undrawCancel);
    const [imageName, setImageName] = useState('???');
    const [currentImgId, setCurrentImgId] = useState(); //imgId

    const fetchImageContent = async (imgIdToGet) => {
        // console.log(`Triggered: ${imgIdToGet}`);
        try {
          const response = await fetch(
            `/api/images/content/${props.year}/${props.location}/${imgIdToGet}`,
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
    
      useEffect(() => {
        if (!props.numberOfImages) return; // ! do not make a request if there are no images
        // console.log(`Img id: ${imgId}`)
        //console.log("Triggered [currentImgId, imagesNames]");
        if (!currentImgId)
        {
          setCurrentImgId(1);
          setImageName(props.imagesNames[0]);
          // currentImgId was modified so useEffect will trigger again
        } 
        else{
        fetchImageContent((parseInt(currentImgId)));
          setImageName(props.imagesNames[parseInt(currentImgId)-1]);
        }
      }, [currentImgId, props.imagesNames, props.numberOfImages]); // add fetchImageContetn
    

      useEffect(() => {
        // console.log("Triggered [imgId]");
        // console.log(imgId);
        setCurrentImgId(props.choosenImgId); // test it out
      }, [props.choosenImgId])


    const nextImg = () => {
        if(parseInt(currentImgId) + 1 <= props.numberOfImages)
          setCurrentImgId(parseInt(currentImgId) + 1);
        else setCurrentImgId(1);
      };
    
      const prevImg = () => {
        if(parseInt(currentImgId) - 1 >= 1)
          setCurrentImgId(parseInt(currentImgId) - 1);
        else setCurrentImgId(props.numberOfImages);
      };

    return (
        <>
            <div id="imageViewerContainer" className="center">
                {imageName} <br></br>

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
        </>
    );
  }