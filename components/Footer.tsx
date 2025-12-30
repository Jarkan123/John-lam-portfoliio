
import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

const Footer: React.FC = () => {
    const { data } = useCMS();
  return (
    <footer className="bg-black border-t border-gray-900 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-500 font-mono text-sm">&copy; {new Date().getFullYear()} John Lam. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0 font-mono">
            {data.navLinks.map(link => (
                <Link key={link.id} to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">{link.label}</Link>
            ))}
            <Link to="/admin" style={{color: data.settings.primaryColor}} className="font-semibold hover:opacity-80 transition-opacity text-sm">
              [Admin Login]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
