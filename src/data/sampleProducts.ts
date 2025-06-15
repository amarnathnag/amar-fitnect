import { newCategoryProducts } from './newCategoryProducts';

export const sampleProducts = [
  {
    id: "prod-001",
    name: "Organic Cow Milk",
    brand: "Farm Fresh",
    category: "food",
    subcategory: "dairy",
    description: "Organic Cow Milk (1L) falls under our Dairy category and is known for its purity, nutritional value, and excellent health benefits. This product contains key ingredient: Cow milk. It is enriched with benefits such as Rich in Calcium and High Protein. What makes this product ideal for daily use is its balance of taste and nutrition. It is sourced from grass-fed cows and processed to retain natural creaminess. It provides essential nutrients for bone strength, muscle building, and energy. Ideal for growing children, fitness enthusiasts, and elderly individuals alike, it can be used in tea, coffee, smoothies, cereal, or as a standalone drink.",
    price: 65,
    health_score: 8.5,
    image_urls: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"],
    health_impact_summary: "Rich in Calcium and High Protein, supports bone strength and muscle building",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 100,
    ingredients: ["Cow milk", "Vitamin D"],
    allergens: ["Lactose"],
    nutritional_info: {
      calories_per_100ml: 62,
      protein: "3.2g",
      fat: "3.5g",
      carbs: "4.8g",
      calcium: "120mg"
    },
    quantity_options: [
      { value: 1, unit: "1L", price: 65 },
      { value: 2, unit: "2L", price: 125 },
      { value: 5, unit: "5L", price: 300 }
    ],
    warnings: ["Contains Lactose", "Not suitable for lactose-intolerant individuals"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-002",
    name: "Brown Bread (Whole Wheat)",
    brand: "Healthy Grains",
    category: "food",
    subcategory: "bakery",
    description: "Made from 100% whole wheat flour, Brown Bread is a low-sugar, high-fiber staple. Ingredients include whole wheat flour, yeast, salt, and water — with no artificial sweeteners or preservatives. It's a heart-healthy alternative to white bread and supports better digestion, weight control, and energy levels. Ideal for toast, sandwiches, and snacks, it provides sustained release of energy throughout the day.",
    price: 45,
    health_score: 7.5,
    image_urls: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"],
    health_impact_summary: "High fiber content supports digestion and sustained energy release",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 50,
    ingredients: ["Whole wheat flour", "Yeast", "Salt", "Water"],
    allergens: ["Gluten"],
    nutritional_info: {
      calories_per_100g: 247,
      protein: "13g",
      fat: "4g",
      fiber: "7g"
    },
    quantity_options: [
      { value: 1, unit: "1 loaf (400g)", price: 45 },
      { value: 2, unit: "2 loaves", price: 85 },
      { value: 4, unit: "4 loaves", price: 160 }
    ],
    warnings: ["Contains Gluten", "Avoid if gluten sensitive"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-003",
    name: "Extra Virgin Olive Oil",
    brand: "Mediterranean Gold",
    category: "food",
    subcategory: "oils",
    description: "This cold-pressed oil is extracted without chemicals or high heat. It's rich in antioxidants and healthy fats like oleic acid. Supports cardiovascular health, brain function, and helps reduce inflammation. Ideal for salads, cooking, and light frying. No allergen risks — safe for most diets.",
    price: 340,
    health_score: 8.8,
    image_urls: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    health_impact_summary: "Rich in antioxidants and healthy fats, supports heart and brain health",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 75,
    ingredients: ["Cold-pressed olive oil"],
    allergens: [],
    nutritional_info: {
      calories_per_100ml: 884,
      fat: "100g",
      vitamin_e: "14mg"
    },
    quantity_options: [
      { value: 1, unit: "500ml", price: 340 },
      { value: 2, unit: "2 bottles", price: 650 },
      { value: 3, unit: "3 bottles", price: 950 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-004",
    name: "Organic Basmati Rice",
    brand: "Golden Harvest",
    category: "food",
    subcategory: "grains",
    description: "A staple in Indian kitchens, this rice is low in fat and high in clean carbohydrates. Helps in providing long-term energy and satiety. Great for diabetic-friendly diets when portioned right. No allergen issues. Use it for biryani, pulao, or daily meals.",
    price: 120,
    health_score: 8.0,
    image_urls: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"],
    health_impact_summary: "Low fat, high in clean carbohydrates for sustained energy",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 200,
    ingredients: ["Organic basmati rice"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 365,
      protein: "7.9g",
      carbs: "78g",
      fiber: "0.4g"
    },
    quantity_options: [
      { value: 1, unit: "1kg", price: 120 },
      { value: 2, unit: "2kg", price: 230 },
      { value: 5, unit: "5kg", price: 550 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-005",
    name: "Free-Range Eggs",
    brand: "Farm Fresh",
    category: "food",
    subcategory: "protein",
    description: "Sourced from hormone-free, cage-free hens. High in protein and Omega-3, these eggs support muscle growth, brain health, and immunity. Perfect for breakfast, salads, or baking. Note: may trigger allergies in sensitive individuals.",
    price: 75,
    health_score: 7.3,
    image_urls: ["https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400"],
    health_impact_summary: "High protein and Omega-3 for muscle growth and brain health",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 150,
    ingredients: ["Free-range eggs"],
    allergens: ["Eggs"],
    nutritional_info: {
      calories_per_egg: 70,
      protein: "6g",
      fat: "5g",
      omega_3: "300mg"
    },
    quantity_options: [
      { value: 6, unit: "6 eggs", price: 75 },
      { value: 12, unit: "12 eggs", price: 140 },
      { value: 18, unit: "18 eggs", price: 200 }
    ],
    warnings: ["May trigger allergies in sensitive individuals"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-006",
    name: "Low-Fat Greek Yogurt",
    brand: "Protein Plus",
    category: "food",
    subcategory: "dairy",
    description: "Low-Fat Greek Yogurt is a rich, thick, and creamy dairy product created by straining regular yogurt to remove whey. This concentrated texture enhances protein content, making it a perfect snack or meal addition for fitness-focused individuals. It is especially effective as a post-workout recovery food or a healthy breakfast paired with fruits or nuts. This yogurt is packed with probiotics that support gut health and digestion. With high levels of calcium and vitamin B12, it also contributes to strong bones and improved energy levels.",
    price: 50,
    health_score: 8.7,
    image_urls: ["https://images.unsplash.com/photo-1571212515416-626551d42937?w=400"],
    health_impact_summary: "High protein with probiotics for gut health and muscle recovery",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 80,
    ingredients: ["Strained yogurt", "Live cultures"],
    allergens: ["Lactose"],
    nutritional_info: {
      calories_per_100g: 97,
      protein: "10g",
      calcium: "110mg",
      probiotics: "Live cultures"
    },
    quantity_options: [
      { value: 1, unit: "200g", price: 50 },
      { value: 2, unit: "2 cups", price: 95 },
      { value: 4, unit: "4 cups", price: 180 }
    ],
    warnings: ["Contains lactose"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-007",
    name: "Multigrain Atta",
    brand: "Whole Grains Co",
    category: "food",
    subcategory: "grains",
    description: "Multigrain Atta is a powerful combination of wheat, barley, millets, soy, and oats. Unlike regular wheat flour, this blend delivers a slower release of energy, helping control blood sugar levels—ideal for diabetics and weight-conscious consumers. Each grain adds unique benefits: oats contribute fiber, millets add iron and minerals, and soy provides protein. It's perfect for preparing chapatis and parathas that are both nutritious and tasty.",
    price: 250,
    health_score: 8.2,
    image_urls: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"],
    health_impact_summary: "Multi-grain blend for sustained energy and blood sugar control",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 120,
    ingredients: ["Wheat", "Barley", "Millets", "Soy", "Oats"],
    allergens: ["Gluten", "Soy"],
    nutritional_info: {
      calories_per_100g: 341,
      protein: "12g",
      fiber: "11g",
      iron: "4.6mg"
    },
    quantity_options: [
      { value: 1, unit: "5kg", price: 250 },
      { value: 2, unit: "10kg", price: 480 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-008",
    name: "Cold-Pressed Coconut Oil",
    brand: "Tropical Pure",
    category: "food",
    subcategory: "oils",
    description: "Cold-Pressed Coconut Oil is made by pressing fresh coconut meat without applying heat, preserving its full range of nutrients. It is high in MCTs (medium-chain triglycerides), which are quickly absorbed and used by the body for energy and fat burning. It supports weight management, improves brain function, and promotes heart health. This oil is also antifungal and antibacterial, making it a versatile choice for cooking, oil pulling, and skincare.",
    price: 299,
    health_score: 8.9,
    image_urls: ["https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=400"],
    health_impact_summary: "High in MCTs for energy and metabolism, supports heart and brain health",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 60,
    ingredients: ["Cold-pressed coconut oil"],
    allergens: ["Coconut"],
    nutritional_info: {
      calories_per_100ml: 862,
      mct_content: "65%",
      lauric_acid: "47%"
    },
    quantity_options: [
      { value: 1, unit: "1L", price: 299 },
      { value: 2, unit: "2L", price: 580 }
    ],
    warnings: ["Contains coconut (potential allergen)"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-009",
    name: "Gluten-Free Oats",
    brand: "Pure Oats",
    category: "food",
    subcategory: "breakfast",
    description: "These Gluten-Free Oats are ideal for people with gluten intolerance or celiac disease. They're harvested in a dedicated facility to avoid cross-contamination. Packed with beta-glucan (soluble fiber), they help lower cholesterol, improve heart health, and stabilize blood sugar. Perfect for porridge, baking, or overnight oats, these oats are also rich in iron and plant-based protein. Their low glycemic index makes them a smart breakfast choice for sustained energy and weight control.",
    price: 180,
    health_score: 9.0,
    image_urls: ["https://images.unsplash.com/photo-1517539424419-5caf0bb81b94?w=400"],
    health_impact_summary: "Beta-glucan rich for cholesterol control and heart health, gluten-free",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 90,
    ingredients: ["Gluten-free oats"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 389,
      protein: "16.9g",
      fiber: "10.6g",
      beta_glucan: "4g"
    },
    quantity_options: [
      { value: 1, unit: "1kg", price: 180 },
      { value: 2, unit: "2kg", price: 340 },
      { value: 5, unit: "5kg", price: 800 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-010",
    name: "Raw Organic Honey",
    brand: "Nature's Gold",
    category: "food",
    subcategory: "sweeteners",
    description: "Raw Organic Honey is a golden nectar harvested without pasteurization, retaining all its enzymes and antioxidants. It has powerful antibacterial, antiviral, and antifungal properties. It's commonly used to treat sore throats, promote healing, and support the immune system. Unlike processed sugar, this honey has a low glycemic index and provides slow energy release. It's ideal for use in tea, toast, cereals, or even skincare.",
    price: 210,
    health_score: 8.6,
    image_urls: ["https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400"],
    health_impact_summary: "Raw honey with antibacterial properties and natural enzymes",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 70,
    ingredients: ["Raw organic honey"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 304,
      sugars: "82g",
      antioxidants: "High",
      enzymes: "Natural"
    },
    quantity_options: [
      { value: 1, unit: "500g", price: 210 },
      { value: 2, unit: "1kg", price: 400 }
    ],
    warnings: ["Not suitable for children under 1 year", "High in natural sugars"],
    status: "active",
    workflow_status: "published"
  },
  // Add all new category products
  ...newCategoryProducts
];
