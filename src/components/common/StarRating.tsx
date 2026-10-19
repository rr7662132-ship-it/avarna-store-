import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

const sizeMap = {
  sm: { star: 'h-3.5 w-3.5', text: 'text-xs', gap: 'gap-0.5' },
  md: { star: 'h-4 w-4', text: 'text-sm', gap: 'gap-0.5' },
  lg: { star: 'h-5 w-5', text: 'text-base', gap: 'gap-1' },
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'sm',
  showCount = false,
  count,
}) => {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center ${s.gap}`}>
      <div className={`flex items-center ${s.gap}`}>
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1;
          const filled = rating >= starValue;
          const halfFilled = !filled && rating >= starValue - 0.5;

          return (
            <div key={i} className="relative">
              {/* Background (empty) star */}
              <Star className={`${s.star} text-gray-200`} />

              {/* Filled overlay */}
              {(filled || halfFilled) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star className={`${s.star} fill-amber-400 text-amber-400`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showCount && count !== undefined && (
        <span className={`ml-1 ${s.text} text-gray-400`}>({count})</span>
      )}
    </div>
  );
};

export default StarRating;
