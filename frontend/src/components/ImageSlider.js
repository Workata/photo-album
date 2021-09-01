import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ImageSlider() {
  const { year, location, imgId} = useParams();
  const [image, setImage] = useState();
  const [currentImgId, setCurrentImgId] = useState(imgId); // imgId may be undefined, checked in useEffect

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
    setCurrentImgId(currentImgId + 1);
  };

  const prevImg = () => {
    setCurrentImgId(currentImgId - 1);
  };

  useEffect(() => {
    console.log(`Img id: ${imgId}`)

    if (currentImgId === undefined)
    {
      setCurrentImgId(1);
      fetchImage(1);
    } 
    else fetchImage(currentImgId);
    
  }, [currentImgId]);

  return (
    <div>
      <div onClick={fetchImage}>Image slider </div>
      <br></br>
      year {year} <br></br>
      location {location} <br></br>

      <button onClick={prevImg}>Prev</button>
      <button onClick={nextImg}>Next</button>
      <img src={image} alt="Girl in a jacket" width="500" height="600"></img>

      {/* {image} */}
    </div>
  );
}
