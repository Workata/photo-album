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

    const fetchImageContent = async (imgIdToGet) => {
        console.log(`Triggered fetchImageContent: ${imgIdToGet}`);
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
        var fetchId;

        if (!props.currentImgId)
        {
          // ! currentImgId was modified so useEffect will trigger again 
          // !  or it will not trigger cause state will change too late hence temp var (fetchId)
          props.setCurrentImgId(1);
          fetchId = 1;
        } 
        else fetchId = parseInt(props.currentImgId);

        fetchImageContent(fetchId);
        setImageName(props.imagesNames[fetchId-1]);

      }, [props.currentImgId, props.imagesNames, props.numberOfImages]); // add fetchImageContetn ,
    

      useEffect(() => {
        props.setCurrentImgId(props.choosenImgId); // test it out
      }, [props.choosenImgId])


    const nextImg = () => {
        if(parseInt(props.currentImgId) + 1 <= props.numberOfImages)
          props.setCurrentImgId(parseInt(props.currentImgId) + 1);
        else props.setCurrentImgId(1);
      };
    
      const prevImg = () => {
        if(parseInt(props.currentImgId) - 1 >= 1)
          props.setCurrentImgId(parseInt(props.currentImgId) - 1);
        else props.setCurrentImgId(props.numberOfImages);
      };

      // TODO add loading animation
    return (
        <>
            <div className="center">
                <div id="imgTitle">{imageName}</div>

                <div id="imageViewerContainer">
                    <img id="imageViewerImg" src={image} alt="Main content" className="center"/>
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