import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';

export const Skills: React.FC = () => {
  const categories = PORTFOLIO_DATA.skillCategories;

  return (
    <section id="skills" className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B6DFF] block mb-2">
            02 &bull; SKILLS &amp; EXPERTISE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
            Technical Stack &amp; Creative Disciplines
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A4A4B0] font-light max-w-2xl leading-relaxed">
            A balanced foundation across user experience research, modern component engineering, and algorithmic problem solving.
          </p>
        </div>

        {/* Minimalist Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => soundEffects.playHover()}
              className="p-6 rounded-2xl bg-[#0D0E15]/50 border border-white/[0.06] hover:border-white/15 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A4A4B0]/70 block mb-1">
                  Category
                </span>
                <h3 className="font-display text-base font-semibold text-[#F5F5F7] mb-2">
                  {category.name}
                </h3>
                <p className="text-xs text-[#A4A4B0] font-light leading-relaxed mb-6">
                  {category.tagline}
                </p>

                {/* Minimalist Skills Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg text-xs bg-white/[0.03] border border-white/[0.06] text-[#E0DEEC] font-light hover:border-[#9B6DFF]/30 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.04] text-[11px] font-mono text-[#A4A4B0]/60 flex items-center justify-between">
                <span>{category.skills.length} competencies</span>
                <span className="text-[#9B6DFF]">&bull; Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
