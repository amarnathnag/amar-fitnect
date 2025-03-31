
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define interfaces for our data types
interface Ingredient {
  id: string;
  name: string;
  price: number;
  calories: number;
  protein: number;
  isSelected?: boolean;
  quantity?: number;
}

interface DietType {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

// Initial ingredient data
const initialDietTypes: DietType[] = [
  {
    id: 'non-vegetarian',
    name: 'Non-Vegetarian',
    ingredients: [
      { id: 'chicken', name: 'Chicken Breast', price: 280, calories: 165, protein: 31 },
      { id: 'egg', name: 'Egg (per piece)', price: 6, calories: 68, protein: 6 },
      { id: 'fish', name: 'Fish (Rohu)', price: 250, calories: 97, protein: 21 },
      { id: 'mutton', name: 'Mutton', price: 600, calories: 250, protein: 26 },
      { id: 'prawns', name: 'Prawns', price: 450, calories: 99, protein: 20 },
      { id: 'milk', name: 'Whole Milk (per liter)', price: 60, calories: 60, protein: 3.4 },
      { id: 'paneer', name: 'Paneer', price: 350, calories: 265, protein: 18 },
      { id: 'almonds', name: 'Almonds', price: 1200, calories: 579, protein: 21 },
      { id: 'soya', name: 'Soya Chunks', price: 150, calories: 336, protein: 52 },
    ]
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    ingredients: [
      { id: 'paneer', name: 'Paneer', price: 350, calories: 265, protein: 18 },
      { id: 'tofu', name: 'Tofu', price: 280, calories: 144, protein: 15 },
      { id: 'rajma', name: 'Rajma (Kidney Beans)', price: 150, calories: 333, protein: 24 },
      { id: 'chickpeas', name: 'Chickpeas', price: 160, calories: 364, protein: 19 },
      { id: 'lentils', name: 'Lentils (Dal)', price: 140, calories: 116, protein: 9 },
      { id: 'curd', name: 'Curd (Dahi)', price: 90, calories: 98, protein: 11 },
      { id: 'peanuts', name: 'Peanuts', price: 200, calories: 567, protein: 26 },
      { id: 'oats', name: 'Oats', price: 180, calories: 389, protein: 17 },
    ]
  },
  {
    id: 'vegan',
    name: 'Vegan',
    ingredients: [
      { id: 'tofu', name: 'Tofu', price: 280, calories: 144, protein: 15 },
      { id: 'soy-milk', name: 'Soy Milk (per liter)', price: 90, calories: 42, protein: 3 },
      { id: 'almonds', name: 'Almonds', price: 1200, calories: 579, protein: 21 },
      { id: 'chia', name: 'Chia Seeds', price: 800, calories: 486, protein: 17 },
      { id: 'peanut-butter', name: 'Peanut Butter', price: 350, calories: 588, protein: 25 },
      { id: 'quinoa', name: 'Quinoa', price: 600, calories: 120, protein: 4 },
      { id: 'black-beans', name: 'Black Beans', price: 180, calories: 341, protein: 21 },
    ]
  }
];

const DietIngredientsSection = () => {
  const [dietTypes, setDietTypes] = useState<DietType[]>(initialDietTypes);
  const [budget, setBudget] = useState<number>(3000);
  const [calorieTarget, setCalorieTarget] = useState<number>(2000);
  const [selectedGoal, setSelectedGoal] = useState<string>("maintenance");
  const [totalCost, setTotalCost] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalProtein, setTotalProtein] = useState<number>(0);

  // Calculate totals based on selected ingredients and quantities
  useEffect(() => {
    let cost = 0;
    let calories = 0;
    let protein = 0;

    dietTypes.forEach(dietType => {
      dietType.ingredients.forEach(ingredient => {
        if (ingredient.isSelected && ingredient.quantity) {
          cost += ingredient.price * ingredient.quantity;
          calories += ingredient.calories * ingredient.quantity * 10; // per kg
          protein += ingredient.protein * ingredient.quantity * 10; // per kg
        }
      });
    });

    setTotalCost(cost);
    setTotalCalories(calories);
    setTotalProtein(protein);
  }, [dietTypes]);

  // Handle ingredient selection
  const handleIngredientSelection = (dietTypeId: string, ingredientId: string, checked: boolean) => {
    setDietTypes(prevDietTypes => 
      prevDietTypes.map(dietType => {
        if (dietType.id === dietTypeId) {
          return {
            ...dietType,
            ingredients: dietType.ingredients.map(ingredient => {
              if (ingredient.id === ingredientId) {
                return {
                  ...ingredient,
                  isSelected: checked,
                  quantity: checked ? (ingredient.quantity || 1) : 0
                };
              }
              return ingredient;
            })
          };
        }
        return dietType;
      })
    );
  };

