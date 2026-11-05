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
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#080610] transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Minimal Monogram with Butterfly Glow */}
        <div className="font-display text-4xl font-light tracking-[0.2em] text-[#FFFFFF] drop-shadow-[0_0_15px_rgba(191,90,255,0.6)] mb-2">
          RR
        </div>

        <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D8B4FE] mt-1 mb-10">
          RAKSHANA R.
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[1.5px] bg-white/[0.08] relative overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#A855F7] via-[#BF5AFF] to-[#D8B4FE] shadow-[0_0_8px_#BF5AFF] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Value */}
        <span className="font-mono text-[11px] text-[#B8AEC7]/70 tracking-widest mt-3">
          {progress}%
        </span>
      </div>
    </div>
  );
};
