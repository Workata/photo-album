// * material UI
import {
  Box
} from '@mui/material'

// * others
import React, { useEffect, useState } from 'react'
import uniqid from 'uniqid'

// * components
import Thumbnail from './Thumbnail'

// * images
import backgroundImage from '../images/footer_lodyas.png'

import PropTypes from 'prop-types'

export default function Sidebar (props) {
  const [thumbnails, setThumbnails] = useState([])

  const fetchThumbnail = async (imgIdToGet) => {
    try {
      let url
      if (props.year === 'categories') url = `/api/categories/thumbnail/${props.location}/${imgIdToGet}`
      else url = `/api/images/thumbnail/${props.year}/${props.location}/${imgIdToGet}`

      const response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const imgData = await response.blob()
      const thumbUrl = URL.createObjectURL(imgData)

      const thumbs = thumbnails
      thumbs[imgIdToGet - 1] = thumbUrl
      // * https://stackoverflow.com/questions/50030433/setstate-not-working-for-updating-an-array-in-react
      setThumbnails([]) // ! workaround
      setThumbnails(thumbs)
    } catch (error) {
      console.error('Error: ', error)
    };
  }

  const fetchThumbnailsOneByOne = async () => {
    for (let i = 1; i <= props.numberOfImages; i++) await fetchThumbnail(i)
  }

  useEffect(() => {
    if (props.numberOfImages !== 0) {
      fetchThumbnailsOneByOne()
    }
  }, [props.numberOfImages]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        width: '215px',
        height: '80%',

        border: 'solid',
        borderColor: 'white',
        borderRadius: '10px',
        borderWidth: '2px',

        backgroundImage: `url(${backgroundImage})`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Thumbnail container */}
      <Box
        sx={{
          // backgroundColor: "gray",
          overflowY: 'auto' // display scroll bar after overflow
        }}
      >
        {
          thumbnails.map((thumbnail, i) => {
            return (
              <Thumbnail
                year={props.year}
                location={props.location}
                imgNumber={i + 1}
                thumbnail={thumbnail}
                key={uniqid()}
                currentImgId={props.currentImgId}
              />
            )
          })
        }
      </Box>
    </Box>
  )
}

// TODO setup correct prop types
Sidebar.propTypes = {
  year: PropTypes.any,
  location: PropTypes.any,
  currentImgId: PropTypes.any,
  numberOfImages: PropTypes.any
}
