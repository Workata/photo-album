// * material UI
import {
  Box
} from '@mui/material'

// * others
import React, { useState, useEffect } from 'react'
// import uniqid from 'uniqid'

// * components
import Thumbnail from './Thumbnail'

// * images
import backgroundImage from '../images/footer_lodyas.png'

import PropTypes from 'prop-types'

export default function Sidebar (props) {
  const [thumbnails, setThumbnails] = useState()

  useEffect(() => {
    if (props.numberOfImages) {
      const thumbs = []
      for (let i = 1; i <= props.numberOfImages; i++) {
        thumbs.push(i)
      }
      setThumbnails(thumbs)
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
          thumbnails &&
          thumbnails.map((x) => {
            return (
              <Thumbnail
                key={x}
                year={props.year}
                location={props.location}
                imgNumber={x}
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
