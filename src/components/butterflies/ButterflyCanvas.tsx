import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  flapPhase: number;
  flapSpeed: number;
  glideTimer: number;
  isGliding: boolean;
  angle: number;
  targetAngle: number;
  turnSpeed: number;
  depth: number; // 0 (far) to 1 (near)
  colorHue: string;
  glowColor: string;
}

export const ButterflyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Mouse tracking for subtle interactive curiosity/evasion
    const mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Fairy dust / luminous trail particles
    const particles: Particle[] = [];

    // Create 7 carefully balanced butterflies (controlled, visually serene count)
    const butterflyCount = 7;
    const butterflies: Butterfly[] = [];

    for (let i = 0; i < butterflyCount; i++) {
      // 2 foreground, 3 midground, 2 distant
      const depth = i < 2 ? 0.9 + Math.random() * 0.15 : i < 5 ? 0.55 + Math.random() * 0.2 : 0.3 + Math.random() * 0.15;
      const size = 18 + depth * 32; // 24px up to 50px
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + depth * 1.0;

      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        flapPhase: Math.random() * Math.PI * 2,
        flapSpeed: 0.18 + Math.random() * 0.08,
        glideTimer: Math.random() * 60,
        isGliding: false,
        angle,
        targetAngle: angle,
        turnSpeed: 0.02 + Math.random() * 0.02,
        depth,
        colorHue: i % 2 === 0 ? '#BF5AFF' : '#A855F7',
        glowColor: i % 2 === 0 ? '#D8B4FE' : '#8B9CFF',
      });
    }

    // Additional small ethereal butterflies fluttering naturally across depths
    const smallButterflyCount = 14;
    for (let j = 0; j < smallButterflyCount; j++) {
      const depth = 0.22 + Math.random() * 0.3; // smaller depth
      const size = 10 + Math.random() * 8;      // 10px to 18px wingspan
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 0.6;

      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        flapPhase: Math.random() * Math.PI * 2,
        flapSpeed: 0.22 + Math.random() * 0.08,
        glideTimer: Math.random() * 60,
        isGliding: false,
        angle,
        targetAngle: angle,
        turnSpeed: 0.025 + Math.random() * 0.02,
        depth,
        colorHue: j % 3 === 0 ? '#BF5AFF' : j % 3 === 1 ? '#D8B4FE' : '#A855F7',
        glowColor: j % 2 === 0 ? '#D8B4FE' : '#8B9CFF',
      });
    }

    // Helper: Draw realistic Morpho butterfly wing
    const drawButterfly = (b: Butterfly) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle + Math.PI / 2); // align flight heading

      // Wing flap perspective factor (flaps in 3D: cos(flapPhase))
      const flapScale = b.isGliding ? 0.95 : Math.max(0.12, Math.abs(Math.cos(b.flapPhase)));
      const alpha = 0.65 + b.depth * 0.35;
      ctx.globalAlpha = alpha;

      const wingSpan = b.size;

      // Soft neon glow under the butterfly
      ctx.shadowColor = b.colorHue;
      ctx.shadowBlur = 10 * b.depth;

      // Draw Left Wing (mirrored scaleX: -flapScale)
      ctx.save();
      ctx.scale(-flapScale, 1);
      drawSingleWing(ctx, wingSpan, b.colorHue, b.glowColor);
      ctx.restore();

      // Draw Right Wing (scaleX: flapScale)
      ctx.save();
      ctx.scale(flapScale, 1);
      drawSingleWing(ctx, wingSpan, b.colorHue, b.glowColor);
      ctx.restore();

      // Draw Sleek Butterfly Body
      ctx.shadowBlur = 4;
      ctx.fillStyle = '#1A1128';
      ctx.beginPath();
      ctx.ellipse(0, 0, wingSpan * 0.06, wingSpan * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();

      // Delicate glowing antennae
      ctx.strokeStyle = b.glowColor;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(-wingSpan * 0.02, -wingSpan * 0.35);
      ctx.quadraticCurveTo(-wingSpan * 0.12, -wingSpan * 0.55, -wingSpan * 0.18, -wingSpan * 0.52);
      ctx.moveTo(wingSpan * 0.02, -wingSpan * 0.35);
      ctx.quadraticCurveTo(wingSpan * 0.12, -wingSpan * 0.55, wingSpan * 0.18, -wingSpan * 0.52);
      ctx.stroke();

      ctx.restore();
    };

    // Realistic Forewing & Hindwing drawing
    const drawSingleWing = (
      c: CanvasRenderingContext2D,
      span: number,
      neon: string,
      lavender: string
    ) => {
      // Forewing (Upper Wing)
      const foreGrad = c.createRadialGradient(
        0,
        0,
        span * 0.1,
        span * 0.6,
        -span * 0.4,
        span * 1.1
      );
      foreGrad.addColorStop(0, '#1E0D36');
      foreGrad.addColorStop(0.35, '#6B21A8');
      foreGrad.addColorStop(0.7, neon);
      foreGrad.addColorStop(1, lavender);

      c.beginPath();
      c.moveTo(0, -span * 0.1);
      c.bezierCurveTo(span * 0.3, -span * 0.75, span * 0.9, -span * 0.7, span * 1.05, -span * 0.25);
      c.bezierCurveTo(span * 1.05, span * 0.15, span * 0.6, span * 0.2, 0, span * 0.05);
      c.closePath();
      c.fillStyle = foreGrad;
      c.fill();

      // Forewing Delicate Neon Outline
      c.strokeStyle = lavender;
      c.lineWidth = 0.9;
      c.stroke();

      // Wing veins (subtle luminous lines)
      c.strokeStyle = 'rgba(216, 180, 254, 0.4)';
      c.lineWidth = 0.6;
      c.beginPath();
      c.moveTo(0, 0);
      c.quadraticCurveTo(span * 0.45, -span * 0.35, span * 0.9, -span * 0.3);
      c.moveTo(0, 0);
      c.quadraticCurveTo(span * 0.4, -span * 0.5, span * 0.7, -span * 0.65);
      c.moveTo(0, 0);
      c.quadraticCurveTo(span * 0.45, -span * 0.1, span * 0.85, 0.05);
      c.stroke();

      // Hindwing (Lower Wing)
      const hindGrad = c.createRadialGradient(
        0,
        0,
        span * 0.05,
        span * 0.45,
        span * 0.4,
        span * 0.8
      );
      hindGrad.addColorStop(0, '#170A2A');
      hindGrad.addColorStop(0.4, '#581C87');
      hindGrad.addColorStop(0.8, neon);
      hindGrad.addColorStop(1, '#8B9CFF');

      c.beginPath();
      c.moveTo(0, span * 0.02);
      c.bezierCurveTo(span * 0.4, span * 0.15, span * 0.75, span * 0.4, span * 0.6, span * 0.75);
      c.bezierCurveTo(span * 0.45, span * 0.9, span * 0.15, span * 0.65, 0, span * 0.28);
      c.closePath();
      c.fillStyle = hindGrad;
      c.fill();

      c.strokeStyle = 'rgba(191, 90, 255, 0.7)';
      c.lineWidth = 0.8;
      c.stroke();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw trailing luminous fairy dust particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.014;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // 2. Update and draw each butterfly
      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i];

        // Natural wing flapping vs intermittent glide
        b.glideTimer += 1;
        if (b.isGliding) {
          if (b.glideTimer > 55) {
            b.isGliding = false;
            b.glideTimer = 0;
          }
        } else {
          b.flapPhase += b.flapSpeed;
          if (b.glideTimer > 90 && Math.random() < 0.03) {
            b.isGliding = true;
            b.glideTimer = 0;
          }
        }

        // Emit glowing fairy dust trail during wingbeats
        if (!b.isGliding && Math.sin(b.flapPhase) > 0.85 && Math.random() < 0.4) {
          particles.push({
            x: b.x - Math.cos(b.angle) * (b.size * 0.4),
            y: b.y - Math.sin(b.angle) * (b.size * 0.4),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4 + 0.2,
            alpha: 0.65 * b.depth,
            color: Math.random() > 0.4 ? b.glowColor : b.colorHue,
            size: Math.random() * 1.8 + 0.6,
          });
        }

        // Random natural flight path steering
        if (Math.random() < 0.018) {
          b.targetAngle += (Math.random() - 0.5) * 1.2;
        }

        // Gentle interactive avoidance if mouse is close
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          b.targetAngle = Math.atan2(dy, dx);
          b.isGliding = false; // flutter away energetically
        }

        // Smooth angle interpolation (banking into curves)
        let diff = b.targetAngle - b.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        b.angle += diff * b.turnSpeed;

        const currentSpeed = (b.isGliding ? 0.9 : 1.35) * (0.8 + b.depth * 0.8);
        b.vx = Math.cos(b.angle) * currentSpeed;
        b.vy = Math.sin(b.angle) * currentSpeed;

        b.x += b.vx;
        b.y += b.vy;

        // Smooth wrap-around edges with gentle margins
        const margin = 80;
        if (b.x < -margin) b.x = width + margin;
        if (b.x > width + margin) b.x = -margin;
        if (b.y < -margin) b.y = height + margin;
        if (b.y > height + margin) b.y = -margin;

        // Render butterfly
        drawButterfly(b);
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.9 }}
    />
  );
};

