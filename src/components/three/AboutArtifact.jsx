import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AboutArtifact({ isMobile = false }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Gentle levitation float
      meshRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;

      // Mouse response
      const targetX = state.pointer.y * 0.5;
      const targetY = state.pointer.x * 0.5;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    }

    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.2;
      wireRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Floating Torus Knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.32, 120, 24, 2, 3]} />
        <meshPhysicalMaterial
          color="#0B0D14"
          emissive="#00D4FF"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={wireRef}>
        <torusKnotGeometry args={[1.25, 0.28, 64, 16, 2, 3]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Atmospheric lighting */}
      <pointLight color="#00D4FF" intensity={3} distance={5} position={[2, 2, 2]} />
      <pointLight color="#8B5CF6" intensity={2.5} distance={5} position={[-2, -2, -1]} />
    </group>
  );
}
