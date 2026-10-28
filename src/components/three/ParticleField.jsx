import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../../utils/scrollState';

export default function ParticleField({ isMobile = false }) {
  const pointsRef = useRef();

  // Balanced particle count for silky 60fps on all devices
  const count = isMobile ? 500 : 1400;

  const [positions, colors, originalZ] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const origZ = new Float32Array(count);

    const cyan = new THREE.Color('#00D4FF');
    const purple = new THREE.Color('#8B5CF6');
    const white = new THREE.Color('#E2E8F0');
    const pink = new THREE.Color('#EC4899');

    for (let i = 0; i < count; i++) {
      // Cosmic cylinder-spherical distribution
      const radius = 8 + Math.random() * 26;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = (Math.random() - 0.5) * 45;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      origZ[i] = z;

      // Color distribution: mostly cyan & purple, with white star highlights
      const mixRatio = Math.random();
      let chosenColor;
      if (mixRatio < 0.45) {
        chosenColor = cyan;
      } else if (mixRatio < 0.8) {
        chosenColor = purple;
      } else if (mixRatio < 0.95) {
        chosenColor = white;
      } else {
        chosenColor = pink;
      }

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col, origZ];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const progress = scrollState.progress;

    // Ambient rotation
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.05 + progress * 0.4;

    // Subtle parallax response to pointer
    const targetRotY = (state.pointer.x * Math.PI) / 12;
    const targetRotX = (-state.pointer.y * Math.PI) / 12;
    pointsRef.current.rotation.y += (targetRotY - pointsRef.current.rotation.y) * 0.04;
    pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.04;

    // Responsive Z position offset giving a sensation of traveling through space
    const targetZ = progress * 12;
    pointsRef.current.position.z += (targetZ - pointsRef.current.position.z) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.07 : 0.085}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
