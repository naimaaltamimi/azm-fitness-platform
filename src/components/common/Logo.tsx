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
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  const logoSrc = isDark ? '/images/azm-logo-dark.png' : '/images/azm-logo.png';

  const content = (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img
        src={logoSrc}
        alt="عزم AZM - منصة اللياقة والتغذية الصحية"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 hover:scale-105`}
      />
    </div>
  );

  if (withLink) {
    return (
      <Link to="/" className="inline-block hover:opacity-95 transition-opacity" title="الرئيسية - عزم">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
