import React from 'react';
import { Leaf } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeMap = {
  sm: { icon: 'h-5 w-5', container: 'h-8 w-8', text: 'text-xs' },
  md: { icon: 'h-7 w-7', container: 'h-12 w-12', text: 'text-sm' },
  lg: { icon: 'h-10 w-10', container: 'h-16 w-16', text: 'text-base' },
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`relative ${s.container} animate-spin`}>
        <Leaf className={`${s.icon} text-forest-600`} />
      </div>
      {text && <p className={`${s.text} animate-pulse font-medium text-gray-500`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
