import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEffects } from '../ui/SoundEffects';

// Helper: Procedural high-resolution wing texture with delicate veins & neon luminescence
function createWingTexture(neonColor: string = '#BF5AFF', lavenderColor: string = '#D8B4FE'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);

    // Rich radial gradient: midnight core to radiant violet and electric lavender edge
    const grad = ctx.createRadialGradient(256, 480, 40, 256, 200, 320);
    grad.addColorStop(0, '#100520');
    grad.addColorStop(0.25, '#3B0E68');
    grad.addColorStop(0.55, '#7928CA');
    grad.addColorStop(0.82, neonColor);
    grad.addColorStop(0.96, lavenderColor);
    grad.addColorStop(1, '#FFFFFF');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing organic wing veins
    ctx.strokeStyle = 'rgba(216, 180, 254, 0.45)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 8;

    const mainVeins = [
      { x1: 256, y1: 480, cx: 160, cy: 300, x2: 80, y2: 120 },
      { x1: 256, y1: 480, cx: 220, cy: 260, x2: 180, y2: 70 },
      { x1: 256, y1: 480, cx: 280, cy: 260, x2: 320, y2: 70 },
      { x1: 256, y1: 480, cx: 340, cy: 300, x2: 430, y2: 120 },
      { x1: 256, y1: 480, cx: 380, cy: 380, x2: 470, y2: 280 },
      { x1: 256, y1: 480, cx: 130, cy: 380, x2: 40, y2: 280 },
    ];

    mainVeins.forEach((v) => {
      ctx.beginPath();
      ctx.moveTo(v.x1, v.y1);
      ctx.quadraticCurveTo(v.cx, v.cy, v.x2, v.y2);
      ctx.stroke();

      // Sub-branching veins
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo((v.x1 + v.cx) / 2, (v.y1 + v.cy) / 2);
      ctx.quadraticCurveTo(v.cx + 20, v.cy - 30, v.x2 + (v.x2 > 256 ? -30 : 30), v.y2 + 40);
      ctx.stroke();
      ctx.lineWidth = 2.5;
    });

    // Delicate margin speckles along the wing edges
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 4;
    ctx.shadowColor = '#FFFFFF';
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI;
      const rx = 256 + Math.cos(angle) * 230 + (Math.random() - 0.5) * 15;
      const ry = 260 - Math.sin(angle) * 220 + (Math.random() - 0.5) * 15;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 3D Butterfly Data definition
interface Butterfly3DData {
  id: number;
  pos: THREE.Vector3;
  velocity: THREE.Vector3;
  targetPos: THREE.Vector3;
  scale: number;
  flapSpeed: number;
  flapPhase: number;
  glideTimer: number;
  isGliding: boolean;
  roll: number;
  pitch: number;
  yaw: number;
  isLargeHero: boolean;
  color: string;
}

