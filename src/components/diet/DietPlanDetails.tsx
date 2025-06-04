
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Utensils, Target } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';

interface DietPlanDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  planGoal: string;
}

interface MealData {
  id: string;
  day_of_week: string;
  meal_type: string;
  food_name: string;
  quantity?: string;
  calories?: number;
}

const DietPlanDetails: React.FC<DietPlanDetailsProps> = ({ 
  isOpen, 
  onClose, 
  planId, 
  planName, 
  planGoal 
}) => {
  const { getMealsForPlan } = useDietPlans();
  const [meals, setMeals] = useState<MealData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && planId) {
      console.log('Loading meals for plan:', planId);
      loadMeals();
    }
  }, [isOpen, planId]);

  const loadMeals = async () => {
    setLoading(true);
    try {
      const planMeals = await getMealsForPlan(planId);
      console.log('Loaded meals:', planMeals);
      setMeals(planMeals);
    } catch (error) {
      console.error('Error loading meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupMealsByDay = () => {
    const grouped: { [key: string]: { [key: string]: MealData[] } } = {};
    
    meals.forEach(meal => {
      if (!grouped[meal.day_of_week]) {
        grouped[meal.day_of_week] = {};
      }
      if (!grouped[meal.day_of_week][meal.meal_type]) {
        grouped[meal.day_of_week][meal.meal_type] = [];
      }
      grouped[meal.day_of_week][meal.meal_type].push(meal);
    });
    
    return grouped;
  };

  const getMealTypeIcon = (mealType: string) => {
    switch (mealType) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌆';
      case 'night': return '🌙';
      default: return '🍽️';
    }
  };

  const getDayCalories = (dayMeals: { [key: string]: MealData[] }) => {
    return Object.values(dayMeals).flat().reduce((total, meal) => total + (meal.calories || 0), 0);
  };

  const groupedMeals = groupMealsByDay();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-2">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-green-500" />
            {planName} - Daily Meal Schedule
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Goal: <Badge variant="outline" className="capitalize">{planGoal.replace('-', ' ')}</Badge>
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2">Loading meal schedule...</span>
          </div>
        ) : Object.keys(groupedMeals).length > 0 ? (
          <div className="space-y-6">
            {daysOfWeek.map(day => {
              const dayMeals = groupedMeals[day];
              if (!dayMeals) return null;

              return (
                <div key={day} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {day}
                    </h3>
                    <Badge variant="secondary">
                      {getDayCalories(dayMeals)} calories
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {['morning', 'afternoon', 'evening', 'night'].map(mealType => {
                      const mealTypeData = dayMeals[mealType];
                      if (!mealTypeData) return null;

                      return (
                        <div key={mealType} className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm">
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                            <span>{getMealTypeIcon(mealType)}</span>
                            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                          </h4>
                          <div className="space-y-2">
                            {mealTypeData.map(meal => (
                              <div key={meal.id} className="text-xs">
                                <div className="font-medium">{meal.food_name}</div>
                                {meal.quantity && (
                                  <div className="text-gray-600 dark:text-gray-400">
                                    {meal.quantity}
                                  </div>
                                )}
                                {meal.calories && (
                                  <div className="text-orange-600 font-medium">
                                    {meal.calories} cal
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Utensils className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Meals Planned Yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              This diet plan doesn't have any meals scheduled yet. You can add meals using the diet plan creator.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DietPlanDetails;
