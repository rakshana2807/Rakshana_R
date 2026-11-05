import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';

export const Education: React.FC = () => {
  const educationList = PORTFOLIO_DATA.education;

  return (
    <section id="education" className="relative py-32 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
            06 &bull; EDUCATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)]">
            Academic Foundation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Developing technical depth in data structures, algorithms, and full-stack software development.
          </p>
        </div>

        {/* Minimalist Animated Neon Card */}
        <div className="max-w-3xl">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEffects.playHover()}
              className="neon-frame"
            >
              <div className="neon-frame-inner p-8 neon-sheen-sweep">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-purple-900/25">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#FFFFFF] drop-shadow-[0_0_12px_rgba(191,90,255,0.2)]">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-mono text-[#8B9CFF] mt-1 drop-shadow-[0_0_6px_rgba(139,156,255,0.4)]">
                      {edu.institution} &bull; {edu.location}
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#D8B4FE] bg-[#BF5AFF]/20 px-3.5 py-1 rounded-full border border-[#BF5AFF]/40 shadow-[0_0_10px_rgba(191,90,255,0.25)] self-start sm:self-center">
                    {edu.duration}
                  </span>
                </div>

                <p className="text-sm text-[#B8AEC7] font-light leading-relaxed my-5">
                  {edu.description}
                </p>

                {edu.highlights && (
                  <div className="pt-4 border-t border-purple-900/25 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#E0DEEC] font-light">
                    {edu.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AFF] shadow-[0_0_6px_#BF5AFF]" />
                        <span>{h}</span>
                      </div>
                    ))}
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
