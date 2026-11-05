import React from 'react';

/**
 * Minimal Luxury Atmospheric Backdrop
 * Replaces noisy particle swarms with ultra-clean, subtle cinematic ambient light.
 */
export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep luxury charcoal base */}
      <div className="absolute inset-0 bg-[#08090D]" />

      {/* Very subtle, slow ambient cinematic lighting */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#9B6DFF]/[0.035] blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-[#56BFFF]/[0.025] blur-[150px]" />
      <div className="absolute bottom-10 left-1/4 w-[700px] h-[500px] rounded-full bg-[#9B6DFF]/[0.02] blur-[160px]" />

      {/* Subtle film grain texture overlay for cinematic texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
