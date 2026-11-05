import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from '../modals/ProjectModal';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUpRight, Eye } from 'lucide-react';

const ProjectCard: React.FC<{
  project: Project;
  onOpenModal: (p: Project) => void;
}> = ({ project, onOpenModal }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getProjectPreview = () => {
    switch (project.id) {
      case 'royalcafe-connect':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#3b0d11] via-[#1f0a10] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-amber-300 bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-400/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                Wi-Fi Portal Experience
              </span>
              <span className="font-mono text-xs text-amber-300/80 font-bold">01</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-amber-200/90 uppercase tracking-widest">Hospitality &bull; Web UI</div>
              <div className="font-display text-lg font-bold text-white mt-0.5 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">RoyalCafe Connect</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
          </div>
        );
      case 'workhub':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c1f38] via-[#10192e] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-sky-300 bg-sky-500/25 px-2.5 py-0.5 rounded-full border border-sky-400/40 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                Desk Reservation Engine
              </span>
              <span className="font-mono text-xs text-sky-300/80 font-bold">02</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-sky-200/90 uppercase tracking-widest">Co-Working &bull; Web App</div>
              <div className="font-display text-lg font-bold text-white mt-0.5 drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)]">WorkHub</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full bg-sky-500/15 blur-2xl pointer-events-none" />
          </div>
        );
      case 'mixora':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#3b0f2a] via-[#240b1e] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-pink-300 bg-pink-500/25 px-2.5 py-0.5 rounded-full border border-pink-400/40 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                Bubble Tea Customizer
              </span>
              <span className="font-mono text-xs text-pink-300/80 font-bold">03</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-pink-200/90 uppercase tracking-widest">AI Taste Matcher &bull; Interactive</div>
              <div className="font-display text-lg font-bold text-white mt-0.5 drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">MIXORA</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />
          </div>
        );
      case 'mindtwin-ai':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#27103d] via-[#190a2a] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-[#D8B4FE] bg-[#BF5AFF]/25 px-2.5 py-0.5 rounded-full border border-[#BF5AFF]/40 shadow-[0_0_12px_rgba(191,90,255,0.4)]">
                Digital Twin Mental Health
              </span>
              <span className="font-mono text-xs text-[#D8B4FE]/80 font-bold">04</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-[#D8B4FE]/90 uppercase tracking-widest">AI &bull; Mental Wellness</div>
              <div className="font-display text-lg font-bold text-white mt-0.5 drop-shadow-[0_2px_10px_rgba(191,90,255,0.4)]">MindTwin AI</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full bg-[#BF5AFF]/25 blur-2xl pointer-events-none" />
          </div>
        );
      case 'vision-hack':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c2b33] via-[#0b1f24] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/25 px-2.5 py-0.5 rounded-full border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                Object Detection CV
              </span>
              <span className="font-mono text-xs text-cyan-300/80 font-bold">05</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-cyan-200/90 uppercase tracking-widest">Computer Vision &bull; AI</div>
              <div className="font-display text-lg font-bold text-white mt-0.5 drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]">Vision Hack</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
          </div>
        );
      case 'study-mate-ai':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0b2b1d] via-[#091f16] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-emerald-300 bg-emerald-500/25 px-2.5 py-0.5 rounded-full border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                Student Productivity UI
              </span>
              <span className="font-mono text-xs text-emerald-300/80 font-bold">06</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-emerald-200/90 uppercase tracking-widest">EdTech &bull; UI/UX Concept</div>
              <div className="font-display text-lg font-bold text-white mt-0.5 drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">Study Mate AI</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
          </div>
        );
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundEffects.playHover()}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.25s ease-out',
      }}
      className="neon-frame"
    >
      <div className="neon-frame-inner p-6 flex flex-col justify-between group neon-sheen-sweep">
        {/* Subtle illuminated corner reflections */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#BF5AFF]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8B9CFF]/15 via-transparent to-transparent pointer-events-none" />

        <div>
          {/* Large Project Preview Image with Neon Border */}
          <div className="w-full h-48 rounded-xl mb-5 overflow-hidden border border-[#BF5AFF]/25 group-hover:border-[#BF5AFF]/60 shadow-[0_0_15px_rgba(191,90,255,0.15)] group-hover:shadow-[0_0_25px_rgba(191,90,255,0.35)] transition-all duration-300 relative">
            {getProjectPreview()}
          </div>

          {/* Role Pill with Neon Lavender Glow */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-mono text-[#D8B4FE] bg-[#BF5AFF]/20 px-3 py-1 rounded-full border border-[#BF5AFF]/35 shadow-[0_0_10px_rgba(191,90,255,0.25)]">
              Role: {project.role}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#B8AEC7] font-light leading-relaxed line-clamp-3 mb-5">
            {project.description}
          </p>

          {/* Highlights List with Glowing Markers */}
          <ul className="space-y-1.5 text-xs text-[#B8AEC7]/95 font-light mb-6">
            {project.highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AFF] shadow-[0_0_6px_#BF5AFF]" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons with Neon Illumination */}
        <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between gap-3 relative z-10">
          <button
            onClick={() => {
              soundEffects.playSelect();
              onOpenModal(project);
            }}
            className="text-xs font-mono text-[#FFFFFF] hover:text-[#D8B4FE] flex items-center gap-1.5 transition-colors group-hover:neon-text-purple"
          >
            <Eye size={14} className="text-[#BF5AFF]" />
            <span>Case Details</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEffects.playHover()}
              className="text-xs font-mono text-[#8B9CFF] hover:text-[#FFFFFF] bg-[#160F25] hover:bg-[#BF5AFF]/25 border border-[#BF5AFF]/35 hover:border-[#BF5AFF] px-3 py-1 rounded-full shadow-[0_0_12px_rgba(191,90,255,0.2)] hover:shadow-[0_0_18px_rgba(191,90,255,0.4)] transition-all flex items-center gap-1"
            >
              <span>Live Project</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="relative py-32 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Neon Accent */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
            03 &bull; FEATURED WORK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)]">
            Selected Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Six distinct digital products spanning responsive web applications, interactive customization platforms, mental wellness AI, and computer vision.
          </p>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* Case Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
