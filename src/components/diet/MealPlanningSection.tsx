
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Utensils, Sunrise, Sun, Sunset, Moon } from 'lucide-react';

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

interface MealPlanningSectionProps {
  onMealsChange: (meals: DayMeals) => void;
  isEnabled: boolean;
}

const MealPlanningSection: React.FC<MealPlanningSectionProps> = ({ onMealsChange, isEnabled }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dayMeals, setDayMeals] = useState<DayMeals>({
    morning: [],
    afternoon: [],
    evening: [],
    night: []
  });
  const [currentMeal, setCurrentMeal] = useState({
    name: '',
    quantity: '',
    calories: ''
  });
  const [selectedMealTime, setSelectedMealTime] = useState('morning');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const mealTimes = [
    { key: 'morning', label: 'Morning', icon: <Sunrise className="h-4 w-4 text-orange-500" /> },
    { key: 'afternoon', label: 'Afternoon', icon: <Sun className="h-4 w-4 text-yellow-500" /> },
    { key: 'evening', label: 'Evening', icon: <Sunset className="h-4 w-4 text-orange-600" /> },
    { key: 'night', label: 'Night', icon: <Moon className="h-4 w-4 text-blue-500" /> }
  ];

  const addMeal = () => {
    if (!currentMeal.name || !currentMeal.quantity || !currentMeal.calories) {
      return;
    }

    const newMeal: MealItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: currentMeal.name,
      quantity: currentMeal.quantity,
      calories: parseInt(currentMeal.calories)
    };

    const updatedMeals = {
      ...dayMeals,
      [selectedMealTime]: [...dayMeals[selectedMealTime as keyof DayMeals], newMeal]
    };

    setDayMeals(updatedMeals);
    onMealsChange(updatedMeals);
    
    setCurrentMeal({ name: '', quantity: '', calories: '' });
  };

  const removeMeal = (mealTime: keyof DayMeals, mealId: string) => {
    const updatedMeals = {
      ...dayMeals,
      [mealTime]: dayMeals[mealTime].filter(meal => meal.id !== mealId)
    };
    
    setDayMeals(updatedMeals);
    onMealsChange(updatedMeals);
  };

  const getTotalDayCalories = () => {
    return Object.values(dayMeals).reduce((total, meals) => 
      total + meals.reduce((sum, meal) => sum + meal.calories, 0), 0
    );
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-green-500" />
          Custom Meal Planning
        </CardTitle>
        <CardDescription>
          Add your own foods for different times of the day to create a personalized meal schedule
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Day Selection */}
        <div className="space-y-2">
          <Label>Plan meals for</Label>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger className="w-48">
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
          {getTotalDayCalories() > 0 && (
            <Badge variant="outline" className="ml-2">
              Total: {getTotalDayCalories()} calories for {selectedDay}
            </Badge>
          )}
        </div>

        {/* Add New Meal */}
        <div className="space-y-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <h4 className="font-medium">Add New Meal</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Meal Time</Label>
              <Select value={selectedMealTime} onValueChange={setSelectedMealTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mealTimes.map((time) => (
                    <SelectItem key={time.key} value={time.key}>
                      <div className="flex items-center gap-2">
                        {time.icon}
                        {time.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Food Name</Label>
              <Input
                placeholder="e.g., Oats with milk"
                value={currentMeal.name}
                onChange={(e) => setCurrentMeal(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                placeholder="e.g., 1 bowl"
                value={currentMeal.quantity}
                onChange={(e) => setCurrentMeal(prev => ({ ...prev, quantity: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Calories</Label>
              <Input
                type="number"
                placeholder="300"
                value={currentMeal.calories}
                onChange={(e) => setCurrentMeal(prev => ({ ...prev, calories: e.target.value }))}
              />
            </div>
          </div>
          <Button 
            onClick={addMeal}
            disabled={!currentMeal.name || !currentMeal.quantity || !currentMeal.calories}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Meal to {selectedDay}
          </Button>
        </div>

        {/* Display Added Meals */}
        {Object.values(dayMeals).some(meals => meals.length > 0) && (
          <div className="space-y-4">
            <h4 className="font-medium">Planned Meals for {selectedDay}</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mealTimes.map((mealTime) => {
                const meals = dayMeals[mealTime.key as keyof DayMeals];
                if (meals.length === 0) return null;

                return (
                  <div key={mealTime.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {mealTime.icon}
                      <h5 className="font-medium">{mealTime.label}</h5>
                      <Badge variant="secondary" className="text-xs">
                        {meals.reduce((sum, meal) => sum + meal.calories, 0)} cal
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {meals.map((meal) => (
                        <div key={meal.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded border">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{meal.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {meal.quantity} • {meal.calories} cal
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMeal(mealTime.key as keyof DayMeals, meal.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealPlanningSection;
