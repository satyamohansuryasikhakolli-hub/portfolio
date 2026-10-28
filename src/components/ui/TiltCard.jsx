import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({ children, className = '', glowColor = '#00D4FF', onClick }) {
  const cardRef = useRef(null);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High performance spring physics computed purely in the DOM without React state re-renders
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      data-interactive="true"
      className={`relative overflow-hidden rounded-3xl glass-card transition-colors duration-300 ${className}`}
    >
      {/* Dynamic Specular Edge Glow accent */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `0 0 25px -5px ${glowColor}40`,
          borderColor: `${glowColor}50`,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
