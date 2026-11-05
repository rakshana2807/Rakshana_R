import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { Briefcase, Calendar, CheckCircle2, Building, Compass } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="relative py-28 overflow-hidden bg-[#030308]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Briefcase size={13} />
            <span>05 &bull; PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Industry Internship &amp; Design Practice
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on exposure to practical user interface workflows, design systems, and user-centered design methodologies.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Cinematic Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-indigo-600 opacity-40" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEffects.playHover()}
              className="relative mb-12 sm:mb-16 pl-12 sm:pl-0"
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 w-9 h-9 rounded-full bg-[#080814] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 -ml-2.5" />
              </div>

              {/* Card Container */}
              <div className="sm:w-11/12 md:w-5/6 mx-auto">
                <div className="rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-white/10 to-cyan-500/30 shadow-2xl hover:scale-[1.01] transition-transform duration-300">
                  <div className="rounded-[23px] bg-[#090918]/95 backdrop-blur-2xl p-6 sm:p-9 border border-white/10">
                    
                    {/* Header: Title, Organization & Duration */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-cyan-400 px-2.5 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-800/40">
                            {exp.role}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-black text-white tracking-wide">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-purple-300 font-medium mt-1">
                          <Building size={15} />
                          <span>{exp.organization}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 self-start sm:self-center">
                        <Calendar size={14} className="text-purple-400" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="my-6">
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Practical Work and Learnings Bullet Grid */}
                    <div>
                      <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Compass size={14} className="text-purple-400" />
                        <span>Practical Work &amp; Key Learnings</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {exp.highlights.map((item, hIdx) => (
                          <div
                            key={hIdx}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/20 transition-colors flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                          >
                            <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
