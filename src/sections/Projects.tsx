import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from '../modals/ProjectModal';
import { soundEffects } from '../ui/SoundEffects';
import {
  FolderGit2,
  ArrowUpRight,
  Eye,
  CheckCircle2
} from 'lucide-react';

// Individual 3D Tilt Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  onOpenModal: (p: Project) => void;
}> = ({ project, onOpenModal }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundEffects.playHover()}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent hover:from-purple-500/50 hover:via-indigo-500/30 hover:to-cyan-500/20 transition-all duration-500 shadow-2xl flex flex-col justify-between"
    >
      <div className="h-full rounded-[23px] bg-[#080815]/95 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/5 group-hover:border-purple-500/40 transition-all duration-500 overflow-hidden">
        
        <div>
          {/* Card Visual Header Banner */}
          <div
            className={`relative w-full h-44 rounded-2xl p-5 flex flex-col justify-between overflow-hidden mb-6 bg-gradient-to-br ${project.accentGradient} border border-white/10 shadow-inner group-hover:scale-[1.02] transition-transform duration-500`}
          >
            <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />
            
            {/* Top row in banner */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-white px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                NO. {project.number}
              </span>
              {project.isOngoing && (
                <span className="font-mono text-[10px] text-amber-200 px-2.5 py-0.5 rounded-full bg-amber-500/30 backdrop-blur-md border border-amber-400/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Ongoing</span>
                </span>
              )}
            </div>

            {/* Bottom title in banner */}
            <div className="relative z-10">
              <span className="font-mono text-[10px] text-white/70 tracking-widest uppercase">
                {project.category}
              </span>
              <h4 className="font-display text-lg font-bold text-white leading-tight mt-0.5 drop-shadow-md">
                {project.title}
              </h4>
            </div>
          </div>

          {/* Role Pill */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-md border border-cyan-800/40">
              Role: {project.role}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Highlights checklist */}
          <div className="space-y-1.5 mb-6">
            {project.highlights.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
            {project.highlights.length > 3 && (
              <div className="text-[11px] font-mono text-purple-400/80 pl-5">
                + {project.highlights.length - 3} more highlights
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              soundEffects.playWarp();
              onOpenModal(project);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-purple-600/30 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye size={14} className="text-purple-400" />
            <span>Details &amp; Architecture</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEffects.playHover()}
              className="py-2.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-1 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              title="Launch Live Application"
            >
              <span>Live</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const projects = PORTFOLIO_DATA.projects;

  const filteredProjects =
    filter === 'all'
      ? projects
      : filter === 'live'
      ? projects.filter((p) => Boolean(p.liveUrl))
      : filter === 'ai'
      ? projects.filter((p) => p.category.includes('AI') || p.category.includes('Intelligence') || p.category.includes('Vision'))
      : projects;

  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-[#030308]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <FolderGit2 size={13} />
            <span>03 &bull; FEATURED WORK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Crafted Projects &amp; Digital Solutions
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A curated showcase of 6 distinct projects spanning responsive web applications, interactive experiences, AI wellness prototypes, and computer vision.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('all');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All 6 Projects
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('live');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'live'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Live Deployed
          </button>
          <button
            onClick={() => {
              soundEffects.playSelect();
              setFilter('ai');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              filter === 'ai'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            AI &amp; Vision
          </button>
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
