// * material UI
import {
  Button,
  Typography,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
}
  from '@mui/material';

// * components
import YearLocationBox from '../components/YearLocationBox';
import YearLocationAddBox from '../components/YearLocationAddBox';

// * images
import backgroundImage from '../images/footer_lodyas.png';

import uniqid from 'uniqid';
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from './../contexts/AppContext';
import "../css/General.css";

import { useParams } from "react-router-dom";

export default function ChooseLocation() {

  const { year } = useParams();
  const [availableLocations, setAvailableLocations] = useState([]);
  const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false);
  const [newLocationToAdd, setNewLocationToAdd] = useState([]);
  const { tokenValue } = useContext(AppContext);


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
    fetchLocations();   //
  }, []);


  return (
    <>
      <Box 
        sx={{
          width: "700px",
          minHeight: "400px",
          height: "auto",
          borderStyle: "solid",
          borderColor: "white",
          borderRadius: "5%",
          backgroundImage: `url(${backgroundImage})`,

          // layout
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "flex-start",
        }}
        className="center"
      >
        {availableLocations.map((location) => {
            return( 
              <YearLocationBox
                key={uniqid()}
                link={`/${year}/${location}`}
                text={location}
              />
            )
          })
        }
        { tokenValue && <YearLocationAddBox action={setIsAddLocationDialogOpen}/> }
      </Box>

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