  // Handle quantity change
  const handleQuantityChange = (dietTypeId: string, ingredientId: string, quantity: number) => {
    setDietTypes(prevDietTypes => 
      prevDietTypes.map(dietType => {
        if (dietType.id === dietTypeId) {
          return {
            ...dietType,
            ingredients: dietType.ingredients.map(ingredient => {
              if (ingredient.id === ingredientId && ingredient.isSelected) {
                return {
                  ...ingredient,
                  quantity: quantity
                };
              }
              return ingredient;
            })
          };
        }
        return dietType;
      })
    );
  };

  // Generate personalized meal plan based on selected ingredients and goals
  const generateMealPlan = () => {
    console.log("Generating meal plan with budget:", budget);
    console.log("Calorie target:", calorieTarget);
    console.log("Selected goal:", selectedGoal);
    console.log("Selected ingredients:", dietTypes.map(dt => 
      dt.ingredients.filter(i => i.isSelected).map(i => `${i.name} (${i.quantity}kg)`)
    ).flat());
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/20">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Diet Ingredients & Cost Estimation</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compare food choices based on budget and nutrition. Select ingredients to create a personalized diet plan and track your monthly costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Monthly Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget">Budget (₹)</Label>
                  <Input 
                    id="budget" 
                    type="number" 
                    value={budget} 
                    onChange={(e) => setBudget(Number(e.target.value))} 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="calories">Daily Calorie Target</Label>
                  <Input 
                    id="calories" 
                    type="number" 
                    value={calorieTarget} 
                    onChange={(e) => setCalorieTarget(Number(e.target.value))} 
                    className="mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Goal Selection</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weight-gain" 
                      checked={selectedGoal === "weight-gain"} 
                      onCheckedChange={() => setSelectedGoal("weight-gain")} 
                    />
                    <label 
                      htmlFor="weight-gain" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Weight Gain
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weight-loss" 
                      checked={selectedGoal === "weight-loss"} 
                      onCheckedChange={() => setSelectedGoal("weight-loss")} 
                    />
                    <label 
                      htmlFor="weight-loss" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Weight Loss
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="muscle-building" 
                      checked={selectedGoal === "muscle-building"} 
                      onCheckedChange={() => setSelectedGoal("muscle-building")} 
                    />
                    <label 
                      htmlFor="muscle-building" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Muscle Building
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="maintenance" 
                      checked={selectedGoal === "maintenance"} 
                      onCheckedChange={() => setSelectedGoal("maintenance")} 
                    />
                    <label 
                      htmlFor="maintenance" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Maintenance
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Cost and Nutrition Summary</CardTitle>
              <Calculator className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-1">Total Cost</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{totalCost}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-1">Total Calories</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCalories}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">kcal per month</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-1">Total Protein</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalProtein}g</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-medium">Budget Status:</p>
                  <p className={`text-sm font-medium ${totalCost > budget ? 'text-red-500' : 'text-green-500'}`}>
                    {totalCost > budget ? 'Over Budget' : 'Within Budget'}
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${totalCost > budget ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min((totalCost / budget) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.round((totalCost / budget) * 100)}% of budget used
                </p>
              </div>

              <div className="mt-6">
                <Link to="/daily-routine">
                  <Button 
                    onClick={generateMealPlan} 
                    className="w-full btn-primary"
                    disabled={totalCost === 0}
                  >
                    Get Full Meal Plan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="non-vegetarian" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-xl">
              <TabsTrigger value="non-vegetarian">Non-Vegetarian</TabsTrigger>
              <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
              <TabsTrigger value="vegan">Vegan</TabsTrigger>
            </TabsList>
          </div>

          {dietTypes.map((dietType) => (
            <TabsContent key={dietType.id} value={dietType.id} className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Select {dietType.name} Ingredients</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Select</TableHead>
                        <TableHead>Ingredient</TableHead>
                        <TableHead className="text-right">Price (₹/kg)</TableHead>
                        <TableHead className="text-right">Calories (per 100g)</TableHead>
                        <TableHead className="text-right">Protein (per 100g)</TableHead>
                        <TableHead className="text-right">Quantity (kg)</TableHead>
                        <TableHead className="text-right">Subtotal (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dietType.ingredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                          <TableCell>
                            <Checkbox
                              checked={ingredient.isSelected}
                              onCheckedChange={(checked) => 
                                handleIngredientSelection(dietType.id, ingredient.id, checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell className="font-medium">{ingredient.name}</TableCell>
                          <TableCell className="text-right">₹{ingredient.price}</TableCell>
                          <TableCell className="text-right">{ingredient.calories} kcal</TableCell>
                          <TableCell className="text-right">{ingredient.protein}g</TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min="0"
                              step="0.5"
                              value={ingredient.isSelected ? (ingredient.quantity || 1) : 0}
                              onChange={(e) => handleQuantityChange(dietType.id, ingredient.id, Number(e.target.value))}
                              disabled={!ingredient.isSelected}
                              className="w-16 text-right"
                            />
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {ingredient.isSelected && ingredient.quantity 
                              ? `₹${ingredient.price * ingredient.quantity}` 
                              : '-'
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex items-center justify-start gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <Info className="h-4 w-4" />
                    <p>Select ingredients and specify quantities to calculate your monthly diet cost and nutrition values.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default DietIngredientsSection;
