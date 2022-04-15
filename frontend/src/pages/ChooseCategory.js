// * material UI
import {
  Box
} from '@mui/material'

// * components
import MainMenuButton from '../components/MainMenuButton'

// * others
import '../css/General.css'

// * images
import backgroundImage from '../images/footer_lodyas.png'
import undrawLandscapeMode from '../images/undrawLandscapeMode.svg'
import undrawOffRoad from '../images/undrawOffRoad.svg'
import undrawGardening from '../images/undrawGardening.svg'
import undrawMusicBird from '../images/undrawMusicBird.svg'
import undrawPlayfulCat from '../images/undrawPlayfulCat.svg'

import React from 'react'

export default function ChooseCategory () {
  return (
    <Box
      sx={{
        width: '70vw',
        height: '70vh',
        borderStyle: 'solid',
        borderColor: 'white',
        borderRadius: '5%',
        backgroundImage: `url(${backgroundImage})`,

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'space-evenly',

        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5vh',
        paddingBottom: '5vh'
      }}
    >

      <MainMenuButton
        buttonLink={'/thumbnails/categories/landscape'}
        buttonImage={undrawLandscapeMode}
        buttonTitle={'Landscape'}
        category={true}
      />

      <MainMenuButton
        buttonLink={'/thumbnails/categories/cars'}
        buttonImage={undrawOffRoad}
        buttonTitle={'Cars'}
        category={true}
      />

      <MainMenuButton
        buttonLink={'/thumbnails/categories/flora'}
        buttonImage={undrawGardening}
        buttonTitle={'Flora'}
        category={true}
      />

      <MainMenuButton
        buttonLink={'/thumbnails/categories/birds'}
        buttonImage={undrawMusicBird}
        buttonTitle={'Birds'}
        category={true}
      />

      <MainMenuButton
        buttonLink={'/thumbnails/categories/wildlife'}
        buttonImage={undrawPlayfulCat}
        buttonTitle={'Wildlife'}
        category={true}
      />

    </Box>
  )
}
