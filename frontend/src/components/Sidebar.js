// * material UI
import {
  Box,
  Typography,
} from '@mui/material';

// * others
import React, { useEffect, useState } from "react";
import uniqid from 'uniqid';

// * components
import Thumbnail from './Thumbnail';

// * images
import backgroundImage from '../images/footer_lodyas.png';

// ! it uses old version of MUI (v4 instead of v5 :()
// import Image from 'material-ui-image' 

export default function Sidebar(props) {

  const [thumbnails, setThumbnails] = useState([]);
  const [canInsert, setCanInsert] = useState(false);
  let thumbs = []

  const fetchThumbnail = async (imgIdToGet) => {
    try {

      const response = await fetch(
        `/api/images/thumbnail/${props.year}/${props.location}/${imgIdToGet}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const imgData = await response.blob();
      const thumbUrl = URL.createObjectURL(imgData);
      thumbs[imgIdToGet - 1] = thumbUrl

    }
    catch (error) {
      console.error('Error: ', error);
    };
  };

  const fetchThumbnailsOneByOne = async () => {
    for (var i = 1; i <= props.numberOfImages; i++) await fetchThumbnail(i);
    setThumbnails(thumbs);
  };

  useEffect(() => {
    fetchThumbnailsOneByOne();
    if (props.numberOfImages !== 0) setCanInsert(true);
  }, [props.numberOfImages]);

  return (
    <Box
      sx={{
        // ! absolute out !!!
        position: "absolute",
        top: "110px",
        left: "50px",
        // ! absolute out !!!

        width: "200px",
        height: "80%",

        border: "solid",
        borderColor: "white",
        borderRadius: "10px",
        borderWidth: "2px",

        backgroundImage: `url(${backgroundImage})`,
        display: "flex",
        flexDirection: "column",

      }}
    >
      <Typography
        variant="h6"
      >
        {props.year} {">>"} {props.location}
      </Typography>

      {/* Thumbnail container */}
      <Box
        sx={{
          // backgroundColor: "gray",
          overflowY: 'auto', // display scroll bar after overflow
        }}
      >
        {canInsert ? (
          thumbnails.map((thumbnail, i) => {
            return (
              <Thumbnail
                year={props.year}
                location={props.location}
                imgNumber={i + 1}
                thumbnail={thumbnail}
                key={uniqid()}
              />
            )
          })
        ) : (
          console.log("Not loaded")
        )
        }
      </Box>
    </Box>
  );
}