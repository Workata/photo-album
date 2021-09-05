import "../css/Footer.css";
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';

export default function Footer() {

    return (
      <ThemeProvider theme={basicTheme}>
        <footer id="footer" color="primary">
        © 2021 www.tomtol.pl Some Rights Reserved
        </footer>
       </ThemeProvider>
    );
  }