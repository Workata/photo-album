import {
  Box,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {Link, useLocation} from 'react-router-dom';
import "../css/General.css";
import React, {useContext} from "react";
import { AppContext } from './../contexts/AppContext';

export default function Appbar() {
  const { backNavPage, deleteTokenCookie, tokenValue, setTokenValue } = useContext(AppContext);
  const currentURL = useLocation();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar 
          sx={{
            // appbar color here
            bgcolor: "secondary.main",
          }}
        > 

          {!tokenValue ? (
            <Link to="/login" id="adminButtonLink" className="non-edited-link">
              <Button>
                Admin
              </Button>
            </Link>
          ) : 
          (
            <Link to="/" id="adminButtonLink" className="non-edited-link">
              <Button 
                color="inherit" 
                onClick={() => {
                  setTokenValue(); // set Token value for undefined
                  deleteTokenCookie('token', '/');
                }}
                >
                Logout
              </Button>
            </Link>
          )}

          <Typography variant="h5" sx={{position: 'absolute', left: '48%'}}>
            <Link to="/" className="default-black-link">
              TomTol
            </Link>
          </Typography>

          {/* Render 'go-back' arrow on every page except root*/}
          {currentURL.pathname !== '/' &&
            <Link to={backNavPage} id="backButtonLink"> 
              <IconButton 
                sx= {{
                  position: 'absolute',
                  right: 10,
                  top: 10
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Link>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}