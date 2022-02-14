import { createTheme } from '@mui/material/styles';

// * Theme for a whole App

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',  // black
      gray: '#7a818c',
    },
    secondary: {
      main: '#ffffff',  // white
    },
  },
});

export default mainTheme;