// * material UI
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'

// * images
import backgroundImage from '../images/footer_lodyas.png'

// * requests
import axios from 'axios'

import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import '../css/General.css'
import PropTypes from 'prop-types'

import { Link, useLocation } from 'react-router-dom'

export default function ImageUploader (props) {
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const location = useLocation()
  const maxNumberOfImageToUpload = 1000

  const onUploadChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    // uploadedImagesList = imageList
    setUploadedImages(imageList)
  }

  const uploadImages = () => {
    setIsUploadDialogOpen(true)

    console.log(`'uploadedImages' (state): ${uploadedImages}`)
    // console.log(`'uploadedImages' (state): ${uploadedImagesList}`)

    const formData = new FormData()
    for (let i = 0; i < uploadedImages.length; i++) formData.append('new_pictures', uploadedImages[i].file)
    // for (let i = 0; i < uploadedImagesList.length; i++) formData.append('new_pictures', uploadedImagesList[i].file)

    console.log(`'formData' (const): ${formData}`)

    axios.request({
      method: 'post',
      url: `/api/images/upload/${props.year}/${props.location}`,
      headers: {
        Authorization: `Bearer ${props.tokenValue}`
      },
      data: formData,
      onUploadProgress: (p) => {
        const progress = parseFloat((p.loaded / p.total).toFixed(2))
        console.log(progress)
        setUploadProgress(progress)
      }
    }).then(data => {
      console.log('All loaded - 100%')
      setUploadProgress(1.00)
    })
  }

  const handleUploadDialogExit = () => {
    setIsUploadDialogOpen(false)
    // TODO handle errors and text fields
  }

  function LinearProgressWithLabel (props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Typography
        sx={{
          marginBottom: '10px'
        }}
        variant="h6"
      >
        Max. number of images to upload: {maxNumberOfImageToUpload}
      </Typography>
      <Box
        sx={{
          width: '900px',
          height: '700px',
          border: 'solid',
          borderRadius: '5%',
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <Box>
          <ImageUploading
            multiple
            value={uploadedImages}
            onChange={onUploadChange}
            maxNumber={maxNumberOfImageToUpload}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              // * write your building UI
              <Box
                sx={{
                  // backgroundColor: "gray",
                }}
              >
                <Button
                  sx={{
                    margin: '5px'
                  }}
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  type="submit"
                  size="large"
                  color="secondary"
                  variant="contained"
                >
                  Add images
                </Button>

                <Button
                  sx={{
                    margin: '5px'
                  }}
                  type="submit"
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={onImageRemoveAll}
                >
                  Remove images
                </Button>

                <Box
                  sx={{
                    height: '580px',
                    // backgroundColor: "gray",
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                    overflowY: 'auto', // display scroll bar after overflow
                    paddingLeft: '15px'
                  }}
                >
                  {imageList.map((image, index) => (
                    <Box
                      sx={{
                        width: '100px',
                        height: '100px',
                        margin: '3px'
                      }}
                      key={index}
                    >
                      <span style={{ display: 'inline-block', height: '100%', verticalAlign: 'middle' }} />
                      <img
                        style={{
                          height: 'auto',
                          width: 'auto',
                          maxWidth: '100px',
                          maxHeight: '100px',
                          borderRadius: '5%',
                          verticalAlign: 'middle'
                        }}
                        src={image.data_url}
                        alt=""
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </ImageUploading>
        </Box>

        <Button
          sx={{
            marginTop: '10px'
          }}
          type="submit"
          size="large"
          color="secondary"
          variant="contained"
          onClick={uploadImages}
        >
          Upload added images
        </Button>
      </Box>

      {/* // Dialog window */}
      <Dialog
        open={isUploadDialogOpen}
        onClose={handleUploadDialogExit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <div>
            <div>
              <Typography variant="h6">
                Upload progress
              </Typography>
            </div>
          </div>
        </DialogTitle>

        <DialogContent
          sx={{
            width: '300px'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={uploadProgress * 100} />
          </Box>
        </DialogContent>

        <DialogActions>
          {/* Redirect to the same page to see uplaoded pictures */}
          <Link to={location.pathname} className="temp">
            {/* reload(true) */}
            <Button
              onClick={() => {
                handleUploadDialogExit()
                window.location.reload(true)
              }}
              color="primary"
            >
              Ok
            </Button>
          </Link>
        </DialogActions>

      </Dialog>
    </>
  )
}

// TODO setup correct prop types
ImageUploader.propTypes = {
  year: PropTypes.any,
  location: PropTypes.any,
  tokenValue: PropTypes.any,
  value: PropTypes.any
}
