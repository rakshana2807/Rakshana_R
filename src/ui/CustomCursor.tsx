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
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#D8B4FE] transition-transform duration-75 ease-out shadow-[0_0_8px_#BF5AFF]"
        style={{
          width: '5px',
          height: '5px',
          transform: `translate3d(${pos.x - 2.5}px, ${pos.y - 2.5}px, 0) scale(${
            isHovered ? 1.6 : 1
          })`,
        }}
      />
      {/* Subtle trailing ring with soft neon violet glow */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-300 ease-out"
        style={{
          width: isHovered ? '40px' : '24px',
          height: isHovered ? '40px' : '24px',
          transform: `translate3d(${trailingPos.x - (isHovered ? 20 : 12)}px, ${
            trailingPos.y - (isHovered ? 20 : 12)
          }px, 0)`,
          borderColor: isHovered ? 'rgba(191, 90, 255, 0.65)' : 'rgba(216, 180, 254, 0.25)',
          boxShadow: isHovered ? '0 0 16px rgba(191, 90, 255, 0.4)' : 'none',
        }}
      />
    </>
  );
};
