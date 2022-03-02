// * material UI
import {
  Box
} from '@mui/material'

import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useParams } from 'react-router-dom'

// * components
import NoImages from '../components/NoImages'
import Sidebar from '../components/Sidebar'
import ImageViewer from '../components/ImageViewer'
import ImageUploader from '../components/ImageUploader'
import ImageAdminPanel from '../components/ImageAdminPanel'
import GeneralLoading from '../components/GeneralLoading'

// * navigation
import { useHistory } from 'react-router-dom'

export default function ImageSlider () {
  // imgId may be undefined, checked in useEffect
  // also parsing for int is needed as otherwise it's a string (from url)
  const { year, location, imgId } = useParams() // params from url e.g.: 2015/Poland/2, imgId optional

  const [numberOfImages, setNumberOfImages] = useState(0) // None
  const [imagesNames, setImagesNames] = useState(['img name'])
  const [isLoading, setIsLoading] = useState(true)

  const { tokenValue } = useContext(AppContext)

  const history = useHistory()

  const fetchImagesNames = async () => {
    try {
      let url
      if (year === 'categories') url = `/api/categories/names/${location}`
      else url = `/api/images/names/${year}/${location}`

      const response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const imgData = await response.json()
      // console.log("Images names");
      // console.log(imgData['img_names'])
      if (Array.isArray(imgData.img_names) && imgData.img_names.length) {
        setImagesNames(imgData.img_names)
        setNumberOfImages(imgData.img_names.length)
      } else {
        setImagesNames([])
        setNumberOfImages(0)
      }
      // console.log(`Number of imgs: ${numberOfImages}`)
      setIsLoading(false)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  useEffect(() => {
    // * Redirect to the first picture if no imgId specified
    // ! it has to be replace instead of push
    if (!imgId) history.replace(`/pictures/${year}/${location}/1`)

    // * set number of images
    fetchImagesNames()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return (<GeneralLoading/>) // loading
  else {
    // * return "image uploader" if no images in folder and logged in
    if (tokenValue && !numberOfImages && year !== 'categories') {
      return (
        <ImageUploader
          year={year}
          location={location}
          tokenValue={tokenValue}
        />
      )
    }

    // * return "no images in folder" if no images in folder and not logged in
    if ((!tokenValue && !numberOfImages) || (year === 'categories' && !numberOfImages)) {
      return (
        <NoImages />
      )
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '100px',
          alignItems: 'center',
          height: '750px'
        }}
      >

        <Sidebar
          year={year}
          location={location}
          numberOfImages={numberOfImages}
          currentImgId={imgId}
        />

        <ImageViewer
          year={year}
          location={location}
          numberOfImages={numberOfImages}
          imagesNames={imagesNames}
          currentImgId={imgId}
        />

        {tokenValue && year !== 'categories' &&
          <ImageAdminPanel
            year={year}
            location={location}
            imagesNames={imagesNames}
            currentImgId={imgId}
            tokenValue={tokenValue}
          />
        }

      </Box>
    )
  }
}
