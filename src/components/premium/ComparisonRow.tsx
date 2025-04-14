
import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ComparisonRowProps {
  feature: string;
  free: boolean | string;
  premium: boolean | string;
  highlight?: boolean;
}

const ComparisonRow = ({ 
  feature, 
  free, 
  premium, 
  highlight = false 
}: ComparisonRowProps) => (
  <tr className="border-b border-gray-200 dark:border-gray-700">
    <td className="px-4 py-3">{feature}</td>
    <td className="px-4 py-3 text-center">
      {typeof free === 'boolean' ? (
        free ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
      ) : (
        <span className="text-sm">{free}</span>
      )}
    </td>
    <td className={`px-4 py-3 text-center ${highlight ? 'bg-health-light dark:bg-health-primary/10' : ''}`}>
      {typeof premium === 'boolean' ? (
        premium ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
      ) : (
        <span className="text-sm font-medium">{premium}</span>
      )}
    </td>
  </tr>
);

export default ComparisonRow;
