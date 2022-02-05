import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
// import reportWebVitals from './others/reportWebVitals';
import ContextProvider from './contexts/AppContext';
// * import thmeme provider with main theme 
import mainTheme from "./themes/mainTheme";
import { ThemeProvider } from '@mui/material/styles';


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

