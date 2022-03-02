import {
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'

export default function Thumbnail (props) {
  return (
		<Link
			replace
			to={`/pictures/${props.year}/${props.location}/${props.imgNumber}`}
		>
			{/* thumbnail wrapper */}
			<Box
				sx = {{
				  marginTop: '5px'
				}}
			>
				{/* thumbnail */}
				<img
					style = {{
					  // * conditional border styling -> currently selected picture
					  // ! "===" doesnt work in this case, idk why
					  // eslint-disable-next-line eqeqeq
					  border: (props.currentImgId == props.imgNumber) && '2px dashed white',

					  borderRadius: '5px'
					}}
					src={props.thumbnail}
					key={props.imgNumber}
					alt="thumbnail"
				/>
			</Box>
		</Link>
  )
}
