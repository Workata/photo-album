// * material UI
import {
	Box,
} from '@mui/material';

// * components
import MainMenuButton from '../components/MainMenuButton';

// * others
import "../css/General.css";

// * images
import backgroundImage from '../images/footer_lodyas.png';
import undrawLandscapeMode from '../images/undrawLandscapeMode.svg';
import undrawOffRoad from '../images/undrawOffRoad.svg';
import undrawGardening from '../images/undrawGardening.svg';
import undrawMusicBird from '../images/undrawMusicBird.svg';
import undrawPlayfulCat from '../images/undrawPlayfulCat.svg';

export default function ChooseCategory() {

	return (
		<Box
			sx={{
				width: "1050px",
				height: "660px",
				borderStyle: "solid",
				borderColor: "white",
				borderRadius: "5%",
				backgroundImage: `url(${backgroundImage})`,
				

				display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
				justifyContent: "space-evenly",

				padding: "20px"
			}}
		>

			<MainMenuButton
				buttonLink={"/categories/landscape"}
				buttonImage={undrawLandscapeMode}
				buttonTitle={"Landscape"}
			/>

			<MainMenuButton
				buttonLink={"/categories/cars"}
				buttonImage={undrawOffRoad}
				buttonTitle={"Cars"}
			/>

			<MainMenuButton
				buttonLink={"/categories/flora"}
				buttonImage={undrawGardening}
				buttonTitle={"Flora"}
			/>

			<MainMenuButton
				buttonLink={"/categories/birds"}
				buttonImage={undrawMusicBird}
				buttonTitle={"Birds"}
			/>

			<MainMenuButton
				buttonLink={"/categories/wildlife"}
				buttonImage={undrawPlayfulCat}
				buttonTitle={"Wildlife"}
			/>

		</Box>
	);
}