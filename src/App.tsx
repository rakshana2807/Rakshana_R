import { useState, useEffect } from 'react';
import { Preloader } from './ui/Preloader';
import { CustomCursor } from './ui/CustomCursor';
import { BackgroundCanvas } from './3d/BackgroundCanvas';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { ResumeSection } from './sections/ResumeSection';
import { Contact } from './sections/Contact';
import { ResumeModal } from './modals/ResumeModal';
import { soundEffects } from './ui/SoundEffects';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    // Attempt subtle ambient soundscape initialization on first user interaction
    const handleFirstInteraction = () => {
      soundEffects.startAmbient();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030306] text-slate-100 selection:bg-purple-600/30 selection:text-purple-200">
      {/* Cinematic Intro Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Ambient Canvas Background */}
      <BackgroundCanvas />

      {/* Top Floating Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Education />
        <ResumeSection onOpenResume={() => setIsResumeOpen(true)} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Executive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
