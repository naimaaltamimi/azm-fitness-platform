import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'جاري التحميل...',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div
        className={`${sizeClasses[size]} border-sand-200 border-t-terracotta-500 border-r-sage-500 rounded-full animate-spin`}
      />
      {text && <p className="text-sm font-medium text-forest-800 animate-pulse">{text}</p>}
    </div>
  );
};
