// import Image from 'material-ui-image' // ! it uses old version of MUI (v4 instead of v5 :()

// * material UI
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';

// * navigation
import { useHistory } from "react-router-dom";

import "../css/ImageViewer.css";
import "../css/General.css";
import React, { useEffect, useState } from "react";
import undrawCancel from '../images/undrawCancel.svg';

export default function ImageViewer(props) {

  const [image, setImage] = useState(undrawCancel);
  const [imageName, setImageName] = useState('???');

  let history = useHistory();

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

    if (!props.currentImgId) {
      // ! currentImgId was modified so useEffect will trigger again 
      // !  or it will not trigger cause state will change too late hence temp var (fetchId)
      props.setCurrentImgId(1);
      fetchId = 1;
    }
    else fetchId = parseInt(props.currentImgId);

    fetchImageContent(fetchId);
    setImageName(props.imagesNames[fetchId - 1]);

  }, [props.currentImgId, props.imagesNames, props.numberOfImages]); // add fetchImageContetn ,


  useEffect(() => {
    props.setCurrentImgId(props.choosenImgId); // test it out
  }, [props.choosenImgId])


  const nextImg = () => {
    if (parseInt(props.currentImgId) + 1 <= props.numberOfImages)
      history.push(`/${props.year}/${props.location}/${parseInt(props.currentImgId) + 1}`);
    else return history.push(`/${props.year}/${props.location}/${1}`);
  };

  const prevImg = () => {
    if (parseInt(props.currentImgId) - 1 >= 1)
      history.push(`/${props.year}/${props.location}/${parseInt(props.currentImgId) - 1}`);
    else return history.push(`/${props.year}/${props.location}/${props.numberOfImages}`);
  };

  // TODO add loading animation
  return (
    <>
      <div className="center">
        <div id="imgTitle">{imageName}</div>

        <div id="imageViewerContainer">
          <img id="imageViewerImg" src={image} alt="Main content" className="center" />
        </div>

        <div id="imageConsole">

          {/* <Link to={`/${props.year}/${props.location}/${props.imgNumber}`}> */}
          <IconButton color="secondary" onClick={prevImg}>
            <NavigateBeforeIcon />
          </IconButton>
          {/* </Link> */}

          <IconButton color="secondary" onClick={nextImg}>
            <NavigateNextIcon />
          </IconButton>

          <IconButton color="secondary" onClick={null}>
            <PlayArrowIcon />
          </IconButton>

          <IconButton color="secondary" onClick={null}>
            <PauseIcon />
          </IconButton>

        </div>
      </div>
    </>
  );
}