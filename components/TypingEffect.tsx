
import React, { useState, useEffect, useMemo } from 'react';
import { useSound } from '../context/SoundContext.tsx';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2000,
}) => {
  const { playSound } = useSound();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(typingSpeed);

  // Find the longest phrase to reserve space
  const longestPhrase = useMemo(() => {
    return phrases.reduce((a, b) => a.length > b.length ? a : b, "");
  }, [phrases]);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), delay);
        setTypingTimeout(deletingSpeed);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setTypingTimeout(typingSpeed);
      }
    };

    const timer = setTimeout(handleTyping, typingTimeout);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, delay, typingTimeout, playSound]);

  return (
    <span className="relative inline-flex items-center justify-center">
      {/* Ghost text reserves the width and height of the longest possible string */}
      <span className="invisible pointer-events-none select-none" aria-hidden="true">
        {longestPhrase}
      </span>
      
      {/* Actual animated text */}
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        {text}
        <span className="animate-blink inline-block ml-1 h-[0.9em] w-[2px] bg-current align-middle"></span>
      </span>
    </span>
  );
};

export default TypingEffect;
