
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Utensils } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';

const DietPlanCreator = () => {
  const { createDietPlan, addMealToPlan, getMealsForPlan } = useDietPlans();
  const [planName, setPlanName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');

  const goals = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Weight Maintenance' },
    { value: 'thyroid-control', label: 'Thyroid Control' },
    { value: 'pcos-management', label: 'PCOS Management' }
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
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

  const handleAddMeal = async () => {
    if (!currentPlanId || !foodName) {
      alert('Please create a plan first and enter food name');
      return;
    }

    const caloriesNum = calories ? parseInt(calories) : undefined;
    await addMealToPlan(currentPlanId, selectedDay, selectedMealType, foodName, quantity, caloriesNum);
    
    // Reset form
    setFoodName('');
    setQuantity('');
    setCalories('');
  };

  return (
    <div className="space-y-6">
      {/* Create New Diet Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-green-500" />
            Create New Diet Plan
          </CardTitle>
          <CardDescription>
            Design a personalized diet plan based on your health goals
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
            <Plus className="mr-2 h-4 w-4" />
            Create Diet Plan
          </Button>
        </CardContent>
      </Card>

      {/* Add Meals to Plan */}
      {currentPlanId && (
        <Card>
          <CardHeader>
            <CardTitle>Add Meals to Your Plan</CardTitle>
            <CardDescription>
              Add specific foods for each day and meal type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label>Meal Type</Label>
                <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map((meal) => (
                      <SelectItem key={meal.value} value={meal.value}>
                        {meal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foodName">Food Name *</Label>
                <Input 
                  id="foodName"
                  placeholder="e.g., Grilled Chicken"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity"
                  placeholder="e.g., 100g, 1 cup"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input 
                  id="calories"
                  type="number"
                  placeholder="e.g., 200"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleAddMeal}
              className="w-full"
              disabled={!foodName}
            >
              <Save className="mr-2 h-4 w-4" />
              Add Meal
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Plan Status */}
      {currentPlanId && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Plan Created Successfully! You can now add meals to your {selectedDay} {selectedMealType}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietPlanCreator;
