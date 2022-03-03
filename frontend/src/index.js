import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import ContextProvider from './contexts/AppContext'

// * import thmeme provider with main theme
import mainTheme from './themes/mainTheme'
import { ThemeProvider } from '@mui/material/styles'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
