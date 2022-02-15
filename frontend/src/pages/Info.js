import {
  Typography,
  Box,
}
  from '@mui/material';

// * images
import backgroundImage from '../images/footer_lodyas.png';

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
      }}
    >
      {/* TODO add info about this web app */}
      <Typography variant="h6">
        About this web app...
      </Typography>
    </Box>
  );
}