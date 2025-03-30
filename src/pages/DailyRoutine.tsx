
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Clock, Coffee, UtensilsCrossed, Dumbbell, Droplet, Moon } from 'lucide-react';

const DailyRoutine = () => {
  const [dietType, setDietType] = useState('vegetarian');
  const [goalType, setGoalType] = useState('maintenance');

  const routines = {
    vegetarian: {
      weightLoss: {
        morning: [
          { time: '06:00 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:15 AM', activity: '1 glass of warm water with lemon', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '06:30 AM', activity: 'Morning workout (30 min cardio)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '07:15 AM', activity: 'Breakfast: Oatmeal with fruits and nuts', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:00 AM', activity: 'Green tea + 1 fruit', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
        ],
        afternoon: [
          { time: '12:30 PM', activity: 'Lunch: Quinoa bowl with vegetables and tofu', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:00 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Evening snack: Greek yogurt with berries', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Evening workout (Strength training - 40 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:00 PM', activity: 'Dinner: Vegetable soup with whole grain bread', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '08:00 PM', activity: 'Herbal tea', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '09:30 PM', activity: 'Relaxation/Meditation (15 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:00 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      weightGain: {
        morning: [
          { time: '06:30 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:45 AM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '07:00 AM', activity: 'Morning workout (Strength training - 45 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '08:00 AM', activity: 'Breakfast: Protein smoothie with banana, peanut butter, and oats', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:30 AM', activity: 'Snack: Nuts and dried fruits + protein shake', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { time: '01:00 PM', activity: 'Lunch: Lentil curry with brown rice and vegetables', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:30 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Snack: Avocado toast with chickpeas', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Evening workout (Resistance training - 40 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:30 PM', activity: 'Dinner: Bean pasta with vegetables and cheese', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '09:00 PM', activity: 'Night snack: Greek yogurt with honey and granola', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '09:45 PM', activity: 'Relaxation (15 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:30 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      maintenance: {
        morning: [
          { time: '06:30 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:45 AM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '07:00 AM', activity: 'Morning yoga/stretching (20 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '07:30 AM', activity: 'Breakfast: Vegetable omelet with toast', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:00 AM', activity: 'Fruit + handful of nuts', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { time: '12:30 PM', activity: 'Lunch: Mixed vegetable salad with cottage cheese', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:00 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Snack: Hummus with vegetable sticks', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Moderate workout (30 min mix of cardio and strength)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:00 PM', activity: 'Dinner: Stir-fried vegetables with tofu and brown rice', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '08:30 PM', activity: 'Herbal tea', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '09:15 PM', activity: 'Relaxation/Reading (20 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:00 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      }
    },
    nonVegetarian: {
      weightLoss: {
        morning: [
          { time: '06:00 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:15 AM', activity: '1 glass of warm water with lemon', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '06:30 AM', activity: 'Morning workout (30 min HIIT)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '07:15 AM', activity: 'Breakfast: Egg white omelet with vegetables', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:00 AM', activity: 'Green tea + 1 fruit', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
        ],
        afternoon: [
          { time: '12:30 PM', activity: 'Lunch: Grilled chicken salad', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:00 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Evening snack: Protein shake', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Evening workout (Weight training - 40 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:00 PM', activity: 'Dinner: Baked fish with steamed vegetables', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '08:00 PM', activity: 'Herbal tea', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '09:30 PM', activity: 'Relaxation/Meditation (15 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:00 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      weightGain: {
        morning: [
          { time: '06:30 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:45 AM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '07:00 AM', activity: 'Morning workout (Heavy lifting - 45 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '08:00 AM', activity: 'Breakfast: Protein-rich breakfast with eggs, bacon, and oatmeal', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:30 AM', activity: 'Snack: Trail mix + protein shake', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { time: '01:00 PM', activity: 'Lunch: Steak with sweet potatoes and vegetables', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:30 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Snack: Tuna sandwich', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Evening workout (Resistance training - 40 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:30 PM', activity: 'Dinner: Chicken pasta with sauce', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '09:00 PM', activity: 'Night snack: Cottage cheese with fruit', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '09:45 PM', activity: 'Relaxation (15 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:30 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      maintenance: {
        morning: [
          { time: '06:30 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:45 AM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '07:00 AM', activity: 'Morning cardio (20 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '07:30 AM', activity: 'Breakfast: Scrambled eggs with toast and fruit', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:00 AM', activity: 'Fruit + boiled egg', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { time: '12:30 PM', activity: 'Lunch: Turkey wrap with vegetables', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:00 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Snack: Greek yogurt with honey', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Moderate workout (30 min mix of cardio and strength)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:00 PM', activity: 'Dinner: Grilled salmon with quinoa and vegetables', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '08:30 PM', activity: 'Herbal tea', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '09:15 PM', activity: 'Relaxation/Reading (20 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:00 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      }
    },
    vegan: {
      weightLoss: {
        morning: [
          { time: '06:00 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:15 AM', activity: '1 glass of warm water with lemon', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '06:30 AM', activity: 'Morning workout (30 min cardio)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '07:15 AM', activity: 'Breakfast: Chia seed pudding with almond milk and berries', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:00 AM', activity: 'Green tea + 1 fruit', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
        ],
        afternoon: [
          { time: '12:30 PM', activity: 'Lunch: Buddha bowl with quinoa, avocado, and legumes', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:00 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Evening snack: Vegetable sticks with hummus', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Evening workout (Yoga - 40 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:00 PM', activity: 'Dinner: Vegetable stir-fry with tofu', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '08:00 PM', activity: 'Herbal tea', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '09:30 PM', activity: 'Relaxation/Meditation (15 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:00 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      weightGain: {
        morning: [
          { time: '06:30 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:45 AM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '07:00 AM', activity: 'Morning workout (Strength training - 45 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '08:00 AM', activity: 'Breakfast: Protein-rich smoothie with plant milk, banana, peanut butter, and vegan protein', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:30 AM', activity: 'Snack: Nuts, seeds and dried fruits + plant protein shake', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { time: '01:00 PM', activity: 'Lunch: Bean and legume burger with sweet potato fries', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:30 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Snack: Avocado toast with nutritional yeast', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Evening workout (Resistance training - 40 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:30 PM', activity: 'Dinner: Lentil pasta with cashew cream sauce', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '09:00 PM', activity: 'Night snack: Coconut yogurt with granola and nut butter', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '09:45 PM', activity: 'Relaxation (15 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:30 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      maintenance: {
        morning: [
          { time: '06:30 AM', activity: 'Wake up', icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { time: '06:45 AM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '07:00 AM', activity: 'Morning yoga/stretching (20 min)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { time: '07:30 AM', activity: 'Breakfast: Tofu scramble with vegetables and whole grain toast', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '10:00 AM', activity: 'Fruit + handful of nuts', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { time: '12:30 PM', activity: 'Lunch: Mixed vegetable and bean salad with tahini dressing', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '02:00 PM', activity: 'Water (500ml)', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '04:00 PM', activity: 'Snack: Rice cakes with almond butter', icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { time: '05:30 PM', activity: 'Moderate workout (30 min mix of cardio and strength)', icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { time: '07:00 PM', activity: 'Dinner: Buddha bowl with quinoa, roasted vegetables, and chickpeas', icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { time: '08:30 PM', activity: 'Herbal tea', icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { time: '09:15 PM', activity: 'Relaxation/Reading (20 min)', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { time: '10:00 PM', activity: 'Sleep', icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      }
    }
  };

  const selectedRoutine = routines[dietType][goalType];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10">
        <div className="container-custom">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personalized Daily Routine</h1>
            <p className="text-lg text-muted-foreground">
              Follow this structured daily routine tailored to your preferences for optimal health and goal achievement.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Diet Preference</label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="nonVegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Goal</label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weightLoss">Weight Loss</SelectItem>
                  <SelectItem value="weightGain">Weight Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="morning" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="morning">Morning</TabsTrigger>
              <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
              <TabsTrigger value="evening">Evening</TabsTrigger>
            </TabsList>
            
            <TabsContent value="morning" className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Morning Routine</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedRoutine.morning.map((item, index) => (
                  <Card key={index} className="overflow-hidden border-l-4 border-l-health-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <div>
                          <p className="font-medium text-lg">{item.time}</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="afternoon" className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Afternoon Routine</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedRoutine.afternoon.map((item, index) => (
                  <Card key={index} className="overflow-hidden border-l-4 border-l-health-secondary">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <div>
                          <p className="font-medium text-lg">{item.time}</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="evening" className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Evening Routine</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedRoutine.evening.map((item, index) => (
                  <Card key={index} className="overflow-hidden border-l-4 border-l-health-accent">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <div>
                          <p className="font-medium text-lg">{item.time}</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 p-6 bg-muted rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Daily Health Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Droplet className="h-5 w-5 text-blue-500 mt-0.5" />
                <span>Drink at least 2-3 liters of water daily</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-health-primary mt-0.5" />
                <span>Maintain consistent sleep and wake times</span>
              </li>
              <li className="flex items-start space-x-2">
                <UtensilsCrossed className="h-5 w-5 text-health-secondary mt-0.5" />
                <span>Avoid eating large meals within 2-3 hours of bedtime</span>
              </li>
              <li className="flex items-start space-x-2">
                <Dumbbell className="h-5 w-5 text-health-accent mt-0.5" />
                <span>Include at least 30 minutes of physical activity daily</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="bg-health-primary hover:bg-health-dark">
              Save Routine
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DailyRoutine;
