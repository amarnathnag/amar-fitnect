
import React from 'react';
import { Clock } from 'lucide-react';

export interface TrimesterPlan {
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
    icon: React.ReactNode;
  }[];
}

export const trimesterPlans: TrimesterPlan[] = [
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
