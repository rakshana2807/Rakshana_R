import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => cancelAnimationFrame(animId);
  }, [pos, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-electric-violet mix-blend-screen transition-transform duration-75"
        style={{
          width: '8px',
          height: '8px',
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${
            isClicking ? 0.6 : isHovered ? 1.4 : 1
          })`,
          boxShadow: '0 0 12px #8b5cf6',
        }}
      />
      {/* Outer trailing aura */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-purple-400/50 bg-purple-500/10 backdrop-blur-[1px] transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '56px' : '36px',
          height: isHovered ? '56px' : '36px',
          transform: `translate3d(${trailingPos.x - (isHovered ? 28 : 18)}px, ${
            trailingPos.y - (isHovered ? 28 : 18)
          }px, 0) scale(${isClicking ? 0.85 : 1})`,
          boxShadow: isHovered
            ? '0 0 24px rgba(139, 92, 246, 0.4), inset 0 0 12px rgba(99, 102, 241, 0.2)'
            : '0 0 15px rgba(139, 92, 246, 0.15)',
        }}
      />
    </>
  );
};
