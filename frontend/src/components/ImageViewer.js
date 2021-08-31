import {
  Avatar
} from '@material-ui/core';

import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function ImageViewer() {
  const { year, location, id } = useParams();
  const [image, setImage] = useState();

  const fetchImage = async () => {
    // console.log("Triggered");
    try {
      const response = await fetch(
        `/api/images/view/${year}/${location}/${id}`,
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

  return (
    <div>
      <div onClick={fetchImage}>Image viewer </div>
      <br></br>
      year {year} <br></br>
      location {location} <br></br>
      id {id} <br></br>


      <img src={image} alt="Girl in a jacket" width="500" height="600"></img>
      {/* <Avatar
              alt="profile"
              src={image}
        /> */}
      {image}
    </div>
  );
}
