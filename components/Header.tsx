
import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { useSound } from '../context/SoundContext';

const Header: React.FC = () => {
  const { data } = useCMS();
  const { isMuted, toggleMute, playSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const primaryColor = data.settings.primaryColor;

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors font-mono ${
      isActive
        ? `text-black`
        : 'text-gray-300 hover:text-white'
    }`;

  const handleLinkClick = () => {
    playSound('click');
    setIsOpen(false);
  };

  const handleLinkHover = () => {
    playSound('hover');
  };

  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-4">
            <RouterNavLink 
              to="/" 
              className="text-white font-bold text-xl font-mono" 
              style={{ color: primaryColor }}
              onMouseEnter={handleLinkHover}
              onClick={handleLinkClick}
            >
              JOHN LAM<span className="text-white">_</span>
            </RouterNavLink>
            
            {/* Audio Toggle */}
            <button 
              onClick={toggleMute}
              onMouseEnter={handleLinkHover}
              className="p-2 transition-transform active:scale-95"
              style={{ color: isMuted ? '#666' : primaryColor }}
              title={isMuted ? "Enable Growth System Audio" : "Disable Audio"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {data.navLinks.map((link) => (
                <RouterNavLink 
                  key={link.id} 
                  to={link.path} 
                  className={navLinkClasses}
                  onMouseEnter={handleLinkHover}
                  onClick={handleLinkClick}
                  style={({ isActive }) => ({
                      backgroundColor: isActive ? primaryColor : 'transparent',
                  })}
                >
                  {link.label}
                </RouterNavLink>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                playSound('click');
              }}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {data.navLinks.map((link) => (
              <RouterNavLink
                key={link.id}
                to={link.path}
                className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium font-mono ${isActive ? 'text-black' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? primaryColor : 'transparent',
                })}
                onMouseEnter={handleLinkHover}
                onClick={handleLinkClick}
              >
                {link.label}
              </RouterNavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
