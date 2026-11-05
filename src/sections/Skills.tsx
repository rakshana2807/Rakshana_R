import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';

export const Skills: React.FC = () => {
  const categories = PORTFOLIO_DATA.skillCategories;

  return (
    <section id="skills" className="relative py-32 border-t border-purple-900/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2">
            02 &bull; SKILLS &amp; EXPERTISE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
            Technical Stack &amp; Creative Disciplines
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            A balanced foundation across user experience research, modern component engineering, and algorithmic problem solving.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => soundEffects.playHover()}
              className="p-6 rounded-2xl bg-[#100B1B]/60 border border-[#BF5AFF]/15 hover:border-[#BF5AFF]/45 hover:shadow-[0_8px_30px_rgba(191,90,255,0.2)] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8B4FE]/70 block mb-1">
                  Category
                </span>
                <h3 className="font-display text-base font-semibold text-[#FFFFFF] mb-2">
                  {category.name}
                </h3>
                <p className="text-xs text-[#B8AEC7] font-light leading-relaxed mb-6">
                  {category.tagline}
                </p>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg text-xs bg-[#160F25] border border-[#BF5AFF]/15 text-[#E0DEEC] font-light hover:border-[#BF5AFF]/40 hover:text-[#FFFFFF] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-purple-900/20 text-[11px] font-mono text-[#B8AEC7]/70 flex items-center justify-between">
                <span>{category.skills.length} competencies</span>
                <span className="text-[#BF5AFF]">&bull; Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
