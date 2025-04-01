
import React from 'react';
import PCOSNutritionGuide from './pcos/PCOSNutritionGuide';
import PCOSMealPlanCard from './pcos/PCOSMealPlanCard';
import { pcosPlans } from './pcos/pcosPlansData';

const PCOSDietPlan = () => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">PCOS Diet Plan</h2>
      
      {/* Nutrition Guide */}
      <PCOSNutritionGuide />

      {/* Meal Plans */}
      <div className="grid grid-cols-1 gap-6">
        {pcosPlans.map(plan => (
          <PCOSMealPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PCOSDietPlan;
