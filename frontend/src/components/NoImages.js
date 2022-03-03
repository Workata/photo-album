import {
  Box,
  Typography
} from '@mui/material'

import React from 'react'

export default function NoImages () {
  return (
    <Box
      sx={{
        marginTop: '5px'
      }}
    >
      <Typography variant="h6">
        There are no images here :(
      </Typography>
    </Box>
  )
}
