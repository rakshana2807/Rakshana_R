import React, { useEffect } from 'react';
import { Certification } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { X, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  cert: Certification | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#090916] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playSelect();
            onClose();
          }}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Close Certificate Preview"
        >
          <X size={20} />
        </button>

        {/* Certificate Card Header Graphic */}
        <div className="relative w-full rounded-2xl p-6 sm:p-8 mb-6 border border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-[#0e0e1e] to-indigo-900/30 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Award size={24} />
            </div>
            <div>
              <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-widest block">
                VERIFIED CREDENTIAL #{cert.number}
              </span>
              <span className="font-mono text-xs text-slate-400">
                Category: {cert.category}
              </span>
            </div>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
            {cert.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-300">
            <span className="text-purple-300 font-semibold">{cert.issuer}</span>
            {cert.dateOrDuration && <span>&bull; {cert.dateOrDuration}</span>}
            {cert.professor && <span>&bull; {cert.professor}</span>}
          </div>
        </div>

        {/* Key Highlights / Badges */}
        {cert.achievements && cert.achievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              Certification Details &amp; Honours
            </h4>
            <div className="space-y-2">
              {cert.achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance metrics if available */}
        {(cert.score || cert.assignmentScore || cert.badge) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-4 border-t border-white/10">
            {cert.score && (
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Overall Score</span>
                <span className="text-xs sm:text-sm font-bold text-purple-300">{cert.score}</span>
              </div>
            )}
            {cert.assignmentScore && (
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Assignment</span>
                <span className="text-xs sm:text-sm font-bold text-indigo-300">{cert.assignmentScore}</span>
              </div>
            )}
            {cert.badge && (
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Performer Badge</span>
                <span className="text-xs sm:text-sm font-bold text-cyan-300">{cert.badge}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck size={15} />
            <span>Authenticated Academic &amp; Industry Record</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2 rounded-full text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Close &times;
          </button>
        </div>

      </div>
    </div>
  );
};
