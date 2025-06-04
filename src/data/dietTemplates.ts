
export interface TemplateFood {
  name: string;
  quantity: string;
  calories: number;
}

export interface TemplateMeal {
  time: string;
  meal: string;
  description: string;
  calories: number;
}

export interface DietTemplate {
  id: string;
  name: string;
  goal: string;
  description: string;
  focus: string;
  idealFor: string;
  totalMeals: number;
  dailyCalories: number;
  sampleMeals: TemplateMeal[];
  weekPlan: {
    [day: string]: {
      morning: TemplateFood[];
      afternoon: TemplateFood[];
      evening: TemplateFood[];
      night: TemplateFood[];
    };
  };
}

export const dietTemplates: DietTemplate[] = [
  {
    id: 'weight-loss-starter',
    name: 'Weight Loss Starter',
    goal: 'weight-loss',
    description: 'A beginner-friendly weight loss plan with balanced nutrition',
    focus: 'High fiber, low-fat, moderate protein',
    idealFor: 'Beginners, overweight individuals starting out',
    totalMeals: 21,
    dailyCalories: 1400,
    sampleMeals: [
      { time: '8:00 AM', meal: 'Poha with peanuts + lemon water', description: 'Light & filling', calories: 300 },
      { time: '10:30 AM', meal: '1 boiled egg + cucumber slices', description: 'Protein + hydration', calories: 100 },
      { time: '1:00 PM', meal: '1 roti + dal + sabzi (no oil)', description: 'Balanced lunch', calories: 400 },
      { time: '4:00 PM', meal: 'Buttermilk + handful roasted chana', description: 'Probiotic + fiber', calories: 150 },
      { time: '7:30 PM', meal: 'Vegetable khichdi + salad', description: 'Light dinner', calories: 450 }
    ],
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Poha with peanuts', quantity: '1 bowl', calories: 280 },
          { name: 'Lemon water', quantity: '1 glass', calories: 20 }
        ],
        afternoon: [
          { name: 'Whole wheat roti', quantity: '1 piece', calories: 80 },
          { name: 'Moong dal', quantity: '1 cup', calories: 200 },
          { name: 'Mixed vegetable sabzi', quantity: '1 cup', calories: 120 }
        ],
        evening: [
          { name: 'Vegetable khichdi', quantity: '1 bowl', calories: 300 },
          { name: 'Mixed salad', quantity: '1 plate', calories: 150 }
        ],
        night: [
          { name: 'Buttermilk', quantity: '1 glass', calories: 80 },
          { name: 'Roasted chana', quantity: '1 handful', calories: 70 }
        ]
      },
      Tuesday: {
        morning: [
          { name: 'Upma with vegetables', quantity: '1 bowl', calories: 250 },
          { name: 'Green tea', quantity: '1 cup', calories: 5 }
        ],
        afternoon: [
          { name: 'Brown rice', quantity: '1/2 cup', calories: 110 },
          { name: 'Rajma curry', quantity: '1 cup', calories: 250 },
          { name: 'Cucumber raita', quantity: '1/2 cup', calories: 40 }
        ],
        evening: [
          { name: 'Grilled paneer', quantity: '100g', calories: 250 },
          { name: 'Steamed broccoli', quantity: '1 cup', calories: 55 }
        ],
        night: [
          { name: 'Herbal tea', quantity: '1 cup', calories: 5 },
          { name: 'Almonds', quantity: '5 pieces', calories: 35 }
        ]
      }
    }
  },
  {
    id: 'muscle-building',
    name: 'Muscle Building',
    goal: 'muscle-gain',
    description: 'High protein diet plan to support muscle growth and recovery',
    focus: 'High-protein, complex carbs, good fats',
    idealFor: 'Gym-goers, athletes, muscle gainers',
    totalMeals: 28,
    dailyCalories: 2200,
    sampleMeals: [
      { time: '7:30 AM', meal: 'Paneer paratha + curd', description: 'Protein-rich breakfast', calories: 450 },
      { time: '10:00 AM', meal: 'Banana shake with almonds', description: 'Energy booster', calories: 300 },
      { time: '1:00 PM', meal: 'Brown rice + rajma + salad + curd', description: 'Complex carbs & protein combo', calories: 600 },
      { time: '4:00 PM', meal: 'Peanut butter sandwich (whole wheat)', description: 'Pre-workout carbs & protein', calories: 250 },
      { time: '6:00 PM', meal: 'Whey protein + banana (post-workout)', description: 'Muscle recovery', calories: 250 },
      { time: '8:30 PM', meal: 'Grilled chicken/fish + sautéed vegetables', description: 'Lean protein + vitamins', calories: 400 }
    ],
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Paneer paratha', quantity: '2 pieces', calories: 350 },
          { name: 'Greek yogurt', quantity: '1 cup', calories: 100 }
        ],
        afternoon: [
          { name: 'Brown rice', quantity: '1 cup', calories: 220 },
          { name: 'Rajma curry', quantity: '1 cup', calories: 300 },
          { name: 'Mixed salad', quantity: '1 plate', calories: 80 }
        ],
        evening: [
          { name: 'Grilled chicken breast', quantity: '200g', calories: 380 },
          { name: 'Sautéed vegetables', quantity: '1 cup', calories: 100 }
        ],
        night: [
          { name: 'Banana shake with almonds', quantity: '1 glass', calories: 300 },
          { name: 'Peanut butter sandwich', quantity: '1 sandwich', calories: 250 }
        ]
      }
    }
  },
  {
    id: 'pcos-friendly',
    name: 'PCOS Friendly',
    goal: 'pcos-management',
    description: 'Low glycemic index foods to help manage PCOS symptoms',
    focus: 'Low GI foods, anti-inflammatory, hormone support',
    idealFor: 'Women with PCOS, insulin resistance',
    totalMeals: 35,
    dailyCalories: 1600,
    sampleMeals: [
      { time: '8:00 AM', meal: 'Methi thepla + curd', description: 'Low GI breakfast', calories: 300 },
      { time: '10:30 AM', meal: 'Coconut water + walnuts', description: 'Electrolytes + good fats', calories: 150 },
      { time: '1:00 PM', meal: 'Millet roti + stir-fried veggies + dal', description: 'Complex carbs, fiber, protein', calories: 500 },
      { time: '4:00 PM', meal: 'Roasted makhana + green tea', description: 'Antioxidants + light snack', calories: 150 },
      { time: '7:30 PM', meal: 'Grilled paneer tikka + mixed veg salad', description: 'Low-carb dinner', calories: 500 }
    ],
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Methi thepla', quantity: '2 pieces', calories: 250 },
          { name: 'Low-fat curd', quantity: '1/2 cup', calories: 50 }
        ],
        afternoon: [
          { name: 'Millet roti', quantity: '2 pieces', calories: 160 },
          { name: 'Mixed dal', quantity: '1 cup', calories: 200 },
          { name: 'Stir-fried vegetables', quantity: '1 cup', calories: 140 }
        ],
        evening: [
          { name: 'Grilled paneer tikka', quantity: '150g', calories: 300 },
          { name: 'Mixed vegetable salad', quantity: '1 large bowl', calories: 200 }
        ],
        night: [
          { name: 'Coconut water', quantity: '1 glass', calories: 45 },
          { name: 'Walnuts', quantity: '5 pieces', calories: 105 }
        ]
      }
    }
  },
  {
    id: 'thyroid-care',
    name: 'Thyroid Care',
    goal: 'thyroid-control',
    description: 'Thyroid-friendly foods to support hormone balance',
    focus: 'Selenium, zinc, iodine-rich foods',
    idealFor: 'Hypothyroidism or hyperthyroid patients',
    totalMeals: 24,
    dailyCalories: 1500,
    sampleMeals: [
      { time: '8:00 AM', meal: 'Ragi dosa + coconut chutney', description: 'Gluten-free + healthy fats', calories: 300 },
      { time: '10:30 AM', meal: 'Brazil nuts + green tea', description: 'Selenium boost', calories: 150 },
      { time: '1:00 PM', meal: 'Rice + moong dal + beetroot sabzi', description: 'Light & easy to digest', calories: 400 },
      { time: '4:00 PM', meal: 'Smoothie with spinach + flaxseed', description: 'Omega-3 & iron', calories: 200 },
      { time: '7:30 PM', meal: 'Steamed fish or tofu + sautéed beans + soup', description: 'Protein & fiber', calories: 450 }
    ],
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Ragi dosa', quantity: '2 pieces', calories: 250 },
          { name: 'Coconut chutney', quantity: '2 tbsp', calories: 50 }
        ],
        afternoon: [
          { name: 'White rice', quantity: '1 cup', calories: 200 },
          { name: 'Moong dal', quantity: '1 cup', calories: 150 },
          { name: 'Beetroot sabzi', quantity: '1 cup', calories: 50 }
        ],
        evening: [
          { name: 'Steamed fish', quantity: '150g', calories: 250 },
          { name: 'Sautéed green beans', quantity: '1 cup', calories: 35 },
          { name: 'Clear vegetable soup', quantity: '1 bowl', calories: 80 }
        ],
        night: [
          { name: 'Spinach flaxseed smoothie', quantity: '1 glass', calories: 200 },
          { name: 'Brazil nuts', quantity: '2 pieces', calories: 60 }
        ]
      }
    }
  },
  {
    id: 'maintenance-plan',
    name: 'Maintenance Plan',
    goal: 'maintenance',
    description: 'Balanced nutrition for maintaining current weight',
    focus: 'Balanced macronutrients',
    idealFor: 'Individuals with stable weight wanting to maintain it',
    totalMeals: 30,
    dailyCalories: 1800,
    sampleMeals: [
      { time: '8:00 AM', meal: 'Whole wheat toast + egg bhurji', description: 'Balanced start', calories: 350 },
      { time: '1:00 PM', meal: 'Chapati + chicken curry + cucumber salad', description: 'Balanced protein, carbs, fiber', calories: 600 },
      { time: '4:00 PM', meal: 'Fruit salad with chaat masala', description: 'Natural sugars + vitamins', calories: 250 },
      { time: '7:30 PM', meal: 'Vegetable pulao + raita', description: 'Moderate calories + comfort dinner', calories: 600 }
    ],
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Whole wheat toast', quantity: '2 slices', calories: 160 },
          { name: 'Egg bhurji', quantity: '2 eggs', calories: 190 }
        ],
        afternoon: [
          { name: 'Chapati', quantity: '2 pieces', calories: 160 },
          { name: 'Chicken curry', quantity: '1 cup', calories: 350 },
          { name: 'Cucumber salad', quantity: '1 bowl', calories: 90 }
        ],
        evening: [
          { name: 'Vegetable pulao', quantity: '1.5 cups', calories: 450 },
          { name: 'Mint raita', quantity: '1/2 cup', calories: 150 }
        ],
        night: [
          { name: 'Mixed fruit salad', quantity: '1 bowl', calories: 180 },
          { name: 'Chaat masala', quantity: '1 pinch', calories: 2 }
        ]
      }
    }
  },
  {
    id: 'beginner-friendly',
    name: 'Beginner Friendly',
    goal: 'weight-loss',
    description: 'Simple, easy-to-prepare meals for weight loss beginners',
    focus: 'Easy-to-cook, light Indian meals',
    idealFor: 'Busy professionals or weight-loss newbies',
    totalMeals: 18,
    dailyCalories: 1300,
    sampleMeals: [
      { time: '8:00 AM', meal: 'Upma with vegetables', description: 'Quick, low-cal breakfast', calories: 300 },
      { time: '1:00 PM', meal: 'Chapati + dal + bhindi sabzi', description: 'Light & fibrous lunch', calories: 400 },
      { time: '4:00 PM', meal: 'Black tea + roasted peanuts', description: 'Light snack with protein', calories: 150 },
      { time: '7:30 PM', meal: 'Vegetable soup + paneer tikka', description: 'Filling & low-cal dinner', calories: 450 }
    ],
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Vegetable upma', quantity: '1 bowl', calories: 250 },
          { name: 'Black tea', quantity: '1 cup', calories: 10 }
        ],
        afternoon: [
          { name: 'Chapati', quantity: '2 pieces', calories: 160 },
          { name: 'Toor dal', quantity: '1 cup', calories: 180 },
          { name: 'Bhindi sabzi', quantity: '1 cup', calories: 60 }
        ],
        evening: [
          { name: 'Mixed vegetable soup', quantity: '1 bowl', calories: 100 },
          { name: 'Paneer tikka', quantity: '100g', calories: 200 }
        ],
        night: [
          { name: 'Roasted peanuts', quantity: '1 handful', calories: 150 },
          { name: 'Herbal tea', quantity: '1 cup', calories: 5 }
        ]
      }
    }
  }
];
