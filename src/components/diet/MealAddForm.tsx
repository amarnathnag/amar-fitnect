
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from 'lucide-react';

interface MealAddFormProps {
  currentPlanId: string | null;
  onAddMeal: (day: string, mealType: string, foodName: string, quantity: string, calories: string) => Promise<void>;
}

const MealAddForm = ({ currentPlanId, onAddMeal }: MealAddFormProps) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [calories, setCalories] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  const handleAddMeal = async () => {
    if (!currentPlanId || !foodName) {
      alert('Please create a plan first and enter food name');
      return;
    }

    await onAddMeal(selectedDay, selectedMealType, foodName, quantity, calories);
    
    // Reset form
    setFoodName('');
    setQuantity('');
    setCalories('');
  };

  if (!currentPlanId) {
    return null;
  }

  return (
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
  );
};

export default MealAddForm;
