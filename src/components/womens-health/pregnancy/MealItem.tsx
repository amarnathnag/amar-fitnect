
import React from 'react';
import { Clock } from 'lucide-react';

interface MealItemProps {
  time: string;
  name: string;
  description: string;
}

const MealItem = ({ time, name, description }: MealItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-health-light dark:bg-health-dark/20 flex items-center justify-center">
          <Clock className="h-5 w-5" />
        </div>
        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2 mb-2"></div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {time}
          </div>
          <div className="text-sm font-semibold">{name}</div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MealItem;
