import {
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import React, { useRef, useState, useEffect } from 'react'
import { useIntersection } from '../hooks/intersectionObserver'
import loadingGif from '../images/Loading_icon_2.gif'

export default function Thumbnail (props) {
  const [isInView, setIsInView] = useState(false)
  const [thumbUrl, setThumbUrl] = useState()
  const imgRef = useRef()

  useIntersection(imgRef, () => {
    setIsInView(true)
  })

  const fetchThumbnail = async (imgIdToGet) => {
    try {
      let url
      if (props.year === 'categories') url = `/api/categories/thumbnail/${props.location}/${imgIdToGet}`
      else url = `/api/images/thumbnail/${props.year}/${props.location}/${imgIdToGet}`
      console.log(url)
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
      setThumbUrl(URL.createObjectURL(imgData))
    } catch (error) {
      console.error('Error: ', error)
    };
  }

  useEffect(() => {
    if (isInView) fetchThumbnail(props.imgNumber)
  }, [isInView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Link
      replace
      to={`/pictures/${props.year}/${props.location}/${props.imgNumber}`}
    >
      {/* thumbnail wrapper */}
      <Box
        sx={{
          marginTop: '5px'
        }}
        ref={imgRef}
      >
        {/* thumbnail */}
        <img
          style={{
            // * conditional border styling -> currently selected picture
            // ! "===" doesnt work in this case, idk why
            // eslint-disable-next-line eqeqeq
            border: (props.currentImgId == props.imgNumber) && '2px dashed white',
            width: '190px',
            borderRadius: '5px'
          }}
          id={`thumbnail_${props.imgNumber}`}
          src={thumbUrl || loadingGif}
          alt="thumbnail"
        />
      </Box>
    </Link>
  )
}

// TODO setup correct prop types
Thumbnail.propTypes = {
  year: PropTypes.any,
  location: PropTypes.any,
  currentImgId: PropTypes.any,
  imageNumber: PropTypes.any,
  thumbnail: PropTypes.any,
  imgNumber: PropTypes.any,
  updateVisibilityInfo: PropTypes.any
}
