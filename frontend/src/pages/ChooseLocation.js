import {  
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions, 
  DialogContent,
  DialogTitle
}
from '@mui/material';
import {Link} from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/ChooseYearLocation.css";
import "../css/General.css";
import AddIcon from '@mui/icons-material/Add';
import { useParams } from "react-router-dom";
import useStyles from '../styles/ChooseYearLocationStyles';

export default function ChooseLocation() {

    const classes = useStyles();
    const {year} = useParams();
    const [availableLocations, setAvailableLocations] = useState([]);
    const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false);
    const [newLocationToAdd, setNewLocationToAdd] = useState([]);
    const {setBackNavPage, tokenValue} = useContext(AppContext);
    

    const fetchLocations = async () => {
        try {
          const response = await fetch(
            `/api/locations/${year}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          const dataLocations = await response.json();
          setAvailableLocations(dataLocations);
          console.log(dataLocations);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      const addNewLocation = async () => {
        try {
          const response = await fetch(
            `/api/locations/create/location/${year}/${newLocationToAdd}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${tokenValue}`,
                "Content-Type": "application/json",
              },
            }
          )
          const res = await response.json();
          fetchLocations();
          console.log(res);
        } catch (error) {
          console.error("Error: ", error);
        }
        handleLocationDialogExit();
      };

      const handleLocationDialogExit = () => {
        setIsAddLocationDialogOpen(false);
        // TODO handle errors and text fields
      };

      useEffect(() => {
        setBackNavPage('/years');
        fetchLocations();   //
      }, []);


    return (
      <>
        <div id="yearsLocationsContainer" className="center">
          {availableLocations.map((location) => {
              return <Link to={`/${year}/${location}`} className=""> <div className="year-location-box" key={location}>{location}</div> </Link>
          })
          
          }
          {
              tokenValue && 
              
                <div className="year-location-box" key="addYear" onClick={() => {setIsAddLocationDialogOpen(true)}}>
                  <AddIcon
                    fontSize="large"
                    className={classes.addIcon}
                  />
                </div> 
              
            }
          <div style={{clear: "both"}}></div>
        </div>
        <Dialog
          open={isAddLocationDialogOpen}
          onClose={handleLocationDialogExit}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">
          <div>
            <div>
              <Typography variant="h6">
                Add new location
              </Typography>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            onChange={(event) => {
              setNewLocationToAdd(event.target.value);
            }}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={addNewLocation}
            >
              Add location
            </Button>
          </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleLocationDialogExit} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }