import React from 'react';
import { ArrowUp, Terminal, ShieldCheck, Heart } from 'lucide-react';
import { personalInfo } from '../../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-cosmos-950/80 backdrop-blur-md py-12 px-4 z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Systems telemetry */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-white font-medium">
              SYSTEM STATUS: ALL CIRCUITS NOMINAL
            </span>
          </div>
          <p className="font-mono text-[11px] text-cosmos-400">
            Powered by React 18 &bull; Three.js &bull; Framer Motion &bull; Tailwind CSS
          </p>
        </div>

        {/* Center Copyright & attribution */}
        <div className="text-center font-mono text-xs text-cosmos-400">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-white">{personalInfo.name}</span>. All rights reserved.
          </p>
          <p className="text-[10px] text-cosmos-400 mt-1">
            Designed with the "Neural Cosmos" aesthetic.
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-white/10 hover:border-neon-cyan/40 text-cosmos-200 hover:text-white font-mono text-xs transition-all duration-300 hover:shadow-neon-blue group"
          data-interactive="true"
          aria-label="Back to top"
        >
          <span>ASCEND</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
