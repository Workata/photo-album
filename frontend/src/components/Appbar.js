import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import { useParams } from "react-router-dom";

// import React, { useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';

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
    // const {year, location} = useParams();

    // useEffect(() => {
    //   console.log(year);
    // }, []);


    return (
      <ThemeProvider theme={basicTheme}>
        <div className={classes.root} color="primary">
          <AppBar position="static">
            <Toolbar>
              {/* {year} {'>>'} {location} */}
              <Typography variant="h6" className={classes.title}>
                Album
              </Typography>
              <Button color="inherit">Admin</Button>
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    );
  }