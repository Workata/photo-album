import {
  Box,
} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Thumbnail(props) {

	return (
		<Link 
			to={`/${props.year}/${props.location}/${props.imgNumber}`} 
		>
			<Box 
				sx = {{
					// TODO thumbnail style
					marginTop: "5px",
					// border: "solid",
					// borderColor: "white",
				}}
			>
				<img src={props.thumbnail} key={props.imgNumber} alt="xd" />
			</Box>
		</Link>
	);
}