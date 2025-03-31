
import React from 'react';
import PCOSDietPlan from './PCOSDietPlan';
import PregnancyDietPlan from './PregnancyDietPlan';
import WeightManagementPlan from './WeightManagementPlan';

const LifestylePlansTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Weight Management Plan Component */}
      <WeightManagementPlan />
      
      {/* PCOS Diet Plan Component */}
      <PCOSDietPlan />
      
      {/* Pregnancy Diet Plan Component */}
      <PregnancyDietPlan />
    </div>
  );
};

export default LifestylePlansTab;
