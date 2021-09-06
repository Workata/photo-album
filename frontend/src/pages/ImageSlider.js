import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from 'material-ui-image'
import "../css/ImageSlider.css";
import undrawCancel from '../images/undrawCancel.svg';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {
  IconButton
} from '@material-ui/core';
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";


// import Viewer from 'viewerjs';

export default function ImageSlider() {
  const {year, location, imgId} = useParams();
  const [image, setImage] = useState(undrawCancel);
  const [imagesNames, setImagesNames] = useState(['???']);
  const [imageName, setImageName] = useState('???');
  const [numberOfImages, setNumberOfImages] = useState();
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const [currentImgId, setCurrentImgId] = useState(imgId);

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
      const imgData = await response.blob();
      setImage(URL.createObjectURL(imgData));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchImagesNames = async () => {
    // console.log(`Triggered: ${imgIdToGet}`);
    try {
      const response = await fetch(
        `/api/images/names/${year}/${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const imgData = await response.json();
      setImagesNames(imgData['img_names']);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchNumberOfImages = async () => {
      await fetch(
        `/api/images/count/${year}/${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json())
      .then((data) => {

        // console.log(data);
        setNumberOfImages(parseInt(data['ImageCount']));
        // console.log(data['ImageCount']);

      }).catch((error) =>{
        console.error('Error: ', error);
      });
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
    fetchImagesNames();
    fetchNumberOfImages();
  }, []);

  useEffect(() => {
    // console.log(`Img id: ${imgId}`)
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
    
    
  }, [currentImgId, imagesNames]);

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
      </Drawer>

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
  );
}
