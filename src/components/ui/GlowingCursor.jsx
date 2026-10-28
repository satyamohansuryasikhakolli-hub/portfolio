import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function GlowingCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Smooth spring physics for trailing glow ring
  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const moveHandler = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseLeaveHandler = () => setIsVisible(false);
    const mouseEnterHandler = () => setIsVisible(true);

    const handleHoverCheck = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-interactive="true"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseover', handleHoverCheck);
    document.body.addEventListener('mouseleave', mouseLeaveHandler);
    document.body.addEventListener('mouseenter', mouseEnterHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', handleHoverCheck);
      document.body.removeEventListener('mouseleave', mouseLeaveHandler);
      document.body.removeEventListener('mouseenter', mouseEnterHandler);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer ambient glow halo */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : 36,
          height: isHovered ? 64 : 36,
          backgroundColor: isHovered ? 'rgba(0, 212, 255, 0.15)' : 'rgba(139, 92, 246, 0.12)',
          border: isHovered ? '1.5px solid rgba(0, 212, 255, 0.7)' : '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 212, 255, 0.4)'
            : '0 0 10px rgba(139, 92, 246, 0.2)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#00D4FF]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
      />
    </>
  );
}
