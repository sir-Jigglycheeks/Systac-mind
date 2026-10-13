import React from 'react';

interface SystacMindLogoProps {
  variant?: 'onDark' | 'onLight';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const SystacMindLogo: React.FC<SystacMindLogoProps> = ({
  variant = 'onDark',
  size = 'md',
  showText = true,
  className = '',
}) => {
  const isDark = variant === 'onDark';

  // Dimension scaling
  const dimensions = {
    sm: { height: 32, iconSize: 32, mainText: 'text-base', subText: 'text-[9px]' },
    md: { height: 42, iconSize: 42, mainText: 'text-lg', subText: 'text-[10.5px]' },
    lg: { height: 52, iconSize: 52, mainText: 'text-xl', subText: 'text-xs' },
    xl: { height: 64, iconSize: 64, mainText: 'text-2xl', subText: 'text-sm' },
  }[size];

  const primaryFill = isDark ? '#ffffff' : '#0e233d';
  const secondaryFill = isDark ? '#84cc16' : '#556b2f';
  const nodeNavy = isDark ? '#93c5fd' : '#19375b';
  const nodeGreen = isDark ? '#bef264' : '#556b2f';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Emblem reproducing the stylized crescent, slice vector, and synaptic mind nodes */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={`crescentGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? '#3b82f6' : '#0e233d'} />
            <stop offset="100%" stopColor={isDark ? '#60a5fa' : '#1c3d66'} />
          </linearGradient>
          <linearGradient id={`sliceGrad-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#2563eb' : '#0a1d33'} />
            <stop offset="100%" stopColor={isDark ? '#93c5fd' : '#1e3a8a'} />
          </linearGradient>
        </defs>

        {/* Outer Curved Orbit Arc */}
        <path
          d="M 68 18 C 36 18, 14 42, 14 74 C 14 96, 28 114, 52 120 C 66 123, 80 119, 90 110 C 95 105, 96 99, 91 95 C 86 91, 80 94, 74 99 C 63 107, 49 107, 39 101 C 28 94, 25 80, 27 68 C 29 55, 38 41, 52 35 C 66 29, 82 32, 92 41 C 97 45, 103 44, 106 39 C 109 34, 107 28, 101 23 C 92 19, 80 18, 68 18 Z"
          fill={`url(#crescentGrad-${variant})`}
        />

        {/* Diagonal Dynamic Slice / Vision Arrow */}
        <path
          d="M 22 108 L 102 24 C 105 21, 110 23, 110 27 L 100 45 L 28 116 C 24 119, 19 114, 22 108 Z"
          fill={`url(#sliceGrad-${variant})`}
          opacity="0.95"
        />

        {/* Mind Contour / Eye Perimeter */}
        <path
          d="M 40 70 C 46 56, 62 48, 78 54 C 88 58, 96 68, 92 78 C 86 92, 70 100, 54 94 C 44 90, 36 80, 40 70 Z"
          stroke={isDark ? '#e0e7ff' : '#0e233d'}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Neural Synapse Nodes and Bridge */}
        <circle cx="56" cy="74" r="5.5" fill={nodeNavy} />
        <circle cx="76" cy="68" r="5.5" fill={nodeGreen} />
        <line x1="56" y1="74" x2="76" y2="68" stroke={nodeGreen} strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* Typography: SYSTAC MIND and CONSULTANTS */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black tracking-[0.14em] font-['Outfit'] ${dimensions.mainText}`}
            style={{ color: primaryFill }}
          >
            SYSTAC MIND
          </span>
          <span
            className={`font-bold tracking-[0.34em] uppercase font-['Outfit'] mt-1 ${dimensions.subText}`}
            style={{ color: secondaryFill }}
          >
            CONSULTANTS
          </span>
        </div>
      )}
    </div>
  );
};
