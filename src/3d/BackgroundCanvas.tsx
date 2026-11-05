import React from 'react';

/**
 * Midnight Purple Cinematic Atmosphere
 * Deep midnight black (#080610) base with subtle purple neon ambient lighting.
 */
export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep midnight base */}
      <div className="absolute inset-0 bg-[#080610]" />

      {/* Soft ambient neon purple illumination */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#BF5AFF]/[0.05] blur-[150px]" />
      <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-[#A855F7]/[0.04] blur-[160px]" />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[550px] rounded-full bg-[#8B9CFF]/[0.035] blur-[160px]" />
    </div>
  );
};
