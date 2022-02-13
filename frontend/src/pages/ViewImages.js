// * material UI
import {
  Box,
  Typography,
} from '@mui/material';

import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../contexts/AppContext';
import { useParams } from "react-router-dom";
import "../css/ImageSlider.css";

// * components
import NoImages from '../components/NoImages';
import Sidebar from '../components/Sidebar';
import ImageViewer from '../components/ImageViewer';
import ImageUploader from '../components/ImageUploader';
import ImageAdminPanel from '../components/ImageAdminPanel';
// import Viewer from 'viewerjs';

// * navigation
import { useHistory } from "react-router-dom";

export default function ImageSlider() {
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const { year, location, imgId } = useParams();        // params from url e.g.: 2015/Poland/2, imgId optional

  const [numberOfImages, setNumberOfImages] = useState(0); // None
  const [imagesNames, setImagesNames] = useState(['???']);
  const [currentImgId, setCurrentImgId] = useState(imgId);
  const { setBackNavPage, tokenValue } = useContext(AppContext);

  let history = useHistory();


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
      //console.log("Images names");
      //console.log(imgData['img_names'])
      if (Array.isArray(imgData['img_names']) && imgData['img_names'].length) {
        setImagesNames(imgData['img_names']);
        setNumberOfImages(imgData['img_names'].length);
      }
      else {
        setImagesNames([]);
        setNumberOfImages(0);
      }
      //console.log(`Number of imgs: ${numberOfImages}`)

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    // * Redirect to the first picture if no imgId specified
    if (!imgId)
      history.push(`/${year}/${location}/1`);

    setBackNavPage(`/${year}`);
    fetchImagesNames(); // also set number of images
  }, []);

  // * return "image uploader" if no images in folder and logged in
  if (tokenValue && !numberOfImages) {
    return (
      <ImageUploader
        year={year}
        location={location}
        tokenValue={tokenValue}
      />
    );
  }

  // * return "no images in folder" if no images in folder and not logged in
  if (!tokenValue && !numberOfImages) {
    return (
      <NoImages/>
    );
  }

  return (
    <Box
      className="center"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "100px",
          // flexShrink: 0,
          // flexBasis: "100%",
          // flexGrow: 0,
          // alignContent: "flex-start",
          alignItems: "center",

          height: "1000px",
        }}
      >

        <Sidebar
          year={year}
          location={location}
          numberOfImages={numberOfImages}
        />

        <ImageViewer
          year={year}
          location={location}
          numberOfImages={numberOfImages}
          imagesNames={imagesNames}
          choosenImgId={imgId}
          currentImgId={currentImgId}
          setCurrentImgId={setCurrentImgId}
        />

        {tokenValue &&
          <ImageAdminPanel
            year={year}
            location={location}
            imagesNames={imagesNames}
            currentImgId={currentImgId}
            tokenValue={tokenValue}
          />
        }
      </Box>
    </Box>
  );
}
