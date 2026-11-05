import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';

export const Education: React.FC = () => {
  const educationList = PORTFOLIO_DATA.education;

  return (
    <section id="education" className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B6DFF] block mb-2">
            06 &bull; EDUCATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
            Academic Foundation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A4A4B0] font-light max-w-2xl leading-relaxed">
            Developing technical depth in data structures, algorithms, and full-stack software development.
          </p>
        </div>

        {/* Minimalist Education Card */}
        <div className="max-w-3xl">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEffects.playHover()}
              className="p-8 rounded-2xl bg-[#0D0E15]/50 border border-white/[0.06] hover:border-white/15 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#F5F5F7]">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-mono text-[#56BFFF] mt-1">
                    {edu.institution} &bull; {edu.location}
                  </div>
                </div>

                <span className="font-mono text-xs text-[#A4A4B0] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06] self-start sm:self-center">
                  {edu.duration}
                </span>
              </div>

              <p className="text-sm text-[#A4A4B0] font-light leading-relaxed my-5">
                {edu.description}
              </p>

              {edu.highlights && (
                <div className="pt-4 border-t border-white/[0.04] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E0DEEC] font-light">
                  {edu.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#9B6DFF]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
