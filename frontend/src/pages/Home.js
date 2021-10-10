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
            <img id="menuElementImgPictures" className="menu-element-img"
                src={undrawPhotos_1}
                alt="UndrawPhotos_1"
              />
            <br></br>
            <span className="menu-element-title">
               Pictures
            </span>
          </div>
        </Link>

        <Link to="/chooseCategory" className="temp">
          <div className="menu-element">
            <img id="menuElementImgCategories" className="menu-element-img"
                src={undrawPhotos_2}
                alt="UndrawMap"
              />
              <br></br>
              <span className="menu-element-title">
                Categories
              </span>
          </div>
        </Link>

        <div style={{clear: "both"}}></div>

        <Link to="/map" className="temp">
          <div className="menu-element">
            <img id="menuElementImgMap" className="menu-element-img"
                src={undrawAdventure}
                alt="undrawAdventure"
              />
            <br></br>
            <span className="menu-element-title">
              Map
            </span>
          </div>
        </Link>

        <Link to="/info" className="temp">
          <div className="menu-element">
            <img id="menuElementImgInfo" className="menu-element-img"
                src={undrawMyAnswer}
                alt="undrawMyAnswer"
              />
            <br></br>
            <span className="menu-element-title">
              Info
            </span>
          </div>
        </Link>

        <div style={{clear: "both"}}></div>

      </div>
    );
  }