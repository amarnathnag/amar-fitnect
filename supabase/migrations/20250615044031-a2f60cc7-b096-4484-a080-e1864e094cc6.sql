
-- Insert Dairy & Alternatives products
INSERT INTO products (
  id, name, brand, category, subcategory, description, price, health_score, 
  image_urls, health_impact_summary, is_organic, is_vegetarian, is_vegan, 
  stock_quantity, status, workflow_status
) VALUES 
(
  gen_random_uuid(), 'Organic Milk', 'AmarHealth', 'food', 'dairy',
  'Organic Milk is free from harmful antibiotics and synthetic hormones. Sourced from grass-fed cows, it is rich in calcium, protein, and Omega-3 fatty acids. Suitable for children, adults, and seniors, organic milk supports strong bones and immune health.',
  75, 92, ARRAY['/placeholder.svg'], 
  'Rich in calcium, protein, and Omega-3 fatty acids. Supports strong bones and immune health.',
  true, true, false, 50, 'active', 'published'
),
(
  gen_random_uuid(), 'Almond Milk (Unsweetened)', 'AmarHealth', 'food', 'dairy',
  'Almond Milk is a low-calorie, lactose-free alternative made from finely ground almonds. It contains Vitamin E, antioxidants, and healthy fats. Ideal for vegans and lactose-intolerant individuals.',
  130, 87, ARRAY['/placeholder.svg'],
  'Low-calorie, lactose-free alternative with Vitamin E and antioxidants.',
  false, true, true, 30, 'active', 'published'
),
(
  gen_random_uuid(), 'Greek Yogurt (Plain)', 'AmarHealth', 'food', 'dairy',
  'Greek Yogurt is a thick, creamy, high-protein dairy product with probiotics that support gut health. Beneficial for digestion, immunity, and muscle recovery.',
  55, 90, ARRAY['/placeholder.svg'],
  'High-protein dairy with probiotics supporting gut health and muscle recovery.',
  false, true, false, 40, 'active', 'published'
),
(
  gen_random_uuid(), 'Coconut Milk', 'AmarHealth', 'food', 'dairy',
  'Extracted from coconut flesh, coconut milk is dairy-free and high in medium-chain triglycerides (MCTs). These fats boost metabolism and energy.',
  95, 84, ARRAY['/placeholder.svg'],
  'Dairy-free with MCTs that boost metabolism and energy.',
  false, true, true, 25, 'active', 'published'
),
(
  gen_random_uuid(), 'Soy Milk (Fortified)', 'AmarHealth', 'food', 'dairy',
  'Soy milk is rich in protein and fortified with calcium and vitamins D & B12. Popular plant-based option beneficial for muscle maintenance and heart health.',
  90, 89, ARRAY['/placeholder.svg'],
  'Rich in protein, fortified with calcium and vitamins. Supports muscle maintenance.',
  false, true, true, 35, 'active', 'published'
),
(
  gen_random_uuid(), 'A2 Desi Cow Milk', 'AmarHealth', 'food', 'dairy',
  'A2 milk contains only the A2 beta-casein protein which is easier to digest and less likely to cause inflammation. Recommended for children and seniors.',
  95, 95, ARRAY['/placeholder.svg'],
  'Contains A2 beta-casein protein, easier to digest and more natural.',
  true, true, false, 20, 'active', 'published'
),
(
  gen_random_uuid(), 'Plant-Based Cheese (Cashew)', 'AmarHealth', 'food', 'dairy',
  'Dairy-free cheese alternative made from cashew nuts, rich in healthy fats and minerals. Lactose-free and suitable for vegan diets.',
  250, 82, ARRAY['/placeholder.svg'],
  'Dairy-free cheese rich in healthy fats and minerals.',
  false, true, true, 15, 'active', 'published'
),
(
  gen_random_uuid(), 'Buttermilk (Masala)', 'AmarHealth', 'food', 'dairy',
  'Traditional probiotic-rich Indian beverage that aids digestion, reduces acidity, and is naturally hydrating. Masala flavors enhance taste without added sugar.',
  20, 88, ARRAY['/placeholder.svg'],
  'Probiotic-rich beverage that aids digestion and reduces acidity.',
  false, true, false, 60, 'active', 'published'
),
(
  gen_random_uuid(), 'Flavored Yogurt (Low-Fat Mango)', 'AmarHealth', 'food', 'dairy',
  'Dessert-style yogurt with fruit puree and active cultures, offering a blend of sweetness, nutrition, and digestive benefits.',
  30, 80, ARRAY['/placeholder.svg'],
  'Dessert-style yogurt with active cultures and digestive benefits.',
  false, true, false, 45, 'active', 'published'
),
(
  gen_random_uuid(), 'Vegan Curd (Almond Base)', 'AmarHealth', 'food', 'dairy',
  'Made from fermented almond milk, this vegan curd contains probiotics and is ideal for those avoiding dairy. Light, tangy, and easy on the gut.',
  60, 85, ARRAY['/placeholder.svg'],
  'Fermented almond milk curd with probiotics, light and easy to digest.',
  false, true, true, 25, 'active', 'published'
);

