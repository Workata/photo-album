import "../css/Footer.css";
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';

export default function Footer() {

    return (
      <ThemeProvider theme={basicTheme}>
        <div color="primary"> 
          <footer id="footer" > © 2021 www.tomtol.pl Some Rights Reserved </footer>
        </div>
       </ThemeProvider>
    );
  }