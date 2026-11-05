import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroScene } from '../3d/HeroScene';
import { HeroButterfly } from '../components/butterflies/HeroButterfly';
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
      {/* Soft Purple Ambient Backdrop Lighting */}
      <HeroScene />

      {/* Majestic Purple Neon Butterfly Visual */}
      <HeroButterfly />

      {/* Hero Typography & CTA Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Professional Title Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#100B1B]/80 border border-[#BF5AFF]/25 text-[#D8B4FE] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(191,90,255,0.15)] animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AFF] shadow-[0_0_6px_#BF5AFF]" />
          <span>UI/UX DESIGNER &bull; FRONTEND DEVELOPER</span>
        </div>

        {/* Name: RAKSHANA R. */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFFFFF] mb-4 drop-shadow-[0_4px_20px_rgba(191,90,255,0.2)]">
          {PORTFOLIO_DATA.personal.name}
        </h1>

        {/* Headline: I DESIGN THE VISION. I CODE THE EXPERIENCE. */}
        <div className="max-w-3xl mb-6">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#FFFFFF] leading-snug">
            &ldquo;I DESIGN THE VISION.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8B4FE] via-[#BF5AFF] to-[#8B9CFF] neon-text-purple">
              I CODE THE EXPERIENCE.&rdquo;
            </span>
          </p>
        </div>

        {/* Supporting text */}
        <p className="max-w-xl text-[#B8AEC7] text-sm sm:text-base font-light leading-relaxed mb-10">
          I transform creative ideas into immersive digital experiences. A B.Tech Information Technology student crafting thoughtful, user-centered digital products through modern frontend technologies.
        </p>

        {/* Two Minimal CTA Buttons with Soft Purple Neon Hover */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('projects')}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#FFFFFF] bg-[#160F25] hover:bg-[#1E1533] border border-[#BF5AFF]/35 hover:border-[#BF5AFF] neon-glow-btn flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowDown size={14} className="text-[#D8B4FE]" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#FFFFFF] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#BF5AFF]/50 transition-all duration-300 flex items-center gap-2"
          >
            <span>Contact Me</span>
            <ArrowUpRight size={14} className="text-[#8B9CFF]" />
          </button>
        </div>

      </div>

      {/* Minimal Scroll Down Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-90 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest text-[#B8AEC7] uppercase">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#BF5AFF]/60 to-transparent" />
      </div>
    </section>
  );
};