-- Insert Bakery & Breads products
INSERT INTO products (
  id, name, brand, category, subcategory, description, price, health_score, 
  image_urls, health_impact_summary, is_organic, is_vegetarian, is_vegan, 
  stock_quantity, status, workflow_status
) VALUES 
(
  gen_random_uuid(), 'Whole Wheat Bread', 'AmarHealth', 'food', 'bakery',
  'Whole wheat bread made from 100% whole grains, retaining fiber and essential nutrients. Supports heart health, digestion, and stable blood sugar.',
  45, 89, ARRAY['/placeholder.svg'],
  'Made from whole grains, supports heart health and stable blood sugar.',
  false, true, true, 40, 'active', 'published'
),
(
  gen_random_uuid(), 'Multigrain Cookies', 'AmarHealth', 'food', 'bakery',
  'Packed with oats, flax seeds, and millet, these cookies are rich in fiber and micronutrients. A guilt-free snacking choice.',
  60, 84, ARRAY['/placeholder.svg'],
  'Rich in fiber and micronutrients from oats, flax seeds, and millet.',
  false, true, true, 30, 'active', 'published'
),
(
  gen_random_uuid(), 'Sourdough Bread', 'AmarHealth', 'food', 'bakery',
  'Naturally fermented sourdough is low in gluten and contains probiotics. Supports gut health and is easier to digest than conventional bread.',
  100, 91, ARRAY['/placeholder.svg'],
  'Naturally fermented with probiotics, supports gut health.',
  false, true, true, 25, 'active', 'published'
),
(
  gen_random_uuid(), 'Ragi Cookies', 'AmarHealth', 'food', 'bakery',
  'Ragi or finger millet cookies are calcium-rich and great for bone health. Especially beneficial for growing children and post-menopausal women.',
  50, 86, ARRAY['/placeholder.svg'],
  'Calcium-rich finger millet cookies supporting bone health.',
  false, true, true, 35, 'active', 'published'
),
(
  gen_random_uuid(), 'Gluten-Free Bread', 'AmarHealth', 'food', 'bakery',
  'Ideal for people with gluten intolerance or celiac disease, made from rice and almond flour. Healthy alternative to wheat-based bread.',
  120, 83, ARRAY['/placeholder.svg'],
  'Gluten-free alternative made from rice and almond flour.',
  false, true, true, 20, 'active', 'published'
),
(
  gen_random_uuid(), 'Oats & Raisin Muffins', 'AmarHealth', 'food', 'bakery',
  'Soft muffins packed with oats and raisins provide sustained energy and natural sweetness. Low in refined sugars and high in fiber.',
  90, 80, ARRAY['/placeholder.svg'],
  'Provides sustained energy with natural sweetness and high fiber.',
  false, true, true, 25, 'active', 'published'
),
(
  gen_random_uuid(), 'Millet Bread', 'AmarHealth', 'food', 'bakery',
  'Made from nutrient-rich millets like bajra and jowar, this bread is gluten-free and rich in iron, fiber, and protein.',
  95, 87, ARRAY['/placeholder.svg'],
  'Gluten-free bread rich in iron, fiber, and protein from millets.',
  false, true, true, 20, 'active', 'published'
),
(
  gen_random_uuid(), 'Brown Bread with Seeds', 'AmarHealth', 'food', 'bakery',
  'Brown bread infused with sunflower, flax, and pumpkin seeds offers healthy fats and protein. Supports heart and brain health.',
  55, 90, ARRAY['/placeholder.svg'],
  'Infused with seeds providing healthy fats for heart and brain health.',
  false, true, true, 30, 'active', 'published'
),
(
  gen_random_uuid(), 'Sugar-Free Banana Bread', 'AmarHealth', 'food', 'bakery',
  'Made with ripe bananas and whole grains, this moist bread is free from refined sugar and makes a great snack or breakfast item.',
  75, 82, ARRAY['/placeholder.svg'],
  'Refined sugar-free bread made with ripe bananas and whole grains.',
  false, true, true, 20, 'active', 'published'
),
(
  gen_random_uuid(), 'Vegan Croissant', 'AmarHealth', 'food', 'bakery',
  'Flaky and dairy-free croissant made with plant-based butter. Caters to vegan diets without compromising on taste.',
  85, 81, ARRAY['/placeholder.svg'],
  'Dairy-free croissant made with plant-based butter.',
  false, true, true, 15, 'active', 'published'
);

