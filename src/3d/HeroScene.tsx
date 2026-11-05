import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Single, Refined Realistic Floating Glass Sculpture
function GlassSculpture({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Stately, smooth, slow cinematic rotation
      meshRef.current.rotation.x = t * 0.08 + mouse.current[1] * 0.2;
      meshRef.current.rotation.y = t * 0.12 + mouse.current[0] * 0.25;
      meshRef.current.rotation.z = Math.sin(t * 0.05) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.15}>
        {/* Elegant geometric glass sculpture - single smooth abstract form */}
        <torusKnotGeometry args={[1.05, 0.34, 160, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          resolution={512}
          thickness={1.1}
          roughness={0.08}
          transmission={0.96}
          ior={1.5}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#FAF8FF"
          attenuationColor="#9B6DFF"
          attenuationDistance={1.8}
        />
      </mesh>
    </Float>
  );
}

// Gentle Camera Parallax Rig
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouse.current[0] * 0.6,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouse.current[1] * 0.4,
      0.03
    );
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
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#9B6DFF]/10 to-[#56BFFF]/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Subtle, refined cinematic lighting: soft violet & electric blue */}
        <ambientLight intensity={0.5} color="#181A26" />
        <directionalLight position={[4, 5, 4]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-4, 3, 2]} color="#9B6DFF" intensity={2.0} distance={10} />
        <pointLight position={[4, -3, 2]} color="#56BFFF" intensity={1.6} distance={10} />
        <pointLight position={[0, -4, -2]} color="#1E2032" intensity={1.0} distance={8} />

        <GlassSculpture mouse={mouse} />
        <CameraRig mouse={mouse} />
      </Canvas>
    </div>
  );
};
