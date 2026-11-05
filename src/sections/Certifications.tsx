import React, { useState } from 'react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { CertificateModal } from '../modals/CertificateModal';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUpRight } from 'lucide-react';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="certifications" className="relative py-32 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Neon Accent */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
            04 &bull; CERTIFICATIONS &amp; CREDENTIALS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)]">
            Verified Credentials &amp; Honours
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Formal achievements validated across user experience design, large language models, enterprise data, and competitive problem solving.
          </p>
        </div>

        {/* Clean Glassmorphic Animated Neon Certificates Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                soundEffects.playSelect();
                setSelectedCert(cert);
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="neon-card neon-sheen-sweep p-6 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#D8B4FE]/80 uppercase tracking-widest">
                    0{cert.number} &bull; {cert.category}
                  </span>
                  {cert.isTopAchievement && (
                    <span className="text-[10px] font-mono text-[#BF5AFF] bg-[#BF5AFF]/20 px-2.5 py-0.5 rounded-full border border-[#BF5AFF]/45 shadow-[0_0_12px_rgba(191,90,255,0.35)]">
                      Distinction
                    </span>
                  )}
                </div>

                <h3 className="font-display text-base font-semibold text-[#FFFFFF] group-hover:text-[#D8B4FE] group-hover:neon-text-lavender transition-all mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#B8AEC7] font-light">
                  {cert.issuer}
                </p>

                {cert.dateOrDuration && (
                  <p className="text-[11px] font-mono text-[#B8AEC7]/80 mt-1">
                    {cert.dateOrDuration}
                  </p>
                )}
                {cert.professor && (
                  <p className="text-[11px] font-mono text-[#8B9CFF] mt-0.5 drop-shadow-[0_0_8px_rgba(139,156,255,0.3)]">
                    {cert.professor}
                  </p>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-purple-900/30 flex items-center justify-between text-xs">
                {cert.score ? (
                  <span className="font-mono text-[#8B9CFF] font-medium text-[11px] drop-shadow-[0_0_6px_rgba(139,156,255,0.4)]">
                    {cert.score}
                  </span>
                ) : cert.badge ? (
                  <span className="font-mono text-[#BF5AFF] font-medium text-[11px] drop-shadow-[0_0_6px_rgba(191,90,255,0.5)]">
                    {cert.badge}
                  </span>
                ) : (
                  <span className="text-[#B8AEC7]/70 font-mono text-[11px]">
                    Certified
                  </span>
                )}

                <span className="text-[#B8AEC7] group-hover:text-[#FFFFFF] group-hover:neon-text-purple font-mono text-xs flex items-center gap-1 transition-all">
                  <span>View</span>
                  <ArrowUpRight size={13} className="text-[#BF5AFF]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
