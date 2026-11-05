import React, { useEffect } from 'react';
import { Certification } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { X, CheckCircle2, ShieldCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#100B1B]/95 border border-[#BF5AFF]/30 shadow-[0_0_50px_rgba(191,90,255,0.25)] p-6 sm:p-8 text-left backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playSelect();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#A4A4B0] hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <span className="font-mono text-xs text-[#9B6DFF] uppercase tracking-wider block mb-2">
          Verified Credential &bull; 0{cert.number}
        </span>

        <h3 className="font-display text-2xl font-bold text-[#F5F5F7] mb-1">
          {cert.title}
        </h3>
        <p className="text-sm text-[#A4A4B0] font-light">
          {cert.issuer}
        </p>

        {(cert.dateOrDuration || cert.professor) && (
          <div className="text-xs font-mono text-[#56BFFF] mt-1 space-x-2">
            {cert.dateOrDuration && <span>{cert.dateOrDuration}</span>}
            {cert.professor && <span>&bull; {cert.professor}</span>}
          </div>
        )}

        {/* Detailed Points */}
        {cert.achievements && (
          <div className="my-6 space-y-2">
            {cert.achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-2.5 text-xs text-[#E0DEEC]"
              >
                <CheckCircle2 size={14} className="text-[#9B6DFF] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Scores if available */}
        {(cert.score || cert.assignmentScore || cert.badge) && (
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06] mb-6">
            {cert.score && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] font-mono text-[#A4A4B0] uppercase block">Score</span>
                <span className="text-xs font-semibold text-[#F5F5F7]">{cert.score}</span>
              </div>
            )}
            {cert.assignmentScore && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] font-mono text-[#A4A4B0] uppercase block">Assignment</span>
                <span className="text-xs font-semibold text-[#F5F5F7]">{cert.assignmentScore}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400/90">
            <ShieldCheck size={14} />
            <span>Authenticated Credential</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="text-xs font-mono text-[#A4A4B0] hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
