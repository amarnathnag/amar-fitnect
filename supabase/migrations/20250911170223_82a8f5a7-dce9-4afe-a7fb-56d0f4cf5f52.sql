-- Add comprehensive healthy products using existing enum values
INSERT INTO products (
    name, brand, category, subcategory, description, price, health_score, 
    is_organic, is_vegetarian, is_vegan, nutritional_info, ingredients,
    image_urls, status, stock_quantity
) VALUES

-- Fruits & Vegetables (using 'grocery' category)
('Organic Spinach', 'FreshGreens', 'grocery', 'leafy-greens', 'Fresh organic spinach leaves packed with iron and vitamins', 45.00, 10, true, true, true, 
'{"calories": 23, "protein": "2.9g", "fiber": "2.2g", "iron": "2.7mg", "vitamin_k": "483mcg"}', 
'["organic spinach leaves"]',
'["https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400"]', 'active', 50),

('Fresh Avocado', 'NatureFresh', 'grocery', 'fruits', 'Creamy avocados rich in healthy fats and fiber', 120.00, 9, true, true, true,
'{"calories": 160, "protein": "2g", "fiber": "10g", "potassium": "485mg", "healthy_fats": "15g"}',
'["fresh avocado"]',
'["https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"]', 'active', 30),

('Organic Tomatoes', 'FarmFresh', 'grocery', 'vegetables', 'Vine-ripened organic tomatoes rich in lycopene', 60.00, 9, true, true, true,
'{"calories": 18, "lycopene": "high", "vitamin_c": "17mg", "potassium": "237mg"}',
'["organic tomatoes"]',
'["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400"]', 'active', 40),

-- Bakery & Dairy 
('Whole Wheat Sourdough', 'HealthyBakes', 'dairy', 'bread', 'Artisan whole wheat sourdough bread with natural probiotics', 85.00, 8, false, true, false,
'{"calories": 120, "protein": "4g", "fiber": "3g", "probiotics": "active cultures"}',
'["whole wheat flour", "sourdough starter", "sea salt", "water"]',
'["https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400"]', 'active', 25),

('Greek Yogurt', 'DairyPure', 'dairy', 'dairy', 'High-protein Greek yogurt with live cultures', 65.00, 9, false, true, false,
'{"calories": 100, "protein": "15g", "probiotics": "10 billion CFU", "calcium": "150mg"}',
'["milk", "live active cultures"]',
'["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"]', 'active', 40),

('Organic Cheese', 'CreamyDelights', 'dairy', 'dairy', 'Aged organic cheddar cheese from grass-fed cows', 350.00, 7, true, true, false,
'{"calories": 113, "protein": "7g", "calcium": "200mg", "vitamin_k2": "present"}',
'["organic milk", "salt", "cultures", "rennet"]',
'["https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"]', 'active', 20),

-- Breakfast Products
('Steel Cut Oats', 'MorningFresh', 'breakfast', 'cereals', 'Nutritious steel-cut oats for a hearty breakfast', 180.00, 9, true, true, true,
'{"calories": 150, "protein": "5g", "fiber": "4g", "beta_glucan": "3g"}',
'["organic steel-cut oats"]',
'["https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400"]', 'active', 35),

('Almond Butter', 'NutriSpread', 'breakfast', 'spreads', 'Pure almond butter with no added sugar or oil', 450.00, 8, true, true, true,
'{"calories": 190, "protein": "7g", "healthy_fats": "18g", "vitamin_e": "7mg"}',
'["100% roasted almonds"]',
'["https://images.unsplash.com/photo-1585217357402-b7ca8e29f611?w=400"]', 'active', 20),

('Quinoa Breakfast Bowl Mix', 'HealthyMornings', 'breakfast', 'cereals', 'Protein-rich quinoa breakfast mix with superfoods', 280.00, 10, true, true, true,
'{"calories": 220, "protein": "8g", "fiber": "5g", "complete_protein": "yes"}',
'["quinoa", "chia seeds", "dried berries", "coconut flakes"]',
'["https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400"]', 'active', 25),

-- Protein Sources
('Free-Range Eggs', 'FarmFresh', 'protein', 'eggs', 'Farm-fresh free-range eggs from happy hens', 120.00, 9, false, true, false,
'{"calories": 70, "protein": "6g", "omega3": "180mg", "vitamin_d": "40IU"}',
'["free-range eggs"]',
'["https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400"]', 'active', 60),

('Wild Salmon Fillet', 'OceanCatch', 'protein', 'fish', 'Fresh wild-caught salmon rich in omega-3', 650.00, 10, false, false, false,
'{"calories": 206, "protein": "22g", "omega3": "1800mg", "vitamin_d": "360IU"}',
'["wild salmon"]',
'["https://images.unsplash.com/photo-1544943910-4ca40dd78e38?w=400"]', 'active', 15),

('Paneer (Cottage Cheese)', 'DairyFresh', 'protein', 'dairy', 'Fresh cottage cheese high in protein and calcium', 180.00, 8, false, true, false,
'{"calories": 265, "protein": "25g", "calcium": "208mg", "phosphorus": "138mg"}',
'["milk", "citric acid"]',
'["https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400"]', 'active', 30),

-- Healthy Oils & Spices
('Cold-Pressed Coconut Oil', 'PureOils', 'oils', 'oils', 'Virgin coconut oil extracted through cold-pressing', 320.00, 8, true, true, true,
'{"mct_content": "60%", "vitamin_e": "natural", "lauric_acid": "45%"}',
'["100% pure coconut oil"]',
'["https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400"]', 'active', 25),

