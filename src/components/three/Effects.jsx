import React, { useMemo } from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function Effects({ isMobile = false }) {
  // Disable postprocessing on mobile to guarantee 60fps
  if (isMobile) return null;

  const aberrationOffset = useMemo(() => new THREE.Vector2(0.0008, 0.0008), []);

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* Crisp futuristic neon bloom with elevated threshold */}
      <Bloom
        luminanceThreshold={0.45}
        luminanceSmoothing={0.65}
        intensity={0.85}
        radius={0.5}
      />
      {/* Subtle chromatic lens dispersion */}
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      {/* Cosmic vignette */}
      <Vignette eskil={false} offset={0.2} darkness={0.8} />
    </EffectComposer>
  );
}
