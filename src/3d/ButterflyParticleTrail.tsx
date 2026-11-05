import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 160;

export const ButterflyParticleTrail: React.FC<{
  positionsRef: React.MutableRefObject<THREE.Vector3[]>;
}> = ({ positionsRef }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Particles state buffer
  const particles = useMemo(() => {
    return Array.from({ length: MAX_PARTICLES }, () => ({
      pos: new THREE.Vector3(0, -9999, 0),
      vel: new THREE.Vector3(0, 0, 0),
      life: 0,
      maxLife: 1,
      size: 0.08,
      color: Math.random() > 0.4 ? new THREE.Color('#D8B4FE') : new THREE.Color('#BF5AFF'),
    }));
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(MAX_PARTICLES * 3);
    const col = new Float32Array(MAX_PARTICLES * 3);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      pos[i * 3 + 1] = -9999;
      col[i * 3] = 0.85;
      col[i * 3 + 1] = 0.55;
      col[i * 3 + 2] = 1.0;
    }
    return [pos, col];
  }, []);

  let nextIndex = 0;

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const clampedDelta = Math.min(delta, 0.05);

    // Spawn new particles from butterfly positions
    const currentPositions = positionsRef.current;
    if (currentPositions && currentPositions.length > 0) {
      currentPositions.forEach((bPos) => {
        if (Math.random() < 0.25) {
          const p = particles[nextIndex];
          p.pos.copy(bPos).add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.25,
              (Math.random() - 0.5) * 0.2,
              (Math.random() - 0.5) * 0.25
            )
          );
          p.vel.set(
            (Math.random() - 0.5) * 0.08,
            -0.08 - Math.random() * 0.1, // gently falls
            (Math.random() - 0.5) * 0.08
          );
          p.life = 1.0;
          p.maxLife = 1.2 + Math.random() * 0.8;
          nextIndex = (nextIndex + 1) % MAX_PARTICLES;
        }
      });
    }

    // Update particles
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = pointsRef.current.geometry.attributes.color as THREE.BufferAttribute;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = particles[i];
      if (p.life > 0) {
        p.life -= clampedDelta / p.maxLife;
        p.pos.addScaledVector(p.vel, clampedDelta * 10);
        p.vel.multiplyScalar(0.96); // drag

        const alpha = Math.max(0, p.life);
        posAttr.setXYZ(i, p.pos.x, p.pos.y, p.pos.z);
        colAttr.setXYZ(i, p.color.r * alpha, p.color.g * alpha, p.color.b * alpha);
      } else {
        posAttr.setY(i, -9999);
      }
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
