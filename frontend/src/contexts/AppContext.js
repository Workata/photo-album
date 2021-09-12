import React, { useState } from 'react';

export const AppContext = React.createContext({
  backNavPage: '/',
  setBackNavPage: () => {},
});

export default function ContextProvider(props) {
  const [backNavPage, setBackNavPage] = useState('/');

  return (
    <AppContext.Provider
      value={{
        backNavPage,
        setBackNavPage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}