-- Insert Healthy Oils products
INSERT INTO products (
  id, name, brand, category, subcategory, description, price, health_score, 
  image_urls, health_impact_summary, is_organic, is_vegetarian, is_vegan, 
  stock_quantity, status, workflow_status
) VALUES 
(
  gen_random_uuid(), 'Extra Virgin Olive Oil', 'AmarHealth', 'food', 'oils',
  'High in monounsaturated fats and antioxidants, olive oil is heart-friendly and anti-inflammatory. Ideal for salad dressings and light sautéing.',
  550, 95, ARRAY['/placeholder.svg'],
  'Heart-friendly oil high in monounsaturated fats and antioxidants.',
  true, true, true, 25, 'active', 'published'
),
(
  gen_random_uuid(), 'Cold-Pressed Coconut Oil', 'AmarHealth', 'food', 'oils',
  'Retains natural aroma and nutrients. Excellent for cooking, hair, and skin. A staple in Indian households for its versatility.',
  330, 90, ARRAY['/placeholder.svg'],
  'Retains natural nutrients, excellent for cooking and personal care.',
  true, true, true, 30, 'active', 'published'
),
(
  gen_random_uuid(), 'Avocado Oil', 'AmarHealth', 'food', 'oils',
  'Rich in oleic acid and Vitamin E, supports heart health and reduces cholesterol. High smoke point makes it good for grilling and frying.',
  750, 92, ARRAY['/placeholder.svg'],
  'Rich in oleic acid and Vitamin E, supports heart health.',
  false, true, true, 15, 'active', 'published'
),
(
  gen_random_uuid(), 'Flaxseed Oil', 'AmarHealth', 'food', 'oils',
  'Rich source of plant-based Omega-3. Improves brain function and hormonal balance, especially beneficial for vegetarians.',
  299, 91, ARRAY['/placeholder.svg'],
  'Plant-based Omega-3 source improving brain function and hormonal balance.',
  false, true, true, 20, 'active', 'published'
),
(
  gen_random_uuid(), 'Sesame Oil (Til Oil)', 'AmarHealth', 'food', 'oils',
  'High in antioxidants, sesame oil supports joint flexibility, heart health, and detox. Used in Asian cooking and Ayurvedic therapies.',
  280, 88, ARRAY['/placeholder.svg'],
  'High in antioxidants, supports joint flexibility and heart health.',
  false, true, true, 25, 'active', 'published'
),
(
  gen_random_uuid(), 'Mustard Oil (Kachi Ghani)', 'AmarHealth', 'food', 'oils',
  'Traditional Indian oil rich in Omega-3, supports immunity and heart function. Known for strong flavor and antimicrobial properties.',
  190, 87, ARRAY['/placeholder.svg'],
  'Rich in Omega-3, supports immunity with antimicrobial properties.',
  false, true, true, 40, 'active', 'published'
),
(
  gen_random_uuid(), 'Rice Bran Oil', 'AmarHealth', 'food', 'oils',
  'Contains oryzanol and is great for cholesterol control. A good alternative for deep frying.',
  210, 85, ARRAY['/placeholder.svg'],
  'Contains oryzanol, excellent for cholesterol control.',
  false, true, true, 35, 'active', 'published'
),
(
  gen_random_uuid(), 'Groundnut Oil', 'AmarHealth', 'food', 'oils',
  'Popular in Indian kitchens, contains healthy fats and Vitamin E. Suitable for deep frying and daily cooking.',
  200, 84, ARRAY['/placeholder.svg'],
  'Contains healthy fats and Vitamin E, suitable for daily cooking.',
  false, true, true, 45, 'active', 'published'
),
(
  gen_random_uuid(), 'Hemp Seed Oil', 'AmarHealth', 'food', 'oils',
  'Loaded with Omega-6 and Omega-3, improves skin health, reduces inflammation, and is great for brain function.',
  950, 93, ARRAY['/placeholder.svg'],
  'Rich in Omega fatty acids, improves skin health and brain function.',
  false, true, true, 10, 'active', 'published'
),
(
  gen_random_uuid(), 'Walnut Oil', 'AmarHealth', 'food', 'oils',
  'Known for its nutty flavor and high antioxidant content, this oil supports heart health and cognitive functions.',
  799, 90, ARRAY['/placeholder.svg'],
  'High in antioxidants, supports heart health and cognitive functions.',
  false, true, true, 12, 'active', 'published'
);
