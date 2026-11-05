import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { X, ExternalLink, Github, CheckCircle2, UserCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#100B1B]/95 border border-[#BF5AFF]/30 shadow-[0_0_50px_rgba(191,90,255,0.25)] p-6 sm:p-8 text-left backdrop-blur-2xl"
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

        {/* Category & Status */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[11px] text-[#9B6DFF] uppercase tracking-wider">
            {project.category}
          </span>
          {project.isOngoing && (
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Ongoing Project
            </span>
          )}
        </div>

        {/* Title & Role */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F7] mb-2">
          {project.fullTitle || project.title}
        </h2>

        <div className="flex items-center gap-2 text-xs font-mono text-[#56BFFF] mb-6">
          <UserCheck size={14} />
          <span>Role: {project.role}</span>
        </div>

        {/* Overview Description */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#A4A4B0]">
            Overview
          </h3>
          <p className="text-sm text-[#A4A4B0] font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#A4A4B0] mb-3">
            Core Features &amp; Architecture
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-2.5 text-xs text-[#E0DEEC]"
              >
                <CheckCircle2 size={14} className="text-[#9B6DFF] shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#9B6DFF] hover:bg-[#8A58F5] transition-colors flex items-center gap-1.5"
              >
                <span>Open Live Project</span>
                <ExternalLink size={13} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="px-4 py-2.5 rounded-full text-xs font-medium text-[#F5F5F7] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Github size={14} />
                <span>Repository</span>
              </a>
            )}
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
