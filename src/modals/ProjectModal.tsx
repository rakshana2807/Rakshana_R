import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090916] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEffects.playSelect();
            onClose();
          }}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors z-10"
          aria-label="Close Project Details"
        >
          <X size={20} />
        </button>

        {/* Top Tag & Number */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300">
            PROJECT {project.number}
          </span>
          <span className="font-mono text-xs text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            {project.category}
          </span>
          {project.isOngoing && (
            <span className="font-mono text-xs text-amber-300 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Ongoing Evolving Project</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          {project.fullTitle || project.title}
        </h2>

        {/* Role Pill */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-300 font-mono mb-6">
          <UserCheck size={16} />
          <span>Role: {project.role}</span>
        </div>

        {/* Visual Showcase Banner */}
        <div
          className={`relative w-full h-48 sm:h-64 rounded-2xl p-6 sm:p-8 flex flex-col justify-end overflow-hidden mb-8 border border-white/10 bg-gradient-to-br ${project.accentGradient}`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="relative z-10">
            <span className="font-mono text-xs text-white/70 tracking-widest uppercase">
              INTERACTIVE ARCHITECTURE
            </span>
            <div className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              {project.title}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
            Overview &amp; Purpose
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            Key Highlights &amp; Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
              >
                <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              >
                <span>Launch Live Project</span>
                <ExternalLink size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="px-5 py-3 rounded-full text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
              >
                <Github size={15} />
                <span>Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              soundEffects.playSelect();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Close &times;
          </button>
        </div>

      </div>
    </div>
  );
};
