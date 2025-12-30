
import React, { useRef, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';

const MatrixBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { data } = useCMS();
    const primaryColor = data.settings.primaryColor;

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

        const fontSize = 18;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const numbers = '0123456789';
        const chars = (katakana + numbers).split('');

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = primaryColor;
            ctx.font = `${fontSize}px monospace`;
            ctx.shadowColor = primaryColor;
            ctx.shadowBlur = 10;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
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

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />;
};

export default MatrixBackground;
