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
        width: '70vh', // 665
        height: '70vh', // 665
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: '5%',
        backgroundImage: `url(${backgroundImage})`,

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: '6%',
        alignContent: 'flex-start',

        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5vh'

        // padding: '6%'
      }}
    >
      <MainMenuButton
        buttonLink={'/pictures'}
        buttonImage={undrawPhotos1}
        buttonTitle={'Pictures'}
        category={false}
      />

      <MainMenuButton
        buttonLink={'/chooseCategory'}
        buttonImage={undrawPhotos2}
        buttonTitle={'Categories'}
        category={false}
      />

      <MainMenuButton
        buttonLink={'/map'}
        buttonImage={undrawAdventure}
        buttonTitle={'Map'}
        category={false}
      />

      <MainMenuButton
        buttonLink={'/info'}
        buttonImage={undrawMyAnswer}
        buttonTitle={'Info'}
        category={false}
      />
    </Box>
  )
}
