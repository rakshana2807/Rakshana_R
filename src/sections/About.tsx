import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { Sparkles, Terminal, Layers } from 'lucide-react';

export const About: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Tag */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles size={13} />
            <span>01 &bull; ABOUT ME</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {PORTFOLIO_DATA.about.heading}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mt-4" />
        </div>

        {/* 2-Column Grid: 3D Holographic Card & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive 3D Profile Holographic Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => soundEffects.playHover()}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md rounded-3xl p-[1.5px] bg-gradient-to-b from-purple-500/50 via-indigo-500/20 to-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group"
            >
              {/* Inner Glass Card */}
              <div className="relative rounded-[22px] bg-[#090916]/90 backdrop-blur-2xl p-7 overflow-hidden border border-white/10">
                {/* Background holographic sheen */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/30 transition-all duration-500" />
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-500" />

                {/* Top Badge & Corner Accent */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-slate-300 tracking-wider">PORTFOLIO IDENTITY</span>
                  </div>
                  <span className="font-mono text-[11px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                    STATUS 200 OK
                  </span>
                </div>

                {/* Stylized Visual Avatar / Monogram */}
                <div className="my-8 flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[2px] shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                    <div className="w-full h-full rounded-[14px] bg-[#07070f] flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-hero-glow" />
                      <span className="font-display font-black text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-indigo-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                        RR
                      </span>
                      <div className="absolute bottom-2 flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-white tracking-wide">
                    {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <p className="font-mono text-xs text-purple-300 mt-0.5">
                    UI/UX Designer &bull; Frontend Developer
                  </p>
                  <p className="font-sans text-xs text-slate-400 mt-1">
                    {PORTFOLIO_DATA.personal.location}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/10 text-left">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Degree</div>
                    <div className="text-xs font-semibold text-white">B.Tech IT (2025–29)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Specialization</div>
                    <div className="text-xs font-semibold text-white">UI/UX & Frontend</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>INTERACTIVE 3D COMPONENT</span>
                  <span className="text-cyan-400">&bull; HOVER TO TILT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content & Key Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {PORTFOLIO_DATA.about.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={idx === 0 ? "text-base sm:text-lg text-white font-medium" : "text-slate-300"}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Core Values / Strengths Callout */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-purple-300 font-semibold text-sm mb-1">
                  <Layers size={17} className="text-purple-400" />
                  <span>Aesthetic & Functional Harmony</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Balancing eye-catching visual design with clean, accessible, and intuitive user flows.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-cyan-300 font-semibold text-sm mb-1">
                  <Terminal size={17} className="text-cyan-400" />
                  <span>Clean Frontend Execution</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Translating prototypes into performant, modern, and responsive web code.
                </p>
              </div>
            </div>

            {/* Key Metrics / Highlights Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PORTFOLIO_DATA.about.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0b0b18] border border-white/10 text-center hover:border-purple-500/30 transition-colors"
                >
                  <div className="font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">{m.label}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">{m.detail}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
