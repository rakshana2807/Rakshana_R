import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const HeroButterfly: React.FC = () => {
  const [flightPos, setFlightPos] = useState({ x: 0, y: 0, rotZ: 0, rotX: 0 });
  const [flapAngle, setFlapAngle] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const timeRef = useRef(0);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Gentle mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;

    const animate = () => {
      timeRef.current += 0.024;
      const t = timeRef.current;

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Smooth curved flight path: continuous floating left/right and up/down
      const floatX = Math.sin(t * 0.8) * 20 + Math.cos(t * 0.35) * 10 + mouseRef.current.x;
      const floatY = Math.cos(t * 1.05) * 24 + Math.sin(t * 0.45) * 12 + mouseRef.current.y;

      // Natural banking into turns and subtle pitch
      const rotZ = Math.sin(t * 0.8) * 6;  // banking
      const rotX = Math.cos(t * 1.05) * 4.5; // pitch

      setFlightPos({ x: floatX, y: floatY, rotZ, rotX });

      // Natural wingbeat cycle:
      // Alternates between active flutter cycles and brief gliding
      const cycle = (t * 0.6) % (Math.PI * 2);
      const isGliding = cycle > 4.2 && cycle < 5.6;

      let currentFlap: number;
      if (isGliding) {
        // Wings held open during gentle glide
        currentFlap = 10 + Math.sin(t * 1.8) * 4;
      } else {
        // Active 3D wing flapping
        currentFlap = Math.abs(Math.sin(t * 3.6)) * 48;
      }
      setFlapAngle(currentFlap);

      // Emit luminous sparks during wingbeats
      if (!isGliding && currentFlap > 32 && Math.random() < 0.42) {
        const pColors = ['#D8B4FE', '#BF5AFF', '#F472B6', '#E879F9', '#FFFFFF'];
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: floatX + (Math.random() - 0.5) * 90,
          y: floatY + (Math.random() - 0.5) * 50 + 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 0.5 + 0.3,
          size: Math.random() * 2.5 + 1.2,
          alpha: 0.85,
          color: pColors[Math.floor(Math.random() * pColors.length)],
        };
        setParticles((prev) => [...prev.slice(-18), newParticle]);
      }

      // Fade out particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            alpha: p.alpha - 0.018,
          }))
          .filter((p) => p.alpha > 0)
      );

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute top-1/2 right-2 sm:right-6 md:right-10 lg:right-16 xl:right-20 -translate-y-1/2 pointer-events-none z-10 select-none"
      style={{
        transform: `translate3d(${flightPos.x}px, ${flightPos.y}px, 0)`,
        transition: 'transform 0.08s linear',
      }}
    >
      {/* Soft Neon Purple Ambient Back-Glow */}
      <div className="absolute inset-0 w-80 h-80 -translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-tr from-[#BF5AFF]/25 via-[#D946EF]/20 to-[#8B9CFF]/15 blur-[85px] pointer-events-none animate-soft-glow" />

      {/* Luminous Particle Sparks Trailing Behind */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x + 180}px`,
            top: `${p.y + 120}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.alpha,
            boxShadow: `0 0 10px ${p.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* 3D Flying Butterfly Container */}
      <div
        className="relative w-[210px] sm:w-[280px] md:w-[350px] lg:w-[410px] xl:w-[460px] aspect-[477/340]"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: `rotateZ(${flightPos.rotZ}deg) rotateX(${flightPos.rotX}deg)`,
        }}
      >
        {/* Left Wing with 3D Flap (hinged at right edge) */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: `${(242 / 477) * 100}%`,
            transformOrigin: '100% 50%',
            transform: `rotateY(${flapAngle}deg)`,
            transformStyle: 'preserve-3d',
            filter:
              'drop-shadow(0 0 16px rgba(217, 70, 239, 0.8)) drop-shadow(0 0 32px rgba(191, 90, 255, 0.6)) drop-shadow(0 0 55px rgba(168, 85, 247, 0.4))',
          }}
        >
          <img
            src="/hero-butterfly-left.png"
            alt="Neon Purple Butterfly Left Wing"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Right Wing with 3D Flap (hinged at left edge) */}
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: `${(239 / 477) * 100}%`,
            transformOrigin: '0% 50%',
            transform: `rotateY(${-flapAngle}deg)`,
            transformStyle: 'preserve-3d',
            filter:
              'drop-shadow(0 0 16px rgba(217, 70, 239, 0.8)) drop-shadow(0 0 32px rgba(191, 90, 255, 0.6)) drop-shadow(0 0 55px rgba(168, 85, 247, 0.4))',
          }}
        >
          <img
            src="/hero-butterfly-right.png"
            alt="Neon Purple Butterfly Right Wing"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Central Luminous Body & Glowing Antennae */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full z-20 pointer-events-none"
          style={{
            width: `${(60 / 477) * 100}%`,
            filter:
              'drop-shadow(0 0 12px rgba(254, 240, 138, 0.9)) drop-shadow(0 0 24px rgba(217, 70, 239, 0.85))',
          }}
        >
          <img
            src="/hero-butterfly-body.png"
            alt="Neon Purple Butterfly Body"
            className="w-full h-full object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};