// Individual 3D Butterfly Mesh Component
const ButterflyUnit: React.FC<{
  data: Butterfly3DData;
  wingGeometry: THREE.BufferGeometry;
  hindGeometry: THREE.BufferGeometry;
  wingMaterial: THREE.Material;
  bodyMaterial: THREE.Material;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ data, wingGeometry, hindGeometry, wingMaterial, bodyMaterial, mousePos }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // 1. Natural Flap Cycle & Intermittent Gliding
    data.glideTimer += delta;
    if (data.isGliding) {
      if (data.glideTimer > (data.isLargeHero ? 1.6 : 1.2)) {
        data.isGliding = false;
        data.glideTimer = 0;
      }
    } else {
      data.flapPhase += delta * data.flapSpeed;
      if (data.glideTimer > (data.isLargeHero ? 2.4 : 1.8) && Math.random() < 0.04) {
        data.isGliding = true;
        data.glideTimer = 0;
      }
    }

    // Wing flap angle
    let flapAngle = 0;
    if (data.isGliding) {
      // Hold wings slightly upward in V-shape during glide
      flapAngle = 0.28 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    } else {
      flapAngle = Math.sin(data.flapPhase) * 0.85;

      // Subtle wing sound trigger for the large butterfly when sound is enabled
      if (data.isLargeHero && Math.sin(data.flapPhase) > 0.8) {
        soundEffects.playLargeWingFlutter(0.7);
      }
    }

    if (leftWingRef.current) leftWingRef.current.rotation.y = flapAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.y = -flapAngle;

    // 2. 3D Flight Physics & Organic Curved Pathing
    const distToTarget = data.pos.distanceTo(data.targetPos);
    if (distToTarget < 2.5 || Math.random() < 0.008) {
      // Pick new 3D waypoint across the viewport space
      const rangeX = 14;
      const rangeY = 9;
      const rangeZ = data.isLargeHero ? 2.5 : 4.0;
      data.targetPos.set(
        (Math.random() - 0.5) * rangeX * 2,
        (Math.random() - 0.5) * rangeY * 2,
        data.isLargeHero ? 1.2 + Math.random() * 1.5 : (Math.random() - 0.5) * rangeZ * 2
      );
    }

    // Mouse evasion / curiosity
    const mouseWorldX = mousePos.current.x * 10;
    const mouseWorldY = mousePos.current.y * 7;
    const distToMouse = Math.hypot(data.pos.x - mouseWorldX, data.pos.y - mouseWorldY);
    if (distToMouse < 3.0) {
      // Steer away smoothly
      const pushX = (data.pos.x - mouseWorldX) * 0.08;
      const pushY = (data.pos.y - mouseWorldY) * 0.08;
      data.velocity.x += pushX;
      data.velocity.y += pushY;
      data.isGliding = false; // flutter with urgency
    }

    // Steer towards target waypoint
    const steer = new THREE.Vector3().subVectors(data.targetPos, data.pos).normalize().multiplyScalar(0.04);
    data.velocity.add(steer);
    const maxSpeed = (data.isGliding ? 0.04 : 0.065) * (data.isLargeHero ? 1.1 : 0.95);
    data.velocity.clampLength(0.02, maxSpeed);

    // Apply movement
    data.pos.add(data.velocity);

    // Wrap around boundaries gently
    if (data.pos.x > 18) data.pos.x = -18;
    if (data.pos.x < -18) data.pos.x = 18;
    if (data.pos.y > 12) data.pos.y = -12;
    if (data.pos.y < -12) data.pos.y = 12;

    // 3. Banking & Orientation
    if (groupRef.current) {
      // Smooth vertical bobbing
      const bob = Math.sin(data.flapPhase * 0.5) * 0.06;
      groupRef.current.position.set(data.pos.x, data.pos.y + bob, data.pos.z);

      // Target orientation facing velocity vector
      const forward = data.velocity.clone().normalize();
      const targetYaw = Math.atan2(forward.x, forward.y);
      const targetRoll = -forward.x * 0.8; // banking into turn
      const targetPitch = forward.z * 0.5;

      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRoll, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw, 0.08);
    }
  });

  return (
    <group ref={groupRef} scale={data.scale}>
      {/* Sleek Central Butterfly Body */}
      <mesh material={bodyMaterial}>
        <capsuleGeometry args={[0.07, 0.65, 8, 16]} />
      </mesh>

      {/* Head & Glowing Antennae */}
      <mesh position={[0, 0.42, 0.02]} material={bodyMaterial}>
        <sphereGeometry args={[0.08, 12, 12]} />
      </mesh>

      {/* Left Wing Group (Pivoting at Y axis) */}
      <group ref={leftWingRef} position={[-0.04, 0, 0]}>
        <mesh
          geometry={wingGeometry}
          material={wingMaterial}
          position={[-0.6, 0.15, 0]}
          rotation={[0, 0, 0.15]}
        />
        <mesh
          geometry={hindGeometry}
          material={wingMaterial}
          position={[-0.45, -0.3, 0]}
          rotation={[0, 0, 0.05]}
        />
      </group>

      {/* Right Wing Group (Pivoting at Y axis, scaled -1 on X) */}
      <group ref={rightWingRef} position={[0.04, 0, 0]}>
        <mesh
          geometry={wingGeometry}
          material={wingMaterial}
          position={[0.6, 0.15, 0]}
          rotation={[0, 0, -0.15]}
          scale={[-1, 1, 1]}
        />
        <mesh
          geometry={hindGeometry}
          material={wingMaterial}
          position={[0.45, -0.3, 0]}
          rotation={[0, 0, -0.05]}
          scale={[-1, 1, 1]}
        />
      </group>

      {/* Soft Neon Point Light carried by the large hero butterfly */}
      {data.isLargeHero && (
        <pointLight
          color="#BF5AFF"
          intensity={1.8}
          distance={4.5}
          decay={2}
        />
      )}
    </group>
  );
};

// Procedural 3D Wing Shapes
function useButterflyGeometries() {
  return useMemo(() => {
    // 1. Forewing Shape (Upper Wing)
    const foreShape = new THREE.Shape();
    foreShape.moveTo(0, 0);
    foreShape.bezierCurveTo(0.3, 0.6, 0.9, 0.9, 1.25, 0.4);
    foreShape.bezierCurveTo(1.3, -0.1, 0.7, -0.3, 0, -0.15);
    foreShape.closePath();
    const foreGeom = new THREE.ShapeGeometry(foreShape, 24);

    // 2. Hindwing Shape (Lower Wing)
    const hindShape = new THREE.Shape();
    hindShape.moveTo(0, 0);
    hindShape.bezierCurveTo(0.4, -0.1, 0.85, -0.3, 0.7, -0.75);
    hindShape.bezierCurveTo(0.5, -0.9, 0.15, -0.6, 0, -0.2);
    hindShape.closePath();
    const hindGeom = new THREE.ShapeGeometry(hindShape, 20);

    return { foreGeom, hindGeom };
  }, []);
}

