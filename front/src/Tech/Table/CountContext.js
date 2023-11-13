import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

export const CountProvider = ({ children }) => {
  const [countNotWorking] = useState(0);

  return (
    <CountContext.Provider value={{ countNotWorking}}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  console.log(context)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};
