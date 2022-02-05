import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import basicTheme from "../themes/basicTheme";
import { ThemeProvider } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../css/Appbar.css";
import "../css/General.css";
import React, {useContext} from "react";
import { AppContext } from './../contexts/AppContext';
import useStyles from '../styles/AppbarStyles';

export default function Appbar() {
    const classes = useStyles();
    const { backNavPage, deleteTokenCookie, tokenValue, setTokenValue } = useContext(AppContext);
    const currentURL = useLocation();

    return (
      <ThemeProvider theme={basicTheme}>
        <div className={classes.root} color="primary">
          <AppBar position="static">
            <Toolbar>

              {!tokenValue ? (
                <Link to="/login" id="adminButtonLink" className="non-edited-link">
                  <Button color="inherit" className={classes.adminButton}>
                    Admin
                  </Button>
                </Link>
              ) : 
              (
                <Link to="/" id="adminButtonLink" className="non-edited-link">
                  <Button 
                    color="inherit" 
                    className={classes.adminButton}
                    onClick={() => {
                      setTokenValue(); // set Token value for undefined
                      deleteTokenCookie('token', '/');
                    }}
                    >
                    Logout
                  </Button>
                </Link>
              )}

              <Typography variant="h5" className={classes.appbarTitle}>
                <Link to="/" className="default-black-link">
                  TomTol
                </Link>
              </Typography>

              {/* Render 'go-back' arrow on every page except root*/}
              {currentURL.pathname !== '/' &&
                <Link to={backNavPage} id="backButtonLink" className={classes.goBackButton}> 
                  <IconButton >
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
              }
              
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    );
  }