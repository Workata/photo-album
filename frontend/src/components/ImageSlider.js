import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from 'material-ui-image'
import "../css/ImageSlider.css";

export default function ImageSlider() {
  const { year, location, imgId} = useParams();
  const [image, setImage] = useState();

  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const [currentImgId, setCurrentImgId] = useState(imgId);

  const fetchImage = async (imgIdToGet) => {
    // console.log(`Triggered: ${imgIdToGet}`);
    try {
      const response = await fetch(
        `/api/images/view/${year}/${location}/${imgIdToGet}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.blob();
      setImage(URL.createObjectURL(data));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const nextImg = () => {
    setCurrentImgId(parseInt(currentImgId) + 1);
  };

  const prevImg = () => {
    setCurrentImgId(parseInt(currentImgId) - 1);
  };

  useEffect(() => {
    // console.log(`Img id: ${imgId}`)
    if (currentImgId === undefined)
    {
      setCurrentImgId(1);
      // currentImgId was modified so useEffect will trigger again
    } 
    else fetchImage(parseInt(currentImgId));
    
  }, [currentImgId]);

  return (
    <div>
      <div onClick={fetchImage}>Image slider </div>
      <br></br>
      year {year} <br></br>
      location {location} <br></br>

      <button onClick={prevImg}>Prev</button>
      <button onClick={nextImg}>Next</button>

      <div id="imageContainer">
        <Image
          src={image}
        />
      </div>
      {/* <img src={image} alt="Girl in a jacket" width="500" height="600"></img> */}

    </div>
  );
}
