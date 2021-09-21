import React, { useState } from 'react';

export const AppContext = React.createContext({
  backNavPage: '/',
  setBackNavPage: () => {},

  setTokenCookie: () => {},
  getTokenCookie: () => {},
  deleteTokenCookie: () => {},
});

export default function ContextProvider(props) {
  const [backNavPage, setBackNavPage] = useState('/');

  const setTokenCookie = (name, value, minutes, path = '/') => {
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() + minutes);
    const expires = dt.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=${path}`;
  };
  
  const getTokenCookie = (name) =>
    document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  
  const deleteTokenCookie = (name, path) => {
    setTokenCookie(name, '', -1, path);
  };

  return (
    <AppContext.Provider
      value={{
        backNavPage,
        setBackNavPage,
        setTokenCookie,
        deleteTokenCookie,
        getTokenCookie
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}