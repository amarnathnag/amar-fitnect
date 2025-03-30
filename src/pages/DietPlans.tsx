
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Salad, UtensilsCrossed, Apple, Beef, Sandwich, Coffee, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface MealPlan {
  id: string;
  type: 'non-vegetarian' | 'vegetarian' | 'vegan';
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
    icon: React.ReactNode;
  }[];
}

const DietPlans = () => {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});

  const toggleMealExpansion = (mealPlanId: string) => {
    setExpandedMeals(prev => ({
      ...prev,
      [mealPlanId]: !prev[mealPlanId]
    }));
  };

  const mealPlans: MealPlan[] = [
    // Non-vegetarian meal plans
    {
      id: 'non-veg-1',
      type: 'non-vegetarian',
      title: 'High Protein Weight Loss',
      description: 'A protein-rich diet plan designed to support weight loss while preserving muscle mass.',
      calories: 1800,
      protein: 150,
      carbs: 130,
      fat: 50,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Scrambled eggs (3) with spinach and grilled chicken breast (100g), 1 slice whole grain toast',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '10:30 AM',
          name: 'Mid-morning Snack',
          description: 'Greek yogurt (200g) with berries and a tablespoon of chia seeds',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and olive oil dressing',
          icon: <Sandwich className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Protein shake with 1 scoop whey protein, 1 banana, and almond milk',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Baked salmon (150g) with roasted vegetables and quinoa (1/2 cup)',
          icon: <UtensilsCrossed className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 'non-veg-2',
      type: 'non-vegetarian',
      title: 'Balanced Maintenance',
      description: 'A well-balanced diet plan to maintain current weight with all essential nutrients.',
      calories: 2200,
      protein: 120,
      carbs: 220,
      fat: 70,
      meals: [
        {
          time: '7:30 AM',
          name: 'Breakfast',
          description: 'Overnight oats (1 cup) with milk, honey, sliced banana, and 2 boiled eggs',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '10:30 AM',
          name: 'Mid-morning Snack',
          description: 'Handful of mixed nuts (30g) and an apple',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Turkey sandwich on whole grain bread with avocado, lettuce, tomato, and a side of vegetable soup',
          icon: <Sandwich className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Greek yogurt (150g) with honey and berries',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '7:30 PM',
          name: 'Dinner',
          description: 'Grilled steak (150g), baked potato with a dollop of Greek yogurt, and steamed broccoli',
          icon: <UtensilsCrossed className="h-5 w-5" />,
        },
      ],
    },
    
    // Vegetarian meal plans
    {
      id: 'veg-1',
      type: 'vegetarian',
      title: 'Protein-Rich Vegetarian',
      description: 'A high-protein vegetarian diet to support muscle growth and recovery.',
      calories: 2000,
      protein: 100,
      carbs: 200,
      fat: 65,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Greek yogurt parfait with granola, mixed berries, and a tablespoon of honey',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '10:30 AM',
          name: 'Mid-morning Snack',
          description: 'Protein smoothie with whey protein, banana, and milk',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Quinoa bowl with roasted vegetables, feta cheese, and hard-boiled eggs',
          icon: <Sandwich className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Cottage cheese (1 cup) with sliced peaches',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Lentil pasta with tomato sauce, vegetables, and grated parmesan cheese',
          icon: <UtensilsCrossed className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 'veg-2',
      type: 'vegetarian',
      title: 'Vegetarian Weight Loss',
      description: 'A calorie-controlled vegetarian diet plan designed for steady weight loss.',
      calories: 1600,
      protein: 80,
      carbs: 170,
      fat: 50,
      meals: [
        {
          time: '7:30 AM',
          name: 'Breakfast',
          description: 'Vegetable omelette (2 eggs) with spinach, tomatoes, and mushrooms, 1 slice whole grain toast',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '10:30 AM',
          name: 'Mid-morning Snack',
          description: 'Apple slices with 1 tablespoon almond butter',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Mediterranean salad with mixed greens, chickpeas, feta cheese, olives, and lemon-olive oil dressing',
          icon: <Sandwich className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Greek yogurt (150g) with cinnamon',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Baked tofu (150g) with roasted vegetables and quinoa (1/2 cup)',
          icon: <UtensilsCrossed className="h-5 w-5" />,
        },
      ],
    },
    
    // Vegan meal plans
    {
      id: 'vegan-1',
      type: 'vegan',
      title: 'High-Protein Vegan',
      description: 'A protein-focused vegan diet to support active lifestyles and muscle maintenance.',
      calories: 2100,
      protein: 90,
      carbs: 260,
      fat: 60,
      meals: [
        {
          time: '7:00 AM',
          name: 'Breakfast',
          description: 'Tofu scramble with nutritional yeast, spinach, and vegetables, served with 1 slice whole grain toast',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '10:30 AM',
          name: 'Mid-morning Snack',
          description: 'Protein smoothie with plant-based protein, banana, and almond milk',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Quinoa bowl with black beans, roasted vegetables, avocado, and tahini dressing',
          icon: <Sandwich className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Edamame (1 cup) sprinkled with sea salt',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Lentil and vegetable curry with brown rice (1/2 cup)',
          icon: <UtensilsCrossed className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 'vegan-2',
      type: 'vegan',
      title: 'Balanced Vegan',
      description: 'A well-rounded vegan diet with all essential nutrients for optimal health.',
      calories: 1900,
      protein: 75,
      carbs: 240,
      fat: 60,
      meals: [
        {
          time: '7:30 AM',
          name: 'Breakfast',
          description: 'Overnight oats (1 cup) with almond milk, chia seeds, maple syrup, and mixed berries',
          icon: <Coffee className="h-5 w-5" />,
        },
        {
          time: '10:30 AM',
          name: 'Mid-morning Snack',
          description: 'Handful of mixed nuts (30g) and an apple',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '1:00 PM',
          name: 'Lunch',
          description: 'Buddha bowl with quinoa, roasted sweet potatoes, chickpeas, avocado, and tahini dressing',
          icon: <Sandwich className="h-5 w-5" />,
        },
        {
          time: '4:00 PM',
          name: 'Afternoon Snack',
          description: 'Hummus (1/4 cup) with carrot and cucumber sticks',
          icon: <Apple className="h-5 w-5" />,
        },
        {
          time: '7:00 PM',
          name: 'Dinner',
          description: 'Stir-fried tofu with vegetables and brown rice (1/2 cup)',
          icon: <UtensilsCrossed className="h-5 w-5" />,
        },
      ],
    },
  ];

  const getTotalMeals = (mealPlan: MealPlan) => mealPlan.meals.length;
  const getVisibleMeals = (mealPlan: MealPlan) => expandedMeals[mealPlan.id] ? mealPlan.meals.length : 3;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Personalized Diet Plans</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Explore our nutritionally balanced meal plans tailored to different dietary preferences and goals. Each plan is designed by nutrition experts to help you achieve optimal health.
              </p>
            </div>
          </div>
        </section>

        {/* Diet Plans Section */}
        <section className="py-12">
          <div className="container-custom">
            <Tabs defaultValue="non-vegetarian" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-xl">
                  <TabsTrigger value="non-vegetarian" className="flex items-center gap-2">
                    <Beef className="h-4 w-4" />
                    <span className="hidden sm:inline">Non-Vegetarian</span>
                    <span className="sm:hidden">Non-Veg</span>
                  </TabsTrigger>
                  <TabsTrigger value="vegetarian" className="flex items-center gap-2">
                    <Salad className="h-4 w-4" />
                    <span>Vegetarian</span>
                  </TabsTrigger>
                  <TabsTrigger value="vegan" className="flex items-center gap-2">
                    <Apple className="h-4 w-4" />
                    <span>Vegan</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Non-Vegetarian Plans */}
              <TabsContent value="non-vegetarian" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mealPlans
                    .filter(plan => plan.type === 'non-vegetarian')
                    .map(mealPlan => (
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
                          <Button className="w-full btn-primary">Get Full Meal Plan</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Vegetarian Plans */}
              <TabsContent value="vegetarian" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mealPlans
                    .filter(plan => plan.type === 'vegetarian')
                    .map(mealPlan => (
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
                          <Button className="w-full btn-primary">Get Full Meal Plan</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Vegan Plans */}
              <TabsContent value="vegan" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mealPlans
                    .filter(plan => plan.type === 'vegan')
                    .map(mealPlan => (
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
                          <Button className="w-full btn-primary">Get Full Meal Plan</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DietPlans;
