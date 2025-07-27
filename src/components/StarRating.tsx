import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = true,
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex space-x-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.floor(rating);
          const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <div key={index} className="relative">
              <Star 
                className={`${sizeClasses[size]} text-gray-300`}
              />
              {(isFilled || isHalfFilled) && (
                <Star 
                  className={`${sizeClasses[size]} text-yellow-400 fill-current absolute top-0 left-0 ${
                    isHalfFilled ? 'w-1/2 overflow-hidden' : ''
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-medium text-gray-900 ${textSizeClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}