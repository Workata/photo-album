import {
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

export default function YearLocationBox (props) {
  return (
    <Link
      style={{
        textDecoration: 'none',
        margin: '20px'
      }}
      to={props.link}
    >
      <Box
        sx={{
          minWidth: '80px',
          height: '100px',
          paddingLeft: '10px',
          paddingRight: '10px',

          // overflowWrap: "break-word",

          backgroundColor: 'white',
          color: 'black',
          borderRadius: '10px',

          /* font */
          fontSize: '20px',
          fontWeight: '700',

          /* align text in the center of div (one line), line-height = height */
          textAlign: 'center',
          verticalAlign: 'middle',
          lineHeight: '100px',

          /* animation */
          transition: 'transform .2s',

          cursor: 'pointer',

          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
      >
        {props.text}
      </Box>
    </Link>
  )
}

// TODO setup correct prop types
YearLocationBox.propTypes = {
  link: PropTypes.any,
  text: PropTypes.any
}
