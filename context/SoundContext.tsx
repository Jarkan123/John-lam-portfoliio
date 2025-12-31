
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: 'hover' | 'click' | 'transition' | 'processing' | 'startup') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUNDS = {
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  transition: 'https://assets.mixkit.co/active_storage/sfx/2561/2561-preview.mp3', // Futuristic cyber sweep
  processing: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  startup: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with audio enabled by default
  const [isMuted, setIsMuted] = useState(false);
  const audioCache = useRef<{ [key: string]: HTMLAudioElement }>({});
  const hasUnlocked = useRef(false);

  useEffect(() => {
    // Preload sounds
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioCache.current[key] = audio;
    });

    // Global listener to unlock audio on first interaction if the browser blocks autoplay
    const unlockAudio = () => {
      if (hasUnlocked.current) return;
      
      // Play a tiny silent buffer to unlock the audio context
      const silentAudio = new Audio();
      silentAudio.play().then(() => {
        hasUnlocked.current = true;
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      }).catch(() => {
        // Still blocked, wait for next interaction
      });
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  const playSound = (type: 'hover' | 'click' | 'transition' | 'processing' | 'startup') => {
    if (isMuted) return;
    
    const audio = audioCache.current[type];
    if (audio) {
      // Clone for overlapping sounds
      const playInstance = audio.cloneNode() as HTMLAudioElement;
      // Tweaked volumes for a more professional tech feel
      if (type === 'hover') playInstance.volume = 0.08;
      else if (type === 'processing') playInstance.volume = 0.1;
      else if (type === 'transition') playInstance.volume = 0.3;
      else playInstance.volume = 0.2;

      playInstance.play().catch(() => {
        // Handle browser block gracefully if user hasn't interacted yet
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
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
