
import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext.tsx';
import { useSound } from '../context/SoundContext.tsx';

const TestimonialSlider: React.FC = () => {
  const { data } = useCMS();
  const { playSound } = useSound();
  const { primaryColor } = data.settings;
  const textTestimonials = data.textTestimonials.filter(t => t.visible);
  const videoTestimonials = data.videoTestimonials.filter(t => t.visible);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const itemsPerTextView = 2;

  const nextText = () => {
    playSound('click');
    setCurrentTextIndex(prev => (prev + itemsPerTextView) % textTestimonials.length);
  };
  const prevText = () => {
    playSound('click');
    setCurrentTextIndex(prev => (prev - itemsPerTextView + textTestimonials.length) % textTestimonials.length);
  };
  const nextVideo = () => {
    playSound('click');
    setCurrentVideoIndex(prev => (prev + 1) % videoTestimonials.length);
  };
  const prevVideo = () => {
    playSound('click');
    setCurrentVideoIndex(prev => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  };
  
  const ControlButton = ({ onClick, direction }: { onClick: () => void, direction: 'left' | 'right' }) => (
    <button 
      onClick={onClick} 
      onMouseEnter={() => playSound('hover')}
      className="p-2 border border-current rounded-full hover:bg-current hover:text-black transition-colors" 
      style={{ color: primaryColor }}
    >
      {direction === 'left' ? 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> :
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      }
    </button>
  );

  return (
    <div className="space-y-16">
      {/* Text Testimonials */}
      {textTestimonials.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-mono" style={{ color: primaryColor }}>// What_My_Clients_Say</h3>
            {textTestimonials.length > itemsPerTextView && (
              <div className="flex space-x-3">
                <ControlButton onClick={prevText} direction="left" />
                <ControlButton onClick={nextText} direction="right" />
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {textTestimonials.slice(currentTextIndex, currentTextIndex + itemsPerTextView).map(t => (
              <div 
                key={t.id} 
                className="card-border p-6 flex flex-col h-full"
                onMouseEnter={() => playSound('hover')}
              >
                <blockquote className="text-gray-300 italic flex-grow">"{t.text}"</blockquote>
                <footer className="mt-6 font-mono">
                  <p className="font-bold text-white">{t.author}</p>
                  <p className="text-sm" style={{ color: primaryColor }}>{t.company}</p>
                </footer>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Testimonials */}
      {videoTestimonials.length > 0 && (
        <div>
           <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-mono" style={{ color: primaryColor }}>// Video_Testimonials</h3>
            {videoTestimonials.length > 1 && (
                <div className="flex space-x-3">
                    <ControlButton onClick={prevVideo} direction="left" />
                    <ControlButton onClick={nextVideo} direction="right" />
                </div>
            )}
          </div>
          <div className="relative">
             <div className="card-border p-2">
                <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                        src={videoTestimonials[currentVideoIndex].videoUrl} 
                        title={videoTestimonials[currentVideoIndex].author}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full min-h-[400px]"
                    ></iframe>
                </div>
            </div>
            <footer className="mt-4 font-mono text-right">
                <p className="font-bold text-white">{videoTestimonials[currentVideoIndex].author}</p>
                <p className="text-sm" style={{ color: primaryColor }}>{videoTestimonials[currentVideoIndex].company}</p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;