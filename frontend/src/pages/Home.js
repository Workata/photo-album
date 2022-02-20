// * material UI
import {
  Box,
} from '@mui/material';

// * components
import MainMenuButton from '../components/MainMenuButton';

// * images
import backgroundImage from '../images/footer_lodyas.png';
import undrawPhotos_1 from '../images/undrawPhotos_1.svg';
import undrawPhotos_2 from '../images/undrawPhotos_2.svg';
import undrawAdventure from '../images/undrawAdventure.svg';
import undrawMyAnswer from '../images/undrawMyAnswer.svg';

export default function Home() {

  return (
    <Box
      sx={{
        width: "700px",
        height: "700px",
        borderStyle: "solid",
        borderColor: "white",
        borderRadius: "5%",
        backgroundImage: `url(${backgroundImage})`,

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start"
      }}
    >
      <MainMenuButton
        buttonLink={"/years"}
        buttonImage={undrawPhotos_1}
        buttonTitle={"Pictures"}
      />

      <MainMenuButton
        buttonLink={"/chooseCategory"}
        buttonImage={undrawPhotos_2}
        buttonTitle={"Categories"}
      />

      <MainMenuButton
        buttonLink={"/map"}
        buttonImage={undrawAdventure}
        buttonTitle={"Map"}
      />

      <MainMenuButton
        buttonLink={"/info"}
        buttonImage={undrawMyAnswer}
        buttonTitle={"Info"}
      />
    </Box>
  );
}