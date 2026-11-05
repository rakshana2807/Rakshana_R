import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Central Futuristic Geometric Core
function CentralCore({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.25 + mouse.current[1] * 0.4;
      meshRef.current.rotation.y = t * 0.35 + mouse.current[0] * 0.4;
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.2 + mouse.current[1] * 0.3;
      wireRef.current.rotation.z = t * 0.3;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.2;
      outerRingRef.current.rotation.y = t * 0.4;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -Math.PI / 4 + Math.cos(t * 0.6) * 0.2;
      innerRingRef.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Glass / Iridescent Crystal */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef} scale={1.5}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.5}
            roughness={0.15}
            chromaticAberration={0.4}
            anisotropy={0.3}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.1}
            color="#8b5cf6"
          />
        </mesh>
      </Float>

      {/* Wireframe Holographic Lattice */}
      <mesh ref={wireRef} scale={1.8}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          wireframe
          color="#a855f7"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating Concentric Gyroscopic Rings */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.6, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#c084fc"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

// Orbiting Floating Geometric Shards
function OrbitingElements() {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.5 + (i % 3) * 0.6;
      return {
        pos: [
          Math.cos(angle) * radius,
          (Math.sin(i * 1.5) - 0.5) * 2,
          Math.sin(angle) * radius * 0.7,
        ] as [number, number, number],
        scale: 0.25 + (i % 4) * 0.1,
        speed: 0.3 + (i % 3) * 0.2,
        color: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
      };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, idx) => (
        <Float key={idx} speed={s.speed * 2} rotationIntensity={2} floatIntensity={1}>
          <mesh position={s.pos} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Cinematic Starfield & Ambient Dust Particles
function ParticleField({ count = 650 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#8b5cf6'); // Purple
    const color2 = new THREE.Color('#06b6d4'); // Cyan
    const color3 = new THREE.Color('#ffffff'); // White

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const mixed = Math.random();
      const c = mixed < 0.45 ? color1 : mixed < 0.85 ? color2 : color3;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.05;
    }
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera parallax rig that smoothly glides with mouse
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current[0] * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.current[1] * 1.2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const HeroScene: React.FC = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    // Elegant 2D Fallback for devices without WebGL
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-cyan-400/20 blur-[90px] animate-pulse-slow" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.4} />
        {/* Dynamic purple and cyan lights for cinematic depth */}
        <pointLight position={[6, 5, 4]} color="#a855f7" intensity={2.5} distance={15} />
        <pointLight position={[-6, -4, 3]} color="#06b6d4" intensity={2.2} distance={15} />
        <pointLight position={[0, -5, -4]} color="#6366f1" intensity={1.8} distance={12} />
        <directionalLight position={[0, 8, 5]} intensity={1.2} color="#ffffff" />

        <CentralCore mouse={mouse} />
        <OrbitingElements />
        <ParticleField count={450} />
        <CameraRig mouse={mouse} />
      </Canvas>
    </div>
  );
};
