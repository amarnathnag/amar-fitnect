
import React from 'react';
import { Clock } from 'lucide-react';

export interface Meal {
  time: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface WeightPlan {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
}

export const weightPlans: WeightPlan[] = [
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
