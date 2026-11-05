import React, { useState } from 'react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { CertificateModal } from '../modals/CertificateModal';
import { soundEffects } from '../ui/SoundEffects';
import {
  Award,
  Star,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const certs = PORTFOLIO_DATA.certifications;
  const keyAchievements = PORTFOLIO_DATA.keyAchievements;

  const filteredCerts =
    filter === 'all'
      ? certs
      : filter === 'achievements'
      ? certs.filter((c) => c.isTopAchievement)
      : certs.filter((c) => c.category === filter);

  return (
    <section id="certifications" className="relative py-28 overflow-hidden bg-[#04040a]">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Award size={13} />
            <span>04 &bull; CREDENTIALS &amp; HONOURS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Certifications &amp; Key Achievements
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Validated knowledge across UI/UX design, cloud architecture, enterprise AI, modern algorithms, and web standards.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Featured Key Achievements Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {keyAchievements.map((ach, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEffects.playHover()}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/40 via-indigo-500/30 to-cyan-500/40 shadow-lg group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="h-full rounded-[15px] bg-[#0a0a18]/90 backdrop-blur-xl p-5 border border-white/5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Star size={20} className="fill-purple-400/40 text-purple-300" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 tracking-wider uppercase block">
                    MAJOR DISTINCTION
                  </span>
                  <h4 className="font-display text-base font-bold text-white group-hover:text-purple-300 transition-colors mt-0.5">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {ach.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('all');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All 09 Certifications
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('achievements');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'achievements'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Top Honours
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('Design');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'Design'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            UI/UX Design
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('AI & Data');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'AI & Data'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            AI &amp; Data
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('Cloud & Web');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'Cloud & Web'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Cloud &amp; Web
          </button>
        </div>

        {/* 9 Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                soundEffects.playWarp();
                setSelectedCert(cert);
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className={`group relative rounded-3xl p-[1px] cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-xl ${
                cert.isTopAchievement
                  ? 'bg-gradient-to-b from-purple-500/40 via-indigo-500/20 to-cyan-500/30'
                  : 'bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-purple-500/30'
              }`}
            >
              <div className="h-full rounded-[23px] bg-[#080816]/95 backdrop-blur-xl p-6 flex flex-col justify-between border border-white/5 group-hover:border-purple-500/40 transition-colors">
                
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] text-purple-400 font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                      NO. {cert.number}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                      {cert.category}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-sans text-xs text-purple-300/90 font-medium mt-1">
                    {cert.issuer}
                  </div>

                  {/* Details or Dates */}
                  {cert.dateOrDuration && (
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {cert.dateOrDuration}
                    </div>
                  )}
                  {cert.professor && (
                    <div className="text-[11px] font-mono text-cyan-400/90 mt-0.5">
                      {cert.professor}
                    </div>
                  )}

                  {/* Achievements tags */}
                  {cert.achievements && (
                    <div className="mt-4 space-y-1.5">
                      {cert.achievements.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                          <span className="line-clamp-1">{a}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Score Pill / Badge & Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  {cert.score ? (
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/40">
                      {cert.score}
                    </span>
                  ) : cert.badge ? (
                    <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded-md border border-purple-800/40">
                      {cert.badge}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">
                      Verified Credential
                    </span>
                  )}

                  <span className="text-xs font-mono text-purple-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    <span>Inspect</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

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
