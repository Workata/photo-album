import {Link} from 'react-router-dom';
import "../css/General.css";
import "../css/Home.css";
import undrawPhotos_1 from '../images/undrawPhotos_1.svg';
import undrawPhotos_2 from '../images/undrawPhotos_2.svg';
import undrawAdventure from '../images/undrawAdventure.svg';
import undrawMyAnswer from '../images/undrawMyAnswer.svg';

export default function Home() {

    return (
      <div id="menuContainer" className="center">

        <Link to="/years" className="temp">
          <div className="menu-element">
            <img className="menu-element-img"
                src={undrawPhotos_1}
                alt="UndrawPhotos_1"
                // className={classes.homepage__undraw}
              />
          </div>
        </Link>

        <Link to="/chooseCategory" className="temp">
          <div className="menu-element">
            <img className="menu-element-img"
                src={undrawPhotos_2}
                alt="UndrawMap"
                // className={classes.homepage__undraw}
              />
          </div>
        </Link>

        <div style={{clear: "both"}}></div>

        <Link to="/map" className="temp">
          <div className="menu-element">
            <img className="menu-element-img"
                src={undrawAdventure}
                alt="UndrawPhotos_1"
                // className={classes.homepage__undraw}
              />
          </div>
        </Link>

        <Link to="/info" className="temp">
          <div className="menu-element">
            <img className="menu-element-img"
                src={undrawMyAnswer}
                alt="UndrawMap"
                // className={classes.homepage__undraw}
              />
          </div>
        </Link>

        <div style={{clear: "both"}}></div>

      </div>
    );
  }