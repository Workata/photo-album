import {Link} from 'react-router-dom';
import "../css/General.css";
import "../css/ChooseCategory.css";
import undrawLandscapeMode from '../images/undrawLandscapeMode.svg';
import undrawOffRoad from '../images/undrawOffRoad.svg';
import undrawGardening from '../images/undrawGardening.svg';
import undrawMusicBird from '../images/undrawMusicBird.svg';
import undrawPlayfulCat from '../images/undrawPlayfulCat.svg';

export default function ChooseCategory() {

    // TODO change menu items for components
    return (
        <>
        <div id="chooseCategoryMenuContainer" className="center">

            <Link to="/categories/landscape" className="temp">
                <div className="category-menu-element">
                    <img id="menuElementImgLandscape" className="category-menu-element-img"
                        src={undrawLandscapeMode}
                        alt="undrawLandscapeMode"
                    />
                    <br></br>
                    <span className="category-menu-element-title">
                        Landscape
                    </span>
                </div>
            </Link>

            <Link to="/categories/cars" className="temp">
                <div className="category-menu-element">
                    <img id="menuElementImgCars" className="category-menu-element-img"
                        src={undrawOffRoad}
                        alt="undrawOffRoad"
                    />
                    <br></br>
                    <span className="category-menu-element-title">
                        Cars
                    </span>
                </div>
            </Link>

            <Link to="/categories/flora" className="temp">
                <div className="category-menu-element">
                    <img id="menuElementImgFlora" className="category-menu-element-img"
                        src={undrawGardening}
                        alt="undrawGardening"
                    />
                    <br></br>
                    <span className="category-menu-element-title">
                        Flora
                    </span>
                </div>
            </Link>

            <div style={{clear: "both"}}></div>

            <Link to="/categories/birds" className="temp">
                <div id="menuElementBird" className="category-menu-element">
                    <img id="menuElementImgBird" className="category-menu-element-img"
                        src={undrawMusicBird}
                        alt="undrawMusicBird"
                    />
                    <br></br>
                    <span className="category-menu-element-title">
                        Birds
                    </span>
                </div>
            </Link>

            <Link to="/categories/wildlife" className="temp">
                <div className="category-menu-element">
                    <img id="menuElementImgWildlife" className="category-menu-element-img"
                        src={undrawPlayfulCat}
                        alt="undrawPlayfulCat"
                    />
                    <br></br>
                    <span className="category-menu-element-title">
                        Wildlife
                    </span>
                </div>
            </Link>

            <div style={{clear: "both"}}></div>

        </div>
      </>
    );
  }