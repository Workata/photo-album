// * material UI
import {
	Box,
	Button,
} from '@mui/material';

// * images
import backgroundImage from '../images/footer_lodyas.png';

import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';
import "../css/General.css";

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
		for (var i = 0; i < uploadedImages.length; i++) formData.append('new_pictures', uploadedImages[i].file);

		try {
			const response = await fetch(
				`/api/images/upload/${props.year}/${props.location}`,
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
		<Box
			sx={{
				width: "900px",
				height: "700px",
				border: "solid",
				borderRadius: "5%",
				backgroundImage: `url(${backgroundImage})`,
			}}
			className="center"
		>
			<Box>
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
						// * write your building UI
						<Box
							sx={{
								// backgroundColor: "gray",
							}}
						>
							<Button
								sx={{
									margin: "5px"
								}}
								style={isDragging ? { color: 'red' } : undefined}
								onClick={onImageUpload}
								{...dragProps}
								type="submit"
								size="large"
								color="secondary"
								variant="contained"
							>
								Click or Drop here
							</Button>

							<Button
								sx={{
									margin: "5px"
								}}
								type="submit"
								size="large"
								color="secondary"
								variant="contained"
								onClick={onImageRemoveAll}
							>
								Remove all images
							</Button>

							<Box
								sx={{
									height: "580px",
									// backgroundColor: "gray",
									display: "flex",
									flexDirection: "row",
									flexWrap: "wrap",
									alignContent: "flex-start",
									overflowY: 'auto', // display scroll bar after overflow
									paddingLeft: "15px"
								}}
							>
								{imageList.map((image, index) => (
									<Box
										sx ={{
											width: "100px",
											height: "100px",
											margin: "3px"
										}}
										key={index}
									>
										<span style={{ display: "inline-block", height: "100%", verticalAlign: "middle" }} />
										<img 
											style={{
												height: "auto",
												width: "auto",
												maxWidth: "100px",
												maxHeight: "100px", 
												borderRadius: "5%",
												verticalAlign: "middle"
											}}
											src={image['data_url']}
											alt=""
										/>
										{/* Additional buttons for each picutre if needed */}
										{/* <div className="image-item__btn-wrapper">
											<button onClick={() => onImageUpdate(index)}>Update</button>
											<button onClick={() => onImageRemove(index)}>Remove</button>
										</div> */}
									</Box>
								))}
							</Box>
						</Box>
					)}
				</ImageUploading>
			</Box>

			<Button
				sx={{
					marginTop: "10px",
				}}
				type="submit"
				size="large"
				color="secondary"
				variant="contained"
				onClick={uploadImages}
			>
				Upload images
			</Button>
		</Box>
	);
}