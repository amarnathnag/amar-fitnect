
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Trash2 } from 'lucide-react';

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: number;
}

interface MealTimeSelectorProps {
  mealTime: string;
  icon: React.ReactNode;
  meals: MealItem[];
  onAddMeal: (meal: Omit<MealItem, 'id'>) => void;
  onRemoveMeal: (id: string) => void;
}

const MealTimeSelector = ({ mealTime, icon, meals, onAddMeal, onRemoveMeal }: MealTimeSelectorProps) => {
  const [foodName, setFoodName] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [calories, setCalories] = React.useState('');

  const handleAddMeal = () => {
    if (!foodName) return;
    
    onAddMeal({
      name: foodName,
      quantity,
      calories: calories ? parseInt(calories) : 0
    });
    
    setFoodName('');
    setQuantity('');
    setCalories('');
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {mealTime}
          {totalCalories > 0 && (
            <Badge variant="secondary">{totalCalories} cal</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Input
            placeholder="Food name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
          <Input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <Button onClick={handleAddMeal} disabled={!foodName}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {meals.length > 0 && (
          <div className="space-y-2">
            {meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div>
                  <span className="font-medium">{meal.name}</span>
                  {meal.quantity && <span className="text-sm text-gray-500 ml-2">({meal.quantity})</span>}
                  {meal.calories > 0 && <span className="text-sm text-green-600 ml-2">{meal.calories} cal</span>}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveMeal(meal.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealTimeSelector;
