
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NutritionGuide from './pregnancy/NutritionGuide';
import TrimesterPlanCard from './pregnancy/TrimesterPlanCard';
import { trimesterPlans } from './pregnancy/trimesterPlansData';

const PregnancyDietPlan = () => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Pregnancy Diet Plan</h2>
      
      <NutritionGuide />

      <Tabs defaultValue="first-trimester" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="first-trimester">First Trimester</TabsTrigger>
            <TabsTrigger value="second-trimester">Second Trimester</TabsTrigger>
            <TabsTrigger value="third-trimester">Third Trimester</TabsTrigger>
          </TabsList>
        </div>

        {trimesterPlans.map(plan => (
          <TabsContent key={plan.id} value={plan.id} className="animate-fade-in">
            <TrimesterPlanCard plan={plan} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PregnancyDietPlan;
