import { createTheme } from '@mui/material/styles';

// * Theme for a whole App

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

export default mainTheme;