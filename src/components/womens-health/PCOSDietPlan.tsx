
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PCOSDietPlan = () => {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});

  const toggleMealExpansion = (mealPlanId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealPlanId]: !prev[mealPlanId]
    }));
  };

  const mealPlans = [
    {
      id: 'pcos-plan-1',
      title: 'PCOS Management Plan',
      description: 'A balanced diet plan designed to manage PCOS symptoms and improve hormonal balance.',
      calories: 1700,
      protein: 90,
      carbs: 150,
      fat: 55,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Overnight oats with cinnamon, chia seeds and berries (no added sugar)',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Handful of almonds and one apple',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Grilled chicken salad with leafy greens, chickpeas, avocado, and olive oil lemon dressing',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Greek yogurt with a sprinkle of cinnamon and berries',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Baked salmon with steamed broccoli and quinoa',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    }
  ];

  const getTotalMeals = (mealPlan: typeof mealPlans[0]) => mealPlan.meals.length;
  const getVisibleMeals = (mealPlan: typeof mealPlans[0]) => expandedMeals[mealPlan.id] ? mealPlan.meals.length : 3;

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">PCOS Diet Plan</h2>
      <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Foods to Include:</h3>
        <ul className="space-y-2">
          {[
            'High-fiber foods (broccoli, spinach, carrots)',
            'Lean protein (chicken, tofu, eggs)',
            'Whole grains (brown rice, oats, quinoa)',
            'Healthy fats (avocado, nuts, olive oil)',
            'Anti-inflammatory spices (turmeric, cinnamon, ginger)'
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Foods to Avoid:</h3>
        <ul className="space-y-2">
          {[
            'Refined sugars and carbohydrates',
            'Processed foods and trans fats',
            'Excessive dairy products',
            'Red meat in excess',
            'Caffeinated and alcoholic beverages'
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0 flex items-center justify-center">
                <div className="h-0.5 w-3 bg-red-500 rotate-45 absolute"></div>
                <div className="h-0.5 w-3 bg-red-500 -rotate-45 absolute"></div>
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mealPlans.map(mealPlan => (
          <Card key={mealPlan.id} className="health-card overflow-hidden">
            <CardHeader className="bg-health-light dark:bg-health-dark/20">
              <CardTitle>{mealPlan.title}</CardTitle>
              <CardDescription>{mealPlan.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Nutrition Overview */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="text-lg font-semibold">{mealPlan.calories}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">calories</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="text-lg font-semibold">{mealPlan.protein}g</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">protein</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="text-lg font-semibold">{mealPlan.carbs}g</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">carbs</div>
                </div>
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <div className="text-lg font-semibold">{mealPlan.fat}g</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">fat</div>
                </div>
              </div>

              {/* Meal Schedule */}
              <h3 className="text-lg font-semibold mb-4">Daily Meal Schedule</h3>
              <div className="space-y-4">
                {mealPlan.meals
                  .slice(0, getVisibleMeals(mealPlan))
                  .map((meal, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-health-light dark:bg-health-dark/20 flex items-center justify-center">
                          {meal.icon}
                        </div>
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2 mb-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {meal.time}
                          </div>
                          <div className="text-sm font-semibold">{meal.name}</div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {meal.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Show More/Less Button */}
              {getTotalMeals(mealPlan) > 3 && (
                <button
                  onClick={() => toggleMealExpansion(mealPlan.id)}
                  className="mt-4 text-health-primary hover:text-health-dark text-sm font-medium flex items-center gap-1"
                >
                  {expandedMeals[mealPlan.id] ? (
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
        ))}
      </div>
    </div>
  );
};

export default PCOSDietPlan;
