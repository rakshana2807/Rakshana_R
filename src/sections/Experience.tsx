import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';

export const Experience: React.FC = () => {
  const experiences = PORTFOLIO_DATA.experience;

  return (
    <section id="experience" className="relative py-32 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
            05 &bull; EXPERIENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)]">
            Internship &amp; Industry Exposure
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Hands-on exposure to practical design workflows, usability testing, and user-centered design methodologies.
          </p>
        </div>

        {/* Minimalist Animated Neon Card */}
        <div className="max-w-3xl">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEffects.playHover()}
              className="neon-frame"
            >
              <div className="neon-frame-inner p-8 neon-sheen-sweep">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-purple-900/25">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#FFFFFF] drop-shadow-[0_0_12px_rgba(191,90,255,0.2)]">
                      {exp.position}
                    </h3>
                    <div className="text-xs font-mono text-[#BF5AFF] mt-1 drop-shadow-[0_0_6px_rgba(191,90,255,0.4)]">
                      {exp.organization} &bull; {exp.role}
                    </div>
                  </div>

                  <span className="font-mono text-xs text-[#D8B4FE] bg-[#BF5AFF]/20 px-3.5 py-1 rounded-full border border-[#BF5AFF]/40 shadow-[0_0_10px_rgba(191,90,255,0.25)] self-start sm:self-center">
                    {exp.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#B8AEC7] font-light leading-relaxed my-5">
                  {exp.description}
                </p>

                {/* Practical Learnings List */}
                <div className="pt-4 border-t border-purple-900/25">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D8B4FE]/80 block mb-3 font-medium">
                    Practical Work &amp; Learnings
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#E0DEEC] font-light">
                    {exp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B9CFF] shadow-[0_0_6px_#8B9CFF]" />
                        <span>{item}</span>
                      </div>
                    ))}
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
