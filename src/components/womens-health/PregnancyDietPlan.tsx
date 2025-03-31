
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PregnancyDietPlan = () => {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});

  const toggleMealExpansion = (mealPlanId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealPlanId]: !prev[mealPlanId]
    }));
  };

  const trimesterPlans = [
    {
      id: 'first-trimester',
      title: 'First Trimester Plan',
      description: 'Nutrition plan for weeks 1-12 focusing on essential nutrients for early fetal development.',
      calories: 1900,
      protein: 75,
      carbs: 230,
      fat: 65,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Whole grain toast with avocado and a boiled egg, plus a small glass of orange juice (for folate and vitamin C)',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Greek yogurt with berries and a sprinkle of chia seeds',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Spinach salad with grilled chicken, strawberries, walnuts and a light vinaigrette',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Apple slices with a tablespoon of peanut butter',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Baked salmon with steamed broccoli and quinoa',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    },
    {
      id: 'second-trimester',
      title: 'Second Trimester Plan',
      description: 'Nutrition plan for weeks 13-26 supporting rapid baby growth and development.',
      calories: 2100,
      protein: 85,
      carbs: 250,
      fat: 70,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Oatmeal made with milk, topped with sliced banana, walnuts and a drizzle of honey',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Hummus with carrot and cucumber sticks',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Whole grain wrap with grilled chicken, avocado, lettuce, and tomato',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Cottage cheese with peach slices',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Grilled fish with sweet potato and steamed vegetables',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    },
    {
      id: 'third-trimester',
      title: 'Third Trimester Plan',
      description: 'Nutrition plan for weeks 27-40 providing energy while managing reduced stomach space.',
      calories: 2300,
      protein: 95,
      carbs: 270,
      fat: 75,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Vegetable omelette (2 eggs) with spinach, bell peppers, and cheese with a slice of whole grain toast',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Smoothie with kale, banana, berries, yogurt and almond milk',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Lentil soup with a small whole grain roll and side salad',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Trail mix with nuts, seeds, and dried fruits (no added sugar)',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Baked chicken breast with quinoa and roasted vegetables',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '9:00 PM',
          name: 'Evening Snack',
          description: 'Warm milk with a small banana',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    }
  ];

  const getTotalMeals = (mealPlan: typeof trimesterPlans[0]) => mealPlan.meals.length;
  const getVisibleMeals = (mealPlan: typeof trimesterPlans[0]) => expandedMeals[mealPlan.id] ? mealPlan.meals.length : 3;

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Pregnancy Diet Plan</h2>
      <div className="bg-pink-50/50 dark:bg-pink-900/10 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Essential Nutrients to Include:</h3>
        <ul className="space-y-2">
          {[
            'Protein-rich foods (lentils, fish, eggs, lean meat)',
            'Iron & folic acid (leafy greens, beans, citrus fruits)',
            'Omega-3 fatty acids (salmon, flaxseeds, walnuts)',
            'Calcium-rich foods (milk, yogurt, almonds, fortified plant milks)',
            'Vitamin D sources (fatty fish, egg yolks, sunlight exposure)'
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Foods to Avoid During Pregnancy:</h3>
        <ul className="space-y-2">
          {[
            'Raw or undercooked seafood, meat, and eggs',
            'Unpasteurized dairy products and juices',
            'High-mercury fish (shark, swordfish, king mackerel)',
            'Excessive caffeine (limit to 200mg daily)',
            'Alcohol (no safe amount during pregnancy)'
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
                    .slice(0, getVisibleMeals(plan))
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
                {getTotalMeals(plan) > 3 && (
                  <button
                    onClick={() => toggleMealExpansion(plan.id)}
                    className="mt-4 text-health-primary hover:text-health-dark text-sm font-medium flex items-center gap-1"
                  >
                    {expandedMeals[plan.id] ? (
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PregnancyDietPlan;
