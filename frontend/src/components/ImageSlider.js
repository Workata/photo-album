import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from 'material-ui-image'
import "../css/ImageSlider.css";

export default function ImageSlider() {
  const {year, location, imgId} = useParams();
  const [image, setImage] = useState();
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



  return (
    <div>
      year {year} <br></br>
      location {location} <br></br>
      image name {imageName} <br></br>

      <button onClick={prevImg}>Prev</button>
      <button onClick={nextImg}>Next</button>

      <div id="imageContainer">
        <Image
          src={image}
        />
      </div>
      {/* <img src={image} alt="Alt text" width="500" height="600"></img> */}

    </div>
  );
}
