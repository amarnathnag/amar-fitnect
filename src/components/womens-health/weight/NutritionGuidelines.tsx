
import React from 'react';
import { Check } from 'lucide-react';

const NutritionGuidelines = () => {
  return (
    <div className="bg-green-50/50 dark:bg-green-900/10 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Healthy Eating Guidelines:</h3>
      <ul className="space-y-2">
        {[
          'Balanced meals with carbs, protein & healthy fats in each meal',
          'Hydration is key - at least 3L water daily',
          'Fiber-rich foods to support digestion and gut health',
          'Portion control & mindful eating practices',
          'Regular meal timing to stabilize blood sugar and energy'
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Key Nutrients for Women:</h3>
      <ul className="space-y-2">
        {[
          'Iron: essential for preventing anemia, especially during menstruation',
          'Calcium: vital for bone health and preventing osteoporosis',
          'Folate: important for reproductive health and pregnancy',
          'Vitamin D: supports calcium absorption and immune function',
          'Omega-3 fatty acids: reduces inflammation and supports heart health'
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionGuidelines;
