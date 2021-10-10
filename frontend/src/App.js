import React, {useContext, useEffect, useState} from "react";
import Appbar from './components/Appbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ImageSlider from './pages/ViewImages';
import ChooseYear from './pages/ChooseYear';
import ChooseLocation from './pages/ChooseLocation';
import ChooseCategory from './pages/ChooseCategory';
import ImagesMap from './pages/ImagesMap';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./css/App.css";
import { AppContext } from './contexts/AppContext';

// UnauthenticatedApp

function App() {

  const { getTokenCookie, tokenValue, setTokenValue } = useContext(AppContext);
  
  // on app load check if token exists in cookie
  useEffect(() => {
    if (!tokenValue)
      setTokenValue(getTokenCookie('token'));
  }, []);

  return (
    // <ContextProvider> Context provider is in index
      <Router>
        <div className="App">
          
          <div className="Appbar">
            <Appbar/>
          </div>

          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
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

          <div className="Footer">
            <Footer />
          </div>

        </div>
      </Router>
  );
}

export default App;
