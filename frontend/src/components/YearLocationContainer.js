// * material UI
import {
  Box,
  Typography
} from '@mui/material'

// * components
import YearLocationBox from './YearLocationBox'
import YearLocationAddBox from './YearLocationAddBox'

import uniqid from 'uniqid'

// * images
import backgroundImage from '../images/footer_lodyas.png'

export default function YearLocationContainer (props) {
  return (
    <>
      <Typography
        sx={{
          marginBottom: '30px'
        }}
        variant="h4"
      >
        {props.containerTitle}
      </Typography>

      <Box
        sx={{
          width: '700px',
          minHeight: '400px',
          // maxHeight: "600px",
          height: 'auto',
          borderStyle: 'solid',
          borderColor: 'white',
          borderRadius: '5%',
          backgroundImage: `url(${backgroundImage})`,

          // layout
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'flex-start'
        }}
      >
        {
          props.items.map((item) => {
            return (
              <YearLocationBox
                key={uniqid()}
                link={`${props.linkPrefix}/${item}`}
                text={item}
              />
            )
          })
        }
        {props.tokenValue && <YearLocationAddBox action={props.dialogAction} />}
      </Box>
    </>
  )
}
