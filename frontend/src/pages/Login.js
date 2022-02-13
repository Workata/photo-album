import { Button, TextField } from '@mui/material';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/General.css";
import "../css/Login.css";
import { ThemeProvider } from '@mui/styles';
import formTheme from "../themes/formTheme";
import useStyles from '../styles/LoginStyles';
import { useHistory } from "react-router-dom";


export default function Login() {
    const {setTokenCookie, setTokenValue} = useContext(AppContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginError] = useState(false);  //TODO GUI info about error
    const classes = useStyles();
    const history = useHistory();

    const handleLoginButton = async() => {
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.access_token && typeof data.access_token !== 'undefined') {
            // keep token in both cookie (in case of app exit) and global variable (context)
            setTokenValue(data.access_token);
            setTokenCookie('token', data.access_token);   //set cookie
            history.push('/');      // redirect to home page
            setLoginError(false);
          } else setLoginError(true);
        })
        .catch((error) => {
          console.error(error);
          setLoginError(true);
        });
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