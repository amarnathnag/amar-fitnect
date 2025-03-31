
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WeightManagementPlan = () => {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});

  const toggleMealExpansion = (mealPlanId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealPlanId]: !prev[mealPlanId]
    }));
  };

  const weightPlans = [
    {
      id: 'weight-loss',
      title: 'Weight Loss Plan for Women',
      description: 'A balanced diet plan designed for healthy weight loss while maintaining essential nutrition.',
      calories: 1500,
      protein: 90,
      carbs: 130,
      fat: 50,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Vegetable egg-white omelette with spinach and tomatoes, served with a slice of whole grain toast',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Apple with 1 tablespoon of almond butter',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Large mixed green salad with grilled chicken, olive oil and lemon dressing',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Greek yogurt with a handful of berries',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Baked fish with steamed broccoli and cauliflower "rice"',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    },
    {
      id: 'weight-maintenance',
      title: 'Weight Maintenance Plan',
      description: 'A balanced diet to maintain healthy weight with adequate nutrients for women.',
      calories: 2000,
      protein: 75,
      carbs: 225,
      fat: 65,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Overnight oats with almond milk, chia seeds, berries, and a tablespoon of honey',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Small handful of mixed nuts and an orange',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Quinoa bowl with roasted vegetables, chickpeas, feta cheese and olive oil dressing',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Hummus with carrot and cucumber sticks',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Grilled chicken or tofu stir fry with brown rice and mixed vegetables',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    },
    {
      id: 'weight-gain',
      title: 'Healthy Weight Gain Plan',
      description: 'A nutrient-dense diet plan for women who need to gain weight in a healthy way.',
      calories: 2500,
      protein: 100,
      carbs: 300,
      fat: 85,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Smoothie with banana, berries, protein powder, whole milk yogurt, peanut butter and oats',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '10:00 AM',
          name: 'Mid-morning Snack',
          description: 'Avocado toast on whole grain bread with a boiled egg',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Sandwich with whole grain bread, turkey, avocado, cheese and vegetables with a side of sweet potato fries',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Trail mix with dried fruits, nuts and dark chocolate pieces',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Salmon with olive oil roasted vegetables and quinoa',
          icon: <Clock className="h-5 w-5" />,
        },
        {
          time: '9:00 PM',
          name: 'Evening Snack',
          description: 'Greek yogurt with honey and granola',
          icon: <Clock className="h-5 w-5" />,
        },
      ]
    }
  ];

  const getTotalMeals = (mealPlan: typeof weightPlans[0]) => mealPlan.meals.length;
  const getVisibleMeals = (mealPlan: typeof weightPlans[0]) => expandedMeals[mealPlan.id] ? mealPlan.meals.length : 3;

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4">Weight Management Plan for Women</h2>
      <div className="bg-green-50/50 dark:bg-green-900/10 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Healthy Eating Guidelines:</h3>
        <ul className="space-y-2">
          {[
            'Balanced meals with carbs, protein & healthy fats in each meal',
            'Hydration is key - at least 3L water daily',
            'Fiber-rich foods to support digestion and gut health',
            'Portion control & mindful eating practices',
            'Regular meal timing to stabilize blood sugar and energy'
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Key Nutrients for Women:</h3>
        <ul className="space-y-2">
          {[
            'Iron: essential for preventing anemia, especially during menstruation',
            'Calcium: vital for bone health and preventing osteoporosis',
            'Folate: important for reproductive health and pregnancy',
            'Vitamin D: supports calcium absorption and immune function',
            'Omega-3 fatty acids: reduces inflammation and supports heart health'
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Tabs defaultValue="weight-loss" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
            <TabsTrigger value="weight-maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="weight-gain">Weight Gain</TabsTrigger>
          </TabsList>
        </div>

        {weightPlans.map(plan => (
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

export default WeightManagementPlan;
