import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../../utils/scrollState';

export default function UnifiedWorldArtifact({ isMobile = false }) {
  const rootGroupRef = useRef();
  const neuralCoreRef = useRef();
  const quantumTorusRef = useRef();
  const matrixRingsRef = useRef();
  const portalNodeRef = useRef();

  // Synaptic vertices positions for Neural Core
  const nodePositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.0, 1);
    return geo.attributes.position.array;
  }, []);

  // Pre-allocate lerp target vectors to prevent garbage collection hiccups
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetRot = useMemo(() => new THREE.Euler(), []);

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    const time = state.clock.getElapsedTime();
    const progress = scrollState.progress;
    const pointer = state.pointer;

    // =========================================================================
    // SECTION CHOREOGRAPHY BASED ON CONTINUOUS SCROLL PROGRESS (0 -> 1)
    // 0.00 - 0.18: Hero (Centered Neural Core)
    // 0.18 - 0.40: About (Flanked Right, Quantum Torus Artifact)
    // 0.40 - 0.65: Skills (Background Ambient Constellation Matrix)
    // 0.65 - 0.85: Projects (Left Flank Orbital Node)
    // 0.85 - 1.00: Contact (Transmission Portal Node)
    // =========================================================================

    let posX = 0;
    let posY = 0;
    let posZ = 0;
    let coreOpacity = 0;
    let torusOpacity = 0;
    let matrixOpacity = 0;
    let portalOpacity = 0;

    if (progress < 0.18) {
      // --- HERO STAGE ---
      const stageT = progress / 0.18;
      posX = isMobile ? 0 : 0.8 * (1 - stageT);
      posY = isMobile ? -0.2 : 0;
      posZ = 0;
      coreOpacity = 1;
      torusOpacity = 0;
      matrixOpacity = 0;
      portalOpacity = 0;
    } else if (progress < 0.40) {
      // --- ABOUT STAGE ---
      const stageT = (progress - 0.18) / 0.22;
      // Morph position to right column to align with About holographic frame
      posX = isMobile ? 0 : THREE.MathUtils.lerp(0, 2.5, stageT);
      posY = isMobile ? -0.8 : THREE.MathUtils.lerp(0, 0.1, stageT);
      posZ = THREE.MathUtils.lerp(0, 0.4, stageT);
      coreOpacity = Math.max(0, 1 - stageT * 2);
      torusOpacity = Math.min(1, stageT * 1.5);
      matrixOpacity = 0;
      portalOpacity = 0;
    } else if (progress < 0.65) {
      // --- SKILLS STAGE ---
      const stageT = (progress - 0.40) / 0.25;
      posX = isMobile ? 0 : THREE.MathUtils.lerp(2.5, 0, stageT);
      posY = THREE.MathUtils.lerp(0.1, 0.5, stageT);
      posZ = THREE.MathUtils.lerp(0.4, -2.8, stageT);
      coreOpacity = 0;
      torusOpacity = Math.max(0, 1 - stageT * 2);
      matrixOpacity = Math.min(1, stageT * 2);
      portalOpacity = 0;
    } else if (progress < 0.85) {
      // --- PROJECTS STAGE ---
      const stageT = (progress - 0.65) / 0.20;
      posX = isMobile ? 0 : THREE.MathUtils.lerp(0, -2.6, stageT);
      posY = THREE.MathUtils.lerp(0.5, 0, stageT);
      posZ = THREE.MathUtils.lerp(-2.8, -1.2, stageT);
      coreOpacity = 0;
      torusOpacity = 0;
      matrixOpacity = Math.max(0, 1 - stageT);
      portalOpacity = Math.min(1, stageT * 1.5);
    } else {
      // --- CONTACT STAGE ---
      const stageT = (progress - 0.85) / 0.15;
      posX = THREE.MathUtils.lerp(isMobile ? 0 : -2.6, 0, stageT);
      posY = THREE.MathUtils.lerp(0, 0.3, stageT);
      posZ = THREE.MathUtils.lerp(-1.2, 0.2, stageT);
      coreOpacity = 0;
      torusOpacity = 0;
      matrixOpacity = 0;
      portalOpacity = 1;
    }

    targetPos.set(posX, posY, posZ);
    rootGroupRef.current.position.lerp(targetPos, 0.06);

    // Dynamic mouse parallax on root group
    const mouseInfluenceX = pointer.x * 0.4;
    const mouseInfluenceY = pointer.y * 0.4;
    rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.y,
      time * 0.15 + mouseInfluenceX,
      0.05
    );
    rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      rootGroupRef.current.rotation.x,
      -mouseInfluenceY,
      0.05
    );

    // =========================================================================
    // SUB-ELEMENT HIGH-PERFORMANCE GPU ANIMATIONS
    // =========================================================================

    // 1. Neural Core Animations (Hero)
    if (neuralCoreRef.current) {
      neuralCoreRef.current.visible = coreOpacity > 0.01;
      if (neuralCoreRef.current.visible) {
        neuralCoreRef.current.rotation.y += delta * 0.35;
        neuralCoreRef.current.rotation.z += delta * 0.2;
        const pulse = 1 + 0.05 * Math.sin(time * 2.5);
        neuralCoreRef.current.scale.set(pulse, pulse, pulse);
      }
    }

    // 2. Quantum Torus Lattice Animations (About)
    if (quantumTorusRef.current) {
      quantumTorusRef.current.visible = torusOpacity > 0.01;
      if (quantumTorusRef.current.visible) {
        quantumTorusRef.current.rotation.x += delta * 0.4;
        quantumTorusRef.current.rotation.y += delta * 0.55;
        const levitate = Math.sin(time * 1.8) * 0.12;
        quantumTorusRef.current.position.y = levitate;
      }
    }

    // 3. Constellation Matrix Rings (Skills)
    if (matrixRingsRef.current) {
      matrixRingsRef.current.visible = matrixOpacity > 0.01;
      if (matrixRingsRef.current.visible) {
        matrixRingsRef.current.rotation.z += delta * 0.3;
        matrixRingsRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      }
    }

    // 4. Transmission Portal Node (Projects & Contact)
    if (portalNodeRef.current) {
      portalNodeRef.current.visible = portalOpacity > 0.01;
      if (portalNodeRef.current.visible) {
        portalNodeRef.current.rotation.z -= delta * 0.45;
        const portalPulse = 1 + 0.08 * Math.sin(time * 3);
        portalNodeRef.current.scale.set(portalPulse, portalPulse, portalPulse);
      }
    }
  });

  return (
    <group ref={rootGroupRef}>
      {/* ----------------------------------------------------------------- */}
      {/* 1. NEURAL CORE (Featured in Hero)                                 */}
      {/* ----------------------------------------------------------------- */}
      <group ref={neuralCoreRef}>
        {/* Outer Wireframe Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[2.0, 1]} />
          <meshStandardMaterial
            wireframe
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Synaptic vertex nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={nodePositions.length / 3}
              array={nodePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.12 : 0.15}
            color="#8B5CF6"
            blending={THREE.AdditiveBlending}
            transparent
            opacity={0.9}
          />
        </points>

        {/* Inner Glowing Core Sphere */}
        <mesh>
          <sphereGeometry args={[1.05, 24, 24]} />
          <meshStandardMaterial
            color="#0B0D14"
            emissive="#8B5CF6"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Orbiting Synaptic Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.9, 0.025, 16, 64]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* 2. QUANTUM TORUS LATTICE (Featured in About)                      */}
      {/* ----------------------------------------------------------------- */}
      <group ref={quantumTorusRef}>
        {/* Solid Torus Knot */}
        <mesh>
          <torusKnotGeometry args={[1.15, 0.32, 90, 20, 2, 3]} />
          <meshPhysicalMaterial
            color="#07090E"
            emissive="#00D4FF"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Outer Wireframe Cage */}
        <mesh>
          <torusKnotGeometry args={[1.28, 0.28, 50, 14, 2, 3]} />
          <meshBasicMaterial
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* 3. CONSTELLATION MATRIX RINGS (Featured in Skills)                */}
      {/* ----------------------------------------------------------------- */}
      <group ref={matrixRingsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.02, 12, 64]} />
          <meshBasicMaterial color="#00D4FF" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.015, 12, 64]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.8, 0.018, 12, 64]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ----------------------------------------------------------------- */}
      {/* 4. TRANSMISSION PORTAL NODE (Featured in Projects & Contact)      */}
      {/* ----------------------------------------------------------------- */}
      <group ref={portalNodeRef}>
        {/* Dual cybernetic rings */}
        <mesh>
          <ringGeometry args={[1.4, 1.48, 48]} />
          <meshBasicMaterial
            color="#00D4FF"
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
          />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <ringGeometry args={[1.8, 1.86, 48]} />
          <meshBasicMaterial
            color="#8B5CF6"
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#0B0D14"
            emissive="#00D4FF"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Unified Atmospheric Lighting for all stages */}
      <pointLight color="#00D4FF" intensity={2.5} distance={7} decay={2} position={[1.5, 1.5, 2]} />
      <pointLight color="#8B5CF6" intensity={2.0} distance={7} decay={2} position={[-1.5, -1.5, 1]} />
    </group>
  );
}
