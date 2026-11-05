import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUp, Linkedin, Github, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { name, titles, motto, copyright } = PORTFOLIO_DATA.footer;
  const { profiles } = PORTFOLIO_DATA.personal;

  const scrollToTop = () => {
    soundEffects.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020204] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          
          {/* Identity & Monogram */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <div className="w-full h-full bg-[#090914] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-sm tracking-tighter text-white">
                    {PORTFOLIO_DATA.personal.initials}
                  </span>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                {name}
              </span>
            </div>
            <p className="font-mono text-xs text-purple-400 tracking-wider">
              {titles}
            </p>
            <p className="text-xs text-slate-400 mt-2 font-light italic">
              &ldquo;{motto}&rdquo;
            </p>
          </div>

          {/* Social Profiles & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href={profiles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="LinkedIn Profile"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={profiles.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-600/20 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="GitHub Profile"
              >
                <Github size={17} />
              </a>
              <a
                href={profiles.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-600/20 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="LeetCode Profile"
              >
                <Code2 size={17} />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-4 py-2.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all flex items-center gap-2 group"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4 text-center sm:text-left">
          <div>{copyright}</div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <span className="text-purple-400">&bull;</span>
            <span>React &bull; Three.js &bull; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
