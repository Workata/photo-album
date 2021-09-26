import Image from 'material-ui-image'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { IconButton } from '@material-ui/core';
import basicTheme from "../themes/basicTheme";
import {ThemeProvider} from '@material-ui/core';
import "../css/ImageViewer.css";
import "../css/General.css";

export default function ImageViewer(props) {

    return (
        <>
            <div id="imageViewerContainer" className="center">
                {props.imageName} <br></br>

                <div id="imageContainer">
                    <Image
                        src={props.image}
                        aspectRatio={4/3} // change aspect ratio per photo + css
                        // cover={true}
                    />
                </div>

                <ThemeProvider theme={basicTheme}>
                <div id="imageConsole">

                    <IconButton color="primary" onClick={props.prevImg}>
                    <NavigateBeforeIcon />
                    </IconButton>

                    <IconButton color="primary" onClick={props.nextImg}>
                    <NavigateNextIcon />
                    </IconButton>

                    <IconButton color="primary" onClick={null}>
                    <PlayArrowIcon />
                    </IconButton>

                    <IconButton color="primary" onClick={null}>
                    <PauseIcon />
                    </IconButton>
                    
                </div>
                </ThemeProvider>
            </div>
        </>
    );
  }