// * material UI
import {
  Box,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';

// * navigation
import { useHistory } from "react-router-dom";

// * images
import backgroundImage from '../images/footer_lodyas.png';

import "../css/General.css";
import React, { useEffect, useState } from "react";
import undrawCancel from '../images/undrawCancel.svg';

export default function ImageViewer(props) {

  const [image, setImage] = useState(undrawCancel);
  const [imageName, setImageName] = useState('???');
  const [slideshowEnabled, setSlideshowEnabled] = useState(false);
  const [intervalId, setIntervalId] = useState();

  let history = useHistory();

  const fetchImageContent = async (imgIdToGet) => {
    // console.log(`Triggered fetchImageContent: ${imgIdToGet}`);
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

  // TODO forward loading
  useEffect(() => {
    if (!props.numberOfImages) return; // ! do not make a request if there are no images

    var fetchId = parseInt(props.currentImgId);
    fetchImageContent(fetchId);
    setImageName(props.imagesNames[fetchId - 1]);

  }, [props.currentImgId, props.imagesNames, props.numberOfImages]); // eslint-disable-line react-hooks/exhaustive-deps

  // TODO fade in/out animation
  const slideshowIntervalTime = 5000;  // number of miliseconds between pictures

  const nextImgSimulated = () => {
    document.getElementById('navigateNextButton').click();
  }

  const nextImg = () => {
    if (parseInt(props.currentImgId) + 1 <= props.numberOfImages)
      history.push(`/${props.year}/${props.location}/${parseInt(props.currentImgId) + 1}`);
    else history.push(`/${props.year}/${props.location}/${1}`);
  };

  const prevImg = () => {
    if (parseInt(props.currentImgId) - 1 >= 1)
      history.push(`/${props.year}/${props.location}/${parseInt(props.currentImgId) - 1}`);
    else history.push(`/${props.year}/${props.location}/${props.numberOfImages}`);
  };

  const startSlideshow = () => {
    if (!slideshowEnabled) {
      setSlideshowEnabled(true);
      setIntervalId(setInterval(nextImgSimulated, slideshowIntervalTime));
    }
  }

  const stopSlideshow = () => {
    if (slideshowEnabled) {
      if(intervalId) clearInterval(intervalId);
      setSlideshowEnabled(false);
    }
  }

  // TODO add loading animation
  return (
    <Box
      sx={{
        width: "910px",
        height: "700px",
      }}
    >

      <Typography
        sx={{
          marginBottom: "10px",
        }}
        variant="h5"
      >
        {imageName}
      </Typography>

      {/* https://stackoverflow.com/questions/7273338/how-to-vertically-align-an-image-inside-a-div */}
      <Box
        sx={{
          width: "900px",
          height: "600px",
          border: "solid",
          borderRadius: "5%",
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* This span is a hack for image aligning, check linked stack post */}
        <span style={{ display: "inline-block", height: "100%", verticalAlign: "middle" }} />
        <img
          style={{
            height: "auto",
            width: "auto",
            maxWidth: "900px",
            maxHeight: "600px",
            borderRadius: "5%",
            verticalAlign: "middle"
          }}
          src={image}
          alt="Main content should be here"
        />
      </Box>

      <Box>

        <IconButton color="secondary" onClick={prevImg}>
          <NavigateBeforeIcon />
        </IconButton>

        <IconButton 
          color="secondary"
          onClick={nextImg}
          id="navigateNextButton"
        >
          <NavigateNextIcon />
        </IconButton>

        <IconButton
          sx={{
            color: slideshowEnabled ? "primary.gray" : "secondary.main"
          }}
          onClick={startSlideshow}
        >
          <PlayArrowIcon />
        </IconButton>

        <IconButton
          sx={{
            color: slideshowEnabled ? "secondary.main" : "primary.gray"
          }}
          onClick={stopSlideshow}
        >
          <PauseIcon />
        </IconButton>

      </Box>
    </Box>
  );
}