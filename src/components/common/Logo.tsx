import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  withLink = true
}) => {
  const isDark = theme === 'dark';

  // Proportional sizes for prominent yet harmonious display
  const dimensions = {
    sm: { iconSize: 32, textMain: 'text-lg', textSub: 'text-[9px]', heightClass: 'h-9' },
    md: { iconSize: 42, textMain: 'text-2xl', textSub: 'text-[11px]', heightClass: 'h-11 sm:h-12' },
    lg: { iconSize: 52, textMain: 'text-3xl', textSub: 'text-xs', heightClass: 'h-14 sm:h-16' },
    xl: { iconSize: 68, textMain: 'text-4xl sm:text-5xl', textSub: 'text-sm', heightClass: 'h-20 sm:h-24' },
  }[size];

  // Vector Logo Emblem (Triangle + Barbell)
  const Emblem = (
    <svg
      width={dimensions.iconSize}
      height={dimensions.iconSize}
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        {/* Subtle dynamic gradient for the terracotta triangle */}
        <linearGradient id={isDark ? "triangleGradDark" : "triangleGrad"} x1="15" y1="15" x2="85" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E49C7A" />
          <stop offset="60%" stopColor="#D97241" />
          <stop offset="100%" stopColor="#C75F2F" />
        </linearGradient>

        {/* Soft shadow filter */}
        <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#D97241" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ─── 1. INVERTED TRIANGLE (∇ Strength & Focus) ─── */}
      <polygon
        points="16,18 84,18 50,78"
        stroke={`url(#${isDark ? "triangleGradDark" : "triangleGrad"})`}
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        filter="url(#subtleGlow)"
      />

      {/* ─── 2. BARBELL HORIZONTAL SHAFT ─── */}
      <line
        x1="6"
        y1="38"
        x2="94"
        y2="38"
        stroke={isDark ? '#FFFFFF' : '#1F2722'}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* ─── 3. BARBELL WEIGHT PLATES (Symmetric Heavy Plates) ─── */}
      {/* Right End Plates */}
      <rect
        x="80"
        y="26"
        width="4.5"
        height="24"
        rx="2"
        fill={isDark ? '#CBDCD0' : '#7D9683'}
      />
      <rect
        x="87"
        y="21"
        width="6"
        height="34"
        rx="2.5"
        fill={isDark ? '#FFFFFF' : '#1F2722'}
      />
      <rect
        x="95"
        y="33"
        width="3"
        height="10"
        rx="1.5"
        fill={isDark ? '#CBDCD0' : '#7D9683'}
      />

      {/* Left End Plates */}
      <rect
        x="15.5"
        y="26"
        width="4.5"
        height="24"
        rx="2"
        fill={isDark ? '#CBDCD0' : '#7D9683'}
      />
      <rect
        x="7"
        y="21"
        width="6"
        height="34"
        rx="2.5"
        fill={isDark ? '#FFFFFF' : '#1F2722'}
      />
      <rect
        x="2"
        y="33"
        width="3"
        height="10"
        rx="1.5"
        fill={isDark ? '#CBDCD0' : '#7D9683'}
      />

      {/* Center Intersection Ring */}
      <circle
        cx="50"
        cy="38"
        r="3.5"
        fill={isDark ? '#E49C7A' : '#D97241'}
      />
    </svg>
  );

  const content = (
    <div className={`group inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`} dir="rtl">
      {/* Visual Emblem */}
      <div className="relative flex items-center justify-center p-0.5">
        {Emblem}
      </div>

      {/* Brand Typography Lockup */}
      {variant !== 'icon' && (
        <div className="flex flex-col text-right leading-none">
          <div className="flex items-baseline gap-2">
            {/* Arabic Brand Name */}
            <span
              className={`font-black tracking-tight font-['Cairo',sans-serif] ${dimensions.textMain} ${
                isDark ? 'text-white' : 'text-[#1F2722]'
              } transition-colors group-hover:text-[#D97241]`}
            >
              عَـزْم
            </span>

            {/* Latin Acronym Tag */}
            <span
              className={`font-mono font-black text-[11px] sm:text-xs tracking-wider uppercase px-1.5 py-0.5 rounded ${
                isDark
                  ? 'bg-white/10 text-[#E49C7A] border border-white/15'
                  : 'bg-[#FDF6F2] text-[#D97241] border border-[#F5DACB]'
              }`}
            >
              AZM
            </span>
          </div>

          {/* Subtitle / Brand Descriptor */}
          {variant === 'full' && (
            <span
              className={`font-semibold tracking-wide ${dimensions.textSub} mt-1 ${
                isDark ? 'text-white/60' : 'text-[#7D9683]'
              }`}
            >
              منصة اللياقة والتغذية الصحية
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link
        to="/"
        className="inline-flex items-center py-1 transition-opacity hover:opacity-90 active:scale-[0.98]"
        title="الصفحة الرئيسية - منصة عزم"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
