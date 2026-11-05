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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#100B1B] border border-[#BF5AFF]/30 shadow-[0_0_50px_rgba(191,90,255,0.25)] p-6 sm:p-8 text-left"
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

        {/* Category & Status */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[11px] text-[#BF5AFF] uppercase tracking-wider font-semibold neon-text-purple">
            {project.category}
          </span>
          {project.isOngoing && (
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.3)]">
              Ongoing Project
            </span>
          )}
        </div>

        {/* Title & Role */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFFFFF] drop-shadow-[0_0_15px_rgba(191,90,255,0.3)] mb-2">
          {project.fullTitle || project.title}
        </h2>

        <div className="flex items-center gap-2 text-xs font-mono text-[#D8B4FE] mb-6">
          <UserCheck size={14} className="text-[#BF5AFF]" />
          <span>Role: {project.role}</span>
        </div>

        {/* Overview Description */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D8B4FE]/80 font-semibold">
            Overview
          </h3>
          <p className="text-sm text-[#B8AEC7] font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D8B4FE]/80 font-semibold mb-3">
            Core Features &amp; Architecture
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#160F25] border border-[#BF5AFF]/15 hover:border-[#BF5AFF]/40 flex items-start gap-2.5 text-xs text-[#E0DEEC] transition-colors"
              >
                <CheckCircle2 size={14} className="text-[#BF5AFF] shrink-0 mt-0.5 drop-shadow-[0_0_4px_#BF5AFF]" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-purple-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEffects.playHover()}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-white bg-[#BF5AFF] hover:bg-[#A855F7] neon-glow-btn transition-colors flex items-center gap-1.5"
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
                className="px-4 py-2.5 rounded-full text-xs font-medium text-[#FFFFFF] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center gap-1.5"
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
            className="text-xs font-mono text-[#B8AEC7] hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
