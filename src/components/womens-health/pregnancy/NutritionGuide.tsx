
import React from 'react';
import { Check } from 'lucide-react';

const NutritionGuide = () => {
  return (
    <div className="bg-pink-50/50 dark:bg-pink-900/10 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Essential Nutrients to Include:</h3>
      <ul className="space-y-2">
        {[
          'Protein-rich foods (lentils, fish, eggs, lean meat)',
          'Iron & folic acid (leafy greens, beans, citrus fruits)',
          'Omega-3 fatty acids (salmon, flaxseeds, walnuts)',
          'Calcium-rich foods (milk, yogurt, almonds, fortified plant milks)',
          'Vitamin D sources (fatty fish, egg yolks, sunlight exposure)'
        ].map((item, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Foods to Avoid During Pregnancy:</h3>
      <ul className="space-y-2">
        {[
          'Raw or undercooked seafood, meat, and eggs',
          'Unpasteurized dairy products and juices',
          'High-mercury fish (shark, swordfish, king mackerel)',
          'Excessive caffeine (limit to 200mg daily)',
          'Alcohol (no safe amount during pregnancy)'
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

export default NutritionGuide;
