import React from 'react';
import { motion } from 'framer-motion';

export default function SectionConnector({ nodeNumber = '01', nodeTitle = 'NEXT SECTOR' }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center my-4 sm:my-6 pointer-events-none select-none">
      {/* Upper vertical energy beam line */}
      <div className="relative w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-neon-cyan/40 to-neon-purple/60 overflow-hidden">
        {/* Rapid energy pulse packet moving downward */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-neon-cyan to-white animate-energy-pulse" />
      </div>

      {/* Cybernetic Node Conduit Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-cosmos-900/90 border border-white/10 shadow-[0_0_15px_rgba(0,212,255,0.15)] my-1"
      >
        {/* Pulsing center node dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
        </span>

        {/* Node Telemetry readout */}
        <span className="font-mono text-[10px] tracking-widest text-cosmos-400 uppercase">
          CONDUIT // <span className="text-neon-cyan font-semibold">{nodeNumber}</span> &bull; {nodeTitle}
        </span>
      </motion.div>

      {/* Lower vertical energy beam line */}
      <div className="relative w-px h-12 sm:h-16 bg-gradient-to-b from-neon-purple/60 via-neon-cyan/40 to-transparent overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-neon-purple to-white animate-energy-pulse delay-75" />
      </div>
    </div>
  );
}
