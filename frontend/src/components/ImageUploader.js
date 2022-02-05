import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import Button from '@material-ui/core/Button';

export default function ImageUploader(props) {

    const [uploadedImages, setUploadedImages] = useState([]);

    const onUploadChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setUploadedImages(imageList);
      };
    

    // TODO add token bearer
    const uploadImages = async () => {

        const formData = new FormData();
        for(var i=0;i<uploadedImages.length;i++) formData.append('new_pictures', uploadedImages[i].file);
        
        try {
        const response = await fetch(
            `/api/images/upload/${props.year}/${props.location}`, // /${year}/${location}
            {
            method: "POST",
            headers: {
                Authorization: `Bearer ${props.tokenValue}`,
            },
            body: formData
            }
        );
        console.log(response);
        
        } catch (error) {
        console.error("Error: ", error);
        }
    };

    return (
        <>
            <div>
                <ImageUploading
                    multiple
                    value={uploadedImages}
                    onChange={onUploadChange}
                    maxNumber={69}
                    dataURLKey="data_url"
                >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Remove all images</button>

                        {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>Update</button>
                            <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                        ))}

                    </div>
                    )}
                </ImageUploading>
            </div>
            
            <Button 
                color="inherit" 
                onClick={uploadImages}
            >
                Upload images
            </Button>
        </>
    );
  }