// * material UI
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

// * components
import YearLocationContainer from '../components/YearLocationContainer';

// * others
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
      // console.log(dataLocations);
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
    fetchLocations();
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <YearLocationContainer
        items={availableLocations}
        tokenValue={tokenValue}
        dialogAction={setIsAddLocationDialogOpen}
        containerTitle={"Select location"}
        linkPrefix={`/${year}`}
      />

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