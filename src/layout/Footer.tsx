import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { name, copyright } = PORTFOLIO_DATA.footer;
  const { profiles } = PORTFOLIO_DATA.personal;

  const scrollToTop = () => {
    soundEffects.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080610] border-t border-purple-900/15 py-12 text-[#B8AEC7] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-900/15">
          <div>
            <div className="font-display font-bold text-sm text-[#FFFFFF]">
              {name}
            </div>
            <p className="text-[11px] font-mono text-[#BF5AFF] mt-0.5">
              UI/UX DESIGNER &bull; FRONTEND DEVELOPER
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-mono">
              <a href={profiles.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#BF5AFF] transition-colors">
                LinkedIn
              </a>
              <a href={profiles.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#8B9CFF] transition-colors">
                GitHub
              </a>
              <a href={profiles.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                LeetCode
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#100B1B] border border-[#BF5AFF]/20 hover:border-[#BF5AFF] text-[#D8B4FE] hover:text-white transition-all"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#B8AEC7]/70">
          <div>{copyright}</div>
          <div>Designed and Developed with Creativity and Code.</div>
        </div>

      </div>
    </footer>
  );
};
