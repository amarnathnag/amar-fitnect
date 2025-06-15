
export const productCategories = [
  'all',
  'dairy',
  'bakery',
  'oils',
  'grains',
  'protein',
  'breakfast',
  'sweeteners',
  'organic',
  'vegan',
  'premium'
];

export const categoryDisplayNames: Record<string, string> = {
  all: 'All Products',
  dairy: 'Dairy & Alternatives',
  bakery: 'Bakery & Breads',
  oils: 'Healthy Oils',
  grains: 'Grains & Cereals',
  protein: 'Protein Sources',
  breakfast: 'Breakfast & Cereals',
  sweeteners: 'Natural Sweeteners',
  organic: 'Organic Products',
  vegan: 'Vegan Products',
  premium: 'Premium Selection'
};

// Health-focused filter options
export const healthScoreRanges = [
  { label: 'All Health Scores', min: 0, max: 10 },
  { label: 'Excellent (9-10)', min: 9, max: 10 },
  { label: 'Very Good (8-9)', min: 8, max: 9 },
  { label: 'Good (7-8)', min: 7, max: 8 },
  { label: 'Average (6-7)', min: 6, max: 7 },
  { label: 'Below Average (0-6)', min: 0, max: 6 }
];

export const dietaryPreferences = [
  { key: 'is_organic', label: 'Organic', icon: '🌱' },
  { key: 'is_vegan', label: 'Vegan', icon: '🌿' },
  { key: 'is_vegetarian', label: 'Vegetarian', icon: '🥬' }
];
