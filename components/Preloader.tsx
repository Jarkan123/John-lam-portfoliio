
import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext.tsx';
import { useSound } from '../context/SoundContext.tsx';

const Preloader: React.FC<{loading: boolean}> = ({ loading }) => {
  const { data } = useCMS();
  const { playSound } = useSound();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING DATA STREAMS');
  const primaryColor = data.settings.primaryColor;

  // Handle Progress Bar
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
      }, 45);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Handle Status Text and Processing Sound
  useEffect(() => {
    let nextStatus = '';
    if (progress < 33) {
      nextStatus = 'LOADING DATA STREAMS';
    } else if (progress < 66) {
      nextStatus = 'CONNECTING PERFORMANCE LAYERS';
    } else if (progress < 100) {
      nextStatus = 'CALIBRATING REVENUE ENGINE';
    } else {
      nextStatus = 'SYSTEM READY';
    }

    if (nextStatus !== statusText) {
      setStatusText(nextStatus);
      playSound('processing');
    }
  }, [progress, statusText, playSound]);

  // Play startup sound on completion
  useEffect(() => {
    if (progress === 100) {
        playSound('startup');
    }
  }, [progress, playSound]);

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
