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

export default function ChooseYear() {

  const [availableYears, setAvailableYears] = useState([]);
  const [isAddYearDialogOpen, setIsAddYearDialogOpen] = useState(false);
  const [newYearToAdd, setNewYearToAdd] = useState();
  const { tokenValue } = useContext(AppContext);

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
      // console.log(dataYears);
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
    fetchYears();
  }, []);


  return (
    <>
      <YearLocationContainer
        items={availableYears}
        tokenValue={tokenValue}
        dialogAction={setIsAddYearDialogOpen}
        containerTitle={"Select year"}
        linkPrefix={""}
      />

      <Dialog
        open={isAddYearDialogOpen}
        onClose={handleYearDialogExit}
        aria-labelledby="form-dialog-title"
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
            autoFocus
            margin="dense"
            label="Year"
            type="number"
            fullWidth
            onChange={(event) => {
              setNewYearToAdd(event.target.value);
            }}
          />
          <div>
            <Button
              color="primary"
              variant="contained"
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