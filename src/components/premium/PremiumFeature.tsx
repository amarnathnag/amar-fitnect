
import React from 'react';
import { Sparkles } from 'lucide-react';

interface PremiumFeatureProps {
  title: string;
  description: string;
}

const PremiumFeature = ({ title, description }: PremiumFeatureProps) => (
  <li className="flex">
    <Sparkles className="h-5 w-5 text-health-primary mr-3 flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </li>
);

export default PremiumFeature;
