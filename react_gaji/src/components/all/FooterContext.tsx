import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FooterContextProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);

interface FooterProviderProps {
  children: ReactNode;
}

export const FooterProvider: React.FC<FooterProviderProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <FooterContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};