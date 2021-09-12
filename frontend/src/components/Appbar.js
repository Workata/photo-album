import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Appbar() {
    const classes = useStyles();
    const { backNavPage} = useContext(AppContext);


    return (
      <ThemeProvider theme={basicTheme}>
        <div className={classes.root} color="primary">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit">Admin</Button>

              <Typography variant="h5" className={classes.title}>
                <Link to="/" className="default-black-link">
                  TomTol 
                </Link>
              </Typography>
              
                <Link to={backNavPage} id="backButtonLink"> 
                  <IconButton >
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
              
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    );
  }