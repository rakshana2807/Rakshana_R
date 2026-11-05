import { useState } from 'react';
import { Preloader } from './ui/Preloader';
import { CustomCursor } from './ui/CustomCursor';
import { BackgroundCanvas } from './3d/BackgroundCanvas';
import { ButterflyCanvas } from './components/butterflies/ButterflyCanvas';
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

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080610] text-[#FFFFFF] selection:bg-[#BF5AFF]/30 selection:text-[#D8B4FE]">
      {/* Minimal Intro Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Sleek Minimal Desktop Cursor */}
      <CustomCursor />

      {/* Deep Midnight Purple Base Lighting */}
      <BackgroundCanvas />

      {/* Flying Purple Butterflies Engine (Smooth, Realistic Flight, Luminous Dust Trails) */}
      <ButterflyCanvas />

      {/* Floating Dark Glass Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Education />
        <ResumeSection onOpenResume={() => setIsResumeOpen(true)} />
        <Contact />
      </main>

      {/* Minimal Footer */}
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
