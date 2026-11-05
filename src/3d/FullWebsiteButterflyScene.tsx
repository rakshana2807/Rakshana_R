import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ButterflyModel } from './ButterflyModel';
import { ButterflyParticleTrail } from './ButterflyParticleTrail';

// Camera rig that provides mouse parallax and smooth scroll tracking
function CameraRig({
  mouse,
  scrollProgress,
}: {
  mouse: React.MutableRefObject<[number, number]>;
  scrollProgress: React.MutableRefObject<number>;
}) {
  useFrame((state) => {
    // Scroll progress maps camera down through the continuous 3D space of all sections
    const targetY = scrollProgress.current * -20;
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouse.current[1] * 0.8, 0.04);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current[0] * 1.5, 0.04);
  });
  return null;
}

export const FullWebsiteButterflyScene: React.FC = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const scrollProgress = useRef<number>(0);
  const butterflyPositions = useRef<THREE.Vector3[]>([]);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Device check for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mouse tracking for parallax and interactive evasion
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    // Scroll tracking across all website sections
    const onScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollProgress.current = window.scrollY / totalScroll;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Graceful 2D fallback for devices without WebGL
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#BF5AFF]/10 rounded-full blur-[140px]" />
      </div>
    );
  }

  // Butterfly fleet configuration spanning vertical space and 3D depths
  // Reduced count on mobile for optimum 60 FPS
  const butterflyConfigs = isMobile
    ? [
        { initial: [-2.5, 1.2, 0.5] as [number, number, number], scale: 0.9, speed: 1.0, flapSpeed: 1.1 },
        { initial: [2.2, -4.5, -1.0] as [number, number, number], scale: 0.75, speed: 0.9, flapSpeed: 1.0 },
        { initial: [-1.8, -12.0, 0.2] as [number, number, number], scale: 0.85, speed: 1.1, flapSpeed: 1.2 },
        { initial: [1.5, -18.0, -0.8] as [number, number, number], scale: 0.7, speed: 0.85, flapSpeed: 0.95 },
      ]
    : [
        // 1. Hero Foreground butterfly (near camera, flying gracefully near headline)
        { initial: [3.2, 0.6, 1.8] as [number, number, number], scale: 1.15, speed: 1.05, flapSpeed: 1.05 },
        // 2. Hero Midground butterfly (cruising from left)
        { initial: [-3.8, 1.5, -0.5] as [number, number, number], scale: 0.85, speed: 0.95, flapSpeed: 1.1 },
        // 3. About Section butterfly (navigating down to section 1)
        { initial: [-2.4, -4.2, 0.8] as [number, number, number], scale: 1.0, speed: 1.15, flapSpeed: 1.2 },
        // 4. Skills Section butterfly (hovering in midground)
        { initial: [3.5, -7.8, -1.2] as [number, number, number], scale: 0.75, speed: 0.9, flapSpeed: 0.95 },
        // 5. Projects Section Foreground butterfly (gliding near project showcase)
        { initial: [-3.2, -11.5, 1.2] as [number, number, number], scale: 1.1, speed: 1.1, flapSpeed: 1.15 },
        // 6. Certifications & Experience butterfly
        { initial: [2.8, -15.2, -0.4] as [number, number, number], scale: 0.85, speed: 0.95, flapSpeed: 1.0 },
        // 7. Education & Resume butterfly
        { initial: [-2.6, -18.8, 0.4] as [number, number, number], scale: 0.9, speed: 1.0, flapSpeed: 1.05 },
        // 8. Contact Section butterfly (settling near contact interface)
        { initial: [1.8, -22.4, 0.9] as [number, number, number], scale: 0.95, speed: 1.05, flapSpeed: 1.1 },
      ];

  const updateButterflyPos = (index: number, pos: THREE.Vector3) => {
    butterflyPositions.current[index] = pos;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        {/* Soft Midnight & Neon Purple Cinematic Lighting */}
        <ambientLight intensity={0.45} color="#16082B" />
        <directionalLight position={[5, 8, 5]} intensity={1.1} color="#FFFFFF" />
        <pointLight position={[-6, 4, 3]} color="#BF5AFF" intensity={1.8} distance={15} />
        <pointLight position={[6, -8, 2]} color="#D8B4FE" intensity={1.6} distance={15} />
        <pointLight position={[0, -18, 3]} color="#8B9CFF" intensity={1.5} distance={15} />

        {/* Fleet of Realistic 3D Butterflies */}
        {butterflyConfigs.map((cfg, idx) => (
          <ButterflyModel
            key={idx}
            initialPosition={cfg.initial}
            scale={cfg.scale}
            speed={cfg.speed}
            flapSpeed={cfg.flapSpeed}
            onPositionUpdate={(pos) => updateButterflyPos(idx, pos)}
            mouse={mouse}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Luminous Fairy Dust Trails Shed from Wings */}
        <ButterflyParticleTrail positionsRef={butterflyPositions} />

        {/* Camera Rig responding to Scroll & Pointer Parallax */}
        <CameraRig mouse={mouse} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
