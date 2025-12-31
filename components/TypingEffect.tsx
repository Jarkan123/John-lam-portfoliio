
import React, { useState, useEffect } from 'react';
import { useSound } from '../context/SoundContext';

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
    <span className="relative">
      {text}
      <span className="animate-blink absolute right-[-2px] top-0 h-full w-[2px] bg-current"></span>
    </span>
  );
};

export default TypingEffect;
