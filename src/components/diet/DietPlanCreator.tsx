
import React, { useState } from 'react';
import { useDietPlans } from '@/hooks/useDietPlans';
import DietPlanForm from './DietPlanForm';
import MealAddForm from './MealAddForm';
import PlanStatusCard from './PlanStatusCard';

const DietPlanCreator = () => {
  const { createDietPlan, addMealToPlan } = useDietPlans();
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [selectedDay] = useState('Monday');
  const [selectedMealType] = useState('breakfast');

  const handleCreatePlan = async (name: string, goal: string) => {
    const plan = await createDietPlan(name, goal);
    if (plan) {
      setCurrentPlanId(plan.id);
    }
  };

  const handleAddMeal = async (day: string, mealType: string, foodName: string, quantity: string, calories: string) => {
    if (!currentPlanId) return;
    
    const caloriesNum = calories ? parseInt(calories) : undefined;
    await addMealToPlan(currentPlanId, day, mealType, foodName, quantity, caloriesNum);
  };

  return (
    <div className="space-y-6">
      <DietPlanForm onCreatePlan={handleCreatePlan} />
      <MealAddForm 
        currentPlanId={currentPlanId} 
        onAddMeal={handleAddMeal} 
      />
      <PlanStatusCard 
        currentPlanId={currentPlanId}
        selectedDay={selectedDay}
        selectedMealType={selectedMealType}
      />
    </div>
  );
};

export default DietPlanCreator;
