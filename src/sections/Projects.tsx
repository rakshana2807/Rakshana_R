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
    // Very gentle subtle tilt (max 4 degrees)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
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
        transition: 'transform 0.25s ease-out',
      }}
      className="p-6 rounded-2xl bg-[#0D0E15]/50 border border-white/[0.06] hover:border-white/20 transition-colors duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Header Visual with Subtle Luxury Tone */}
        <div className="relative w-full h-44 rounded-xl mb-5 overflow-hidden border border-white/[0.04] bg-[#12141D] flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#A4A4B0] uppercase tracking-widest">
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-[#A4A4B0]/60">
              0{project.number}
            </span>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-[#F5F5F7]">
              {project.title}
            </h4>
            <div className="text-[11px] font-mono text-[#9B6DFF] mt-0.5">
              Role: {project.role}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A4A4B0] font-light leading-relaxed line-clamp-3 mb-5">
          {project.description}
        </p>

        {/* Highlights List */}
        <ul className="space-y-1.5 text-xs text-[#A4A4B0]/80 font-light mb-6">
          {project.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#9B6DFF]" />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between gap-3">
        <button
          onClick={() => {
            soundEffects.playSelect();
            onOpenModal(project);
          }}
          className="text-xs font-mono text-[#F5F5F7] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Eye size={13} className="text-[#9B6DFF]" />
          <span>Case Details</span>
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEffects.playHover()}
            className="text-xs font-mono text-[#56BFFF] hover:underline flex items-center gap-1"
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
    <section id="projects" className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B6DFF] block mb-2">
            03 &bull; FEATURED WORK
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
            Selected Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A4A4B0] font-light max-w-2xl leading-relaxed">
            A curated portfolio of six digital products spanning user interface systems, modern frontend platforms, and emerging AI applications.
          </p>
        </div>

        {/* 6 Projects Minimal Grid */}
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
