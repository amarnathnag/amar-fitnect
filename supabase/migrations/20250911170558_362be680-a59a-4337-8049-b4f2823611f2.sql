-- Add comprehensive healthy products using correct array syntax
INSERT INTO products (
    name, brand, category, subcategory, description, price, health_score, 
    is_organic, is_vegetarian, is_vegan, nutritional_info, ingredients,
    image_urls, status, stock_quantity
) VALUES

-- Food category products for various marketplace categories
('Organic Spinach', 'FreshGreens', 'food', 'leafy-greens', 'Fresh organic spinach leaves packed with iron and vitamins', 45.00, 10, true, true, true, 
'{"calories": 23, "protein": "2.9g", "fiber": "2.2g", "iron": "2.7mg", "vitamin_k": "483mcg"}', 
'["organic spinach leaves"]',
ARRAY['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'], 'active', 50),

('Fresh Avocado', 'NatureFresh', 'food', 'fruits', 'Creamy avocados rich in healthy fats and fiber', 120.00, 9, true, true, true,
'{"calories": 160, "protein": "2g", "fiber": "10g", "potassium": "485mg", "healthy_fats": "15g"}',
'["fresh avocado"]',
ARRAY['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400'], 'active', 30),

('Organic Tomatoes', 'FarmFresh', 'food', 'vegetables', 'Vine-ripened organic tomatoes rich in lycopene', 60.00, 9, true, true, true,
'{"calories": 18, "lycopene": "high", "vitamin_c": "17mg", "potassium": "237mg"}',
'["organic tomatoes"]',
ARRAY['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'], 'active', 40),

('Whole Wheat Sourdough', 'HealthyBakes', 'food', 'bread', 'Artisan whole wheat sourdough bread with natural probiotics', 85.00, 8, false, true, false,
'{"calories": 120, "protein": "4g", "fiber": "3g", "probiotics": "active cultures"}',
'["whole wheat flour", "sourdough starter", "sea salt", "water"]',
ARRAY['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400'], 'active', 25),

('Greek Yogurt', 'DairyPure', 'food', 'dairy', 'High-protein Greek yogurt with live cultures', 65.00, 9, false, true, false,
'{"calories": 100, "protein": "15g", "probiotics": "10 billion CFU", "calcium": "150mg"}',
'["milk", "live active cultures"]',
ARRAY['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'], 'active', 40),

('Steel Cut Oats', 'MorningFresh', 'food', 'cereals', 'Nutritious steel-cut oats for a hearty breakfast', 180.00, 9, true, true, true,
'{"calories": 150, "protein": "5g", "fiber": "4g", "beta_glucan": "3g"}',
'["organic steel-cut oats"]',
ARRAY['https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400'], 'active', 35),

('Almond Butter', 'NutriSpread', 'food', 'spreads', 'Pure almond butter with no added sugar or oil', 450.00, 8, true, true, true,
'{"calories": 190, "protein": "7g", "healthy_fats": "18g", "vitamin_e": "7mg"}',
'["100% roasted almonds"]',
ARRAY['https://images.unsplash.com/photo-1585217357402-b7ca8e29f611?w=400'], 'active', 20),

('Free-Range Eggs', 'FarmFresh', 'food', 'eggs', 'Farm-fresh free-range eggs from happy hens', 120.00, 9, false, true, false,
'{"calories": 70, "protein": "6g", "omega3": "180mg", "vitamin_d": "40IU"}',
'["free-range eggs"]',
ARRAY['https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400'], 'active', 60),

('Wild Salmon Fillet', 'OceanCatch', 'food', 'fish', 'Fresh wild-caught salmon rich in omega-3', 650.00, 10, false, false, false,
'{"calories": 206, "protein": "22g", "omega3": "1800mg", "vitamin_d": "360IU"}',
'["wild salmon"]',
ARRAY['https://images.unsplash.com/photo-1544943910-4ca40dd78e38?w=400'], 'active', 15),

('Cold-Pressed Coconut Oil', 'PureOils', 'food', 'oils', 'Virgin coconut oil extracted through cold-pressing', 320.00, 8, true, true, true,
'{"mct_content": "60%", "vitamin_e": "natural", "lauric_acid": "45%"}',
'["100% pure coconut oil"]',
ARRAY['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400'], 'active', 25),

('Organic Turmeric Powder', 'SpiceGarden', 'food', 'spices', 'Premium organic turmeric with high curcumin content', 85.00, 10, true, true, true,
'{"curcumin_content": "4.5%", "antioxidants": "high"}',
'["organic turmeric root"]',
ARRAY['https://images.unsplash.com/photo-1615485925600-97d3abfad2e5?w=400'], 'active', 40),

('Organic Quinoa', 'SuperGrains', 'food', 'grains', 'Complete protein quinoa grain from Bolivia', 420.00, 10, true, true, true,
'{"calories": 222, "protein": "8g", "fiber": "5g", "complete_protein": "yes"}',
'["organic quinoa"]',
ARRAY['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'], 'active', 30),

