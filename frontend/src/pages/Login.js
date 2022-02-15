// Material UI
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';

// * images
import backgroundImage from '../images/footer_lodyas.png';

import React, { useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/General.css";
import { useHistory } from "react-router-dom";


export default function Login() {
    const {setTokenCookie, setTokenValue} = useContext(AppContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginError] = useState();
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
          } else setLoginError("Wrong username or password!");
        })
        .catch((error) => {
          console.error(error);
          setLoginError("Wrong username or password!");
        });
    };


    return (
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          width: "400px",
          height: "340px",
          borderRadius: "5%",
          borderStyle: "solid",
          borderColor: "white",
        }}
      >
          <Typography
            sx={{
              marginTop: "20px",
              marginBottom: "20px"
            }}
            variant='h5'>Sign In</Typography>
          {/* <h2>Sign In</h2> */}

          <TextField
            sx={{
              color: 'black',
              backgroundColor: 'white',
              marginBottom: "30px",
            }}
            color="primary"
            variant="filled"
            label="Username"
            placeholder="Enter username"
            type="username"
            fullWidth
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <TextField
            sx={{
              color: 'black',
              backgroundColor: 'white',
              marginBottom: "15px",
            }}
            color="primary"
            label="Password"
            variant="filled"
            placeholder="Enter password"
            type="password"
            fullWidth
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          {/* Error message */}
          <Box
            sx={{
              color: 'red',
              lineHeight: '30px',
              fontWeight: "bold",
              width: "400px",
              height: "30px",
              marginBottom: "15px",
              textAlign: 'center',
              // backgroundColor: 'yellow'
            }}
          >
            {loginError}
          </Box>

          <Button
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
            onClick={handleLoginButton}
          >
            Sign in
          </Button>
      </Box>
    );
  }