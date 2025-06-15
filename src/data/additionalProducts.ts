
export const additionalProducts = [
  // Dairy Products
  {
    id: "dairy-001",
    name: "Organic Whole Milk",
    brand: "AmarHealth",
    category: "food",
    subcategory: "dairy",
    description: "Fresh organic whole milk from grass-fed cows, rich in calcium and protein",
    price: 85,
    health_score: 8.5,
    image_urls: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"],
    health_impact_summary: "High-quality protein and calcium for bone health",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 50,
    ingredients: ["Organic whole milk"],
    allergens: ["Milk"],
    nutritional_info: {
      calories_per_100ml: 64,
      protein: "3.3g",
      calcium: "120mg"
    },
    quantity_options: [
      { value: 1, unit: "500ml", price: 85 },
      { value: 2, unit: "1L", price: 160 }
    ],
    warnings: ["Contains dairy"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "dairy-002",
    name: "Greek Yogurt",
    brand: "AmarHealth",
    category: "food",
    subcategory: "dairy",
    description: "Thick and creamy Greek yogurt with live probiotics for digestive health",
    price: 120,
    health_score: 9.0,
    image_urls: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"],
    health_impact_summary: "Probiotic-rich for gut health with high protein content",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 75,
    ingredients: ["Milk", "Live active cultures"],
    allergens: ["Milk"],
    nutritional_info: {
      calories_per_100g: 97,
      protein: "10g",
      probiotics: "Live cultures"
    },
    quantity_options: [
      { value: 1, unit: "200g", price: 120 },
      { value: 2, unit: "400g", price: 220 }
    ],
    warnings: ["Contains dairy"],
    status: "active",
    workflow_status: "published"
  },

  // Bakery Products
  {
    id: "bakery-001",
    name: "Whole Wheat Bread",
    brand: "AmarHealth",
    category: "food",
    subcategory: "bakery",
    description: "100% whole wheat bread made with no preservatives or artificial additives",
    price: 65,
    health_score: 8.2,
    image_urls: ["https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400"],
    health_impact_summary: "High fiber content supports digestive health",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 40,
    ingredients: ["Whole wheat flour", "Water", "Yeast", "Salt"],
    allergens: ["Gluten"],
    nutritional_info: {
      calories_per_slice: 80,
      fiber: "3g",
      protein: "4g"
    },
    quantity_options: [
      { value: 1, unit: "400g", price: 65 },
      { value: 2, unit: "800g", price: 120 }
    ],
    warnings: ["Contains gluten"],
    status: "active",
    workflow_status: "published"
  },

  // Healthy Oils
  {
    id: "oils-001",
    name: "Extra Virgin Olive Oil",
    brand: "AmarHealth",
    category: "food",
    subcategory: "oils",
    description: "Cold-pressed extra virgin olive oil rich in antioxidants and healthy fats",
    price: 450,
    health_score: 9.5,
    image_urls: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    health_impact_summary: "Heart-healthy monounsaturated fats and antioxidants",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 30,
    ingredients: ["Cold-pressed olive oil"],
    allergens: [],
    nutritional_info: {
      calories_per_100ml: 884,
      monounsaturated_fats: "73g",
      antioxidants: "High"
    },
    quantity_options: [
      { value: 1, unit: "500ml", price: 450 },
      { value: 2, unit: "1L", price: 850 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },

  // Healthy Snacks
  {
    id: "snacks-001",
    name: "Mixed Nuts Trail Mix",
    brand: "AmarHealth",
    category: "food",
    subcategory: "healthy_snacks",
    description: "Premium mix of almonds, walnuts, cashews, and dried fruits",
    price: 180,
    health_score: 8.8,
    image_urls: ["https://images.unsplash.com/photo-1599909533879-0b9ce5b00b7e?w=400"],
    health_impact_summary: "Healthy fats and protein for sustained energy",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 60,
    ingredients: ["Almonds", "Walnuts", "Cashews", "Dried cranberries"],
    allergens: ["Nuts"],
    nutritional_info: {
      calories_per_100g: 520,
      protein: "20g",
      healthy_fats: "42g"
    },
    quantity_options: [
      { value: 1, unit: "200g", price: 180 },
      { value: 2, unit: "500g", price: 420 }
    ],
    warnings: ["Contains nuts"],
    status: "active",
    workflow_status: "published"
  },

  // Health Supplements - using supplements category
  {
    id: "supplements-001",
    name: "Multivitamin Tablets",
    brand: "AmarHealth",
    category: "supplements",
    subcategory: "health_supplements",
    description: "Complete multivitamin with essential vitamins and minerals",
    price: 299,
    health_score: 9.2,
    image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"],
    health_impact_summary: "Complete nutrition support for daily wellness",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 100,
    ingredients: ["Vitamin A", "Vitamin C", "Vitamin D", "B-Complex", "Minerals"],
    allergens: [],
    nutritional_info: {
      serving_size: "1 tablet",
      vitamins: "Complete spectrum",
      minerals: "Essential minerals"
    },
    quantity_options: [
      { value: 1, unit: "30 tablets", price: 299 },
      { value: 2, unit: "60 tablets", price: 550 }
    ],
    warnings: ["Consult doctor before use"],
    status: "active",
    workflow_status: "published"
  }
];
