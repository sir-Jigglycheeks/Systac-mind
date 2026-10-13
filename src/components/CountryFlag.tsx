import React from 'react';

interface CountryFlagProps {
  country: string; // 'UK' | 'USA' | 'CA' | 'EU' | 'DE' | 'FR' | 'NL' | 'SE' or name
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'circle' | 'square';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  country,
  className = '',
  size = 'md',
  shape = 'rounded',
}) => {
  const normalized = country.toUpperCase().trim();

  // Size mapping
  const sizeMap = {
    xs: 'w-4 h-3 text-[10px]',
    sm: 'w-5 h-3.5 text-xs',
    md: 'w-7 h-5 text-sm',
    lg: 'w-9 h-6 text-base',
    xl: 'w-11 h-8 text-lg',
  };

  const shapeClass = {
    rounded: 'rounded-sm',
    circle: 'rounded-full aspect-square object-cover',
    square: 'rounded-none',
  }[shape];

  // UK Flag (Union Jack)
  if (normalized === 'UK' || normalized === 'GB' || normalized.includes('UNITED KINGDOM') || country.includes('🇬🇧')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <clipPath id="uk-clip">
            <rect width="60" height="30" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            {/* Blue background */}
            <rect width="60" height="30" fill="#012169" />
            {/* White diagonals */}
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
            {/* Red diagonals */}
            <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="2" strokeDasharray="30" strokeDashoffset="0" />
            <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="2" strokeDasharray="30" strokeDashoffset="0" />
            {/* White cross */}
            <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
            {/* Red cross */}
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      </span>
    );
  }

  // USA Flag
  if (normalized === 'USA' || normalized === 'US' || normalized.includes('UNITED STATES') || country.includes('🇺🇸')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="60" height="30" fill="#B22234" />
          {/* Stripes */}
          <path d="M0,2.3 h60 M0,6.9 h60 M0,11.5 h60 M0,16.1 h60 M0,20.7 h60 M0,25.3 h60" stroke="#FFFFFF" strokeWidth="2.3" />
          {/* Canton */}
          <rect width="25" height="16.1" fill="#3C3B6E" />
          {/* Stars representation */}
          <circle cx="5" cy="4" r="1.1" fill="#FFFFFF" />
          <circle cx="12.5" cy="4" r="1.1" fill="#FFFFFF" />
          <circle cx="20" cy="4" r="1.1" fill="#FFFFFF" />
          <circle cx="8.7" cy="8" r="1.1" fill="#FFFFFF" />
          <circle cx="16.2" cy="8" r="1.1" fill="#FFFFFF" />
          <circle cx="5" cy="12" r="1.1" fill="#FFFFFF" />
          <circle cx="12.5" cy="12" r="1.1" fill="#FFFFFF" />
          <circle cx="20" cy="12" r="1.1" fill="#FFFFFF" />
        </svg>
      </span>
    );
  }

  // Canada Flag
  if (normalized === 'CA' || normalized === 'CAN' || normalized.includes('CANADA') || country.includes('🇨🇦')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="60" height="30" fill="#FFFFFF" />
          <rect x="0" y="0" width="15" height="30" fill="#D80621" />
          <rect x="45" y="0" width="15" height="30" fill="#D80621" />
          {/* Stylized Maple Leaf */}
          <path d="M30 6 L32 12 L36 10 L35 15 L40 16 L38 19 L32 19 L34 23 L31 23 L30.5 25 L29.5 25 L29 23 L26 23 L28 19 L22 19 L20 16 L25 15 L24 10 L28 12 Z" fill="#D80621" />
        </svg>
      </span>
    );
  }

  // European Union / Europe
  if (normalized === 'EU' || normalized.includes('EUROPE') || normalized.includes('SCHENGEN') || country.includes('🇪🇺')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="60" height="30" fill="#003399" />
          {/* Circle of 12 stars */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const cx = 30 + 8 * Math.sin(angle);
            const cy = 15 - 8 * Math.cos(angle);
            return <circle key={i} cx={cx} cy={cy} r="1.2" fill="#FFCC00" />;
          })}
        </svg>
      </span>
    );
  }

  // Germany
  if (normalized === 'DE' || normalized.includes('GERMANY') || country.includes('🇩🇪')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="60" height="10" y="0" fill="#000000" />
          <rect width="60" height="10" y="10" fill="#DD0000" />
          <rect width="60" height="10" y="20" fill="#FFCE00" />
        </svg>
      </span>
    );
  }

  // France
  if (normalized === 'FR' || normalized.includes('FRANCE') || country.includes('🇫🇷')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="20" height="30" x="0" fill="#002395" />
          <rect width="20" height="30" x="20" fill="#FFFFFF" />
          <rect width="20" height="30" x="40" fill="#ED2939" />
        </svg>
      </span>
    );
  }

  // Netherlands
  if (normalized === 'NL' || normalized.includes('NETHERLANDS') || country.includes('🇳🇱')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="60" height="10" y="0" fill="#AE1C28" />
          <rect width="60" height="10" y="10" fill="#FFFFFF" />
          <rect width="60" height="10" y="20" fill="#21468B" />
        </svg>
      </span>
    );
  }

  // Ireland
  if (normalized === 'IE' || normalized.includes('IRELAND') || country.includes('🇮🇪')) {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-slate-700/50 ${sizeMap[size]} ${shapeClass} ${className}`}>
        <svg viewBox="0 0 60 30" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <rect width="20" height="30" x="0" fill="#169B62" />
          <rect width="20" height="30" x="20" fill="#FFFFFF" />
          <rect width="20" height="30" x="40" fill="#FF883E" />
        </svg>
      </span>
    );
  }

  // Default fallback
  return (
    <span className={`inline-flex items-center justify-center shrink-0 bg-slate-800 text-slate-200 font-bold border border-slate-700 ${sizeMap[size]} ${shapeClass} ${className}`}>
      {normalized.slice(0, 2)}
    </span>
  );
};
