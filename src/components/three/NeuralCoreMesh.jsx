import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NeuralCoreMesh({ isMobile = false }) {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const ringRef = useRef();
  const nodesRef = useRef();

  // Create node points at icosahedron vertices for neural network feel
  const { nodePositions, originalVertices } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 1);
    const pos = geo.attributes.position;
    const count = pos.count;
    const original = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      original[i] = pos.array[i];
    }
    return { nodePositions: geo.attributes.position.array, originalVertices: original };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotate outer wireframe
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.25;
      outerMeshRef.current.rotation.y += delta * 0.35;

      // Mouse tracking interpolation
      const targetRotX = state.pointer.y * 0.6;
      const targetRotY = state.pointer.x * 0.6;
      outerMeshRef.current.rotation.x += (targetRotX - outerMeshRef.current.rotation.x) * 0.04;
      outerMeshRef.current.rotation.y += (targetRotY - outerMeshRef.current.rotation.y) * 0.04;

      // Vertex pulse / wave displacement
      const pos = outerMeshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const ox = originalVertices[i * 3];
        const oy = originalVertices[i * 3 + 1];
        const oz = originalVertices[i * 3 + 2];
        const wave = 1 + 0.08 * Math.sin(time * 3 + ox * 2 + oy * 2);
        pos.setXYZ(i, ox * wave, oy * wave, oz * wave);
      }
      pos.needsUpdate = true;
    }

    // Inner pulsating core
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.4;
      const scale = 1 + Math.sin(time * 2.5) * 0.08;
      innerMeshRef.current.scale.set(scale, scale, scale);
    }

    // Outer orbiting synaptic ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Distorted Wireframe Icosahedron */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          wireframe
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Neural Nodes / Synapses at vertices */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.12 : 0.16}
          color="#8B5CF6"
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.9}
        />
      </points>

      {/* Inner Glowing Holographic Sphere */}
      <mesh ref={innerMeshRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial
          color="#0B0D14"
          emissive="#8B5CF6"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Inner Core Core Light */}
      <pointLight color="#00D4FF" intensity={2.5} distance={6} decay={2} />
      <pointLight color="#8B5CF6" intensity={2.0} distance={7} decay={2} position={[0, -1, 1]} />

      {/* Orbiting Synaptic Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
