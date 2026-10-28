import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/ui/Navbar';
import GlowingCursor from './components/ui/GlowingCursor';
import PageLoader from './components/ui/PageLoader';
import NeuralScene from './components/three/NeuralScene';
import SectionConnector from './components/ui/SectionConnector';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/ui/Footer';
import { updateScrollState } from './utils/scrollState';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Window scroll fallback to update 3D scroll progression
    const handleNativeScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? scrollY / totalScroll : 0;
      updateScrollState(progress, 0, scrollY);
    };

    // Respect prefers-reduced-motion for Lenis smooth scrolling
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleNativeScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', (e) => {
      // Stream continuous scroll progression (0 -> 1) directly to 3D world
      updateScrollState(e.progress, e.velocity, e.scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cosmos-950 text-cosmos-100 selection:bg-neon-blue/30 selection:text-neon-cyan">
      {/* Sci-Fi Initializer */}
      <PageLoader onLoaded={() => setLoaded(true)} />

      {/* Trailing Glowing Cursor for Desktop */}
      <GlowingCursor />

      {/* Unified 3D Neural Starfield & Morphing World (Fixed Viewport Canvas) */}
      <NeuralScene />

      {/* Ambient Cosmic Horizon Lighting (Hardware Accelerated) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top nebula glow */}
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px]" />
        {/* Right-mid cyan nebula glow */}
        <div className="absolute top-[35%] right-[-15%] w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[130px]" />
        {/* Left-bottom pink/violet nebula glow */}
        <div className="absolute bottom-[10%] left-[-15%] w-[650px] h-[650px] bg-neon-violet/10 rounded-full blur-[140px]" />
      </div>

      {/* Cybernetic Dots & Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-cyber-dots opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-cyber-grid opacity-30" />

      {/* Unified Navigation Bar */}
      <Navbar />

      {/* Main Content Flow connected by Energy Conduits */}
      <main className="relative z-10 flex flex-col">
        {/* Section 0: Hero Core */}
        <HeroSection />

        {/* Conduit 01: Hero -> About */}
        <SectionConnector nodeNumber="01" nodeTitle="NEURAL ARCHIVE" />

        {/* Section 1: About */}
        <AboutSection />

        {/* Conduit 02: About -> Skills */}
        <SectionConnector nodeNumber="02" nodeTitle="CAPABILITY MATRIX" />

        {/* Section 2: Skills */}
        <SkillsSection />

        {/* Conduit 03: Skills -> Projects */}
        <SectionConnector nodeNumber="03" nodeTitle="DEPLOYED BUILDS" />

        {/* Section 3: Projects */}
        <ProjectsSection />

        {/* Conduit 04: Projects -> Contact */}
        <SectionConnector nodeNumber="04" nodeTitle="TRANSMISSION PORT" />

        {/* Section 4: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
