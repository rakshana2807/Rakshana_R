import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HeroScene } from '../3d/HeroScene';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowDownRight, Sparkles, Send, Download, Code2, Palette, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = PORTFOLIO_DATA.personal.titles;

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollToSection = (id: string) => {
    soundEffects.playSelect();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <HeroScene />

      {/* Atmospheric depth gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030306]/60 to-[#030306] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-wider mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.2)] animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
          <span>{PORTFOLIO_DATA.personal.statusBadge}</span>
        </div>

        {/* Name with Cinematic Typography */}
        <div className="mb-2">
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-cyan-400 uppercase font-semibold block mb-2">
            PORTFOLIO OF
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-none">
            <span className="block drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </h1>
        </div>

        {/* Animated Rotating Professional Titles */}
        <div className="h-10 sm:h-12 flex items-center justify-center my-3">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="text-sm sm:text-base md:text-lg font-mono font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
              {titles[titleIndex]}
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className="my-6 max-w-4xl">
          <p className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200 leading-tight">
            &ldquo;I DESIGN THE VISION.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
              I CODE THE EXPERIENCE.&rdquo;
            </span>
          </p>
        </div>

        {/* Supporting Introductions */}
        <div className="max-w-2xl mx-auto space-y-3 mb-10 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-purple-200 text-base sm:text-lg">
            {PORTFOLIO_DATA.personal.supportingSubheadline}
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {PORTFOLIO_DATA.personal.introParagraph}
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full max-w-xl">
          {/* Explore My Work CTA */}
          <button
            onClick={() => scrollToSection('projects')}
            onMouseEnter={() => soundEffects.playHover()}
            className="group relative px-6 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 flex items-center gap-2"
          >
            <span>Explore My Work</span>
            <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Let's Connect CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 sm:px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-slate-200 bg-[#0d0d1a]/80 hover:bg-[#151528] border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-md flex items-center gap-2 hover:scale-105 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <Send size={15} className="text-cyan-400" />
            <span>Let&apos;s Connect</span>
          </button>

          {/* Download Resume CTA */}
          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenResume();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-5 sm:px-6 py-3.5 rounded-full font-mono text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md flex items-center gap-2 hover:scale-105"
          >
            <Download size={14} className="text-purple-400" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-14 pt-8 border-t border-white/10 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Palette size={16} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">DISCIPLINE</div>
              <div className="text-xs font-bold text-white">UI/UX Design</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Code2 size={16} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">ENGINEERING</div>
              <div className="text-xs font-bold text-white">Frontend Web</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">CREDENTIALS</div>
              <div className="text-xs font-bold text-white">NPTEL Top 5%</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400">ACADEMICS</div>
              <div className="text-xs font-bold text-white">B.Tech IT (BIT)</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none opacity-60">
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Scroll to explore</span>
        <div className="w-4 h-7 rounded-full border border-slate-500/50 flex justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
