import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { Volume2, VolumeX, Menu, X, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy for active section
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundEffects.playSelect();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleToggleSound = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEffects.playSelect();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between px-4 py-2.5 rounded-full bg-[#07070d]/75 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            
            {/* Logo Monogram */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('home');
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <div className="w-full h-full bg-[#090914] rounded-[11px] flex items-center justify-center">
                  <span className="font-display font-black text-sm tracking-tighter text-white">
                    {PORTFOLIO_DATA.personal.initials}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display font-bold text-sm tracking-wider text-slate-100 group-hover:text-purple-300 transition-colors">
                  {PORTFOLIO_DATA.personal.name}
                </span>
                <span className="text-[10px] font-mono text-purple-400/90 -mt-0.5 tracking-wider">
                  UI/UX &bull; FRONTEND
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    onMouseEnter={() => soundEffects.playHover()}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-purple-600/25 border border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2">
              {/* Sound Synthesizer Mute Toggle */}
              <button
                onClick={handleToggleSound}
                onMouseEnter={() => soundEffects.playHover()}
                title={isMuted ? 'Unmute interactive sound effects' : 'Mute interactive sound effects'}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-purple-300 hover:bg-white/5 border border-white/5 transition-colors"
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-cyan-400" />}
              </button>

              {/* Resume CTA */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.35)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
              >
                <Download size={13} />
                <span>Resume</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-4 mt-2 p-4 rounded-3xl bg-[#090914]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600/30 text-white border border-purple-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <Sparkles size={14} className="text-cyan-400" />}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-center text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center gap-2"
                >
                  <Download size={14} />
                  <span>Download / Preview Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
