import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link, useLocation} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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