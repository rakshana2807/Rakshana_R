import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural high-detail canvas texture for glowing translucent butterfly wings
export function createButterflyWingTexture(type: 'fore' | 'hind'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  // Radial Midnight to Neon Violet Gradient
  const grad = ctx.createRadialGradient(80, 420, 20, 280, 200, 480);
  grad.addColorStop(0.0, '#100720'); // Deep midnight root
  grad.addColorStop(0.25, '#3B0764'); // Rich imperial purple
  grad.addColorStop(0.55, '#7E22CE'); // Vivid violet
  grad.addColorStop(0.78, '#A855F7'); // Primary purple
  grad.addColorStop(0.92, '#BF5AFF'); // Neon violet
  grad.addColorStop(1.0, '#D8B4FE'); // Electric lavender edge

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Intricate Luminous Vein Network
  ctx.strokeStyle = 'rgba(216, 180, 254, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#BF5AFF';
  ctx.shadowBlur = 8;

  const rootX = 60;
  const rootY = 440;

  // Primary vein stems
  const stems = type === 'fore'
    ? [
        { cx: 180, cy: 300, ex: 380, ey: 80 },
        { cx: 220, cy: 260, ex: 460, ey: 160 },
        { cx: 240, cy: 320, ex: 480, ey: 280 },
        { cx: 200, cy: 360, ex: 420, ey: 380 },
        { cx: 140, cy: 240, ex: 260, ey: 60 },
      ]
    : [
        { cx: 160, cy: 320, ex: 320, ey: 140 },
        { cx: 200, cy: 340, ex: 420, ey: 240 },
        { cx: 180, cy: 400, ex: 380, ey: 420 },
        { cx: 140, cy: 420, ex: 260, ey: 470 },
      ];

  stems.forEach((s) => {
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.quadraticCurveTo(s.cx, s.cy, s.ex, s.ey);
    ctx.stroke();

    // Secondary sub-veins
    ctx.lineWidth = 1.2;
    for (let j = 0.3; j <= 0.8; j += 0.25) {
      const bx = rootX + (s.cx - rootX) * j;
      const by = rootY + (s.cy - rootY) * j;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + (Math.random() - 0.2) * 50, by - 40 - Math.random() * 30);
      ctx.stroke();
    }
    ctx.lineWidth = 2.5;
  });

  // Delicate white/lavender iridescent margin spots
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = '#D8B4FE';
  ctx.shadowBlur = 10;
  for (let i = 0; i < 35; i++) {
    const angle = (i / 35) * Math.PI * 0.7;
    const r = 470 + (Math.sin(i * 3) * 15);
    const px = rootX + Math.cos(angle) * r;
    const py = rootY - Math.sin(angle) * r;
    if (px > 0 && px < 512 && py > 0 && py < 512) {
      ctx.beginPath();
      ctx.arc(px, py, Math.random() * 3 + 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Procedural 3D wing geometry based on organic Morpho butterfly morphology
function createWingGeometry(type: 'fore' | 'hind'): THREE.BufferGeometry {
  const shape = new THREE.Shape();

  if (type === 'fore') {
    // Upper aerofoil forewing
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.5, 0.6, 1.4, 1.4, 1.6); // leading edge sweep
    shape.bezierCurveTo(1.7, 1.5, 1.85, 1.1, 1.6, 0.6); // apex curve
    shape.bezierCurveTo(1.4, 0.2, 0.9, 0.05, 0.5, -0.1); // trailing scalloped edge
    shape.bezierCurveTo(0.25, -0.15, 0.1, -0.05, 0, 0);
  } else {
    // Lower hindwing with subtle tail undulation
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, -0.1, 0.7, -0.2, 1.05, -0.45);
    shape.bezierCurveTo(1.15, -0.75, 0.85, -1.2, 0.45, -1.25);
    shape.bezierCurveTo(0.15, -1.15, 0.05, -0.6, 0, 0);
  }

  // Create shape geometry with subdivisions for smooth lighting curvature
  const geometry = new THREE.ShapeGeometry(shape, 24);
  geometry.computeVertexNormals();

  return geometry;
}

export interface ButterflyProps {
  initialPosition?: [number, number, number];
  scale?: number;
  speed?: number;
  flapSpeed?: number;
  depth?: number;
  onPositionUpdate?: (pos: THREE.Vector3) => void;
  mouse: React.MutableRefObject<[number, number]>;
  scrollProgress: React.MutableRefObject<number>;
}

export const ButterflyModel: React.FC<ButterflyProps> = ({
  initialPosition = [0, 0, 0],
  scale = 1,
  speed = 1,
  flapSpeed = 1,
  onPositionUpdate,
  mouse,
  scrollProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const leftHindRef = useRef<THREE.Group>(null);
  const rightHindRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  // Textures and geometries cached
  const foreTexture = useMemo(() => createButterflyWingTexture('fore'), []);
  const hindTexture = useMemo(() => createButterflyWingTexture('hind'), []);

  const foreGeometry = useMemo(() => createWingGeometry('fore'), []);
  const hindGeometry = useMemo(() => createWingGeometry('hind'), []);

  // Translucent glowing physical wing material
  const wingMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: foreTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
      roughness: 0.25,
      metalness: 0.15,
      transmission: 0.35,
      emissive: new THREE.Color('#BF5AFF'),
      emissiveIntensity: 0.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      color: '#FFFFFF',
    });
  }, [foreTexture]);

  const hindWingMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: hindTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
      roughness: 0.25,
      metalness: 0.15,
      transmission: 0.35,
      emissive: new THREE.Color('#A855F7'),
      emissiveIntensity: 0.45,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      color: '#FFFFFF',
    });
  }, [hindTexture]);

  // Body dark velvet material with soft lavender highlights
  const bodyMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#100720',
      emissive: '#581C87',
      emissiveIntensity: 0.4,
      roughness: 0.4,
      metalness: 0.2,
    });
  }, []);

  // Flight simulation state
  const state = useRef({
    pos: new THREE.Vector3(...initialPosition),
    target: new THREE.Vector3(...initialPosition),
    vel: new THREE.Vector3(0, 0, 0),
    heading: 0,
    pitch: 0,
    roll: 0,
    flapPhase: Math.random() * Math.PI * 2,
    glideTimer: Math.random() * 60,
    isGliding: false,
    baseY: initialPosition[1],
  });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const s = state.current;
    const clampedDelta = Math.min(delta, 0.05);

    // Natural Wing Flapping & Intermittent Gliding
    s.glideTimer += clampedDelta * 60;
    if (s.isGliding) {
      if (s.glideTimer > 60 + Math.random() * 40) {
        s.isGliding = false;
        s.glideTimer = 0;
      }
    } else {
      s.flapPhase += clampedDelta * 18 * flapSpeed;
      if (s.glideTimer > 90 && Math.sin(s.flapPhase) > 0.95 && Math.random() < 0.04) {
        s.isGliding = true;
        s.glideTimer = 0;
      }
    }

    // Wing rotation angles around hinge axis
    const flapAngle = s.isGliding
      ? 0.15
      : Math.sin(s.flapPhase) * 0.95;

    // Left wings fold upward and downward
    if (leftWingRef.current) leftWingRef.current.rotation.y = flapAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.y = -flapAngle;

    // Hindwings flap with a subtle phase lag (natural insect aerodynamics)
    const hindFlap = s.isGliding
      ? 0.12
      : Math.sin(s.flapPhase - 0.25) * 0.85;
    if (leftHindRef.current) leftHindRef.current.rotation.y = hindFlap;
    if (rightHindRef.current) rightHindRef.current.rotation.y = -hindFlap;

    // Body pitches and undulates in sync with wingbeat thrust
    if (bodyRef.current) {
      bodyRef.current.rotation.x = s.isGliding ? 0.05 : Math.sin(s.flapPhase) * 0.12;
      bodyRef.current.position.y = s.isGliding ? 0 : Math.sin(s.flapPhase * 2) * 0.03;
    }

    // Scroll progress influence: continuously moves target along the page height
    const scrollOffset = scrollProgress.current * -24; // Traverse down through sections
    const targetY = s.baseY + scrollOffset;

    // Waypoint targeting in 3D
    if (s.pos.distanceTo(s.target) < 1.8 || Math.random() < 0.015) {
      s.target.set(
        (Math.random() - 0.5) * 16,
        targetY + (Math.random() - 0.5) * 6,
        initialPosition[2] + (Math.random() - 0.5) * 3
      );
    }

    // Interactive evasion when mouse cursor is nearby
    const mouse3D = new THREE.Vector3(
      mouse.current[0] * 7,
      mouse.current[1] * 4 + scrollOffset,
      s.pos.z
    );
    const distToMouse = s.pos.distanceTo(mouse3D);
    if (distToMouse < 3.2) {
      // Steer smoothly away from cursor
      const fleeForce = s.pos.clone().sub(mouse3D).normalize().multiplyScalar(0.08);
      s.vel.add(fleeForce);
      s.isGliding = false; // flutter with energy
    }

    // Steering towards target
    const desired = s.target.clone().sub(s.pos).normalize().multiplyScalar(0.045 * speed);
    s.vel.lerp(desired, 0.04);
    s.vel.clampLength(0.01, 0.08 * speed);

    s.pos.add(s.vel);

    // Smooth banking and rotation into flight direction
    if (s.vel.lengthSq() > 0.0001) {
      const targetHeading = Math.atan2(s.vel.x, s.vel.z);
      const targetPitch = -Math.atan2(s.vel.y, Math.sqrt(s.vel.x * s.vel.x + s.vel.z * s.vel.z));
      const targetRoll = -s.vel.x * 3.5; // banks into turns

      s.heading = THREE.MathUtils.lerp(s.heading, targetHeading, 0.06);
      s.pitch = THREE.MathUtils.lerp(s.pitch, targetPitch, 0.06);
      s.roll = THREE.MathUtils.lerp(s.roll, targetRoll, 0.08);

      groupRef.current.rotation.set(s.pitch, s.heading, s.roll, 'YXZ');
    }

    groupRef.current.position.copy(s.pos);

    // Notify trail emitter
    if (onPositionUpdate) {
      onPositionUpdate(s.pos);
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Central Anatomical Butterfly Body */}
      <group ref={bodyRef}>
        {/* Head */}
        <mesh position={[0, 0.28, 0]} material={bodyMaterial}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>

        {/* Antennae with glowing tips */}
        <mesh position={[-0.04, 0.42, 0.06]} rotation={[0.4, -0.3, 0]}>
          <cylinderGeometry args={[0.006, 0.008, 0.22, 6]} />
          <meshBasicMaterial color="#D8B4FE" />
        </mesh>
        <mesh position={[-0.07, 0.52, 0.1]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshBasicMaterial color="#BF5AFF" />
        </mesh>

        <mesh position={[0.04, 0.42, 0.06]} rotation={[0.4, 0.3, 0]}>
          <cylinderGeometry args={[0.006, 0.008, 0.22, 6]} />
          <meshBasicMaterial color="#D8B4FE" />
        </mesh>
        <mesh position={[0.07, 0.52, 0.1]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshBasicMaterial color="#BF5AFF" />
        </mesh>

        {/* Thorax */}
        <mesh position={[0, 0.12, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.065, 0.16, 8, 12]} />
        </mesh>

        {/* Abdomen (Tapered segmented tail) */}
        <mesh position={[0, -0.16, -0.02]} rotation={[-0.15, 0, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.045, 0.32, 8, 12]} />
        </mesh>
      </group>

      {/* LEFT WING ASSEMBLY (forewing + hindwing anchored at thorax hinge) */}
      <group position={[-0.04, 0.15, 0]}>
        <group ref={leftWingRef}>
          {/* Forewing */}
          <mesh
            geometry={foreGeometry}
            material={wingMaterial}
            rotation={[0, Math.PI, 0]} // facing outwards
            scale={[0.85, 0.85, 1]}
          />
          {/* Hindwing */}
          <group ref={leftHindRef} position={[0, -0.05, 0]}>
            <mesh
              geometry={hindGeometry}
              material={hindWingMaterial}
              rotation={[0, Math.PI, 0]}
              scale={[0.75, 0.75, 1]}
            />
          </group>
        </group>
      </group>

      {/* RIGHT WING ASSEMBLY */}
      <group position={[0.04, 0.15, 0]}>
        <group ref={rightWingRef}>
          {/* Forewing */}
          <mesh
            geometry={foreGeometry}
            material={wingMaterial}
            scale={[0.85, 0.85, 1]}
          />
          {/* Hindwing */}
          <group ref={rightHindRef} position={[0, -0.05, 0]}>
            <mesh
              geometry={hindGeometry}
              material={hindWingMaterial}
              scale={[0.75, 0.75, 1]}
            />
          </group>
        </group>
      </group>

      {/* Subtle localized neon-purple point light carried by foreground butterflies */}
      {scale > 0.8 && (
        <pointLight
          color="#BF5AFF"
          intensity={0.65}
          distance={2.8}
          decay={2}
        />
      )}
    </group>
  );
};
