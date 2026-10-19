import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-50">
        <Icon className="h-8 w-8 text-forest-400" />
      </div>
      <h3 className="font-display text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-gray-500">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 rounded-full bg-forest-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-forest-700 hover:shadow-md active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
