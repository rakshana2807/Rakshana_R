import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  const { heading, paragraphs, metrics } = PORTFOLIO_DATA.about;
  const { location, email } = PORTFOLIO_DATA.personal;

  return (
    <section id="about" className="relative py-32 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
            01 &bull; ABOUT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)]">
            {heading}
          </h2>
        </div>

        {/* Editorial Layout: Text & One Subtle Visual Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#B8AEC7] font-light leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "text-base sm:text-lg text-[#FFFFFF] font-normal leading-relaxed" : ""}
              >
                {p}
              </p>
            ))}

            {/* Metrics Row with Soft Glow */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-purple-900/25">
              {metrics.map((m, idx) => (
                <div key={idx} className="group">
                  <div className="font-display text-2xl font-bold text-[#FFFFFF] group-hover:neon-text-purple transition-all">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#B8AEC7] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Neon Profile Card */}
          <div className="lg:col-span-5">
            <div
              onMouseEnter={() => soundEffects.playHover()}
              className="neon-frame"
            >
              <div className="neon-frame-inner p-7 space-y-6 neon-sheen-sweep">
                <div className="flex items-center justify-between pb-5 border-b border-purple-900/25">
                  <span className="font-mono text-xs text-[#B8AEC7] uppercase tracking-wider">
                    Profile Overview
                  </span>
                  <span className="font-mono text-[11px] text-[#D8B4FE] bg-[#BF5AFF]/20 px-3 py-1 rounded-full border border-[#BF5AFF]/40 shadow-[0_0_10px_rgba(191,90,255,0.3)]">
                    Open for Opportunities
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#FFFFFF] drop-shadow-[0_0_12px_rgba(191,90,255,0.25)]">
                    Rakshana R.
                  </h3>
                  <p className="text-xs font-mono text-[#BF5AFF] mt-1 drop-shadow-[0_0_6px_rgba(191,90,255,0.4)]">
                    UI/UX Designer &bull; Frontend Developer
                  </p>
                  <p className="text-xs text-[#B8AEC7] mt-0.5">
                    {location}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-[#B8AEC7] pt-2">
                  <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                    <span>Degree</span>
                    <span className="text-[#FFFFFF] font-medium">B.Tech Information Technology</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                    <span>Institution</span>
                    <span className="text-[#FFFFFF] font-medium">Bannari Amman Institute of Tech</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-purple-900/20">
                    <span>Timeline</span>
                    <span className="text-[#FFFFFF] font-medium">2025 &ndash; 2029</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Contact</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-[#D8B4FE] hover:text-[#BF5AFF] hover:underline flex items-center gap-1 transition-colors drop-shadow-[0_0_6px_rgba(191,90,255,0.3)]"
                    >
                      <span>Send Email</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
