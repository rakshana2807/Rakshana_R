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

  // Distinct visual preview themes for each project
  const getProjectPreview = () => {
    switch (project.id) {
      case 'royalcafe-connect':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#3b0d11] via-[#1f0a10] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                Wi-Fi Portal Experience
              </span>
              <span className="font-mono text-xs text-white/50">01</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-amber-200/80 uppercase tracking-widest">Hospitality &bull; Web UI</div>
              <div className="font-display text-lg font-bold text-white mt-0.5">RoyalCafe Connect</div>
            </div>
            {/* Subtle portal graphics */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
          </div>
        );
      case 'workhub':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c1f38] via-[#10192e] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/30">
                Desk Reservation Engine
              </span>
              <span className="font-mono text-xs text-white/50">02</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-sky-200/80 uppercase tracking-widest">Co-Working &bull; Web App</div>
              <div className="font-display text-lg font-bold text-white mt-0.5">WorkHub</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-sky-500/10 blur-xl pointer-events-none" />
          </div>
        );
      case 'mixora':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#3b0f2a] via-[#240b1e] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded border border-pink-500/30">
                Bubble Tea Customizer
              </span>
              <span className="font-mono text-xs text-white/50">03</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-pink-200/80 uppercase tracking-widest">AI Taste Matcher &bull; Interactive</div>
              <div className="font-display text-lg font-bold text-white mt-0.5">MIXORA</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-pink-500/15 blur-xl pointer-events-none" />
          </div>
        );
      case 'mindtwin-ai':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#27103d] via-[#190a2a] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-[#D8B4FE] bg-[#BF5AFF]/20 px-2 py-0.5 rounded border border-[#BF5AFF]/30">
                Digital Twin Mental Health
              </span>
              <span className="font-mono text-xs text-white/50">04</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-[#D8B4FE]/80 uppercase tracking-widest">AI &bull; Mental Wellness</div>
              <div className="font-display text-lg font-bold text-white mt-0.5">MindTwin AI</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-[#BF5AFF]/15 blur-xl pointer-events-none" />
          </div>
        );
      case 'vision-hack':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0c2b33] via-[#0b1f24] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">
                Object Detection CV
              </span>
              <span className="font-mono text-xs text-white/50">05</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-cyan-200/80 uppercase tracking-widest">Computer Vision &bull; AI</div>
              <div className="font-display text-lg font-bold text-white mt-0.5">Vision Hack</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-cyan-500/10 blur-xl pointer-events-none" />
          </div>
        );
      case 'study-mate-ai':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#0b2b1d] via-[#091f16] to-[#100B1B] p-5 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                Student Productivity UI
              </span>
              <span className="font-mono text-xs text-white/50">06</span>
            </div>
            <div className="z-10">
              <div className="text-[10px] font-mono text-emerald-200/80 uppercase tracking-widest">EdTech &bull; UI/UX Concept</div>
              <div className="font-display text-lg font-bold text-white mt-0.5">Study Mate AI</div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
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
      className="p-6 rounded-2xl neon-animated-card flex flex-col justify-between group"
    >
      <div>
        {/* Large Project Preview Image */}
        <div className="w-full h-48 rounded-xl mb-5 overflow-hidden border border-white/[0.06] relative">
          {getProjectPreview()}
        </div>

        {/* Role Pill */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono text-[#D8B4FE] bg-[#BF5AFF]/15 px-2.5 py-0.5 rounded-full border border-[#BF5AFF]/25">
            Role: {project.role}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#B8AEC7] font-light leading-relaxed line-clamp-3 mb-5">
          {project.description}
        </p>

        {/* Highlights List */}
        <ul className="space-y-1.5 text-xs text-[#B8AEC7]/90 font-light mb-6">
          {project.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AFF] shadow-[0_0_4px_#BF5AFF]" />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-purple-900/20 flex items-center justify-between gap-3">
        <button
          onClick={() => {
            soundEffects.playSelect();
            onOpenModal(project);
          }}
          className="text-xs font-mono text-[#FFFFFF] hover:text-[#D8B4FE] flex items-center gap-1.5 transition-colors"
        >
          <Eye size={13} className="text-[#BF5AFF]" />
          <span>Case Details</span>
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEffects.playHover()}
            className="text-xs font-mono text-[#8B9CFF] hover:underline flex items-center gap-1"
          >
            <span>Live Project</span>
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="relative py-32 border-t border-purple-900/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2">
            03 &bull; FEATURED WORK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF]">
            Selected Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Six distinct digital products spanning responsive web applications, interactive customization platforms, mental wellness AI, and computer vision.
          </p>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
