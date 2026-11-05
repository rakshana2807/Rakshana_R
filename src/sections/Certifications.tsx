import React, { useState } from 'react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { CertificateModal } from '../modals/CertificateModal';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUpRight } from 'lucide-react';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="certifications" className="relative py-32 border-t border-purple-900/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2">
            04 &bull; CERTIFICATIONS &amp; CREDENTIALS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
            Verified Credentials &amp; Honours
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Formal achievements validated across user experience design, large language models, enterprise data, and competitive problem solving.
          </p>
        </div>

        {/* Clean Glassmorphic Certificates Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                soundEffects.playSelect();
                setSelectedCert(cert);
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="p-6 rounded-2xl neon-animated-card cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#D8B4FE]/70 uppercase tracking-widest">
                    0{cert.number} &bull; {cert.category}
                  </span>
                  {cert.isTopAchievement && (
                    <span className="text-[10px] font-mono text-[#BF5AFF] bg-[#BF5AFF]/15 px-2 py-0.5 rounded border border-[#BF5AFF]/30 shadow-[0_0_8px_rgba(191,90,255,0.2)]">
                      Distinction
                    </span>
                  )}
                </div>

                <h3 className="font-display text-base font-semibold text-[#FFFFFF] group-hover:text-[#D8B4FE] transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#B8AEC7] font-light">
                  {cert.issuer}
                </p>

                {cert.dateOrDuration && (
                  <p className="text-[11px] font-mono text-[#B8AEC7]/70 mt-1">
                    {cert.dateOrDuration}
                  </p>
                )}
                {cert.professor && (
                  <p className="text-[11px] font-mono text-[#8B9CFF] mt-0.5">
                    {cert.professor}
                  </p>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-purple-900/20 flex items-center justify-between text-xs">
                {cert.score ? (
                  <span className="font-mono text-[#8B9CFF] font-medium text-[11px]">
                    {cert.score}
                  </span>
                ) : cert.badge ? (
                  <span className="font-mono text-[#BF5AFF] font-medium text-[11px]">
                    {cert.badge}
                  </span>
                ) : (
                  <span className="text-[#B8AEC7]/60 font-mono text-[11px]">
                    Certified
                  </span>
                )}

                <span className="text-[#B8AEC7] group-hover:text-[#FFFFFF] font-mono text-xs flex items-center gap-1 transition-colors">
                  <span>View</span>
                  <ArrowUpRight size={12} className="text-[#BF5AFF]" />
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
