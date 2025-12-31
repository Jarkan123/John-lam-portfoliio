
import React, { useRef, useEffect, useState } from 'react';
import { BrandLogo } from '../types.ts';
import { useCMS } from '../context/CMSContext.tsx';
import { useSound } from '../context/SoundContext.tsx';

const LogoSlider: React.FC = () => {
    const { data } = useCMS();
    const { playSound } = useSound();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isInteracting, setIsInteracting] = useState(false);
    
    const visibleLogos = data.logos.filter(logo => logo.visible);
    const { primaryColor } = data.settings;
    
    // Triple the logos to ensure we always have enough for a smooth infinite-feeling cycle
    const loopedLogos = [...visibleLogos, ...visibleLogos, ...visibleLogos];

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider || visibleLogos.length === 0) return;

        let animationFrameId: number;
        let lastTimestamp: number;
        const pixelsPerSecond = 20; // Slightly slower for better readability of large logos

        const step = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            if (!isInteracting) {
                slider.scrollLeft += (pixelsPerSecond * deltaTime) / 1000;

                // Loop reset: if we've scrolled past the middle set, jump back one set
                const oneThirdWidth = slider.scrollWidth / 3;
                if (slider.scrollLeft >= oneThirdWidth * 2) {
                    slider.scrollLeft -= oneThirdWidth;
                } else if (slider.scrollLeft <= 0) {
                    slider.scrollLeft += oneThirdWidth;
                }
            }

            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isInteracting, visibleLogos.length]);

    const scroll = (direction: 'left' | 'right') => {
        const slider = scrollRef.current;
        if (!slider) return;
        
        playSound('click');
        // Scroll by exactly 1/3 of the container width to advance by 1 logo
        const scrollAmount = slider.clientWidth / 3; 
        slider.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    if (visibleLogos.length === 0) {
        return null;
    }

    const Logo: React.FC<{ logo: BrandLogo }> = ({ logo }) => {
        const hasLink = logo.websiteUrl && logo.websiteUrl.trim() !== '' && logo.websiteUrl !== '#';
        
        // Detect specific logos the user wants even bigger
        const isFeatured = 
            logo.name.toLowerCase().includes('s&s') || 
            logo.name.toLowerCase().includes('o2h2o');

        const logoImage = (
             <img 
                src={logo.logoUrl} 
                alt={logo.name} 
                className={`w-auto object-contain transition-all duration-700 
                    ${isFeatured ? 'max-h-28 md:max-h-48 scale-110' : 'max-h-24 md:max-h-40'}
                    ${hasLink ? 'group-hover:scale-115 group-hover:brightness-125' : 'group-hover:scale-105'}
                `}
                draggable={false}
            />
        );

        // md:w-1/3 ensures 3 logos are visible at once on desktop
        const containerClasses = `flex-shrink-0 w-full sm:w-1/2 md:w-1/3 flex items-center justify-center px-8 md:px-16 h-80 group transition-all duration-500 opacity-60 hover:opacity-100 ${hasLink ? 'cursor-pointer' : 'cursor-default'}`;

        if (hasLink) {
            return (
                <a 
                    href={logo.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={containerClasses}
                    onMouseEnter={() => playSound('hover')}
                >
                    {logoImage}
                </a>
            );
        }

        return (
            <div className={containerClasses} onMouseEnter={() => playSound('hover')}>
                {logoImage}
            </div>
        );
    };

    const NavButton = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
        <button
            onClick={onClick}
            onMouseEnter={() => playSound('hover')}
            className={`absolute top-1/2 -translate-y-1/2 z-30 p-5 transition-all duration-300 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-${primaryColor} group rounded-full active:scale-90 hidden md:block ${direction === 'left' ? 'left-10' : 'right-10'}`}
            style={{ 
                color: 'white',
                borderColor: isInteracting ? primaryColor : 'rgba(255,255,255,0.1)'
            }}
        >
            <div className="transition-transform group-hover:scale-110" style={{ color: primaryColor }}>
                {direction === 'left' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </div>
        </button>
    );

    return (
        <div 
            className="w-full relative py-20 bg-black overflow-hidden select-none group/outer"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
        >
            {/* Navigation Buttons */}
            <NavButton direction="left" onClick={() => scroll('left')} />
            <NavButton direction="right" onClick={() => scroll('right')} />

            {/* Heavy Edge Gradients for Depth */}
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black via-black/95 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black via-black/95 to-transparent z-20 pointer-events-none"></div>

            {/* Scroll Container */}
            <div 
                ref={scrollRef}
                className="flex items-center overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch' 
                }}
                onTouchStart={() => setIsInteracting(true)}
                onTouchEnd={() => setIsInteracting(false)}
            >
                {loopedLogos.map((logo, index) => (
                    <Logo key={`${logo.id}-${index}`} logo={logo} />
                ))}
            </div>
        </div>
    );
};

export default LogoSlider;
