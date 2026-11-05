import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroScene } from '../3d/HeroScene';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    soundEffects.playSelect();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* 3D Glass Sculpture Scene - Background / Right Viewport */}
      <HeroScene />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Subtitle Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#A4A4B0] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B6DFF]" />
          <span>UI/UX DESIGNER &bull; FRONTEND DEVELOPER</span>
        </div>

        {/* Name - Legible, well-proportioned, premium */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F5F5F7] mb-4">
          {PORTFOLIO_DATA.personal.name}
        </h1>

        {/* Main Headline */}
        <div className="max-w-3xl mb-6">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FAF8FF] to-[#A4A4B0] leading-snug">
            &ldquo;I DESIGN THE VISION.
            <br />
            I CODE THE EXPERIENCE.&rdquo;
          </p>
        </div>

        {/* Short Professional Introduction */}
        <p className="max-w-xl text-[#A4A4B0] text-sm sm:text-base font-light leading-relaxed mb-10">
          I transform creative ideas into immersive digital experiences. A B.Tech Information Technology student crafting thoughtful, user-centered digital products through modern frontend technologies.
        </p>

        {/* Two Elegant CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={() => scrollTo('projects')}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-white bg-[#0D0E15] hover:bg-[#151722] border border-white/15 hover:border-[#9B6DFF]/50 transition-all duration-300 shadow-sm flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowDown size={14} className="text-[#A4A4B0]" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#F5F5F7] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <span>Contact Me</span>
            <ArrowUpRight size={14} className="text-[#56BFFF]" />
          </button>
        </div>

      </div>

      {/* Minimal Scroll Down Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest text-[#A4A4B0] uppercase">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};
