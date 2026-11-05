import React, { useState, useEffect } from 'react';
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between px-5 py-2.5 rounded-full bg-[#100B1B]/80 backdrop-blur-xl border border-[#BF5AFF]/20 shadow-[0_4px_30px_rgba(8,6,16,0.8),0_0_15px_rgba(191,90,255,0.12)]">
            
            {/* Logo Monogram */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('home');
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#160F25] border border-[#BF5AFF]/35 flex items-center justify-center text-xs font-display font-bold text-[#FFFFFF] group-hover:border-[#BF5AFF] group-hover:shadow-[0_0_12px_rgba(191,90,255,0.4)] transition-all">
                RR
              </div>
              <span className="font-display font-medium text-xs tracking-wider text-[#FFFFFF] group-hover:text-[#D8B4FE] transition-colors">
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
                    className={`relative px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                      isActive
                        ? 'text-[#FFFFFF] font-medium bg-[#BF5AFF]/20 border border-[#BF5AFF]/40 shadow-[0_0_12px_rgba(191,90,255,0.3)]'
                        : 'text-[#B8AEC7] hover:text-[#FFFFFF] hover:bg-white/[0.04]'
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
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#B8AEC7] hover:text-[#BF5AFF] hover:bg-white/5 transition-colors"
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#BF5AFF]" />}
              </button>

              {/* Minimal Resume Button with Soft Neon Border */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-medium text-[#FFFFFF] bg-[#160F25] hover:bg-[#1E1533] border border-[#BF5AFF]/30 hover:border-[#BF5AFF]/70 hover:shadow-[0_0_15px_rgba(191,90,255,0.35)] transition-all duration-200"
              >
                <span>Resume</span>
                <ArrowUpRight size={12} className="text-[#D8B4FE]" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  soundEffects.playSelect();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#B8AEC7] hover:text-[#FFFFFF]"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-4 mt-2 p-4 rounded-2xl bg-[#100B1B]/95 backdrop-blur-2xl border border-[#BF5AFF]/25 shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#BF5AFF]/20 text-[#FFFFFF] border border-[#BF5AFF]/40'
                        : 'text-[#B8AEC7] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#BF5AFF] shadow-[0_0_6px_#BF5AFF]" />}
                  </button>
                );
              })}
              <div className="pt-2 mt-2 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    soundEffects.playSelect();
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl text-xs font-medium text-[#FFFFFF] bg-[#160F25] border border-[#BF5AFF]/30 hover:border-[#BF5AFF] flex items-center justify-center gap-1.5"
                >
                  <span>Resume Preview</span>
                  <ArrowUpRight size={13} className="text-[#D8B4FE]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
