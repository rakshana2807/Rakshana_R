import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  const { heading, paragraphs, metrics } = PORTFOLIO_DATA.about;
  const { location, email } = PORTFOLIO_DATA.personal;

  return (
    <section id="about" className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B6DFF] block mb-2">
            01 &bull; ABOUT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
            {heading}
          </h2>
        </div>

        {/* Editorial Layout: Text & One Subtle Visual Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#A4A4B0] font-light leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === 0 ? "text-base sm:text-lg text-[#F5F5F7] font-normal leading-relaxed" : ""}
              >
                {p}
              </p>
            ))}

            {/* Quiet metrics row */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/[0.06]">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="font-display text-2xl font-bold text-[#F5F5F7]">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#A4A4B0] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* One Subtle Refined Visual Element */}
          <div className="lg:col-span-5">
            <div
              onMouseEnter={() => soundEffects.playHover()}
              className="p-7 rounded-2xl bg-[#0D0E15]/60 border border-white/[0.06] backdrop-blur-md space-y-6"
            >
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                <span className="font-mono text-xs text-[#A4A4B0] uppercase tracking-wider">
                  Profile Overview
                </span>
                <span className="font-mono text-[11px] text-[#56BFFF] bg-[#56BFFF]/10 px-2.5 py-0.5 rounded-full border border-[#56BFFF]/20">
                  Open for Roles
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-[#F5F5F7]">
                  Rakshana R.
                </h3>
                <p className="text-xs font-mono text-[#9B6DFF] mt-1">
                  UI/UX Designer &bull; Frontend Developer
                </p>
                <p className="text-xs text-[#A4A4B0] mt-0.5">
                  {location}
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-[#A4A4B0] pt-2">
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span>Degree</span>
                  <span className="text-[#F5F5F7] font-medium">B.Tech Information Technology</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span>Institution</span>
                  <span className="text-[#F5F5F7] font-medium">Bannari Amman Institute of Technology</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span>Timeline</span>
                  <span className="text-[#F5F5F7] font-medium">2025 &ndash; 2029</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Contact</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-[#9B6DFF] hover:underline flex items-center gap-1"
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
    </section>
  );
};
