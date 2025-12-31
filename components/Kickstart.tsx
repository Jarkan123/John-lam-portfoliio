
import React, { useEffect, useState, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import { useSound } from '../context/SoundContext';

const MatrixEffect = ({ primaryColor }: { primaryColor: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1);
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = primaryColor;
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(draw);
        };
        
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [primaryColor]);

    return <canvas ref={canvasRef} className="absolute inset-0" />;
};

const Kickstart: React.FC = () => {
    const { data } = useCMS();
    const { isMuted, toggleMute, playSound } = useSound();
    const [isVisible, setIsVisible] = useState(false);
    const [isEffectActive, setIsEffectActive] = useState(false);
    
    const triggerKickstart = () => {
        // Unlock audio on first interaction if muted
        if (isMuted) {
            toggleMute();
        }

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            playSound('transition');
            setIsEffectActive(true);
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                setIsEffectActive(false);
            }, 1200);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 4000); 
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !e.repeat) {
                e.preventDefault();
                triggerKickstart();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMuted]);

    const SpaceIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8 inline-block mx-1 border border-current rounded" viewBox="0 0 32 20">
            <rect x="4" y="14" width="24" height="2" fill="currentColor"/>
        </svg>
    );

    return (
        <>
            <div className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div 
                    className="p-3 rounded font-mono text-sm border cursor-pointer group" 
                    style={{color: data.settings.primaryColor, borderColor: data.settings.primaryColor, backgroundColor: 'rgba(0,0,0,0.8)'}}
                    onClick={triggerKickstart}
                    onMouseEnter={() => playSound('hover')}
                >
                    <span className="hidden md:inline">Press <SpaceIcon/> to kickstart</span>
                    <span className="md:hidden">Click here to kickstart</span>
                </div>
            </div>
            <div className={`kickstart-overlay ${isEffectActive ? 'active' : ''}`} style={{pointerEvents: isEffectActive ? 'auto' : 'none'}}>
               {isEffectActive && (
                 <>
                    <MatrixEffect primaryColor={data.settings.primaryColor} />
                    <div className="scanline"></div>
                 </>
               )}
            </div>
        </>
    );
};

export default Kickstart;
