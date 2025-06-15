
export const newCategoryProducts = [
  // Grains & Cereals Category
  {
    id: "prod-011",
    name: "Organic Quinoa",
    brand: "AmarHealth",
    category: "food",
    subcategory: "grains",
    description: "Quinoa is often hailed as a super grain, and for good reason. It is naturally gluten-free, high in protein, and contains all nine essential amino acids. Ideal for diabetics and fitness-conscious individuals, it offers a low glycemic index while supplying complex carbohydrates for long-lasting energy. It's also a rich source of dietary fiber, iron, magnesium, and antioxidants. Whether used in salads, soups, or breakfast bowls, quinoa is a versatile and healthy addition to any meal plan. At AmarHealth, we offer 100% organic quinoa, free from pesticides and preservatives.",
    price: 320,
    health_score: 9.5,
    image_urls: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"],
    health_impact_summary: "Gluten-free superfood with complete amino acids for sustained energy and muscle health",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 85,
    ingredients: ["Organic quinoa"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 368,
      protein: "14.1g",
      fiber: "7g",
      iron: "4.6mg",
      magnesium: "197mg"
    },
    quantity_options: [
      { value: 1, unit: "500g", price: 320 },
      { value: 2, unit: "1kg", price: 620 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-012",
    name: "Rolled Oats",
    brand: "AmarHealth",
    category: "food",
    subcategory: "grains",
    description: "Rolled oats are a breakfast staple known for their heart-healthy properties. They help in lowering bad cholesterol levels (LDL) due to their high beta-glucan content. These oats are minimally processed, rich in soluble fiber, and keep you full longer—making them ideal for weight loss. They are also great for digestion and managing blood sugar. You can cook them as porridge, blend them in smoothies, or bake them into healthy snacks. No added sugar or preservatives—pure nutrition in every bite.",
    price: 199,
    health_score: 9.0,
    image_urls: ["https://images.unsplash.com/photo-1517539424419-5caf0bb81b94?w=400"],
    health_impact_summary: "Heart-healthy oats with beta-glucan for cholesterol control and sustained energy",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 120,
    ingredients: ["Rolled oats"],
    allergens: ["May contain gluten"],
    nutritional_info: {
      calories_per_100g: 389,
      protein: "16.9g",
      fiber: "10.6g",
      beta_glucan: "4g"
    },
    quantity_options: [
      { value: 1, unit: "1kg", price: 199 },
      { value: 2, unit: "2kg", price: 380 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-013",
    name: "Brown Rice",
    brand: "AmarHealth",
    category: "food",
    subcategory: "grains",
    description: "Brown rice retains the bran and germ layers, which are often stripped in white rice. As a result, it contains more fiber, magnesium, and nutrients. Its slow digesting carbs make it suitable for diabetics and those aiming to lose weight. Brown rice has a slightly nutty flavor and pairs well with almost every Indian dish. It's gluten-free, non-GMO, and organically sourced to ensure maximum nutritional value.",
    price: 145,
    health_score: 8.8,
    image_urls: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"],
    health_impact_summary: "Whole grain rice with fiber and nutrients for blood sugar control",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 200,
    ingredients: ["Organic brown rice"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 370,
      protein: "7.9g",
      fiber: "3.5g",
      magnesium: "143mg"
    },
    quantity_options: [
      { value: 1, unit: "1kg", price: 145 },
      { value: 5, unit: "5kg", price: 700 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-014",
    name: "Foxtail Millet",
    brand: "AmarHealth",
    category: "food",
    subcategory: "grains",
    description: "Foxtail millet is a powerhouse grain used traditionally across India. Rich in complex carbs, calcium, and iron, it helps regulate blood sugar and supports bone health. Ideal for gluten-intolerant individuals, it's also good for children and the elderly. Millets support a healthy gut and help reduce the risk of cardiovascular diseases. Use it in place of rice or as a base for porridge and khichdi. Sourced locally and ethically.",
    price: 210,
    health_score: 9.0,
    image_urls: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"],
    health_impact_summary: "Traditional Indian superfood rich in calcium and iron for bone health",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 95,
    ingredients: ["Foxtail millet"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 351,
      protein: "12.3g",
      calcium: "31mg",
      iron: "2.8mg"
    },
    quantity_options: [
      { value: 1, unit: "750g", price: 210 },
      { value: 2, unit: "1.5kg", price: 400 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-015",
    name: "Ragi (Finger Millet) Flour",
    brand: "AmarHealth",
    category: "food",
    subcategory: "grains",
    description: "Ragi is revered in Indian households for its calcium-rich content, which is beneficial for growing children and elderly adults. It also contains tryptophan, an amino acid that helps manage anxiety and sleep disorders. Diabetics benefit from its slow-release carbohydrates. You can use it to make dosa, rotis, and even healthy pancakes. AmarHealth offers finely ground, stone-milled ragi flour without additives.",
    price: 175,
    health_score: 9.2,
    image_urls: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"],
    health_impact_summary: "Calcium-rich millet flour with tryptophan for bone health and better sleep",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 110,
    ingredients: ["Finger millet flour"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 336,
      protein: "7.3g",
      calcium: "344mg",
      tryptophan: "0.17g"
    },
    quantity_options: [
      { value: 1, unit: "1kg", price: 175 },
      { value: 2, unit: "2kg", price: 340 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },

  // Healthy Snacks Category
  {
    id: "prod-016",
    name: "Protein Bars (Peanut Butter & Chocolate)",
    brand: "AmarHealth",
    category: "food",
    subcategory: "healthy_snacks",
    description: "This protein bar is the perfect on-the-go snack, packing 12g of protein, 5g of fiber, and essential vitamins. No artificial sweeteners or hydrogenated oils—only natural ingredients like dates, nuts, and whey isolate. Keeps you full and energized. Ideal for gym-goers and busy professionals.",
    price: 89,
    health_score: 9.1,
    image_urls: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400"],
    health_impact_summary: "High-protein natural energy bar for sustained energy and muscle recovery",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 150,
    ingredients: ["Dates", "Peanut butter", "Whey protein isolate", "Dark chocolate", "Almonds"],
    allergens: ["Peanuts", "Milk", "Tree nuts"],
    nutritional_info: {
      calories_per_bar: 220,
      protein: "12g",
      fiber: "5g",
      sugar: "8g"
    },
    quantity_options: [
      { value: 1, unit: "50g bar", price: 89 },
      { value: 6, unit: "6-pack", price: 520 },
      { value: 12, unit: "12-pack", price: 999 }
    ],
    warnings: ["Contains nuts and dairy"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-017",
    name: "Roasted Almonds",
    brand: "AmarHealth",
    category: "food",
    subcategory: "healthy_snacks",
    description: "Dry roasted with a sprinkle of Himalayan salt, these almonds are high in monounsaturated fats, vitamin E, and magnesium. Great for heart and brain health. No added preservatives, non-GMO, and ethically sourced.",
    price: 299,
    health_score: 9.3,
    image_urls: ["https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=400"],
    health_impact_summary: "Heart-healthy almonds rich in vitamin E and healthy fats for brain function",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 80,
    ingredients: ["Almonds", "Himalayan salt"],
    allergens: ["Tree nuts"],
    nutritional_info: {
      calories_per_100g: 579,
      protein: "21.2g",
      vitamin_e: "25.6mg",
      magnesium: "270mg"
    },
    quantity_options: [
      { value: 1, unit: "200g", price: 299 },
      { value: 2, unit: "400g", price: 580 }
    ],
    warnings: ["Contains tree nuts"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-018",
    name: "Chia Seed Energy Mix",
    brand: "AmarHealth",
    category: "food",
    subcategory: "healthy_snacks",
    description: "Packed with omega-3s, protein, and antioxidants, this energy mix is a blend of chia seeds, pumpkin seeds, and sunflower seeds. Helps reduce inflammation and maintain blood sugar. Perfect in smoothies, yogurts, or just by the spoonful.",
    price: 249,
    health_score: 9.4,
    image_urls: ["https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400"],
    health_impact_summary: "Omega-3 rich superfood mix for inflammation control and stable blood sugar",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 70,
    ingredients: ["Chia seeds", "Pumpkin seeds", "Sunflower seeds"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 486,
      protein: "17g",
      omega_3: "17.8g",
      fiber: "34g"
    },
    quantity_options: [
      { value: 1, unit: "250g", price: 249 },
      { value: 2, unit: "500g", price: 480 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-019",
    name: "Baked Beetroot Chips",
    brand: "AmarHealth",
    category: "food",
    subcategory: "healthy_snacks",
    description: "Crunchy, colorful, and baked—not fried. Beetroot chips offer fiber, potassium, and nitrates that support healthy blood pressure. A tasty, guilt-free snack that kids and adults will both love.",
    price: 135,
    health_score: 8.8,
    image_urls: ["https://images.unsplash.com/photo-1606307526550-65e31c943c2c?w=400"],
    health_impact_summary: "Baked vegetable chips with nitrates for healthy blood pressure support",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 60,
    ingredients: ["Beetroot", "Sea salt", "Olive oil"],
    allergens: [],
    nutritional_info: {
      calories_per_100g: 325,
      fiber: "9g",
      potassium: "325mg",
      nitrates: "250mg"
    },
    quantity_options: [
      { value: 1, unit: "100g", price: 135 },
      { value: 3, unit: "300g", price: 390 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-020",
    name: "Trail Mix (Fruits & Nuts)",
    brand: "AmarHealth",
    category: "food",
    subcategory: "healthy_snacks",
    description: "A vibrant mix of dried fruits, cranberries, pumpkin seeds, and walnuts. High in fiber and iron. Perfect post-workout snack or an afternoon energy booster. Lightly salted and no added sugar.",
    price: 199,
    health_score: 9.0,
    image_urls: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400"],
    health_impact_summary: "Energy-boosting mix of nuts and fruits rich in fiber and natural antioxidants",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 90,
    ingredients: ["Walnuts", "Dried cranberries", "Pumpkin seeds", "Raisins", "Almonds"],
    allergens: ["Tree nuts"],
    nutritional_info: {
      calories_per_100g: 462,
      protein: "12g",
      fiber: "8g",
      iron: "3.2mg"
    },
    quantity_options: [
      { value: 1, unit: "150g", price: 199 },
      { value: 2, unit: "300g", price: 380 }
    ],
    warnings: ["Contains tree nuts"],
    status: "active",
    workflow_status: "published"
  },

  // Health Supplements Category
  {
    id: "prod-021",
    name: "Multivitamin Tablets",
    brand: "AmarHealth",
    category: "food",
    subcategory: "health_supplements",
    description: "A full-spectrum multivitamin with Vitamin A to Zinc. Supports immunity, metabolism, and cellular repair. Suitable for adults of all ages. Tested for purity and backed by scientific formulation.",
    price: 499,
    health_score: 9.2,
    image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"],
    health_impact_summary: "Complete vitamin and mineral support for immunity and overall health",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 120,
    ingredients: ["Vitamin A", "Vitamin C", "Vitamin D3", "B-Complex", "Zinc", "Iron", "Magnesium"],
    allergens: [],
    nutritional_info: {
      vitamin_c: "90mg",
      vitamin_d3: "400IU",
      zinc: "15mg",
      iron: "18mg"
    },
    quantity_options: [
      { value: 30, unit: "30 tablets", price: 499 },
      { value: 60, unit: "60 tablets", price: 899 }
    ],
    warnings: ["Consult doctor before use if pregnant"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-022",
    name: "Whey Protein Isolate",
    brand: "AmarHealth",
    category: "food",
    subcategory: "health_supplements",
    description: "Pure whey isolate with 27g protein per scoop. Zero sugar, low carb, and fast absorption makes it ideal for post-workout muscle recovery. Certified for purity and lab-tested for contaminants.",
    price: 1899,
    health_score: 9.4,
    image_urls: ["https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400"],
    health_impact_summary: "Fast-absorbing protein isolate for muscle recovery and lean mass building",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 45,
    ingredients: ["Whey protein isolate", "Natural flavoring", "Stevia"],
    allergens: ["Milk"],
    nutritional_info: {
      protein_per_scoop: "27g",
      calories_per_scoop: 110,
      carbs: "1g",
      fat: "0.5g"
    },
    quantity_options: [
      { value: 1, unit: "1kg", price: 1899 },
      { value: 2, unit: "2kg", price: 3600 }
    ],
    warnings: ["Contains dairy"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-023",
    name: "Omega-3 Fish Oil Capsules",
    brand: "AmarHealth",
    category: "food",
    subcategory: "health_supplements",
    description: "Sourced from deep-sea fish and refined to eliminate mercury. Supports heart, joint, and brain health. Enteric-coated to prevent fishy aftertaste.",
    price: 599,
    health_score: 9.3,
    image_urls: ["https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400"],
    health_impact_summary: "Pure fish oil with EPA and DHA for heart, brain, and joint health",
    is_organic: false,
    is_vegetarian: false,
    is_vegan: false,
    stock_quantity: 80,
    ingredients: ["Fish oil", "EPA", "DHA", "Vitamin E"],
    allergens: ["Fish"],
    nutritional_info: {
      omega_3: "1000mg",
      epa: "300mg",
      dha: "200mg",
      vitamin_e: "10IU"
    },
    quantity_options: [
      { value: 60, unit: "60 capsules", price: 599 },
      { value: 120, unit: "120 capsules", price: 1099 }
    ],
    warnings: ["Contains fish", "Consult doctor if on blood thinners"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-024",
    name: "Apple Cider Vinegar Gummies",
    brand: "AmarHealth",
    category: "food",
    subcategory: "health_supplements",
    description: "All the benefits of ACV without the harsh taste. These gummies support digestion, detox, and weight loss. Non-GMO, gluten-free, and enriched with B12.",
    price: 449,
    health_score: 9.0,
    image_urls: ["https://images.unsplash.com/photo-1576402794548-1d6d8ac8e8c1?w=400"],
    health_impact_summary: "Apple cider vinegar in gummy form for digestive health and metabolism support",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 100,
    ingredients: ["Apple cider vinegar", "Pectin", "Vitamin B12", "Natural fruit flavors"],
    allergens: [],
    nutritional_info: {
      acv_per_gummy: "500mg",
      vitamin_b12: "1.2mcg",
      calories_per_gummy: 15
    },
    quantity_options: [
      { value: 30, unit: "30 gummies", price: 449 },
      { value: 60, unit: "60 gummies", price: 849 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-025",
    name: "Biotin for Hair & Skin",
    brand: "AmarHealth",
    category: "food",
    subcategory: "health_supplements",
    description: "High potency biotin (10,000 mcg) with added collagen. Helps reduce hair fall, improve nail strength, and boost skin health. Ideal for daily use.",
    price: 399,
    health_score: 9.1,
    image_urls: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"],
    health_impact_summary: "High-potency biotin with collagen for hair, skin, and nail health",
    is_organic: false,
    is_vegetarian: true,
    is_vegan: false,
    stock_quantity: 90,
    ingredients: ["Biotin", "Hydrolyzed collagen", "Vitamin C", "Zinc"],
    allergens: [],
    nutritional_info: {
      biotin: "10000mcg",
      collagen: "500mg",
      vitamin_c: "60mg",
      zinc: "8mg"
    },
    quantity_options: [
      { value: 60, unit: "60 tablets", price: 399 },
      { value: 120, unit: "120 tablets", price: 749 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },

  // Special Collections Category
  {
    id: "prod-026",
    name: "Organic Cold-Pressed Mustard Oil",
    brand: "AmarHealth",
    category: "food",
    subcategory: "special_collections",
    description: "Cold pressed, chemical-free oil for heart health and immunity. Traditional Indian cooking oil with antimicrobial properties and high omega-3 content. Perfect for cooking and massage.",
    price: 249,
    health_score: 9.5,
    image_urls: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    health_impact_summary: "Traditional cold-pressed oil with antimicrobial properties and heart health benefits",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 65,
    ingredients: ["Cold-pressed mustard oil"],
    allergens: ["Mustard"],
    nutritional_info: {
      calories_per_100ml: 884,
      omega_3: "5.9g",
      vitamin_e: "19.1mg"
    },
    quantity_options: [
      { value: 1, unit: "500ml", price: 249 },
      { value: 2, unit: "1L", price: 480 }
    ],
    warnings: ["Contains mustard"],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-027",
    name: "Vegan Protein Blend (Plant-Based)",
    brand: "AmarHealth",
    category: "food",
    subcategory: "special_collections",
    description: "Pea, brown rice, and hemp protein. Ideal for vegans and lactose-intolerant users. Complete amino acid profile with natural flavoring and no artificial additives.",
    price: 1299,
    health_score: 9.2,
    image_urls: ["https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400"],
    health_impact_summary: "Complete plant-based protein with all essential amino acids for vegan nutrition",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 55,
    ingredients: ["Pea protein", "Brown rice protein", "Hemp protein", "Natural vanilla"],
    allergens: [],
    nutritional_info: {
      protein_per_scoop: "24g",
      calories_per_scoop: 120,
      amino_acids: "Complete profile"
    },
    quantity_options: [
      { value: 1, unit: "750g", price: 1299 },
      { value: 2, unit: "1.5kg", price: 2499 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  },
  {
    id: "prod-028",
    name: "Premium Extra Virgin Olive Oil",
    brand: "AmarHealth",
    category: "food",
    subcategory: "special_collections",
    description: "Imported from Spain. Rich in polyphenols and antioxidants. First cold-pressed from hand-picked olives. Perfect for salads, cooking, and Mediterranean cuisine.",
    price: 999,
    health_score: 9.6,
    image_urls: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    health_impact_summary: "Premium Spanish olive oil rich in antioxidants and polyphenols for heart health",
    is_organic: true,
    is_vegetarian: true,
    is_vegan: true,
    stock_quantity: 40,
    ingredients: ["Extra virgin olive oil"],
    allergens: [],
    nutritional_info: {
      calories_per_100ml: 884,
      polyphenols: "250mg/kg",
      vitamin_e: "14mg",
      oleic_acid: "73%"
    },
    quantity_options: [
      { value: 1, unit: "1L", price: 999 },
      { value: 2, unit: "2L", price: 1899 }
    ],
    warnings: [],
    status: "active",
    workflow_status: "published"
  }
];
