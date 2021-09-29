import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../contexts/AppContext';
import { useParams } from "react-router-dom";
import "../css/ImageSlider.css";
import Sidebar from '../components/Sidebar';
import ImageViewer from '../components/ImageViewer';
import ImageUploader from '../components/ImageUploader';
// import Viewer from 'viewerjs';

export default function ImageSlider() {
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const {year, location, imgId} = useParams();        // params from url e.g.: 2015/Poland/2, imgId optional
 
  const [numberOfImages, setNumberOfImages] = useState(0); // None
  const [imagesNames, setImagesNames] = useState(['???']);
  const {setBackNavPage, tokenValue} = useContext(AppContext);


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
      //console.log(`Number of imgs: ${numberOfImages}`)

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    setBackNavPage(`/${year}`);
    fetchImagesNames(); // also set number of images
  }, []);


  if (tokenValue && !numberOfImages)
  {
    return (
      <>
        <ImageUploader
          year = {year}
          location = {location}
          tokenValue = {tokenValue}
        />
     </>
    );
  }

  return (
    <>
      <Sidebar
        year = {year}
        location = {location}
        numberOfImages = {numberOfImages}
      />

      <ImageViewer
        year = {year}
        location = {location}
        numberOfImages = {numberOfImages}
        imagesNames = {imagesNames}
        choosenImgId = {imgId}
      />
    </>
  );
}
