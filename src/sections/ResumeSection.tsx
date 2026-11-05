import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { Download, ArrowUpRight } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  const { heading, description, cta, secondaryCta } = PORTFOLIO_DATA.resume;

  return (
    <section id="resume" className="relative py-28 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B6DFF] block mb-2">
          07 &bull; RESUME
        </span>

        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7] mb-4">
          {heading}
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#A4A4B0] font-light leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenResume();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-white bg-[#9B6DFF] hover:bg-[#8A58F5] transition-colors flex items-center gap-2"
          >
            <Download size={14} />
            <span>{cta}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenResume();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#F5F5F7] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors flex items-center gap-1.5"
          >
            <span>{secondaryCta}</span>
            <ArrowUpRight size={14} className="text-[#A4A4B0]" />
          </button>
        </div>

      </div>
    </section>
  );
};
