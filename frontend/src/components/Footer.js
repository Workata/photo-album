import {
  Box,
} from '@mui/material';

export default function Footer() {
  return (
    <Box
      color="primary"
    >
      <footer
        style={{
          position: "fixed",
          height: "30px",
          left: "0",
          bottom: "0",
          width: "100%",
          backgroundColor: "#fafffd",
          color: "black",
          textAlign: "center",
          boxShadow: "0 -5px grey",
        }}
      >
        © 2022 www.tomtol.pl Some Rights Reserved
      </footer>
    </Box>
  );
}