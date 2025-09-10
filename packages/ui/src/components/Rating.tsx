import React from 'react';

interface RatingProps {
  value: number;
  max?: number;
}

const Rating: React.FC<RatingProps> = ({ value, max = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">({value})</span>
    </div>
  );
};

export default Rating;
