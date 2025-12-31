
import React from 'react';
import { BrandLogo } from '../types';
import { useCMS } from '../context/CMSContext';

const LogoSlider: React.FC = () => {
    const { data } = useCMS();
    const visibleLogos = data.logos.filter(logo => logo.visible);
    const { primaryColor } = data.settings;
    
    if (visibleLogos.length === 0) {
        return null;
    }

    // Duplicate logos to create a seamless loop
    const extendedLogos = [...visibleLogos, ...visibleLogos];
    const animationDuration = `${data.settings.sliderSpeed}s`;

    const Logo: React.FC<{ logo: BrandLogo }> = ({ logo }) => {
        const hasLink = logo.websiteUrl && logo.websiteUrl !== '#';
        
        // Define dynamic hover style
        const hoverStyle = hasLink ? {
            filter: 'grayscale(0)',
            dropShadow: `0 0 8px ${primaryColor}`
        } : {};

        const logoImage = (
             <img 
                src={logo.logoUrl} 
                alt={logo.name} 
                className={`max-h-full max-w-[70%] object-contain grayscale transition-all duration-300 ${hasLink ? 'group-hover:grayscale-0 group-hover:scale-110' : ''}`}
            />
        );

        if (hasLink) {
            return (
                <a 
                    href={logo.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-shrink-0 flex items-center justify-center h-24 group" 
                    style={{ width: `${100 / (extendedLogos.length / 2)}%` } as React.CSSProperties}
                >
                    {logoImage}
                </a>
            );
        }

        return (
            <div className="flex-shrink-0 flex items-center justify-center h-24" style={{ width: `${100 / (extendedLogos.length / 2)}%`}}>
                {logoImage}
            </div>
        );
    };

    return (
        <div className="w-full overflow-hidden relative py-12 bg-black">
             <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10"></div>
             <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10"></div>
            <div 
                className="flex items-center"
                style={{ 
                    width: `${extendedLogos.length * 20}%`,
                    animation: `slide ${animationDuration} linear infinite`,
                }}
            >
                {extendedLogos.map((logo, index) => (
                    <Logo key={`${logo.id}-${index}`} logo={logo} />
                ))}
            </div>
        </div>
    );
};
export default LogoSlider;
