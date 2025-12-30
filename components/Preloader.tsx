
import React, { useState, useEffect, useMemo } from 'react';

const getPrimaryColorFromStorage = (): string => {
    try {
        const storedData = localStorage.getItem('john-lam-portfolio-cms');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData?.settings?.primaryColor) {
                return parsedData.settings.primaryColor;
            }
        }
    } catch (error) {
        console.error("Could not parse primary color from localStorage for Preloader", error);
    }
    return '#39ff14'; // Fallback color
};


const Preloader: React.FC<{loading: boolean}> = ({ loading }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING DATA STREAMS');
  const primaryColor = useMemo(() => getPrimaryColorFromStorage(), []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 45); // Adjusted to fit ~5s total duration
      return () => clearInterval(interval);
    }
  }, [loading]);

  useEffect(() => {
    if (progress < 33) {
      setStatusText('LOADING DATA STREAMS');
    } else if (progress < 66) {
      setStatusText('CONNECTING PERFORMANCE LAYERS');
    } else if (progress < 100) {
      setStatusText('CALIBRATING REVENUE ENGINE');
    } else {
      setStatusText('SYSTEM READY');
    }
  }, [progress]);

  return (
    <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="w-full max-w-lg text-center font-mono" style={{ color: primaryColor }}>
        <div className="text-2xl mb-8 text-glow font-bold tracking-widest">
          INITIALIZING GROWTH SYSTEM
        </div>
        <div className="w-full bg-gray-900 border border-gray-700 h-2">
          <div className="bg-current h-full transition-all duration-100" style={{ width: `${progress}%`, boxShadow: '0 0 8px currentColor' }}></div>
        </div>
        <div className="mt-4 text-sm tracking-wider">
          <span>{statusText}</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;