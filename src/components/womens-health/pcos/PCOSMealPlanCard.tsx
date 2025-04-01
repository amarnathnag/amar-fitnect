
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import MealItem from '../pregnancy/MealItem';

interface PCOSMealPlanCardProps {
  plan: {
    id: string;
    title: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meals: {
      time: string;
      name: string;
      description: string;
      icon: string;
    }[];
  };
}

const PCOSMealPlanCard = ({ plan }: PCOSMealPlanCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const totalMeals = plan.meals.length;
  const visibleMeals = expanded ? totalMeals : 3;

  return (
    <Card className="health-card overflow-hidden">
      <CardHeader className="bg-health-light dark:bg-health-dark/20">
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Nutrition Overview */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="text-lg font-semibold">{plan.calories}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">calories</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="text-lg font-semibold">{plan.protein}g</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">protein</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="text-lg font-semibold">{plan.carbs}g</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">carbs</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="text-lg font-semibold">{plan.fat}g</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">fat</div>
          </div>
        </div>

        {/* Meal Schedule */}
        <h3 className="text-lg font-semibold mb-4">Daily Meal Schedule</h3>
        <div className="space-y-4">
          {plan.meals
            .slice(0, visibleMeals)
            .map((meal, index) => (
              <MealItem 
                key={index}
                time={meal.time}
                name={meal.name}
                description={meal.description}
              />
            ))}
        </div>

        {/* Show More/Less Button */}
        {totalMeals > 3 && (
          <button
            onClick={toggleExpansion}
            className="mt-4 text-health-primary hover:text-health-dark text-sm font-medium flex items-center gap-1"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Show More <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        )}
      </CardContent>
      <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
        <Link to="/daily-routine" className="w-full">
          <Button className="w-full btn-primary">Get Full Meal Plan</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PCOSMealPlanCard;
