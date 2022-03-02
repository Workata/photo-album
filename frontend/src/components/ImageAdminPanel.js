// * material UI
import {
  Box,
  Typography
} from '@mui/material'

import '../css/General.css'
import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// * images
import backgroundImage from '../images/footer_lodyas.png'

export default function ImageAdminPanel (props) {
  const [landscapeChecked, setLandscapeChecked] = useState(false) // state used for updating category
  const [carsChecked, setCarsChecked] = useState(false)
  const [floraChecked, setFloraChecked] = useState(false)
  const [birdsChecked, setBirdsChecked] = useState(false)
  const [wildlifeChecked, setWildlifeChecked] = useState(false)
  const [currentImgCategories, setCurrentImgCategories] = useState({ landscape: false, cars: false, flora: false, birds: false, wildlife: false })

  const fetchImgCategories = async () => {
    try {
      const response = await fetch(
        `/api/categories/get/${props.year}/${props.location}/${props.imagesNames[props.currentImgId - 1]}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${props.tokenValue}`
          }
        }
      )
      const res = await response.json()
      // console.log(res);
      setCurrentImgCategories(res)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const addToCategory = async (category, image_name) => {
    if (!image_name) {
      console.log('Image is undefined')
      return
    }

    try {
      const response = await fetch(
        `/api/categories/add/${category}/${props.year}/${props.location}/${image_name}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${props.tokenValue}`
          }
        }
      )
      const res = await response.json()
      console.log('Res: ', res)
      fetchImgCategories()
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const deleteFromCategory = async (category, image_name) => {
    if (!image_name) {
      console.log('Image is undefined')
      return
    }

    try {
      const response = await fetch(
        `/api/categories/delete/${category}/${props.year}/${props.location}/${image_name}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${props.tokenValue}`
          }
        }
      )
      const res = await response.json()
      console.log('Res: ', res)
      fetchImgCategories()
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const updateCategory = (categoryValueBefore, categoryValueAfter, categoryName, imgName) => {
    if (categoryValueBefore === categoryValueAfter) return
    if (categoryValueAfter) addToCategory(categoryName, imgName)
    else deleteFromCategory(categoryName, imgName)
  }

  const saveCategories = () => {
    const imgName = props.imagesNames[props.currentImgId - 1]
    updateCategory(currentImgCategories.landscape, landscapeChecked, 'landscape', imgName)
    updateCategory(currentImgCategories.cars, carsChecked, 'cars', imgName)
    updateCategory(currentImgCategories.flora, floraChecked, 'flora', imgName)
    updateCategory(currentImgCategories.birds, birdsChecked, 'birds', imgName)
    updateCategory(currentImgCategories.wildlife, wildlifeChecked, 'wildlife', imgName)
  }

  useEffect(() => {
    if (props.currentImgId) fetchImgCategories()
  }, [props.currentImgId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLandscapeChecked(currentImgCategories.landscape)
    setCarsChecked(currentImgCategories.cars)
    setFloraChecked(currentImgCategories.flora)
    setBirdsChecked(currentImgCategories.birds)
    setWildlifeChecked(currentImgCategories.wildlife)
  }, [currentImgCategories])

  return (
    <Box
      sx={{
        width: '150px',
        height: '300px',
        border: 'solid',
        borderColor: 'white',
        borderRadius: '10px',
        borderWidth: '2px',
        padding: '10px',
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <FormGroup
        sx={{
          marginLeft: '20px'
        }}
      >
        <Typography variant="h6">Category</Typography>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => { setLandscapeChecked(event.target.checked) }}
              checked={landscapeChecked}
              color="secondary"
            />
          }
          label="Landscape"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => { setCarsChecked(event.target.checked) }}
              checked={carsChecked}
              color="secondary"
            />
          }
          label="Cars"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => { setFloraChecked(event.target.checked) }}
              checked={floraChecked}
              color="secondary"
            />
          }
          label="Flora"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => { setBirdsChecked(event.target.checked) }}
              checked={birdsChecked}
              color="secondary"
            />
          }
          label="Birds"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => { setWildlifeChecked(event.target.checked) }}
              checked={wildlifeChecked}
              color="secondary"
            />
          }
          label="Wildlife"
        />
      </FormGroup>

      <Button
        variant="contained"
        color="secondary"
        size="medium"
        onClick={saveCategories}
        sx={{
          marginTop: '20px'
        }}
      >
        Save
      </Button>
    </Box>
  )
}
