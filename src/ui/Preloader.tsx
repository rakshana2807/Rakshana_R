import React, { useEffect, useState } from 'react';
import { soundEffects } from './SoundEffects';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 65);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    soundEffects.playSelect();
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  useEffect(() => {
    if (isDone) {
      const autoTimer = setTimeout(() => {
        handleEnter();
      }, 700);
      return () => clearTimeout(autoTimer);
    }
  }, [isDone]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030306] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute w-[36rem] h-[36rem] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Main RR Monogram Badge */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          {/* Outer rotating neon rings */}
          <div className="absolute inset-0 rounded-3xl border border-purple-500/30 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-2 rounded-3xl border border-cyan-500/20 animate-[spin_8s_linear_infinite_reverse]" />
          <div className="absolute inset-0 rounded-3xl bg-purple-900/20 blur-xl" />

          {/* Monogram Box */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-[#090914]/90 border border-purple-500/40 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <span className="font-display font-extrabold text-4xl md:text-5xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-300 to-indigo-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              RR
            </span>
            <div className="absolute bottom-2 h-[2px] w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Name and Subtitle */}
        <div className="mt-8 text-center">
          <h2 className="font-display text-lg md:text-xl font-bold tracking-[0.3em] uppercase text-white/90">
            RAKSHANA R.
          </h2>
          <p className="text-xs md:text-sm font-mono text-purple-400/80 tracking-widest mt-1">
            CREATIVE VISION &bull; INTERACTIVE CODE
          </p>
        </div>

        {/* Progress Display */}
        <div className="w-56 md:w-72 mt-8">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
            <span className="tracking-wider">INITIALIZING 3D ENGINE</span>
            <span className="text-purple-300 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_#8b5cf6]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter Button if user wants to skip */}
        {isDone && (
          <button
            onClick={handleEnter}
            className="mt-6 px-6 py-2 rounded-full text-xs font-mono tracking-widest uppercase border border-purple-400/40 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 transition-all duration-300"
          >
            Enter Experience &rarr;
          </button>
        )}
      </div>

      {/* Futuristic Bottom Status */}
      <div className="absolute bottom-8 text-center font-mono text-[11px] text-slate-500 tracking-wider">
        <span>B.TECH IT &bull; UI/UX &bull; FRONTEND &bull; 3D EXPERIENCES</span>
      </div>
    </div>
  );
};
