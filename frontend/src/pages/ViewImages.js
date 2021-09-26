import React, { useEffect, useState, useContext } from "react";
import { AppContext } from '../contexts/AppContext';
import { useParams } from "react-router-dom";
import "../css/ImageSlider.css";
import undrawCancel from '../images/undrawCancel.svg';
import Sidebar from '../components/Sidebar';
import ImageViewer from '../components/ImageViewer';
import ImageUploader from '../components/ImageUploader';
// import Viewer from 'viewerjs';

export default function ImageSlider() {
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const {year, location, imgId} = useParams();        // params from url e.g.: 2015/Poland/2, imgId optional
  const [image, setImage] = useState(undrawCancel);
  const [imagesNames, setImagesNames] = useState(['???']);
  const [imageName, setImageName] = useState('???');
  const [numberOfImages, setNumberOfImages] = useState(0); // None
  const [currentImgId, setCurrentImgId] = useState(); //imgId
  const [thumbnails, setThumbnails] = useState([]); // useState([])
  const [canInsertThumbnails, setCanInsertThumbnails] = useState(false);
  const {setBackNavPage, tokenValue} = useContext(AppContext);
 

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
      // console.log(response);
      const imgData = await response.blob();
      setImage(URL.createObjectURL(imgData));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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
      console.log("Images names");
      console.log(imgData['img_names'])
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
      console.log(`Number of imgs: ${numberOfImages}`)

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchThumbnail = async (imgIdToGet) => {
    try {
    const response = await fetch(
      `/api/images/thumbnail/${year}/${location}/${imgIdToGet}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      const imgData = await response.blob();
      const thumbUrl = URL.createObjectURL(imgData);
      console.log(`Fetch id: ${imgIdToGet}, Thumbnails before change: ${thumbnails}, len: ${thumbnails.length}`)

      const thumbsTemp = thumbnails;
      thumbsTemp[imgIdToGet-1] = thumbUrl;
      setThumbnails(thumbsTemp);
      console.log(`Fetch id: ${imgIdToGet}, Thumbnails after change: ${thumbnails}, len: ${thumbnails.length}`)
    }
    catch (error) {
      console.error('Error: ', error);
    };
};

  const fetchThumbnails = () => {
    setThumbnails(new Array(numberOfImages).fill(undrawCancel)); 
    setCanInsertThumbnails(true);  

    console.log(thumbnails)
    console.log(`Thumbnails before fetches: ${thumbnails}, len: ${thumbnails.length}`)
    for(var i=1; i <= numberOfImages; i++) fetchThumbnail(i);
    console.log(`Thumbnails after fetches: ${thumbnails}, len: ${thumbnails.length}`)
  }



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
    setBackNavPage(`/${year}`);
    fetchImagesNames(); // also set number of images
  }, []);

  useEffect(() => {
    fetchThumbnails();
  }, [numberOfImages]); //add fetchThunmbnails

  useEffect(() => {
    if (!numberOfImages) return; // ! do not make a request if there are no images
    // console.log(`Img id: ${imgId}`)
    //console.log("Triggered [currentImgId, imagesNames]");
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
  }, [currentImgId, imagesNames]); // add fetchImageContetn

  useEffect(() => {
    console.log("Triggered [imgId]");
    console.log(imgId);
    setCurrentImgId(imgId); // test it out
  }, [imgId])


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
        canInsertThumbnails = {canInsertThumbnails}
        numberOfImages = {numberOfImages}
        thumbnails = {thumbnails}
      />

      <ImageViewer
        image = {image}
        imageName = {imageName}
        nextImg = {nextImg}
        prevImg = {prevImg}
      />
    </>
  );
}
