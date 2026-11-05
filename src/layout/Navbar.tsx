import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 30);

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 180;

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
    if (!muted) soundEffects.playSelect();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between px-5 py-2.5 rounded-full bg-[#0D0E15]/75 backdrop-blur-md border border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            
            {/* Minimal Logo Monogram */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('home');
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-display font-bold text-[#F5F5F7] group-hover:border-[#9B6DFF]/50 transition-colors">
                RR
              </div>
              <span className="font-display font-medium text-xs tracking-wider text-[#F5F5F7] group-hover:text-white transition-colors">
                RAKSHANA R.
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    onMouseEnter={() => soundEffects.playHover()}
                    className={`relative px-3 py-1 rounded-full text-xs transition-colors duration-200 ${
                      isActive
                        ? 'text-[#F5F5F7] font-medium bg-white/[0.08]'
                        : 'text-[#A4A4B0] hover:text-[#F5F5F7]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Subtle Audio Toggle */}
              <button
                onClick={handleToggleSound}
                onMouseEnter={() => soundEffects.playHover()}
                title={isMuted ? 'Unmute subtle sounds' : 'Mute subtle sounds'}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#A4A4B0] hover:text-[#F5F5F7] hover:bg-white/5 transition-colors"
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#9B6DFF]" />}
              </button>

              {/* Minimal Resume Button */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-[#F5F5F7] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <span>Resume</span>
                <ArrowUpRight size={12} className="text-[#A4A4B0]" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#A4A4B0] hover:text-[#F5F5F7]"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-4 mt-2 p-4 rounded-2xl bg-[#0D0E15]/95 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-white/[0.08] text-[#F5F5F7]'
                        : 'text-[#A4A4B0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#9B6DFF]" />}
                  </button>
                );
              })}
              <div className="pt-2 mt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl text-xs font-medium text-[#F5F5F7] bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center gap-1.5"
                >
                  <span>Resume Preview</span>
                  <ArrowUpRight size={13} className="text-[#A4A4B0]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
