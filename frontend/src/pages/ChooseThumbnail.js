// * material UI
import {
  Box
} from '@mui/material'

// * components
import Thumbnail from '../components/Thumbnail'

// * images
import backgroundImage from '../images/footer_lodyas.png'

// * others
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'
import ImageUploader from '../components/ImageUploader'

export default function ChooseThumbnail () {
  const [thumbnails, setThumbnails] = useState()
  const [numberOfImages, setNumberOfImages] = useState()
  const { year, location } = useParams()
  const { tokenValue } = useContext(AppContext)

  const fetchNumberOfImages = async () => {
    try {
      let url
      if (year === 'categories') url = `/api/categories/count/${location}`
      else url = `/api/images/count/${year}/${location}`
      const response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const resJson = await response.json()
      setNumberOfImages(resJson.number_of_images)
    } catch (error) {
      console.error('Error: ', error)
    };
  }

  useEffect(() => {
    if (numberOfImages) {
      const thumbs = []
      for (let i = 1; i <= numberOfImages; i++) {
        thumbs.push(i)
      }
      setThumbnails(thumbs)
    }
  }, [numberOfImages])

  useEffect(() => {
    if (!numberOfImages) fetchNumberOfImages()
  }, [])

  if (tokenValue && !numberOfImages && year !== 'categories') {
    return (
      <ImageUploader
        year={year}
        location={location}
        tokenValue={tokenValue}
      />
    )
  }

  return (
    <Box
      sx={{
        width: '80%', // 820 px
        height: '80vh', // 800px
        paddingTop: '10px',
        paddingBottom: '10px',

        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5px',

        border: 'solid',
        borderColor: 'white',
        borderRadius: '10px',
        borderWidth: '2px',

        backgroundImage: `url(${backgroundImage})`,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        overflowY: 'auto'
      }}
    >
      {
        thumbnails &&
        thumbnails.map((x) => {
          return (
            <Box
              sx={{
                margin: '5px',
                marginTop: 'auto',
                marginBottom: 'auto',

                transition: 'transform .2s',

                '&:hover': {
                  transform: 'scale(1.2)'
                }
              }}
              key={x}
            >
              <Thumbnail
                year={year}
                location={location}
                imgNumber={x}
                currentImgId={-1}
                fromChooseThumbnailPage={true}
              />
            </Box>
          )
        })
      }
    </Box>
  )
}
