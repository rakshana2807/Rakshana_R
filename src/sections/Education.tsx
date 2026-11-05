import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { GraduationCap, MapPin, Calendar, BookOpen, Sparkles } from 'lucide-react';

export const Education: React.FC = () => {
  const educationList = PORTFOLIO_DATA.education;

  return (
    <section id="education" className="relative py-28 overflow-hidden bg-[#04040a]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-indigo-700/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 font-mono text-xs uppercase tracking-widest mb-3">
            <GraduationCap size={13} />
            <span>06 &bull; ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; Engineering Rigor
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Building strong analytical problem-solving capabilities, algorithmic reasoning, and computer science fundamentals.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Education Highlight Card */}
        <div className="max-w-4xl mx-auto">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEffects.playHover()}
              className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-indigo-500/20 to-cyan-500/30 shadow-2xl hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="rounded-[23px] bg-[#090918]/95 backdrop-blur-2xl p-6 sm:p-9 border border-white/10">
                
                {/* Header with Institution & Degree */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-[1px] shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      <div className="w-full h-full rounded-[15px] bg-[#0a0a18] flex items-center justify-center text-purple-300">
                        <GraduationCap size={28} />
                      </div>
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                        UNDERGRADUATE DEGREE
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-0.5">
                        {edu.degree}
                      </h3>
                      <div className="font-sans text-sm sm:text-base font-semibold text-purple-300 mt-1">
                        {edu.institution}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 self-start sm:self-center font-mono text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      <Calendar size={13} className="text-purple-400" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pr-2">
                      <MapPin size={12} className="text-cyan-400" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="my-6">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {/* Key Academic Focus Areas */}
                {edu.highlights && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BookOpen size={14} className="text-cyan-400" />
                      <span>Academic Focus &amp; Practical Competencies</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {edu.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200 flex items-start gap-2.5"
                        >
                          <Sparkles size={14} className="text-purple-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
