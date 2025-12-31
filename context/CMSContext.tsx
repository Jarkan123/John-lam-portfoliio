
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { CMSData } from '../types.ts';
import { INITIAL_CMS_DATA } from '../constants.ts';

interface CMSContextType {
  data: CMSData;
  setData: React.Dispatch<React.SetStateAction<CMSData>>;
  updateData: (newData: Partial<CMSData>) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const CMS_STORAGE_KEY = 'john-lam-portfolio-cms';

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CMSData>(() => {
    try {
      const storedData = localStorage.getItem(CMS_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : INITIAL_CMS_DATA;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return INITIAL_CMS_DATA;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [data]);

  const updateData = (newData: Partial<CMSData>) => {
    setData(prevData => ({...prevData, ...newData}));
  };
  
  const value = { data, setData, updateData };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};