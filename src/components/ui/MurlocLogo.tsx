'use client';

import React from 'react';

interface MurlocLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const MurlocLogo: React.FC<MurlocLogoProps> = ({
  className = '',
  size = 40,
  showText = true,
  textColor = 'currentColor',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Circular Murloc & Vinyl Record Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:rotate-6"
      >
        {/* Dark Circle Background */}
        <circle cx="60" cy="60" r="58" fill="#0F1012" stroke="#FAF8F5" strokeWidth="3" />

        {/* Left Side: Signature Murloc Monster Character Silhouette */}
        <g transform="translate(10, 10)">
          {/* Spiky Spines / Fins on Left */}
          <path
            d="M 22 15 L 12 28 L 24 34 L 10 50 L 26 56 L 14 74 L 32 78"
            stroke="#FAF8F5"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Monster Face Outline */}
          <path
            d="M 22 15 C 36 12, 50 18, 50 30 C 50 48, 50 64, 48 80 C 40 85, 30 84, 25 76"
            fill="#0F1012"
            stroke="#FAF8F5"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Big Cartoon Eye (with pupil) */}
          <circle cx="34" cy="36" r="8" fill="#FAF8F5" />
          <circle cx="35" cy="36" r="3.5" fill="#0F1012" />

          {/* Wide Grinning Mouth with Sharp Teeth */}
          <path
            d="M 22 56 C 28 66, 44 66, 48 56 Z"
            fill="#0F1012"
            stroke="#FAF8F5"
            strokeWidth="3"
          />
          {/* Teeth */}
          <path
            d="M 27 57 L 30 63 L 33 57 L 36 63 L 39 57 L 42 63 L 45 57"
            stroke="#FAF8F5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Right Side: Vinyl Record Sound Waves / Concentric Grooves */}
        <g transform="translate(60, 60)">
          {/* Concentric Arcs */}
          <path
            d="M 0 -48 A 48 48 0 0 1 48 0 A 48 48 0 0 1 0 48"
            stroke="#FAF8F5"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 0 -36 A 36 36 0 0 1 36 0 A 36 36 0 0 1 0 36"
            stroke="#FAF8F5"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 0 -24 A 24 24 0 0 1 24 0 A 24 24 0 0 1 0 24"
            stroke="#FAF8F5"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 0 -12 A 12 12 0 0 1 12 0 A 12 12 0 0 1 0 12"
            stroke="#FAF8F5"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Record Center Hole */}
          <circle cx="0" cy="0" r="3.5" fill="#E26D4B" />
        </g>

        {/* Subtle Accent Dots */}
        <circle cx="60" cy="18" r="2" fill="#E26D4B" />
        <circle cx="60" cy="102" r="2" fill="#4A8B9E" />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className="text-lg font-black tracking-tight uppercase leading-none font-display"
            style={{ color: textColor }}
          >
            Murloc
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase font-bold text-[#E26D4B] leading-tight">
            Music Studio
          </span>
        </div>
      )}
    </div>
  );
};
