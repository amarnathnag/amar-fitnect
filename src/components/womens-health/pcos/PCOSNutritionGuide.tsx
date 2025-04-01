
import React from 'react';
import { Check } from 'lucide-react';

const PCOSNutritionGuide = () => {
  return (
    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Foods to Include:</h3>
      <ul className="space-y-2">
        {[
          'High-fiber foods (broccoli, spinach, carrots)',
          'Lean protein (chicken, tofu, eggs)',
          'Whole grains (brown rice, oats, quinoa)',
          'Healthy fats (avocado, nuts, olive oil)',
          'Anti-inflammatory spices (turmeric, cinnamon, ginger)'
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Foods to Avoid:</h3>
      <ul className="space-y-2">
        {[
          'Refined sugars and carbohydrates',
          'Processed foods and trans fats',
          'Excessive dairy products',
          'Red meat in excess',
          'Caffeinated and alcoholic beverages'
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0 flex items-center justify-center">
              <div className="h-0.5 w-3 bg-red-500 rotate-45 absolute"></div>
              <div className="h-0.5 w-3 bg-red-500 -rotate-45 absolute"></div>
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PCOSNutritionGuide;
