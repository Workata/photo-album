import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageNotFoundImg from '../images/undraw_page_not_found.svg';

export default function PageNotFound() {
  return (
    <Box>

      <Typography
        sx={{ 
          marginTop: 5,
          marginBottom: 4
        }} 
        variant="h3"
      >
        Page not found
      </Typography>

      <Box
        sx={{
          backgroundImage: `url(${PageNotFoundImg})`,
          backgroundSize: 'auto',
          backgroundRepeat: 'no-repeat',
          width: 860,
          height: 600,
          marginBottom: 2,
          // borderStyle: 'solid',
        }}
      />

    </Box>
  );
}