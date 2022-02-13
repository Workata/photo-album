import React, {useContext, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// * components
import Appbar from './components/Appbar';
import Footer from './components/Footer';

// * pages
import Home from './pages/Home';
import ImageSlider from './pages/ViewImages';
import ChooseYear from './pages/ChooseYear';
import ChooseLocation from './pages/ChooseLocation';
import ChooseCategory from './pages/ChooseCategory';
import ImagesMap from './pages/ImagesMap';
import Login from './pages/Login';
import Info from './pages/Info';

// * html tags in head part - title of page
// Helmet not needed, changes in public/index.html
// import {Helmet} from "react-helmet";

import "./css/App.css";
import { AppContext } from './contexts/AppContext';

// UnauthenticatedApp

function App() {

  const { getTokenCookie, tokenValue, setTokenValue } = useContext(AppContext);
  
  // on app load check if token exists in cookie
  useEffect(() => {
    if (!tokenValue)
      setTokenValue(getTokenCookie('token'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <Router>

        <div className="App">
          
          <Appbar/>

          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/info" component={Info} />
            <Route exact path="/chooseCategory" component={ChooseCategory} />
            <Route exact path="/map" component={ImagesMap} />
            <Route exact path="/:year/:location" component={ImageSlider} />
            <Route exact path="/:year/:location/:imgId" component={ImageSlider} />
            <Route exact path="/years" component={ChooseYear} />
            <Route exact path="/:year" component={ChooseLocation} />
            

            <Route>
              <div>
                Insert page not found image
              </div>
            </Route>
            
          </Switch>

          <Footer />

        </div>
      </Router>
  );
}

export default App;
