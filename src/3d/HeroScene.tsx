import React from 'react';

/**
 * Midnight Purple Ambient Backdrop
 * Completely removes geometric shapes, rings, spheres, or abstract blobs.
 * Provides soft, elegant purple and midnight violet illumination.
 */
export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft Midnight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#BF5AFF]/[0.07] rounded-full blur-[140px]" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#A855F7]/[0.06] rounded-full blur-[120px]" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#8B9CFF]/[0.04] rounded-full blur-[130px]" />
    </div>
  );
};
