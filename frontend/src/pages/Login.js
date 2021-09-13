import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/General.css";
import "../css/Login.css";
import {ThemeProvider} from '@material-ui/core';
import formTheme from "../themes/formTheme";
import useStyles from '../styles/LoginStyles';


export default function Login() {
    const {setBackNavPage} = useContext(AppContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const classes = useStyles();

    useEffect(() => {
        setBackNavPage('/');
      }, []);

    const handleLoginButton = async() => {
        console.log(username);
        console.log(password);
    };

    return (
    <ThemeProvider theme={formTheme}>
      <div id="loginInputContainer" className="center">
          <h2>Sign In</h2>
          <TextField
            color="primary"
            variant="filled"
            label="Username"
            placeholder="Enter username"
            type="username"
            fullWidth
            className={classes.loginInput}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            color="primary"
            label="Password"
            variant="filled"
            placeholder="Enter password"
            type="password"
            fullWidth
            className={classes.loginInput}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleLoginButton}
          >
            Sign in
          </Button>
      </div>
    </ThemeProvider>
    );
  }