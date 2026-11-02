import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'icon';
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
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', subtext: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', subtext: 'text-[11px]' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', subtext: 'text-xs' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', subtext: 'text-sm' },
  };

  const isDark = theme === 'dark';

  const LogoIcon = (
    <svg
      className={`${sizeMap[size].icon} shrink-0 transition-transform duration-300 hover:scale-105`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="azmGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="azmGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Outer Royal Shield */}
      <path
        d="M50 8 L84 25 C84 56 69 78 50 90 C31 78 16 56 16 25 L50 8 Z"
        fill="url(#azmGradBlue)"
      />

      {/* Inner Dynamic Field */}
      <path
        d="M50 18 L76 33 C76 56 64 72 50 82 C36 72 24 56 24 33 L50 18 Z"
        fill={isDark ? '#0B132B' : '#0F172A'}
      />

      {/* Dynamic Athletic Surge Wings (A / Falcon shape) */}
      <path d="M36 66 L48 30 L54 30 L42 66 Z" fill="#FFFFFF" />
      <path d="M64 66 L52 30 L46 30 L58 66 Z" fill="#93C5FD" opacity="0.85" />

      {/* Vitality & Nutrition Emerald Lightning */}
      <path
        d="M50 26 L55 42 L46 42 L52 62 L40 46 L48 46 Z"
        fill="url(#azmGradGreen)"
      />

      {/* Focus Core Dot */}
      <circle cx="50" cy="72" r="3" fill="#34D399" />
    </svg>
  );

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {LogoIcon}
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${sizeMap[size].text} ${
                isDark ? 'text-white' : 'text-brand-blue-700'
              }`}
            >
              عـزم
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 mb-1" />
            <span
              className={`font-black tracking-widest text-xs font-mono uppercase ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}
            >
              AZM
            </span>
          </div>
          <span
            className={`${sizeMap[size].subtext} font-medium mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            منصة اللياقة والتغذية • المكلا
          </span>
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link to="/" className="inline-block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};

