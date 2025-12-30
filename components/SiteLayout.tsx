
import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useCMS } from '../context/CMSContext';

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { data } = useCMS();
  const primaryColor = data.settings.primaryColor;

  // This effect injects the primary color from the CMS into a global CSS variable.
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;