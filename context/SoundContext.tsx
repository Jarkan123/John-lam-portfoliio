
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: 'hover' | 'click' | 'transition') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUNDS = {
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  transition: 'https://assets.mixkit.co/active_storage/sfx/2559/2559-preview.mp3',
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCache = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Preload sounds
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioCache.current[key] = audio;
    });
  }, []);

  const playSound = (type: 'hover' | 'click' | 'transition') => {
    if (isMuted) return;
    
    const audio = audioCache.current[type];
    if (audio) {
      // Clone for overlapping sounds
      const playInstance = audio.cloneNode() as HTMLAudioElement;
      playInstance.volume = type === 'hover' ? 0.1 : 0.2;
      playInstance.play().catch(() => {
        // Handle browser block gracefully
      });
    }
  };

  const toggleMute = () => {
    // Attempt to resume audio context or play a silent sound to "unlock" audio
    if (isMuted) {
      const unlockAudio = new Audio();
      unlockAudio.play().catch(() => {});
    }
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within SoundProvider');
  return context;
};
