import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import WorldEnergyConduit from './WorldEnergyConduit';
import UnifiedWorldArtifact from './UnifiedWorldArtifact';
import Effects from './Effects';

export default function NeuralScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Pause rendering when tab is hidden to conserve battery & GPU
    const handleVisibilityChange = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (hasWebGLError) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-cosmos-950 via-cosmos-900 to-cosmos-950 bg-cyber-dots opacity-80 pointer-events-none z-0" />
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={isMobile ? [1, 1.1] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        frameloop={tabVisible ? 'always' : 'never'}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setHasWebGLError(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />

        <Suspense fallback={null}>
          {/* Continuous cosmic particle field responding to scroll depth */}
          <ParticleField isMobile={isMobile} />

          {/* Flowing 3D cybernetic spline conduit connecting all sections */}
          <WorldEnergyConduit isMobile={isMobile} />

          {/* Central narrative artifact morphing and traveling with scroll */}
          <UnifiedWorldArtifact isMobile={isMobile} />

          {/* Optimized neon bloom and vignette */}
          <Effects isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
