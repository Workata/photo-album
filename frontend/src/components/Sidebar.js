// * material UI
import {
  Box
} from '@mui/material'

// * others
import React from 'react'
import uniqid from 'uniqid'

// * components
import Thumbnail from './Thumbnail'

// * images
import backgroundImage from '../images/footer_lodyas.png'

import PropTypes from 'prop-types'

export default function Sidebar (props) {
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
        id="thumbnailContainer"
        sx={{
          // backgroundColor: "gray",
          overflowY: 'auto' // display scroll bar after overflow
        }}
      >
        {
          props.numberOfImages &&
          [...Array(props.numberOfImages)].map((x, i) => {
            return (
              <Thumbnail
                year={props.year}
                location={props.location}
                imgNumber={i + 1}
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
