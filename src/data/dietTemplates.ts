
export interface TemplateFood {
  name: string;
  quantity: string;
  calories: number;
}

export interface TemplateMeal {
  time: string;
  foods: TemplateFood[];
}

export interface DietTemplate {
  id: string;
  name: string;
  goal: string;
  description: string;
  totalMeals: number;
  dailyCalories: number;
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
    totalMeals: 21,
    dailyCalories: 1400,
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Oatmeal with berries', quantity: '1 bowl', calories: 250 },
          { name: 'Green tea', quantity: '1 cup', calories: 5 }
        ],
        afternoon: [
          { name: 'Grilled chicken salad', quantity: '1 plate', calories: 350 },
          { name: 'Whole grain bread', quantity: '1 slice', calories: 80 }
        ],
        evening: [
          { name: 'Baked fish with vegetables', quantity: '1 serving', calories: 300 },
          { name: 'Brown rice', quantity: '1/2 cup', calories: 110 }
        ],
        night: [
          { name: 'Greek yogurt', quantity: '1 cup', calories: 150 },
          { name: 'Almonds', quantity: '10 pieces', calories: 70 }
        ]
      },
      Tuesday: {
        morning: [
          { name: 'Scrambled eggs', quantity: '2 eggs', calories: 200 },
          { name: 'Whole wheat toast', quantity: '1 slice', calories: 80 },
          { name: 'Avocado', quantity: '1/4 piece', calories: 60 }
        ],
        afternoon: [
          { name: 'Lentil soup', quantity: '1 bowl', calories: 250 },
          { name: 'Mixed green salad', quantity: '1 plate', calories: 100 }
        ],
        evening: [
          { name: 'Grilled chicken breast', quantity: '150g', calories: 280 },
          { name: 'Steamed broccoli', quantity: '1 cup', calories: 55 },
          { name: 'Sweet potato', quantity: '1 medium', calories: 120 }
        ],
        night: [
          { name: 'Herbal tea', quantity: '1 cup', calories: 5 },
          { name: 'Walnuts', quantity: '5 pieces', calories: 65 }
        ]
      },
      // ... Similar structure for other days
      Wednesday: {
        morning: [
          { name: 'Smoothie (spinach, banana, protein powder)', quantity: '1 glass', calories: 280 }
        ],
        afternoon: [
          { name: 'Quinoa bowl with vegetables', quantity: '1 bowl', calories: 380 }
        ],
        evening: [
          { name: 'Baked salmon', quantity: '150g', calories: 320 },
          { name: 'Asparagus', quantity: '1 cup', calories: 40 }
        ],
        night: [
          { name: 'Cottage cheese', quantity: '1/2 cup', calories: 90 }
        ]
      }
    }
  },
  {
    id: 'muscle-building',
    name: 'Muscle Building',
    goal: 'muscle-gain',
    description: 'High protein diet plan to support muscle growth and recovery',
    totalMeals: 28,
    dailyCalories: 2200,
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Protein pancakes', quantity: '3 pieces', calories: 350 },
          { name: 'Banana', quantity: '1 medium', calories: 105 },
          { name: 'Protein shake', quantity: '1 scoop', calories: 120 }
        ],
        afternoon: [
          { name: 'Grilled chicken breast', quantity: '200g', calories: 380 },
          { name: 'Brown rice', quantity: '1 cup', calories: 220 },
          { name: 'Mixed vegetables', quantity: '1 cup', calories: 80 }
        ],
        evening: [
          { name: 'Lean beef steak', quantity: '200g', calories: 450 },
          { name: 'Quinoa', quantity: '1 cup', calories: 220 },
          { name: 'Green beans', quantity: '1 cup', calories: 35 }
        ],
        night: [
          { name: 'Casein protein shake', quantity: '1 scoop', calories: 120 },
          { name: 'Peanut butter', quantity: '2 tbsp', calories: 190 }
        ]
      },
      Tuesday: {
        morning: [
          { name: 'Egg white omelet', quantity: '4 egg whites', calories: 280 },
          { name: 'Oatmeal', quantity: '1 cup', calories: 150 },
          { name: 'Blueberries', quantity: '1/2 cup', calories: 40 }
        ],
        afternoon: [
          { name: 'Turkey sandwich', quantity: '1 sandwich', calories: 420 },
          { name: 'Greek yogurt', quantity: '1 cup', calories: 150 }
        ],
        evening: [
          { name: 'Grilled salmon', quantity: '200g', calories: 400 },
          { name: 'Sweet potato', quantity: '1 large', calories: 160 },
          { name: 'Spinach salad', quantity: '2 cups', calories: 60 }
        ],
        night: [
          { name: 'Cottage cheese', quantity: '1 cup', calories: 180 },
          { name: 'Almonds', quantity: '15 pieces', calories: 105 }
        ]
      }
    }
  },
  {
    id: 'pcos-friendly',
    name: 'PCOS Friendly',
    goal: 'pcos-management',
    description: 'Low glycemic index foods to help manage PCOS symptoms',
    totalMeals: 35,
    dailyCalories: 1600,
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Chia seed pudding', quantity: '1 bowl', calories: 200 },
          { name: 'Cinnamon', quantity: '1 tsp', calories: 5 },
          { name: 'Berries', quantity: '1/2 cup', calories: 40 }
        ],
        afternoon: [
          { name: 'Grilled chicken with vegetables', quantity: '1 plate', calories: 350 },
          { name: 'Cauliflower rice', quantity: '1 cup', calories: 25 }
        ],
        evening: [
          { name: 'Baked cod', quantity: '150g', calories: 200 },
          { name: 'Roasted vegetables', quantity: '1.5 cups', calories: 120 },
          { name: 'Olive oil', quantity: '1 tbsp', calories: 120 }
        ],
        night: [
          { name: 'Herbal tea (spearmint)', quantity: '1 cup', calories: 5 },
          { name: 'Pumpkin seeds', quantity: '2 tbsp', calories: 94 }
        ]
      }
    }
  },
  {
    id: 'thyroid-care',
    name: 'Thyroid Care',
    goal: 'thyroid-control',
    description: 'Thyroid-friendly foods to support hormone balance',
    totalMeals: 24,
    dailyCalories: 1500,
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Coconut yogurt with selenium-rich brazil nuts', quantity: '1 bowl', calories: 220 },
          { name: 'Turmeric latte', quantity: '1 cup', calories: 80 }
        ],
        afternoon: [
          { name: 'Seaweed salad with grilled chicken', quantity: '1 plate', calories: 320 },
          { name: 'Quinoa', quantity: '1/2 cup', calories: 110 }
        ],
        evening: [
          { name: 'Wild-caught salmon', quantity: '150g', calories: 280 },
          { name: 'Steamed vegetables', quantity: '1 cup', calories: 60 },
          { name: 'Brown rice', quantity: '1/2 cup', calories: 110 }
        ],
        night: [
          { name: 'Chamomile tea', quantity: '1 cup', calories: 5 },
          { name: 'Sunflower seeds', quantity: '2 tbsp', calories: 93 }
        ]
      }
    }
  },
  {
    id: 'maintenance-plan',
    name: 'Maintenance Plan',
    goal: 'maintenance',
    description: 'Balanced nutrition for maintaining current weight',
    totalMeals: 30,
    dailyCalories: 1800,
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Whole grain cereal with milk', quantity: '1 bowl', calories: 280 },
          { name: 'Fresh fruit', quantity: '1 piece', calories: 80 }
        ],
        afternoon: [
          { name: 'Mediterranean wrap', quantity: '1 wrap', calories: 450 },
          { name: 'Mixed nuts', quantity: '1 oz', calories: 170 }
        ],
        evening: [
          { name: 'Grilled chicken with pasta', quantity: '1 plate', calories: 520 },
          { name: 'Garden salad', quantity: '1 bowl', calories: 100 }
        ],
        night: [
          { name: 'Dark chocolate', quantity: '1 square', calories: 50 },
          { name: 'Herbal tea', quantity: '1 cup', calories: 5 }
        ]
      }
    }
  },
  {
    id: 'beginner-friendly',
    name: 'Beginner Friendly',
    goal: 'weight-loss',
    description: 'Simple, easy-to-prepare meals for weight loss beginners',
    totalMeals: 18,
    dailyCalories: 1300,
    weekPlan: {
      Monday: {
        morning: [
          { name: 'Banana with peanut butter', quantity: '1 banana + 1 tbsp', calories: 200 },
          { name: 'Coffee (black)', quantity: '1 cup', calories: 5 }
        ],
        afternoon: [
          { name: 'Tuna salad sandwich', quantity: '1 sandwich', calories: 350 },
          { name: 'Apple', quantity: '1 medium', calories: 80 }
        ],
        evening: [
          { name: 'Baked chicken breast', quantity: '150g', calories: 250 },
          { name: 'Steamed vegetables', quantity: '1 cup', calories: 50 },
          { name: 'Mashed sweet potato', quantity: '1/2 cup', calories: 90 }
        ],
        night: [
          { name: 'Herbal tea', quantity: '1 cup', calories: 5 },
          { name: 'Low-fat yogurt', quantity: '1/2 cup', calories: 75 }
        ]
      }
    }
  }
];
