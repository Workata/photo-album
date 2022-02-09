import {
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function YearLocationAddBox(props) {

  return (
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
      onClick={() => { props.action(true)}}
    >
      <AddIcon
        fontSize="large"
        sx={{
          marginTop: "32px",
        }}
      />
    </Box>
  );
}