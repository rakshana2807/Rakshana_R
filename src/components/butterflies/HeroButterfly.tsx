import React, { useEffect, useState } from 'react';

export const HeroButterfly: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="absolute top-1/2 right-4 sm:right-12 md:right-20 -translate-y-1/2 pointer-events-none z-0 hidden sm:block"
      style={{
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Soft Ambient Neon Glow Behind Butterfly */}
      <div className="absolute inset-0 w-64 h-64 -translate-x-1/4 -translate-y-1/4 bg-[#BF5AFF]/15 rounded-full blur-[80px] pointer-events-none animate-soft-glow" />

      {/* Floating Animated Container */}
      <div className="relative animate-subtle-float">
        <svg
          width="180"
          height="140"
          viewBox="-90 -70 180 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_24px_rgba(191,90,255,0.6)]"
        >
          <defs>
            {/* Forewing Neon Gradient */}
            <linearGradient id="heroForeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E0D36" />
              <stop offset="40%" stopColor="#6B21A8" />
              <stop offset="75%" stopColor="#BF5AFF" />
              <stop offset="100%" stopColor="#D8B4FE" />
            </linearGradient>

            {/* Hindwing Gradient */}
            <linearGradient id="heroHindGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#170A2A" />
              <stop offset="50%" stopColor="#581C87" />
              <stop offset="85%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#8B9CFF" />
            </linearGradient>

            {/* Vein Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Wing Group (Flapping with scaleX) */}
          <g className="origin-center animate-[flutter_0.36s_ease-in-out_infinite_alternate]">
            <g transform="scale(-1, 1)">
              {/* Forewing */}
              <path
                d="M 0 -8 C 24 -60, 72 -56, 84 -20 C 84 12, 48 16, 0 4 Z"
                fill="url(#heroForeGrad)"
                stroke="#D8B4FE"
                strokeWidth="1.2"
              />
              {/* Forewing Veins */}
              <path
                d="M 0 0 Q 36 -28, 72 -24 M 0 0 Q 32 -40, 56 -52 M 0 0 Q 36 -8, 68 4"
                stroke="#D8B4FE"
                strokeWidth="0.8"
                opacity="0.65"
              />
              {/* Hindwing */}
              <path
                d="M 0 2 C 32 12, 60 32, 48 60 C 36 72, 12 52, 0 22 Z"
                fill="url(#heroHindGrad)"
                stroke="#BF5AFF"
                strokeWidth="1.1"
              />
            </g>
          </g>

          {/* Right Wing Group (Flapping with scaleX) */}
          <g className="origin-center animate-[flutter_0.36s_ease-in-out_infinite_alternate]">
            <g>
              {/* Forewing */}
              <path
                d="M 0 -8 C 24 -60, 72 -56, 84 -20 C 84 12, 48 16, 0 4 Z"
                fill="url(#heroForeGrad)"
                stroke="#D8B4FE"
                strokeWidth="1.2"
              />
              {/* Forewing Veins */}
              <path
                d="M 0 0 Q 36 -28, 72 -24 M 0 0 Q 32 -40, 56 -52 M 0 0 Q 36 -8, 68 4"
                stroke="#D8B4FE"
                strokeWidth="0.8"
                opacity="0.65"
              />
              {/* Hindwing */}
              <path
                d="M 0 2 C 32 12, 60 32, 48 60 C 36 72, 12 52, 0 22 Z"
                fill="url(#heroHindGrad)"
                stroke="#BF5AFF"
                strokeWidth="1.1"
              />
            </g>
          </g>

          {/* Butterfly Sleek Body */}
          <ellipse cx="0" cy="5" rx="3.5" ry="24" fill="#140924" stroke="#BF5AFF" strokeWidth="0.8" />
          <circle cx="0" cy="-22" r="4.5" fill="#1E0D36" stroke="#D8B4FE" strokeWidth="0.7" />

          {/* Antennae */}
          <path
            d="M -1 -24 Q -10 -40, -15 -38 M 1 -24 Q 10 -40, 15 -38"
            stroke="#D8B4FE"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

