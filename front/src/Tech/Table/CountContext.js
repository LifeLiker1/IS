import React, { createContext, useContext, useState } from 'react';

export const CountContext = createContext();

export function useCount() {
  return useContext(CountContext);
}

export function CountProvider({ children }) {
  const [countNotWorking, setCountNotWorking] = useState(0);

  return (
    <CountContext.Provider value={{ countNotWorking, setCountNotWorking }}>
      {children}
    </CountContext.Provider>
  );
}