('Brown Basmati Rice', 'GrainMaster', 'food', 'rice', 'Aged brown basmati rice with low glycemic index', 180.00, 8, false, true, true,
'{"calories": 216, "protein": "5g", "fiber": "4g", "glycemic_index": "low"}',
'["brown basmati rice"]',
ARRAY['https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73?w=400'], 'active', 50),

('Baked Multigrain Chips', 'HealthySnacks', 'food', 'chips', 'Baked chips made from mixed grains and seeds', 85.00, 7, false, true, true,
'{"calories": 130, "protein": "3g", "fiber": "3g", "trans_fat": "0g"}',
'["whole wheat", "oats", "quinoa", "sunflower oil", "sea salt"]',
ARRAY['https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400'], 'active', 45),

('Dark Chocolate (85%)', 'CocoaPure', 'food', 'chocolate', 'Premium dark chocolate with high cocoa content', 250.00, 8, true, true, true,
'{"calories": 170, "antioxidants": "high", "flavonoids": "rich", "cocoa": "85%"}',
'["organic cocoa", "cocoa butter", "coconut sugar"]',
ARRAY['https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'], 'active', 30),

('Green Tea Blend', 'TeaGarden', 'food', 'tea', 'Antioxidant-rich green tea with natural herbs', 120.00, 9, true, true, true,
'{"antioxidants": "high", "caffeine": "25mg", "polyphenols": "rich"}',
'["organic green tea", "tulsi", "ginger", "lemongrass"]',
ARRAY['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400'], 'active', 40),

('Cold-Pressed Juice', 'FreshPress', 'food', 'juices', 'Fresh cold-pressed vegetable and fruit juice', 180.00, 8, true, true, true,
'{"calories": 80, "vitamin_c": "120mg", "fiber": "2g", "no_added_sugar": "yes"}',
'["kale", "spinach", "apple", "ginger", "lemon"]',
ARRAY['https://images.unsplash.com/photo-1553530979-67ca22972d1b?w=400'], 'active', 25),

-- Supplement category products
('Vitamin D3 Supplement', 'HealthPlus', 'supplements', 'vitamins', 'High-potency Vitamin D3 for bone health', 450.00, 9, false, true, true,
'{"vitamin_d3": "2000IU", "bioavailability": "high"}',
'["vitamin d3", "coconut oil", "vegetarian capsule"]',
ARRAY['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'], 'active', 30),

('Probiotics Complex', 'GutHealth', 'supplements', 'probiotics', 'Multi-strain probiotic for digestive health', 650.00, 10, false, true, true,
'{"cfu_count": "50 billion", "strains": "12", "shelf_stable": "yes"}',
'["lactobacillus", "bifidobacterium", "prebiotic fiber"]',
ARRAY['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400'], 'active', 20),

('Omega-3 Fish Oil', 'PureNutrition', 'supplements', 'supplements', 'High-quality omega-3 from wild-caught fish', 580.00, 9, false, false, false,
'{"epa": "360mg", "dha": "240mg", "purity": "molecular distilled"}',
'["fish oil", "natural vitamin e", "gelatin capsule"]',
ARRAY['https://images.unsplash.com/photo-1550572017-edd951aa8ca5?w=400'], 'active', 25),

('Whey Protein Powder', 'FitNutrition', 'supplements', 'protein', 'Grass-fed whey protein isolate', 2500.00, 8, false, true, false,
'{"protein": "25g per serving", "bcaa": "rich", "lactose": "minimal"}',
'["whey protein isolate", "natural flavors", "stevia"]',
ARRAY['https://images.unsplash.com/photo-1544737151-6e4b6999de79?w=400'], 'active', 15),

-- Wellness category products  
('Herbal Face Mask', 'NaturalGlow', 'wellness', 'skincare', 'Organic clay face mask with herbs', 180.00, 8, true, true, true,
'{"clay": "bentonite", "herbs": "natural", "no_chemicals": "yes"}',
'["bentonite clay", "turmeric", "neem", "rose water"]',
ARRAY['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'], 'active', 35),

('Essential Oil Blend', 'AromaTherapy', 'wellness', 'aromatherapy', 'Relaxing essential oil blend for stress relief', 450.00, 7, true, true, true,
'{"pure": "100%", "therapeutic_grade": "yes"}',
'["lavender oil", "chamomile oil", "bergamot oil"]',
ARRAY['https://images.unsplash.com/photo-1602000853968-3a58699dc04b?w=400'], 'active', 20),

-- Fitness gear category products
('Yoga Mat', 'FitLife', 'fitness_gear', 'yoga', 'Non-slip eco-friendly yoga mat', 1200.00, 7, false, true, true,
'{"material": "natural rubber", "thickness": "6mm", "eco_friendly": "yes"}',
'["natural rubber", "cork"]',
ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'], 'active', 25),

('Resistance Bands Set', 'HomeFit', 'fitness_gear', 'resistance', 'Professional resistance bands for home workouts', 850.00, 8, false, true, true,
'{"resistance_levels": "5", "material": "latex", "portable": "yes"}',
'["natural latex", "fabric covers", "metal clasps"]',
ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'], 'active', 30);