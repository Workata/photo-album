import {
  Typography,
  Box,
}
  from '@mui/material';

// * images
import backgroundImage from '../images/footer_lodyas.png';

// * navigation
import { Link } from 'react-router-dom';

import React from "react";
import "../css/General.css";

export default function Info() {

  return (
    <Box
      sx={{
        width: "900px",
        height: "600px",
        border: "solid",
        borderRadius: "5%",
        backgroundImage: `url(${backgroundImage})`,
        paddingTop: "20px",
        paddingBottom: "15px",
        paddingLeft: "15px"
        
      }}
    >
      <Box
        sx={{
          width: "890px",
          height: "580px",
          paddingRight: "10px",
          overflowY: 'auto', // display scroll bar after overflow
        }}
      >
        <Typography
          sx={{
            textAlign: "left"
          }}
          variant="h6"
        >
          <Typography sx={{marginBottom:"15px", fontWeight:"600"}} variant="h5">General info</Typography>
            TomTol is a web application for sharing images, categorizing them and marking locations (related with images) on map.
          <br/>
          <br/>

          <Typography sx={{marginBottom:"15px", fontWeight:"600"}} variant="h5">Technologies</Typography>

          <Typography sx={{fontStyle: "italic"}} variant="h6">Frontend:</Typography>
          <ul>
            <li> <Link to={{ pathname: "https://en.reactjs.org/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> React - JavaScript </Link> </li>
            <li> <Link to={{ pathname: "https://openlayers.org/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> OpenLayers </Link> (Map) </li>
            <li> <Link to={{ pathname: "https://www.toptal.com/designers/subtlepatterns/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> Subtle Patterns </Link> (Background) </li>
            <li> <Link to={{ pathname: "https://mui.com/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> Material UI </Link> (GUI) </li>
            <li> <Link to={{ pathname: "https://undraw.co/illustrations" }} target="_blank" style={{textDecoration: "none", color: "white"}}> Undraw </Link> (Illustrations) </li>
          </ul>

          <Typography sx={{fontStyle: "italic"}} variant="h6">Backend:</Typography>
          <ul>
            <li> <Link to={{ pathname: "https://fastapi.tiangolo.com/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> Fast API - Python </Link> </li>
            <li> <Link to={{ pathname: "https://tinydb.readthedocs.io/en/latest/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> TinyDB </Link> (Database) </li>
          </ul>

          <Typography sx={{fontStyle: "italic"}} variant="h6">Deploy:</Typography>
          <ul>
            <li> <Link to={{ pathname: "https://www.digitalocean.com/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> DigitalOcean </Link> (VPS) </li>
            <li> <Link to={{ pathname: "https://www.docker.com/" }} target="_blank" style={{textDecoration: "none", color: "white"}}> Docker </Link> </li>
          </ul>

        </Typography>
      </Box>
    </Box>
  );
}