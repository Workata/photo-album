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
  from '@mui/material'

// * components
import YearLocationContainer from '../components/YearLocationContainer'

// * others
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from './../contexts/AppContext'
import '../css/General.css'

export default function ChooseYear () {
  const [availableYears, setAvailableYears] = useState([])
  const [isAddYearDialogOpen, setIsAddYearDialogOpen] = useState(false)
  const [newYearToAdd, setNewYearToAdd] = useState()
  const [yearErrorMsg, setYearErrorMsg] = useState('')
  const { tokenValue } = useContext(AppContext)

  const fetchYears = async () => {
    try {
      const response = await fetch(
        '/api/locations/years',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const dataYears = await response.json()
      setAvailableYears(dataYears)
      // console.log(dataYears);
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const addNewYear = async () => {
    if (yearErrorMsg || !newYearToAdd) return

    try {
      const response = await fetch(
        `/api/locations/create/year/${newYearToAdd}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenValue}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const res = await response.json()
      fetchYears()
      console.log(res)
    } catch (error) {
      console.error('Error: ', error)
    }
    setNewYearToAdd()
    handleYearDialogExit()
  }

  const handleYearDialogExit = () => {
    setIsAddYearDialogOpen(false)
    // TODO handle errors and text fields
  }

  useEffect(() => {
    fetchYears()
  }, [])

  return (
    <>
      <YearLocationContainer
        items={availableYears}
        tokenValue={tokenValue}
        dialogAction={setIsAddYearDialogOpen}
        containerTitle={'Select year'}
        linkPrefix={'/pictures'}
      />

      <Dialog
        open={isAddYearDialogOpen}
        onClose={handleYearDialogExit}
      >
        <DialogTitle>
            Add new year
        </DialogTitle>

        <DialogContent
          sx={{
            width: '250px',
            height: '90px'
          }}
        >
          <TextField
            sx = {{
              width: '200px'
            }}
            autoFocus
            margin="dense"
            label="Year"
            type="number"

            fullWidth
            onChange={(event) => {
              const value = event.target.value

              // console.log(typeof value); // string

              if (value === '') setYearErrorMsg('')
              else if (value.includes('-')) // TODO fix this
              { setYearErrorMsg('Value must be a positive integer!') } else if (parseInt(value) < 1800 || parseInt(value) > 2300) { setYearErrorMsg('Value must be between 1800 and 2300!') } else setYearErrorMsg('')

              setNewYearToAdd(value)
            }}
          />

          <Typography
            sx={{
              color: 'red',
              fontSize: '13px'
            }}
          >
            {yearErrorMsg}
          </Typography>

        </DialogContent>

        <DialogActions>

          <Button
            color="primary"
            onClick={addNewYear}
          >
            Add year
          </Button>

          <Button
            color="primary"
            onClick={handleYearDialogExit}
          >
            Close
          </Button>

        </DialogActions>

      </Dialog>
    </>
  )
}
