import {  
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions, 
  DialogContent,
  DialogTitle
}
from '@material-ui/core';
import {Link} from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/ChooseYearLocation.css";
import "../css/General.css";
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../styles/ChooseYearLocationStyles';

export default function ChooseYear() {

    const classes = useStyles();
    const [availableYears, setAvailableYears] = useState([]);
    const [isAddYearDialogOpen, setIsAddYearDialogOpen] = useState(false);
    const [newYearToAdd, setNewYearToAdd] = useState();
    const {setBackNavPage, tokenValue} = useContext(AppContext);

    const fetchYears = async () => {
        try {
          const response = await fetch(
            `/api/locations/years`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          const dataYears = await response.json();
          setAvailableYears(dataYears)
          console.log(dataYears);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

    const addNewYear = async () => {
      try {
        const response = await fetch(
          `/api/locations/create/year/${newYearToAdd}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenValue}`,
              "Content-Type": "application/json",
            },
          }
        )
        const res = await response.json();
        fetchYears();
        console.log(res);
      } catch (error) {
        console.error("Error: ", error);
      }
      handleYearDialogExit();
    };

    const handleYearDialogExit = () => {
      setIsAddYearDialogOpen(false);
      // TODO handle errors and text fields
    };

      useEffect(() => {
        setBackNavPage('/');
        fetchYears();   //
      }, []);


    return (
      <>
        <div id="yearsLocationsContainer" className="center">
          {
            availableYears.map((year) => {
              return <Link to={`/${year}`} className=""> <div className="year-location-box" key={year}>{year}</div> </Link>
            })
          
          }
          {
            tokenValue && 
            
              <div className="year-location-box" key="addYear" onClick={() => {setIsAddYearDialogOpen(true)}}>
                <AddIcon
                  fontSize="large"
                  className={classes.addIcon}
                />
              </div> 
            
          }
          <div style={{clear: "both"}}></div>
        </div>

        <Dialog
          open={isAddYearDialogOpen}
          onClose={handleYearDialogExit}
          aria-labelledby="form-dialog-title"
          // className={classes.settingsDialog}
        >
        <DialogTitle id="form-dialog-title">
          <div>
            <div>
              <Typography variant="h6">
                Add new year
              </Typography>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            // onKeyPress={handleEnterPress}
            autoFocus
            margin="dense"
            // id="name"
            label="Year"
            type="number"
            // value={ownerToAdd}
            fullWidth
            // className={}
            onChange={(event) => {
              setNewYearToAdd(event.target.value);
            }}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              // className={classes.buttonAddOwner}
              onClick={addNewYear}
            >
              Add year
            </Button>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleYearDialogExit} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
    );
  }