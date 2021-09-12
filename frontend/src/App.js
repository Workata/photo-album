import React from 'react';
import Appbar from './components/Appbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ImageSlider from './pages/ImageSlider';
import ChooseYear from './pages/ChooseYear';
import ChooseLocation from './pages/ChooseLocation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./css/App.css";
import ContextProvider from './contexts/AppContext';

// UnauthenticatedApp

function App() {
  

  return (
    <ContextProvider>
      <Router>
        <div className="App">
          
          <div className="Appbar">
            <Appbar/>
          </div>

          <Switch>

            <Route exact path="/" component={Home} />
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
    </ContextProvider>
  );
}

export default App;
