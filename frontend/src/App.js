// * material UI
import {
  Box
} from '@mui/material'

import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// * components
import Appbar from './components/Appbar'
import Footer from './components/Footer'

// * pages
import Home from './pages/Home'
import ViewImages from './pages/ViewImages'
import ChooseYear from './pages/ChooseYear'
import ChooseLocation from './pages/ChooseLocation'
import ChooseCategory from './pages/ChooseCategory'
import ImagesMap from './pages/ImagesMap'
import Login from './pages/Login'
import Info from './pages/Info'
import PageNotFound from './pages/PageNotFound'

import { AppContext } from './contexts/AppContext'

function App () {
  const { getTokenCookie, tokenValue, setTokenValue } = useContext(AppContext)

  // on app load check if token exists in cookie
  useEffect(() => {
    if (!tokenValue) { setTokenValue(getTokenCookie('token')) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>

      <Box
        id="appWraper"
        sx={{
          textAlign: 'center',
          color: 'white',
          height: '100%',

          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <Appbar />

        <Box
          id="switchWrapper"
          sx={{
            width: '100%',
            height: 'auto',

            // * gap between appbar and footer
            paddingTop: '20px',
            paddingBottom: '20px',

            // * center content
            marginTop: 'auto',
            marginBottom: 'auto',

            display: 'flex',
            flexFlow: 'column'
          }}
        >
          <Box
            sx={{
              margin: 'auto'
              // paddingBottom: "50px"
            }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/info" component={Info} />
              <Route exact path="/chooseCategory" component={ChooseCategory} />
              <Route exact path="/map" component={ImagesMap} />

              <Route exact path="/pictures" component={ChooseYear} />
              <Route exact path="/pictures/:year" component={ChooseLocation} />
              <Route exact path="/pictures/:year/:location" component={ViewImages} />
              <Route exact path="/pictures/:year/:location/:imgId" component={ViewImages} />

              <Route>
                <PageNotFound/>
              </Route>

            </Switch>

          </Box>
        </Box>

        <Footer />

      </Box>
    </Router>
  )
}

export default App
