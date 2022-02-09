import {
	Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function YearLocationBox(props) {

	return (
		<Link to={props.link} className="non-decorated-link">
			<Box
				sx={{
					width: "100px",
					height: "100px",

					backgroundColor: "white",
					color: "black",
					marginTop: "20px",
					marginBottom: "20px",
					marginLeft: "20px",
					marginRight: "20px",
					borderRadius: "10%",

					// /* layout */
					// float:left;

					/* font */
					fontSize: "20px",
					fontWeight: "700",

					/* align text in the center of div (one line), line-height = height*/
					textAlign: "center",
					verticalAlign: "middle",
					lineHeight: "100px",

					/* animation */
					transition: "transform .2s",

					cursor: "pointer",

					'&:hover': {
						transform: "scale(1.1)",
					},
				}}
			>
				{props.text}
			</Box>
		</Link>
	);
}