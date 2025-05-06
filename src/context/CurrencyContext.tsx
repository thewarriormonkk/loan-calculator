import React, { createContext, useState, useContext, type ReactNode } from 'react';

interface CurrencyContextProps {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('USD');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};