('Organic Turmeric Powder', 'SpiceGarden', 'oils', 'spices', 'Premium organic turmeric with high curcumin content', 85.00, 10, true, true, true,
'{"curcumin_content": "4.5%", "antioxidants": "high"}',
'["organic turmeric root"]',
'["https://images.unsplash.com/photo-1615485925600-97d3abfad2e5?w=400"]', 'active', 40),

('Extra Virgin Olive Oil', 'MediterraneanGold', 'oils', 'oils', 'Cold-pressed extra virgin olive oil from Greece', 580.00, 9, true, true, true,
'{"polyphenols": "high", "vitamin_e": "14mg", "oleic_acid": "73%"}',
'["organic olives"]',
'["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"]', 'active', 20),

-- Grains & Cereals
('Organic Quinoa', 'SuperGrains', 'grains', 'grains', 'Complete protein quinoa grain from Bolivia', 420.00, 10, true, true, true,
'{"calories": 222, "protein": "8g", "fiber": "5g", "complete_protein": "yes"}',
'["organic quinoa"]',
'["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"]', 'active', 30),

('Brown Basmati Rice', 'GrainMaster', 'grains', 'rice', 'Aged brown basmati rice with low glycemic index', 180.00, 8, false, true, true,
'{"calories": 216, "protein": "5g", "fiber": "4g", "glycemic_index": "low"}',
'["brown basmati rice"]',
'["https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73?w=400"]', 'active', 50),

('Whole Wheat Flour', 'MillFresh', 'grains', 'flour', 'Stone-ground whole wheat flour with bran and germ', 95.00, 8, true, true, true,
'{"calories": 340, "protein": "13g", "fiber": "11g", "iron": "3.9mg"}',
'["organic whole wheat"]',
'["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"]', 'active', 45),

-- Healthy Snacks
('Baked Multigrain Chips', 'HealthySnacks', 'healthy_snacks', 'chips', 'Baked chips made from mixed grains and seeds', 85.00, 7, false, true, true,
'{"calories": 130, "protein": "3g", "fiber": "3g", "trans_fat": "0g"}',
'["whole wheat", "oats", "quinoa", "sunflower oil", "sea salt"]',
'["https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400"]', 'active', 45),

('Protein Energy Balls', 'FitBites', 'healthy_snacks', 'energy-bars', 'Date and nut energy balls with plant protein', 150.00, 9, true, true, true,
'{"calories": 120, "protein": "5g", "fiber": "3g", "natural_sugars": "8g"}',
'["dates", "almonds", "cashews", "hemp seeds", "coconut"]',
'["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400"]', 'active', 35),

('Dark Chocolate (85%)', 'CocoaPure', 'healthy_snacks', 'chocolate', 'Premium dark chocolate with high cocoa content', 250.00, 8, true, true, true,
'{"calories": 170, "antioxidants": "high", "flavonoids": "rich", "cocoa": "85%"}',
'["organic cocoa", "cocoa butter", "coconut sugar"]',
'["https://images.unsplash.com/photo-1511381939415-e44015466834?w=400"]', 'active', 30),

-- Beverages 
('Green Tea Blend', 'TeaGarden', 'grocery', 'tea', 'Antioxidant-rich green tea with natural herbs', 120.00, 9, true, true, true,
'{"antioxidants": "high", "caffeine": "25mg", "polyphenols": "rich"}',
'["organic green tea", "tulsi", "ginger", "lemongrass"]',
'["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"]', 'active', 40),

('Cold-Pressed Juice', 'FreshPress', 'grocery', 'juices', 'Fresh cold-pressed vegetable and fruit juice', 180.00, 8, true, true, true,
'{"calories": 80, "vitamin_c": "120mg", "fiber": "2g", "no_added_sugar": "yes"}',
'["kale", "spinach", "apple", "ginger", "lemon"]',
'["https://images.unsplash.com/photo-1553530979-67ca22972d1b?w=400"]', 'active', 25),

-- Health Supplements
('Vitamin D3 Supplement', 'HealthPlus', 'health_supplements', 'vitamins', 'High-potency Vitamin D3 for bone health', 450.00, 9, false, true, true,
'{"vitamin_d3": "2000IU", "bioavailability": "high"}',
'["vitamin d3", "coconut oil", "vegetarian capsule"]',
'["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"]', 'active', 30),

('Probiotics Complex', 'GutHealth', 'health_supplements', 'probiotics', 'Multi-strain probiotic for digestive health', 650.00, 10, false, true, true,
'{"cfu_count": "50 billion", "strains": "12", "shelf_stable": "yes"}',
'["lactobacillus", "bifidobacterium", "prebiotic fiber"]',
'["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"]', 'active', 20),

('Omega-3 Fish Oil', 'PureNutrition', 'health_supplements', 'supplements', 'High-quality omega-3 from wild-caught fish', 580.00, 9, false, false, false,
'{"epa": "360mg", "dha": "240mg", "purity": "molecular distilled"}',
'["fish oil", "natural vitamin e", "gelatin capsule"]',
'["https://images.unsplash.com/photo-1550572017-edd951aa8ca5?w=400"]', 'active', 25),

-- Premium Products
('Truffle Honey', 'GourmetDelights', 'premium', 'gourmet', 'Rare truffle-infused wildflower honey', 1200.00, 7, true, true, true,
'{"antioxidants": "natural", "minerals": "trace amounts"}',
'["wildflower honey", "black truffle extract"]',
'["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"]', 'active', 10),

('Himalayan Pink Salt', 'MountainPure', 'premium', 'gourmet', 'Hand-mined pink salt from Himalayan mountains', 180.00, 8, true, true, true,
'{"minerals": "84 trace minerals", "sodium": "98%"}',
'["himalayan pink salt"]',
'["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]', 'active', 35);