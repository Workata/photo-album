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

export default function ChooseYear() {

  const [availableYears, setAvailableYears] = useState([]);
  const [isAddYearDialogOpen, setIsAddYearDialogOpen] = useState(false);
  const [newYearToAdd, setNewYearToAdd] = useState();
  const {tokenValue } = useContext(AppContext);

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
    fetchYears();   //
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
      >
        {
          availableYears.map((year) => {
            return( 
              <YearLocationBox
                key={uniqid()}
                link={`/${year}`}
                text={year}
              />
            )
          })
        }
        { tokenValue && <YearLocationAddBox action={setIsAddYearDialogOpen}/> }
      </Box>

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