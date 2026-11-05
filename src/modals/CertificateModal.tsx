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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#100B1B] border border-[#BF5AFF]/30 shadow-[0_0_50px_rgba(191,90,255,0.25)] p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playSelect();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-[#BF5AFF]/20 text-[#B8AEC7] hover:text-[#FFFFFF] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <span className="font-mono text-xs text-[#BF5AFF] uppercase tracking-wider block mb-2 neon-text-purple font-semibold">
          Verified Credential &bull; 0{cert.number}
        </span>

        <h3 className="font-display text-2xl font-bold text-[#FFFFFF] drop-shadow-[0_0_15px_rgba(191,90,255,0.3)] mb-1">
          {cert.title}
        </h3>
        <p className="text-sm text-[#B8AEC7] font-light">
          {cert.issuer}
        </p>

        {(cert.dateOrDuration || cert.professor) && (
          <div className="text-xs font-mono text-[#D8B4FE] mt-1 space-x-2">
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
                className="p-3 rounded-xl bg-[#160F25] border border-[#BF5AFF]/15 hover:border-[#BF5AFF]/35 flex items-center gap-2.5 text-xs text-[#E0DEEC] transition-colors"
              >
                <CheckCircle2 size={14} className="text-[#BF5AFF] shrink-0 drop-shadow-[0_0_4px_#BF5AFF]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Scores if available */}
        {(cert.score || cert.assignmentScore || cert.badge) && (
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-purple-900/30 mb-6">
            {cert.score && (
              <div className="p-3 rounded-xl bg-[#160F25] border border-[#BF5AFF]/20 shadow-[0_0_10px_rgba(191,90,255,0.15)]">
                <span className="text-[10px] font-mono text-[#D8B4FE] uppercase block">Score</span>
                <span className="text-xs font-semibold text-[#FFFFFF]">{cert.score}</span>
              </div>
            )}
            {cert.assignmentScore && (
              <div className="p-3 rounded-xl bg-[#160F25] border border-[#BF5AFF]/20 shadow-[0_0_10px_rgba(191,90,255,0.15)]">
                <span className="text-[10px] font-mono text-[#D8B4FE] uppercase block">Assignment</span>
                <span className="text-xs font-semibold text-[#FFFFFF]">{cert.assignmentScore}</span>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <ShieldCheck size={14} className="drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            <span>Authenticated Credential</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="text-xs font-mono text-[#B8AEC7] hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
