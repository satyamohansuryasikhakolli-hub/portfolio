import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, GraduationCap, MapPin, Sparkles, Terminal, Activity, Shield, Cpu } from 'lucide-react';
import { personalInfo } from '../../data/content';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple font-mono text-xs mb-3 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
        >
          <BrainCircuit className="w-3.5 h-3.5 text-neon-purple" />
          <span>NEURAL ARCHIVE // 01</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
        >
          About The Developer
        </motion.h2>
      </div>

      {/* Grid: Bio Glass Panel & 3D Holographic Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Glass Bio Panel */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle cyan corner glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-48 h-48 bg-neon-blue/10 rounded-full blur-3xl" />
          
          <div className="flex items-center justify-between text-neon-cyan font-mono text-xs mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-cyan" />
              <span>BIO_PROFILE.INIT()</span>
            </div>
            <span className="text-[11px] text-cosmos-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
              SYS ID: SM-01
            </span>
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-4 text-cosmos-200 text-sm sm:text-base leading-relaxed mb-8">
            {personalInfo.bio.map((para, idx) => (
              <p key={idx} className="relative z-10">
                {para}
              </p>
            ))}
          </div>

          {/* Info Badges (Degree & Location) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cosmos-900/80 border border-white/5 hover:border-neon-cyan/30 transition-colors">
              <GraduationCap className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
              <div>
                <span className="text-cosmos-400 block mb-0.5 text-[11px]">Academic Track</span>
                <span className="text-white font-medium block">
                  {personalInfo.education.degree}
                </span>
                <span className="text-cosmos-400 text-[11px] block mt-0.5">
                  {personalInfo.education.institution}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cosmos-900/80 border border-white/5 hover:border-neon-purple/30 transition-colors">
              <MapPin className="w-5 h-5 text-neon-purple shrink-0 mt-0.5" />
              <div>
                <span className="text-cosmos-400 block mb-0.5 text-[11px]">Base Coordinates</span>
                <span className="text-white font-medium block">
                  {personalInfo.location}
                </span>
                <span className="text-neon-cyan text-[11px] block mt-0.5">
                  Open to Remote & Relocation
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Holographic Observation Chamber (Frames 3D Quantum Lattice behind it) */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl glass-card border border-white/10 flex flex-col justify-between p-6 overflow-hidden group hover:border-neon-cyan/40 transition-all duration-500"
        >
          {/* Header Telemetry HUD */}
          <div className="relative z-20 flex justify-between items-center text-xs font-mono text-cosmos-400">
            <span className="flex items-center gap-1.5 text-neon-cyan">
              <Sparkles className="w-3.5 h-3.5" />
              <span>QUANTUM_LATTICE</span>
            </span>
            <span className="text-[10px] bg-neon-purple/10 text-neon-purple px-2 py-0.5 rounded border border-neon-purple/30 flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>SYNAPSE ACTIVE</span>
            </span>
          </div>

          {/* Central Target Reticle HUD Framing the Floating 3D Artifact */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
            {/* Outer HUD targeting circle */}
            <div className="w-36 h-36 rounded-full border border-dashed border-neon-cyan/30 flex items-center justify-center animate-spin-slow">
              {/* Inner crosshairs */}
              <div className="w-24 h-24 rounded-full border border-neon-purple/30 relative">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-neon-cyan" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-neon-cyan" />
                <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-2 w-0.5 bg-neon-cyan" />
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-2 w-0.5 bg-neon-cyan" />
              </div>
            </div>

            <p className="font-mono text-[11px] tracking-wider text-cosmos-400 mt-4 text-center">
              &bull; 3D QUANTUM CORE SYNCHRONIZED &bull;
            </p>
          </div>

          {/* Bottom HUD Specs */}
          <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-cosmos-400">
            <span className="flex items-center gap-1.5 text-cosmos-200">
              <Cpu className="w-3.5 h-3.5 text-neon-cyan" />
              <span>60 FPS UNIFIED RENDER</span>
            </span>
            <span className="text-neon-cyan">ROTATING 3D</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
