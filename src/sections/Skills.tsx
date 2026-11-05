import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import {
  Palette,
  Code2,
  Terminal,
  Database,
  Sparkles,
  CheckCircle,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = PORTFOLIO_DATA.skillCategories;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-pink-400" />;
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-[#04040a]">
      {/* Background glow effects */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-700/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-700/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Zap size={13} />
            <span>02 &bull; SKILLS &amp; EXPERTISE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Technical Stack &amp; Creative Strengths
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Bridging conceptual design thinking with clean, structured code and modern web technologies.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-14">
          <button
            onClick={() => {
              soundEffects.playSelect();
              setSelectedCategory('all');
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-400'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            All Disciplines ({categories.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playSelect();
                setSelectedCategory(cat.id);
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-400'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => soundEffects.playHover()}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:from-purple-500/40 hover:via-cyan-500/20 hover:to-transparent transition-all duration-500 shadow-xl"
            >
              <div className="h-full rounded-[23px] bg-[#080814]/90 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between border border-white/5 group-hover:border-purple-500/30 transition-all duration-500">
                
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      {getIcon(category.iconName)}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                      {category.skills.length} Competencies
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
                    {category.tagline}
                  </p>

                  {/* Skills List with Level Tags */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all duration-300 ${
                          skill.highlight
                            ? 'bg-purple-950/25 border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-950/40'
                            : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle
                            size={14}
                            className={
                              skill.highlight ? 'text-purple-400' : 'text-slate-500'
                            }
                          />
                          <span
                            className={
                              skill.highlight
                                ? 'font-semibold text-slate-100'
                                : 'text-slate-300'
                            }
                          >
                            {skill.name}
                          </span>
                        </div>
                        {skill.level && (
                          <span className="font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative bar */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Layers size={13} className="text-purple-400" />
                    <span>Industry Ready</span>
                  </span>
                  <span className="text-cyan-400">&bull; Verified Knowledge</span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Design Tools & Engineering Flow Highlight Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0a0a1a] to-cyan-950/30 border border-purple-500/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-lg font-bold text-white">
              End-to-End Creative &amp; Engineering Workflow
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              From user research, wireframing &amp; Figma prototyping to clean React code &amp; interactive WebGL depth.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-purple-300">
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30">Figma</span>
            <span>&rarr;</span>
            <span className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30">HTML5/CSS3</span>
            <span>&rarr;</span>
            <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">React &amp; JS</span>
            <span>&rarr;</span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">3D Interaction</span>
          </div>
        </div>

      </div>
    </section>
  );
};
