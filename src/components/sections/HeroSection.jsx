import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Sparkles, Send, FolderGit2 } from 'lucide-react';
import ScrambleText from '../ui/ScrambleText';
import { personalInfo } from '../../data/content';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-neon-cyan/30 text-neon-cyan font-mono text-xs tracking-wider mb-6 shadow-neon-blue"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          <span>{personalInfo.status}</span>
        </motion.div>

        {/* Name with text scramble effect */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4"
        >
          <ScrambleText text={personalInfo.name} speed={30} delay={200} />
        </motion.h1>

        {/* Title / Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <h2 className="font-mono text-base sm:text-xl md:text-2xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
            {personalInfo.title}
          </h2>
        </motion.div>

        {/* Short Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-cosmos-200 text-sm sm:text-base leading-relaxed mb-10"
        >
          Crafting intelligent systems, robust software architectures, and immersive web experiences at the cutting edge of AI and computation.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative px-7 py-3 rounded-xl font-mono text-sm font-semibold text-white overflow-hidden transition-all duration-300 shadow-neon-blue flex items-center gap-2.5 bg-gradient-to-r from-neon-blue to-neon-purple hover:scale-[1.02] active:scale-[0.98]"
            data-interactive="true"
          >
            <FolderGit2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>View Projects</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="group px-7 py-3 rounded-xl font-mono text-sm font-semibold text-cosmos-100 glass-panel border border-white/10 hover:border-neon-cyan/50 hover:text-white transition-all duration-300 hover:shadow-neon-blue flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
            data-interactive="true"
          >
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Technical focus pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden sm:flex items-center gap-6 text-xs font-mono text-cosmos-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
            <span>AI & Machine Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
            <span>Full-Stack Development</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
            <span>Algorithms & Systems</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => scrollTo('about')}
      >
        <span className="font-mono text-[10px] tracking-widest text-cosmos-400 uppercase group-hover:text-neon-cyan transition-colors">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 group-hover:border-neon-cyan transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-neon-cyan"
          />
        </div>
      </motion.div>
    </section>
  );
}