// Particle Spark Trail System in 3D
function FairyDustTrail({ butterflies }: { butterflies: Butterfly3DData[] }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 140;

  const [positions, alphas, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const alp = new Float32Array(particleCount);
    const col = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color('#BF5AFF'); // neon violet
    const c2 = new THREE.Color('#D8B4FE'); // electric lavender

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      alp[i] = 0; // start invisible

      const chosen = Math.random() > 0.5 ? c1 : c2;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, alp, col];
  }, [particleCount]);

  let emitIndex = 0;

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;

    // Fade active particles
    for (let i = 0; i < particleCount; i++) {
      if (alphas[i] > 0) {
        alphas[i] -= delta * 0.7;
        posAttr.setY(i, posAttr.getY(i) - delta * 0.35); // gentle gravity drift
      }
    }

    // Emit new fairy dust at butterfly wingtips
    butterflies.forEach((b) => {
      if (!b.isGliding && Math.random() < 0.35) {
        emitIndex = (emitIndex + 1) % particleCount;
        posAttr.setXYZ(
          emitIndex,
          b.pos.x + (Math.random() - 0.5) * 0.3,
          b.pos.y + (Math.random() - 0.5) * 0.3,
          b.pos.z + (Math.random() - 0.5) * 0.2
        );
        alphas[emitIndex] = 0.85;
      }
    });

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera parallax with smooth scroll tracking
function CameraParallax({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame((state) => {
    // Parallax mouse drift
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mousePos.current.x * 1.2, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mousePos.current.y * 0.8, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export const FullWebsiteButterflyScene: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  const { foreGeom, hindGeom } = useButterflyGeometries();

  // Texture and Materials
  const wingTexture = useMemo(() => createWingTexture('#BF5AFF', '#D8B4FE'), []);

  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wingTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
        roughness: 0.25,
        metalness: 0.1,
        emissive: new THREE.Color('#9B51E0'),
        emissiveIntensity: 0.45,
      }),
    [wingTexture]
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#150926',
        roughness: 0.4,
        metalness: 0.3,
        emissive: new THREE.Color('#3B0E68'),
        emissiveIntensity: 0.25,
      }),
    []
  );

  // Initialize controlled flock of 7 butterflies (1 large hero, 3 midground, 3 background)
  const butterflies = useMemo<Butterfly3DData[]>(() => {
    const list: Butterfly3DData[] = [];

    // 1. Main Large Hero Butterfly: flies closer to camera, magnificent wingspan
    list.push({
      id: 0,
      pos: new THREE.Vector3(2.5, 0.8, 2.2),
      velocity: new THREE.Vector3(0.03, 0.015, -0.01),
      targetPos: new THREE.Vector3(-2.0, 1.5, 2.0),
      scale: 1.15,
      flapSpeed: 9.5,
      flapPhase: 0,
      glideTimer: 0,
      isGliding: false,
      roll: 0,
      pitch: 0,
      yaw: 0,
      isLargeHero: true,
      color: '#BF5AFF',
    });

    // 2. Midground and Background Butterflies
    const configs = [
      { pos: [-6, 3, 0.5], scale: 0.65, speed: 11.0, isHero: false },
      { pos: [5, -2, -0.8], scale: 0.55, speed: 10.5, isHero: false },
      { pos: [-3, -4, 0.2], scale: 0.60, speed: 11.5, isHero: false },
      { pos: [8, 4, -2.5], scale: 0.42, speed: 12.0, isHero: false },
      { pos: [-7, -2, -3.2], scale: 0.38, speed: 11.0, isHero: false },
      { pos: [2, 5, -1.8], scale: 0.48, speed: 10.0, isHero: false },
    ];

    configs.forEach((cfg, idx) => {
      list.push({
        id: idx + 1,
        pos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04, 0),
        targetPos: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, cfg.pos[2]),
        scale: cfg.scale,
        flapSpeed: cfg.speed,
        flapPhase: Math.random() * Math.PI * 2,
        glideTimer: Math.random() * 2,
        isGliding: false,
        roll: 0,
        pitch: 0,
        yaw: 0,
        isLargeHero: false,
        color: idx % 2 === 0 ? '#BF5AFF' : '#A855F7',
      });
    });

    return list;
  }, []);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!hasWebGL) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Soft Ambient Cinematic Lighting */}
        <ambientLight intensity={0.5} color="#1D1230" />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFFFFF" />
        <pointLight position={[-6, 4, 3]} color="#BF5AFF" intensity={2.2} distance={15} />
        <pointLight position={[6, -4, 2]} color="#8B9CFF" intensity={1.8} distance={15} />

        {/* 3D Flying Butterflies */}
        {butterflies.map((b) => (
          <ButterflyUnit
            key={b.id}
            data={b}
            wingGeometry={foreGeom}
            hindGeometry={hindGeom}
            wingMaterial={wingMaterial}
            bodyMaterial={bodyMaterial}
            mousePos={mousePos}
          />
        ))}

        {/* Luminous Fairy Dust Trail System */}
        <FairyDustTrail butterflies={butterflies} />

        {/* Subtle Parallax Rig */}
        <CameraParallax mousePos={mousePos} />
      </Canvas>
    </div>
  );
};
