
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Utensils, Save, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';
import MealTimeSelector from './MealTimeSelector';

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
}

interface DayMeals {
  morning: MealItem[];
  afternoon: MealItem[];
  evening: MealItem[];
  night: MealItem[];
}

const EnhancedDietPlanCreator = () => {
  const { createDietPlan, addMealToPlan } = useDietPlans();
  const [planName, setPlanName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dayMeals, setDayMeals] = useState<DayMeals>({
    morning: [],
    afternoon: [],
    evening: [],
    night: []
  });

  const goals = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Weight Maintenance' },
    { value: 'thyroid-control', label: 'Thyroid Control' },
    { value: 'pcos-management', label: 'PCOS Management' }
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const mealTimes = [
    { key: 'morning', label: 'Morning', icon: <Sunrise className="h-5 w-5 text-orange-500" /> },
    { key: 'afternoon', label: 'Afternoon', icon: <Sun className="h-5 w-5 text-yellow-500" /> },
    { key: 'evening', label: 'Evening', icon: <Sunset className="h-5 w-5 text-orange-600" /> },
    { key: 'night', label: 'Night', icon: <Moon className="h-5 w-5 text-blue-500" /> }
  ];

  const handleCreatePlan = async () => {
    if (!planName || !selectedGoal) {
      alert('Please fill in plan name and goal');
      return;
    }

    const plan = await createDietPlan(planName, selectedGoal);
    if (plan) {
      setCurrentPlanId(plan.id);
      setPlanName('');
      setSelectedGoal('');
    }
  };

  const addMealToTime = (mealTime: keyof DayMeals, meal: Omit<MealItem, 'id'>) => {
    const newMeal: MealItem = {
      ...meal,
      id: `${Date.now()}-${Math.random()}`
    };
    
    setDayMeals(prev => ({
      ...prev,
      [mealTime]: [...prev[mealTime], newMeal]
    }));
  };

  const removeMealFromTime = (mealTime: keyof DayMeals, mealId: string) => {
    setDayMeals(prev => ({
      ...prev,
      [mealTime]: prev[mealTime].filter(meal => meal.id !== mealId)
    }));
  };

  const saveDayMeals = async () => {
    if (!currentPlanId) {
      alert('Please create a diet plan first');
      return;
    }

    for (const mealTime of Object.keys(dayMeals) as Array<keyof DayMeals>) {
      for (const meal of dayMeals[mealTime]) {
        await addMealToPlan(
          currentPlanId,
          selectedDay,
          mealTime,
          meal.name,
          meal.quantity,
          meal.calories
        );
      }
    }

    // Clear the day meals after saving
    setDayMeals({
      morning: [],
      afternoon: [],
      evening: [],
      night: []
    });
  };

  const getTotalDayCalories = () => {
    return Object.values(dayMeals).reduce((total, meals) => 
      total + meals.reduce((sum, meal) => sum + meal.calories, 0), 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Create New Diet Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-green-500" />
            Create Enhanced Diet Plan
          </CardTitle>
          <CardDescription>
            Design a personalized diet plan with time-wise food selection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="planName">Diet Plan Name</Label>
              <Input 
                id="planName"
                placeholder="e.g., My Weight Loss Plan"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Health Goal</Label>
              <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  {goals.map((goal) => (
                    <SelectItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleCreatePlan}
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={!planName || !selectedGoal}
          >
            <Utensils className="mr-2 h-4 w-4" />
            Create Diet Plan
          </Button>
        </CardContent>
      </Card>

      {/* Day Selection and Meal Planning */}
      {currentPlanId && (
        <>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Plan Meals for {selectedDay}</CardTitle>
                  <CardDescription>Add foods for different times of the day</CardDescription>
                </div>
                {getTotalDayCalories() > 0 && (
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Total: {getTotalDayCalories()} calories
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <Label>Day of Week</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Meal Time Selectors */}
          <div className="grid gap-6">
            {mealTimes.map((mealTime) => (
              <MealTimeSelector
                key={mealTime.key}
                mealTime={mealTime.label}
                icon={mealTime.icon}
                meals={dayMeals[mealTime.key as keyof DayMeals]}
                onAddMeal={(meal) => addMealToTime(mealTime.key as keyof DayMeals, meal)}
                onRemoveMeal={(mealId) => removeMealFromTime(mealTime.key as keyof DayMeals, mealId)}
              />
            ))}
          </div>

          {/* Save Day Meals */}
          {Object.values(dayMeals).some(meals => meals.length > 0) && (
            <Card>
              <CardContent className="pt-6">
                <Button 
                  onClick={saveDayMeals}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save {selectedDay} Meals to Diet Plan
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedDietPlanCreator;
