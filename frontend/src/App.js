import React from 'react';
import Appbar from './components/Appbar';
import Home from './components/Home';
import ImageSlider from './components/ImageSlider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./css/App.css";

// UnauthenticatedApp

function App() {
  return (
    <Router>
      <div className="App">

        <div className="Appbar">
          <Appbar />
        </div>

        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/images/view/:year/:location" component={ImageSlider} />
          <Route exact path="/images/view/:year/:location/:imgId" component={ImageSlider} />

          <Route>
            <div>
              Insert page not found image
            </div>
          </Route>
          
        </Switch>

      </div>
    </Router>
  );
}

export default App;