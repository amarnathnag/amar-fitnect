
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NutritionGuidelines from './weight/NutritionGuidelines';
import MealPlanCard from './weight/MealPlanCard';
import { weightPlans } from './weight/weightPlansData';

const WeightManagementPlan = () => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Weight Management Plan for Women</h2>
      
      {/* Nutrition Guidelines */}
      <NutritionGuidelines />

      <Tabs defaultValue="weight-loss" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
            <TabsTrigger value="weight-maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="weight-gain">Weight Gain</TabsTrigger>
          </TabsList>
        </div>

        {weightPlans.map(plan => (
          <TabsContent key={plan.id} value={plan.id} className="animate-fade-in">
            <MealPlanCard plan={plan} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WeightManagementPlan;
