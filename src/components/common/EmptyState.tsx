import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white rounded-3xl border border-dashed border-sand-300 shadow-sm max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-sand-100 text-terracotta-500 flex items-center justify-center mb-4 ring-8 ring-sand-100/60">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-forest-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">{description}</p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm transition-all shadow-md shadow-terracotta-500/20 active:scale-95"
        >
          {actionText}
        </Link>
      )}

      {actionText && onActionClick && !actionLink && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-sm transition-all shadow-md shadow-terracotta-500/20 active:scale-95"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
