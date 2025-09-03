import { Star } from 'lucide-react';
import React from 'react';

interface StarRatingProps {
  size: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ size, className }) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Star style={{ width: size, height: size }} className="fill-orange-400 text-orange-400" />
      <Star style={{ width: size, height: size }} className="fill-orange-400 text-orange-400" />
      <Star style={{ width: size, height: size }} className="fill-orange-400 text-orange-400" />
      <Star style={{ width: size, height: size }} className="fill-orange-400 text-orange-400" />
      <Star style={{ width: size, height: size }} className="fill-gray-100 text-orange-400" />
    </div>
  );
};

export default StarRating;
