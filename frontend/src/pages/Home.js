// * material UI
import {
  Box
} from '@mui/material'

// * components
import MainMenuButton from '../components/MainMenuButton'

// * images
import backgroundImage from '../images/footer_lodyas.png'
import undrawPhotos1 from '../images/undrawPhotos_1.svg'
import undrawPhotos2 from '../images/undrawPhotos_2.svg'
import undrawAdventure from '../images/undrawAdventure.svg'
import undrawMyAnswer from '../images/undrawMyAnswer.svg'

import React from 'react'

export default function Home () {
  return (
    <Box
      sx={{
        width: '665px',
        height: '665px',
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: '5%',
        backgroundImage: `url(${backgroundImage})`,

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',

        padding: '20px'
      }}
    >
      <MainMenuButton
        buttonLink={'/pictures'}
        buttonImage={undrawPhotos1}
        buttonTitle={'Pictures'}
      />

      <MainMenuButton
        buttonLink={'/chooseCategory'}
        buttonImage={undrawPhotos2}
        buttonTitle={'Categories'}
      />

      <MainMenuButton
        buttonLink={'/map'}
        buttonImage={undrawAdventure}
        buttonTitle={'Map'}
      />

      <MainMenuButton
        buttonLink={'/info'}
        buttonImage={undrawMyAnswer}
        buttonTitle={'Info'}
      />
    </Box>
  )
}
