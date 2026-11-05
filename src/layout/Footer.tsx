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
    <footer className="relative bg-[#08090D] border-t border-white/[0.04] py-12 text-[#A4A4B0] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.04]">
          <div>
            <div className="font-display font-bold text-sm text-[#F5F5F7]">
              {name}
            </div>
            <p className="text-[11px] font-mono text-[#A4A4B0]/70 mt-0.5">
              UI/UX DESIGNER &bull; FRONTEND DEVELOPER
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-mono">
              <a href={profiles.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href={profiles.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href={profiles.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LeetCode
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-[#F5F5F7] transition-colors"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#A4A4B0]/60">
          <div>{copyright}</div>
          <div>Designed and Developed with Creativity and Code.</div>
        </div>

      </div>
    </footer>
  );
};
