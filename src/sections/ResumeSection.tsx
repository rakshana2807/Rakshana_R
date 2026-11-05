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
    <section id="resume" className="relative py-28 border-t border-purple-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Neon Frame for Resume Banner */}
        <div className="neon-frame">
          <div className="neon-frame-inner p-8 sm:p-12 text-center neon-sheen-sweep">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
              07 &bull; RESUME
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)] mb-4">
              {heading}
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#B8AEC7] font-light leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#FFFFFF] bg-[#BF5AFF] hover:bg-[#A855F7] neon-glow-btn transition-all duration-300 flex items-center gap-2"
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
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#FFFFFF] bg-[#160F25] hover:bg-[#1E1533] border border-[#BF5AFF]/35 hover:border-[#BF5AFF] shadow-[0_0_12px_rgba(191,90,255,0.2)] hover:shadow-[0_0_18px_rgba(191,90,255,0.4)] transition-all duration-300 flex items-center gap-1.5"
              >
                <span>{secondaryCta}</span>
                <ArrowUpRight size={14} className="text-[#D8B4FE]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
