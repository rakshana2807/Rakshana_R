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
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  FolderGit2
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
    // Attempt download of /resume.pdf if present, or inform user
    const link = document.createElement('a');
    link.href = PORTFOLIO_DATA.personal.resumeUrl;
    link.download = 'Rakshana_R_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090916] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-5 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <span className="font-display font-bold text-base text-white">
                Curriculum Vitae Preview
              </span>
              <span className="text-[11px] font-mono text-cyan-400 block -mt-0.5">
                Rakshana R. &bull; Verified Profile
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Print Document"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playSelect();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Close Resume"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Upload-Ready Asset Notification Pill */}
        <div className="p-3 mb-6 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between text-xs font-mono text-purple-300">
          <span>&bull; Ready-for-upload target: <code className="bg-white/10 px-1.5 py-0.5 rounded text-white">/public/resume.pdf</code></span>
          <span className="text-cyan-400 text-[11px]">Syncs directly with download action</span>
        </div>

        {/* Printable Resume Document Container */}
        <div className="bg-[#0e0e1c] p-6 sm:p-9 rounded-2xl border border-white/5 space-y-6 text-slate-200">
          
          {/* Header Block */}
          <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <h1 className="font-display text-3xl font-black text-white tracking-wide">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <p className="font-mono text-xs text-purple-400 mt-1">
                UI/UX Designer &bull; Frontend Developer &bull; Creative Builder
              </p>
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-cyan-400" />
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline">
                  {PORTFOLIO_DATA.personal.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-cyan-400" />
                <a href={`tel:${PORTFOLIO_DATA.personal.phone}`} className="hover:underline">
                  {PORTFOLIO_DATA.personal.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={12} className="text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-widest uppercase mb-2 text-purple-300">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {PORTFOLIO_DATA.personal.introParagraph}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-widest uppercase mb-2 text-purple-300 flex items-center gap-1.5">
              <GraduationCap size={15} />
              <span>Education</span>
            </h2>
            {PORTFOLIO_DATA.education.map((edu, i) => (
              <div key={i} className="text-xs sm:text-sm">
                <div className="flex justify-between font-semibold text-white">
                  <span>{edu.degree}</span>
                  <span className="font-mono text-slate-400 text-xs">{edu.duration}</span>
                </div>
                <div className="text-cyan-400 text-xs font-medium">{edu.institution} &bull; {edu.location}</div>
                <p className="text-xs text-slate-300 mt-1">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Internship Experience */}
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-widest uppercase mb-2 text-purple-300 flex items-center gap-1.5">
              <Briefcase size={15} />
              <span>Experience</span>
            </h2>
            {PORTFOLIO_DATA.experience.map((exp, i) => (
              <div key={i} className="text-xs sm:text-sm">
                <div className="flex justify-between font-semibold text-white">
                  <span>{exp.position}</span>
                  <span className="font-mono text-slate-400 text-xs">{exp.duration}</span>
                </div>
                <div className="text-cyan-400 text-xs font-medium">{exp.organization}</div>
                <p className="text-xs text-slate-300 mt-1">{exp.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-widest uppercase mb-2 text-purple-300 flex items-center gap-1.5">
              <FolderGit2 size={15} />
              <span>Key Projects</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_DATA.projects.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="font-bold text-xs text-white flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="font-mono text-[10px] text-cyan-400">{p.role}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Major Certifications */}
          <div>
            <h2 className="font-display text-sm font-bold text-white tracking-widest uppercase mb-2 text-purple-300 flex items-center gap-1.5">
              <Award size={15} />
              <span>Honours &amp; Certifications</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PORTFOLIO_DATA.certifications.slice(0, 6).map((c) => (
                <div key={c.id} className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 size={12} className="text-purple-400 shrink-0" />
                  <span>
                    <strong className="text-white">{c.title}</strong> — {c.issuer}
                    {c.score ? ` (${c.score})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/5 border border-white/10"
          >
            Close Document &times;
          </button>
        </div>

      </div>
    </div>
  );
};
