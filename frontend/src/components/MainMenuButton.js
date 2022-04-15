// * material UI
import {
  Box,
  Typography
} from '@mui/material'

// * others
import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function MainMenuButton (props) {
  const history = useHistory()

  return (
    <>
      <Box
        sx={{
          width: !props.category ? '42%' : '25%', // 300px
          height: !props.category ? '42%' : '40%',
          margin: '4%',
          backgroundColor: 'white',
          borderRadius: '10%',
          cursor: 'pointer',
          transition: 'transform .2s',

          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => { history.push(props.buttonLink) }}
      >
        <Box
          sx={{
            // borderStyle: "solid",
            // borderColor: "yellow",
            width: '100%',
            height: '80%',

            // * Center image inside this div
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', /* Centering y-axis */
            alignItems: 'center' /* Centering x-axis */
          }}
        >
          {/* Button image */}
          <img
            style={{
              height: !props.category ? '70%' : '50%'
            }}
            src={props.buttonImage}
            alt="Button img"
          />
        </Box>

        {/* Button title */}
        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: '500'
          }}
          variant="h5"
        >
          {props.buttonTitle}
        </Typography>

      </Box>
    </>
  )
}

// TODO setup correct prop types
MainMenuButton.propTypes = {
  buttonLink: PropTypes.any,
  buttonImage: PropTypes.any,
  buttonTitle: PropTypes.any,
  category: PropTypes.any
}
