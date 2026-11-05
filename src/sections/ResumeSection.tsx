import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { Download, FileText, Eye, CheckCircle2 } from 'lucide-react';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  const { heading, description, cta, secondaryCta } = PORTFOLIO_DATA.resume;

  return (
    <section id="resume" className="relative py-28 overflow-hidden bg-[#030308]">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Glass Resume Banner Card */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/50 via-indigo-500/30 to-cyan-500/40 shadow-2xl">
          <div className="rounded-[23px] bg-[#080816]/95 backdrop-blur-2xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
            
            {/* Left Content */}
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <FileText size={13} />
                <span>07 &bull; CREDENTIAL DOSSIER</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {heading}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {description}
              </p>

              {/* Quick Perks Checklist */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300 justify-center md:justify-start">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-purple-400" />
                  <span>Curated Projects &amp; UI Prototypes</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400" />
                  <span>NPTEL Elite + Silver Record</span>
                </span>
              </div>

              {/* Upload-Ready Target Note */}
              <div className="pt-1 text-[11px] font-mono text-slate-500">
                <span>Asset target: <code className="text-purple-300">public/resume.pdf</code> &bull; Connects seamlessly upon upload</span>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>{cta}</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playWarp();
                  onOpenResume();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Eye size={16} className="text-cyan-400" />
                <span>{secondaryCta}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
