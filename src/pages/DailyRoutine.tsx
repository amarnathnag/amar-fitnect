import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import DailyRoutineEditor from '@/components/DailyRoutineEditor';
import { Clock, Coffee, UtensilsCrossed, Dumbbell, Droplet, Moon, Edit3, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  category: 'meal' | 'exercise' | 'hydration' | 'rest' | 'other';
  notes?: string;
  icon?: React.ReactNode;
}

const DailyRoutine = () => {
  const [dietType, setDietType] = useState('vegetarian');
  const [goalType, setGoalType] = useState('maintenance');
  const [isEditing, setIsEditing] = useState(false);
  const [customRoutines, setCustomRoutines] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState('morning');
  const { user, profileData, updateProfile } = useAuth();
  const { toast } = useToast();

  // Load custom routines from local storage and user preferences
  useEffect(() => {
    const savedRoutines = localStorage.getItem('customRoutines');
    if (savedRoutines) {
      setCustomRoutines(JSON.parse(savedRoutines));
    }
    
    // Set diet type and goal from profile if available
    if (profileData) {
      if (profileData.food_preference) {
        setDietType(profileData.food_preference === 'non_vegetarian' ? 'nonVegetarian' : profileData.food_preference);
      }
      if (profileData.fitness_goal) {
        const goalMapping: Record<string, string> = {
          'weight_loss': 'weightLoss',
          'weight_gain': 'weightGain',
          'muscle_gain': 'weightGain',
          'maintain_fitness': 'maintenance'
        };
        setGoalType(goalMapping[profileData.fitness_goal] || 'maintenance');
      }
    }
  }, [profileData]);

  const routines = {
    vegetarian: {
      weightLoss: {
        morning: [
          { id: '1', time: '06:00', activity: 'Wake up and hydrate', category: 'hydration' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:15', activity: '1 glass of warm water with lemon', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '06:30', activity: 'Morning workout (30 min cardio)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '07:15', activity: 'Breakfast: Oatmeal with fruits and nuts', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:00', activity: 'Green tea + 1 fruit', category: 'meal' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
        ],
        afternoon: [
          { id: '6', time: '12:30', activity: 'Lunch: Quinoa bowl with vegetables and tofu', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:00', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Evening snack: Greek yogurt with berries', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Evening workout (Strength training - 40 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:00', activity: 'Dinner: Vegetable soup with whole grain bread', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '20:00', activity: 'Herbal tea', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '12', time: '21:30', activity: 'Relaxation/Meditation (15 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:00', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      weightGain: {
        morning: [
          { id: '1', time: '06:30', activity: 'Wake up', category: 'other' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:45', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '07:00', activity: 'Morning workout (Strength training - 45 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '08:00', activity: 'Breakfast: Protein smoothie with banana, peanut butter, and oats', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:30', activity: 'Snack: Nuts and dried fruits + protein shake', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { id: '6', time: '13:00', activity: 'Lunch: Lentil curry with brown rice and vegetables', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:30', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Snack: Avocado toast with chickpeas', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Evening workout (Resistance training - 40 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:30', activity: 'Dinner: Bean pasta with vegetables and cheese', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '21:00', activity: 'Night snack: Greek yogurt with honey and granola', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '12', time: '21:45', activity: 'Relaxation (15 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:30', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      maintenance: {
        morning: [
          { id: '1', time: '06:30', activity: 'Wake up', category: 'other' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:45', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '07:00', activity: 'Morning yoga/stretching (20 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '07:30', activity: 'Breakfast: Vegetable omelet with toast', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:00', activity: 'Fruit + handful of nuts', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { id: '6', time: '12:30', activity: 'Lunch: Mixed vegetable salad with cottage cheese', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:00', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Snack: Hummus with vegetable sticks', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Moderate workout (30 min mix of cardio and strength)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:00', activity: 'Dinner: Stir-fried vegetables with tofu and brown rice', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '20:30', activity: 'Herbal tea', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '12', time: '21:15', activity: 'Relaxation/Reading (20 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:00', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      }
    },
    nonVegetarian: {
      weightLoss: {
        morning: [
          { id: '1', time: '06:00', activity: 'Wake up and hydrate', category: 'hydration' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:15', activity: '1 glass of warm water with lemon', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '06:30', activity: 'Morning workout (30 min cardio)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '07:15', activity: 'Breakfast: Scrambled eggs with spinach and whole grain toast', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:00', activity: 'Green tea + 1 fruit', category: 'meal' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
        ],
        afternoon: [
          { id: '6', time: '12:30', activity: 'Lunch: Grilled chicken salad with mixed greens', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:00', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Evening snack: Cottage cheese with cucumber slices', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Evening workout (Strength training - 40 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:00', activity: 'Dinner: Baked salmon with steamed vegetables', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '20:00', activity: 'Herbal tea', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '12', time: '21:30', activity: 'Relaxation/Meditation (15 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:00', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      weightGain: {
        morning: [
          { id: '1', time: '06:30', activity: 'Wake up', category: 'other' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:45', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '07:00', activity: 'Morning workout (Strength training - 45 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '08:00', activity: 'Breakfast: Omelet with cheese, veggies, and whole grain toast', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:30', activity: 'Snack: Mixed nuts and protein shake', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { id: '6', time: '13:00', activity: 'Lunch: Turkey sandwich with avocado and salad', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:30', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Snack: Cheese and whole grain crackers', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Evening workout (Resistance training - 40 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:30', activity: 'Dinner: Beef stir-fry with vegetables and rice', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '21:00', activity: 'Night snack: Greek yogurt with honey and granola', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '12', time: '21:45', activity: 'Relaxation (15 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:30', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      maintenance: {
        morning: [
          { id: '1', time: '06:30', activity: 'Wake up', category: 'other' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:45', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '07:00', activity: 'Morning yoga/stretching (20 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '07:30', activity: 'Breakfast: Scrambled eggs with veggies and toast', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:00', activity: 'Fruit + handful of nuts', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { id: '6', time: '12:30', activity: 'Lunch: Chicken salad with mixed greens', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:00', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Snack: Hummus with vegetable sticks', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Moderate workout (30 min mix of cardio and strength)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:00', activity: 'Dinner: Grilled fish with steamed vegetables and rice', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '20:30', activity: 'Herbal tea', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '12', time: '21:15', activity: 'Relaxation/Reading (20 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:00', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      }
    },
    vegan: {
      weightLoss: {
        morning: [
          { id: '1', time: '06:00', activity: 'Wake up and hydrate', category: 'hydration' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:15', activity: '1 glass of warm water with lemon', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '06:30', activity: 'Morning workout (30 min cardio)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '07:15', activity: 'Breakfast: Smoothie bowl with berries and chia seeds', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:00', activity: 'Green tea + 1 fruit', category: 'meal' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
        ],
        afternoon: [
          { id: '6', time: '12:30', activity: 'Lunch: Chickpea salad with mixed greens and tahini dressing', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:00', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Evening snack: Roasted nuts and fruit', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Evening workout (Strength training - 40 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:00', activity: 'Dinner: Lentil soup with whole grain bread', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '20:00', activity: 'Herbal tea', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '12', time: '21:30', activity: 'Relaxation/Meditation (15 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:00', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      weightGain: {
        morning: [
          { id: '1', time: '06:30', activity: 'Wake up', category: 'other' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:45', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '07:00', activity: 'Morning workout (Strength training - 45 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '08:00', activity: 'Breakfast: Tofu scramble with veggies and toast', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:30', activity: 'Snack: Nuts and protein shake', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { id: '6', time: '13:00', activity: 'Lunch: Vegan burger with sweet potato fries', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:30', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Snack: Hummus with pita bread', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Evening workout (Resistance training - 40 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:30', activity: 'Dinner: Vegan chili with brown rice', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '21:00', activity: 'Night snack: Vegan yogurt with granola', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '12', time: '21:45', activity: 'Relaxation (15 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:30', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      },
      maintenance: {
        morning: [
          { id: '1', time: '06:30', activity: 'Wake up', category: 'other' as const, icon: <Clock className="h-5 w-5 text-health-primary" /> },
          { id: '2', time: '06:45', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '3', time: '07:00', activity: 'Morning yoga/stretching (20 min)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
          { id: '4', time: '07:30', activity: 'Breakfast: Vegan pancakes with fruit', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '5', time: '10:00', activity: 'Fruit + handful of nuts', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
        ],
        afternoon: [
          { id: '6', time: '12:30', activity: 'Lunch: Vegan wrap with veggies and hummus', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '7', time: '14:00', activity: 'Water (500ml)', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '8', time: '16:00', activity: 'Snack: Edamame beans', category: 'meal' as const, icon: <Coffee className="h-5 w-5 text-amber-600" /> },
          { id: '9', time: '17:30', activity: 'Moderate workout (30 min mix of cardio and strength)', category: 'exercise' as const, icon: <Dumbbell className="h-5 w-5 text-health-secondary" /> },
        ],
        evening: [
          { id: '10', time: '19:00', activity: 'Dinner: Stir-fried tofu with vegetables and rice', category: 'meal' as const, icon: <UtensilsCrossed className="h-5 w-5 text-health-primary" /> },
          { id: '11', time: '20:30', activity: 'Herbal tea', category: 'hydration' as const, icon: <Droplet className="h-5 w-5 text-blue-500" /> },
          { id: '12', time: '21:15', activity: 'Relaxation/Reading (20 min)', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
          { id: '13', time: '22:00', activity: 'Sleep', category: 'rest' as const, icon: <Moon className="h-5 w-5 text-indigo-500" /> },
        ]
      }
    }
  };

  const selectedRoutine = routines[dietType]?.[goalType] || routines.vegetarian.maintenance;
  const customRoutineKey = `${dietType}_${goalType}`;
  const hasCustomRoutine = customRoutines[customRoutineKey];

  const getCurrentRoutineItems = (timeSlot: string): RoutineItem[] => {
    if (hasCustomRoutine && customRoutines[customRoutineKey][timeSlot]) {
      return customRoutines[customRoutineKey][timeSlot];
    }
    return selectedRoutine[timeSlot] || [];
  };

  const handleSaveCustomRoutine = async (items: RoutineItem[], timeSlot: string) => {
    const updatedCustomRoutines = {
      ...customRoutines,
      [customRoutineKey]: {
        ...customRoutines[customRoutineKey],
        [timeSlot]: items
      }
    };
    
    setCustomRoutines(updatedCustomRoutines);
    
    // Save to local storage
    localStorage.setItem('customRoutines', JSON.stringify(updatedCustomRoutines));
    
    // If user is logged in, also save to profile
    if (user && updateProfile) {
      try {
        // Note: This would require adding a custom_routines field to the profile schema
        // await updateProfile({ custom_routines: updatedCustomRoutines });
      } catch (error) {
        console.log('Could not save to profile:', error);
      }
    }
    
    toast({
      title: "✨ Routine Saved!",
      description: `Your personalized ${timeSlot} routine has been saved.`,
    });
  };

  const handleSavePreferences = async () => {
    if (user && updateProfile) {
      try {
        const foodPreference = dietType === 'nonVegetarian' ? 'non_vegetarian' : dietType;
        const fitnessGoal = goalType === 'weightLoss' ? 'weight_loss' : 
                           goalType === 'weightGain' ? 'weight_gain' : 'maintain_fitness';
        
        await updateProfile({
          food_preference: foodPreference as any,
          fitness_goal: fitnessGoal as any
        });
        
        toast({
          title: "Preferences Saved!",
          description: "Your diet and fitness preferences have been updated.",
        });
      } catch (error) {
        console.error('Failed to save preferences:', error);
        toast({
          title: "Save Failed",
          description: "Could not save your preferences. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10">
        <div className="container-custom">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
                  Your Personalized Daily Routine
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Follow this structured daily routine tailored to your preferences for optimal health and goal achievement.
                </p>
                {user && (
                  <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Customized for {user.name || user.email}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSavePreferences}
                  className="flex items-center gap-2"
                  disabled={!user}
                >
                  <Settings className="h-4 w-4" />
                  Save Preferences
                </Button>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  {isEditing ? 'View Mode' : 'Edit Mode'}
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
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
            </Card>
            <Card className="p-4">
              <label className="block text-sm font-medium mb-2">Fitness Goal</label>
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
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
              <TabsTrigger value="morning" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Morning
              </TabsTrigger>
              <TabsTrigger value="afternoon" className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4" />
                Afternoon
              </TabsTrigger>
              <TabsTrigger value="evening" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Evening
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="morning" className="space-y-4">
              {isEditing ? (
                <DailyRoutineEditor 
                  routineItems={getCurrentRoutineItems('morning')}
                  onSave={(items) => handleSaveCustomRoutine(items, 'morning')}
                  title="Morning Routine Editor"
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Morning Routine</h2>
                    {hasCustomRoutine && (
                      <span className="text-sm text-health-primary font-medium">✨ Customized</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getCurrentRoutineItems('morning').map((item, index) => (
                      <Card key={item.id || index} className="overflow-hidden border-l-4 border-l-health-primary hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {item.icon || <Clock className="h-5 w-5 text-health-primary" />}
                            <div className="flex-1">
                              <p className="font-medium text-lg">{item.time}</p>
                              <p className="text-muted-foreground">{item.activity}</p>
                              {item.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="afternoon" className="space-y-4">
              {isEditing ? (
                <DailyRoutineEditor 
                  routineItems={getCurrentRoutineItems('afternoon')}
                  onSave={(items) => handleSaveCustomRoutine(items, 'afternoon')}
                  title="Afternoon Routine Editor"
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Afternoon Routine</h2>
                    {hasCustomRoutine && (
                      <span className="text-sm text-health-primary font-medium">✨ Customized</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getCurrentRoutineItems('afternoon').map((item, index) => (
                      <Card key={item.id || index} className="overflow-hidden border-l-4 border-l-health-secondary hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {item.icon || <UtensilsCrossed className="h-5 w-5 text-health-secondary" />}
                            <div className="flex-1">
                              <p className="font-medium text-lg">{item.time}</p>
                              <p className="text-muted-foreground">{item.activity}</p>
                              {item.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="evening" className="space-y-4">
              {isEditing ? (
                <DailyRoutineEditor 
                  routineItems={getCurrentRoutineItems('evening')}
                  onSave={(items) => handleSaveCustomRoutine(items, 'evening')}
                  title="Evening Routine Editor"
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Evening Routine</h2>
                    {hasCustomRoutine && (
                      <span className="text-sm text-health-primary font-medium">✨ Customized</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getCurrentRoutineItems('evening').map((item, index) => (
                      <Card key={item.id || index} className="overflow-hidden border-l-4 border-l-health-accent hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {item.icon || <Moon className="h-5 w-5 text-health-accent" />}
                            <div className="flex-1">
                              <p className="font-medium text-lg">{item.time}</p>
                              <p className="text-muted-foreground">{item.activity}</p>
                              {item.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

          <Card className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Droplet className="h-5 w-5 text-health-primary" />
              Daily Health Tips
            </h3>
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
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DailyRoutine;
