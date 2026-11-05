import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
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

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  // Smooth gentle lerp for trailing aura
  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => cancelAnimationFrame(animId);
  }, [pos, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Sleek minimal center dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#F5F5F7] transition-transform duration-75 ease-out"
        style={{
          width: '5px',
          height: '5px',
          transform: `translate3d(${pos.x - 2.5}px, ${pos.y - 2.5}px, 0) scale(${
            isHovered ? 1.6 : 1
          })`,
        }}
      />
      {/* Subtle trailing ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/20 transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '42px' : '26px',
          height: isHovered ? '42px' : '26px',
          transform: `translate3d(${trailingPos.x - (isHovered ? 21 : 13)}px, ${
            trailingPos.y - (isHovered ? 21 : 13)
          }px, 0)`,
          borderColor: isHovered ? 'rgba(155, 109, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
        }}
      />
    </>
  );
};
