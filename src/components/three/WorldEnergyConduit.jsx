import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../../utils/scrollState';

export default function WorldEnergyConduit({ isMobile = false }) {
  const curveRef = useRef();
  const pulseGroupRef = useRef();

  // Create an organic 3D spline pathway that gracefully weaves through the virtual space
  const { curve, linePoints, pulseCount } = useMemo(() => {
    // 3D control points connecting the conceptual coordinates of each section
    const points = [
      new THREE.Vector3(0, 9, -2),       // Entry above Hero
      new THREE.Vector3(1.6, 4.5, -1),   // Beside Hero status
      new THREE.Vector3(2.4, 0.5, 0),    // Right flank at About section
      new THREE.Vector3(0.5, -4, -1.5),  // Center-tapering into Skills
      new THREE.Vector3(-2.2, -8, -0.8), // Left flank at Projects section
      new THREE.Vector3(-0.6, -12, -1.2),// Center-transition
      new THREE.Vector3(0, -16, -0.5),   // Convergence at Contact section
      new THREE.Vector3(0, -22, -3)      // Sub-horizon exit
    ];

    const catmullCurve = new THREE.CatmullRomCurve3(points);
    const pts = catmullCurve.getPoints(120);

    return {
      curve: catmullCurve,
      linePoints: pts,
      pulseCount: isMobile ? 6 : 12,
    };
  }, [isMobile]);

  // Pre-allocate vector objects to avoid garbage collection stutter in useFrame
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  // Geometry for the stationary glowing conduit line
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const count = linePoints.length;
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00D4FF');
    const purple = new THREE.Color('#8B5CF6');

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const c = new THREE.Color().lerpColors(cyan, purple, Math.sin(t * Math.PI));
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [linePoints]);

  // Positions of energy pulse beads along the spline
  const pulseOffsets = useMemo(() => {
    const arr = [];
    for (let i = 0; i < pulseCount; i++) {
      arr.push(i / pulseCount);
    }
    return arr;
  }, [pulseCount]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const progress = scrollState.progress;

    // Camera/world parallax alignment
    if (curveRef.current) {
      // Gently translate the conduit vertically matching overall page scroll
      const targetY = progress * 14 - 1;
      curveRef.current.position.y += (targetY - curveRef.current.position.y) * 0.05;
      curveRef.current.rotation.y = Math.sin(time * 0.2) * 0.08;
    }

    // Update positions of traveling energy pulse beads
    if (pulseGroupRef.current) {
      const children = pulseGroupRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const bead = children[i];
        // Move beads downward along curve, speeding up slightly during scroll
        const speed = 0.08 + Math.abs(scrollState.velocity || 0) * 0.0005;
        let t = (pulseOffsets[i] + time * speed) % 1;
        if (t < 0) t += 1;

        curve.getPointAt(t, tempPos);
        bead.position.copy(tempPos);

        // Pulse scale based on progress matching
        const pulseScale = 0.8 + 0.4 * Math.sin(time * 5 + i);
        bead.scale.set(pulseScale, pulseScale, pulseScale);
      }
    }
  });

  return (
    <group ref={curveRef} position={[0, 0, 0]}>
      {/* Primary Cyber Spline Filament */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={isMobile ? 0.35 : 0.45}
          blending={THREE.AdditiveBlending}
          linewidth={1}
        />
      </line>

      {/* Traveling Energy Pulse Packets */}
      <group ref={pulseGroupRef}>
        {pulseOffsets.map((_, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? '#00D4FF' : '#8B5CF6'}
              blending={THREE.AdditiveBlending}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
