import React, { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import {
  X,
  Download,
  Printer,
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundEffects.playSelect();
    window.print();
  };

  const handleDownload = () => {
    soundEffects.playSelect();
    const link = document.createElement('a');
    link.href = PORTFOLIO_DATA.personal.resumeUrl;
    link.download = 'Rakshana_R_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0D0E15] border border-white/10 shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#9B6DFF]" />
            <span className="font-display font-semibold text-sm text-[#F5F5F7]">
              Curriculum Vitae Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A4A4B0] hover:text-white transition-colors"
              title="Print"
            >
              <Printer size={15} />
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-[#9B6DFF] hover:bg-[#8A58F5] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playSelect();
                onClose();
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#A4A4B0] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Minimal Document Sheet */}
        <div className="space-y-6 text-[#A4A4B0] text-xs sm:text-sm font-light">
          
          {/* Identity */}
          <div className="pb-5 border-b border-white/[0.06] flex flex-col sm:flex-row justify-between sm:items-end gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-[#F5F5F7]">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <p className="font-mono text-xs text-[#9B6DFF] mt-0.5">
                UI/UX Designer &bull; Frontend Developer
              </p>
            </div>
            <div className="space-y-0.5 text-xs font-mono text-[#A4A4B0]">
              <div className="flex items-center gap-1.5">
                <Mail size={11} className="text-[#56BFFF]" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={11} className="text-[#56BFFF]" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-[#56BFFF]" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#F5F5F7] font-semibold mb-1.5">
              Summary
            </h2>
            <p className="leading-relaxed">
              {PORTFOLIO_DATA.personal.introParagraph}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#F5F5F7] font-semibold mb-1.5">
              Education
            </h2>
            {PORTFOLIO_DATA.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between font-medium text-[#F5F5F7]">
                  <span>{edu.degree}</span>
                  <span className="font-mono text-xs text-[#A4A4B0]">{edu.duration}</span>
                </div>
                <div className="text-xs text-[#56BFFF]">{edu.institution} &bull; {edu.location}</div>
                <p className="mt-1 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#F5F5F7] font-semibold mb-1.5">
              Experience
            </h2>
            {PORTFOLIO_DATA.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between font-medium text-[#F5F5F7]">
                  <span>{exp.position}</span>
                  <span className="font-mono text-xs text-[#A4A4B0]">{exp.duration}</span>
                </div>
                <div className="text-xs text-[#56BFFF]">{exp.organization} &bull; {exp.role}</div>
                <p className="mt-1 leading-relaxed">{exp.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 size={11} className="text-[#9B6DFF] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Credentials */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#F5F5F7] font-semibold mb-1.5">
              Certifications &amp; Honours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              {PORTFOLIO_DATA.certifications.slice(0, 6).map((c) => (
                <div key={c.id} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#9B6DFF]" />
                  <span>
                    <strong className="text-[#F5F5F7]">{c.title}</strong> &ndash; {c.issuer}
                    {c.score ? ` (${c.score})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
