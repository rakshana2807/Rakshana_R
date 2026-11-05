import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const inc = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + inc, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#08090D] transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Minimal Monogram */}
        <div className="font-display text-4xl font-light tracking-[0.2em] text-[#F5F5F7] mb-2">
          RR
        </div>

        <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#A4A4B0] mt-1 mb-10">
          RAKSHANA R.
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[1px] bg-white/[0.08] relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#9B6DFF] to-[#56BFFF] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Value */}
        <span className="font-mono text-[11px] text-[#A4A4B0]/70 tracking-widest mt-3">
          {progress}%
        </span>
      </div>
    </div>
  );
};
