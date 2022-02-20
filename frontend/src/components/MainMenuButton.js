// * material UI
import {
  Box,
  Typography,
} from '@mui/material';

// * others
import { Link } from 'react-router-dom';
import React from "react";

export default function MainMenuButton(props) {

  return (
    <Link 
      to={props.buttonLink}
      style={{
        textDecoration: "none",
        margin: "15px"
      }}
    >
      <Box
        sx={{
          width: "300px",
          height: "300px",
          backgroundColor: "white",
          borderRadius: "10%",
          transition: "transform .2s",

          '&:hover': {
            transform: "scale(1.1)",
          },
        }}
      >
        <Box
          sx={{
            // borderStyle: "solid",
            // borderColor: "yellow",
            width: "300px",
            height: "250px",

            // * Center image inside this div
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",  /* Centering y-axis */
            alignItems: "center", /* Centering x-axis */
          }}
        >
          {/* Button image */}
          <img
            style={{
              width: "230px",
            }}
            src={props.buttonImage}
            alt="Button img"
          />
        </Box>

        {/* Button title */}
        <Typography
          sx={{
            color: "primary.main",
            fontWeight: "500"
          }}
          variant="h5"
        >
          {props.buttonTitle}
        </Typography>

      </Box>
    </Link>
  );
}