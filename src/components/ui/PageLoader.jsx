import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING NEURAL CORE...');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 20, text: 'CALIBRATING SYNAPSE MESH...' },
      { at: 50, text: 'WARMING 3D SHADERS & STARFIELD...' },
      { at: 75, text: 'DECODING SYSTEM PROTOCOLS...' },
      { at: 95, text: 'NEURAL COSMOS ONLINE' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            if (onLoaded) onLoaded();
          }, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 8;
        const bounded = Math.min(next, 100);
        const match = statuses.filter((s) => bounded >= s.at).pop();
        if (match) setStatusText(match.text);
        return bounded;
      });
    }, 28);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmos-950 text-white select-none"
        >
          {/* Cybernetic Geometric Ring */}
          <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
            {/* Outer spinning dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-neon-blue/40"
            />
            {/* Inner counter-spinning ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-neon-purple/40"
            />
            {/* Pulsing center node */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple shadow-[0_0_25px_#00D4FF]"
            />
          </div>

          {/* Progress readout */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              {progress}%
            </span>

            {/* Glowing progress bar */}
            <div className="w-56 h-1 bg-cosmos-800 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple shadow-[0_0_12px_#00D4FF]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="font-mono text-xs tracking-widest text-cosmos-400 mt-2">
              {statusText}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
