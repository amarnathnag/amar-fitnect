-- Add comprehensive healthy products for all marketplace categories
-- First, let's add the new categories to the enum if they don't exist
DO $$ 
BEGIN
    -- Add new category values if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'fruits_vegetables' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'fruits_vegetables';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'bakery_dairy' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'bakery_dairy';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'breakfast' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'breakfast';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'meat_fish' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'meat_fish';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'masalas_oils' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'masalas_oils';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'atta_rice_dals' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'atta_rice_dals';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'beverages' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'beverages';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'frozen_foods' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'frozen_foods';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'chocolates_ice_cream' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'chocolates_ice_cream';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gourmet_world_food' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'gourmet_world_food';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'baby_care' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'baby_care';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'mens_grooming' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'mens_grooming';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'bath_body_hair' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'bath_body_hair';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'beauty_cosmetics' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'beauty_cosmetics';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'detergents_cleaning' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'detergents_cleaning';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'kitchen_homeware' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'kitchen_homeware';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'stationery_games' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'stationery_games';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'pet_store' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'product_category')) THEN
        ALTER TYPE product_category ADD VALUE 'pet_store';
    END IF;
END $$;

-- Insert healthy products for each category
INSERT INTO products (
    name, brand, category, subcategory, description, price, health_score, 
    is_organic, is_vegetarian, is_vegan, nutritional_info, ingredients,
    image_urls, status, stock_quantity
) VALUES

-- Fruits & Vegetables
('Organic Spinach', 'FreshGreens', 'fruits_vegetables', 'leafy-greens', 'Fresh organic spinach leaves packed with iron and vitamins', 45.00, 10, true, true, true, 
'{"calories": 23, "protein": "2.9g", "fiber": "2.2g", "iron": "2.7mg", "vitamin_k": "483mcg"}', 
'["organic spinach leaves"]',
'["https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400"]', 'active', 50),

('Fresh Avocado', 'NatureFresh', 'fruits_vegetables', 'fruits', 'Creamy avocados rich in healthy fats and fiber', 120.00, 9, true, true, true,
'{"calories": 160, "protein": "2g", "fiber": "10g", "potassium": "485mg", "healthy_fats": "15g"}',
'["fresh avocado"]',
'["https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"]', 'active', 30),

-- Bakery, Cakes & Dairy
('Whole Wheat Sourdough', 'HealthyBakes', 'bakery_dairy', 'bread', 'Artisan whole wheat sourdough bread with natural probiotics', 85.00, 8, false, true, false,
'{"calories": 120, "protein": "4g", "fiber": "3g", "probiotics": "active cultures"}',
'["whole wheat flour", "sourdough starter", "sea salt", "water"]',
'["https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400"]', 'active', 25),

('Greek Yogurt', 'DairyPure', 'bakery_dairy', 'dairy', 'High-protein Greek yogurt with live cultures', 65.00, 9, false, true, false,
'{"calories": 100, "protein": "15g", "probiotics": "10 billion CFU", "calcium": "150mg"}',
'["milk", "live active cultures"]',
'["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"]', 'active', 40),

-- Breakfast & More
('Steel Cut Oats', 'MorningFresh', 'breakfast', 'cereals', 'Nutritious steel-cut oats for a hearty breakfast', 180.00, 9, true, true, true,
'{"calories": 150, "protein": "5g", "fiber": "4g", "beta_glucan": "3g"}',
'["organic steel-cut oats"]',
'["https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400"]', 'active', 35),

('Almond Butter', 'NutriSpread', 'breakfast', 'spreads', 'Pure almond butter with no added sugar or oil', 450.00, 8, true, true, true,
'{"calories": 190, "protein": "7g", "healthy_fats": "18g", "vitamin_e": "7mg"}',
'["100% roasted almonds"]',
'["https://images.unsplash.com/photo-1585217357402-b7ca8e29f611?w=400"]', 'active', 20),

-- Eggs, Meat & Fish
('Free-Range Eggs', 'FarmFresh', 'meat_fish', 'eggs', 'Farm-fresh free-range eggs from happy hens', 120.00, 9, false, true, false,
'{"calories": 70, "protein": "6g", "omega3": "180mg", "vitamin_d": "40IU"}',
'["free-range eggs"]',
'["https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400"]', 'active', 60),

('Wild Salmon Fillet', 'OceanCatch', 'meat_fish', 'fish', 'Fresh wild-caught salmon rich in omega-3', 650.00, 10, false, false, false,
'{"calories": 206, "protein": "22g", "omega3": "1800mg", "vitamin_d": "360IU"}',
'["wild salmon"]',
'["https://images.unsplash.com/photo-1544943910-4ca40dd78e38?w=400"]', 'active', 15),

-- Masalas, Oils & Dry Fruits
('Cold-Pressed Coconut Oil', 'PureOils', 'masalas_oils', 'oils', 'Virgin coconut oil extracted through cold-pressing', 320.00, 8, true, true, true,
'{"mct_content": "60%", "vitamin_e": "natural", "lauric_acid": "45%"}',
'["100% pure coconut oil"]',
'["https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400"]', 'active', 25),

('Organic Turmeric Powder', 'SpiceGarden', 'masalas_oils', 'spices', 'Premium organic turmeric with high curcumin content', 85.00, 10, true, true, true,
'{"curcumin_content": "4.5%", "antioxidants": "high"}',
'["organic turmeric root"]',
'["https://images.unsplash.com/photo-1615485925600-97d3abfad2e5?w=400"]', 'active', 40),

-- Atta, Rice, Dals & Sugar
('Organic Quinoa', 'SuperGrains', 'atta_rice_dals', 'grains', 'Complete protein quinoa grain from Bolivia', 420.00, 10, true, true, true,
'{"calories": 222, "protein": "8g", "fiber": "5g", "complete_protein": "yes"}',
'["organic quinoa"]',
'["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"]', 'active', 30),

('Brown Basmati Rice', 'GrainMaster', 'atta_rice_dals', 'rice', 'Aged brown basmati rice with low glycemic index', 180.00, 8, false, true, true,
'{"calories": 216, "protein": "5g", "fiber": "4g", "glycemic_index": "low"}',
'["brown basmati rice"]',
'["https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73?w=400"]', 'active', 50),

-- Chips, Biscuits & Namkeen
('Baked Multigrain Chips', 'HealthySnacks', 'healthy_snacks', 'chips', 'Baked chips made from mixed grains and seeds', 85.00, 7, false, true, true,
'{"calories": 130, "protein": "3g", "fiber": "3g", "trans_fat": "0g"}',
'["whole wheat", "oats", "quinoa", "sunflower oil", "sea salt"]',
'["https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400"]', 'active', 45),

('Protein Energy Balls', 'FitBites', 'healthy_snacks', 'energy-bars', 'Date and nut energy balls with plant protein', 150.00, 9, true, true, true,
'{"calories": 120, "protein": "5g", "fiber": "3g", "natural_sugars": "8g"}',
'["dates", "almonds", "cashews", "hemp seeds", "coconut"]',
'["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400"]', 'active', 35),

-- Hot & Cold Beverages
('Green Tea Blend', 'TeaGarden', 'beverages', 'tea', 'Antioxidant-rich green tea with natural herbs', 120.00, 9, true, true, true,
'{"antioxidants": "high", "caffeine": "25mg", "polyphenols": "rich"}',
'["organic green tea", "tulsi", "ginger", "lemongrass"]',
'["https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"]', 'active', 40),

('Cold-Pressed Juice', 'FreshPress', 'beverages', 'juices', 'Fresh cold-pressed vegetable and fruit juice', 180.00, 8, true, true, true,
'{"calories": 80, "vitamin_c": "120mg", "fiber": "2g", "no_added_sugar": "yes"}',
'["kale", "spinach", "apple", "ginger", "lemon"]',
'["https://images.unsplash.com/photo-1553530979-67ca22972d1b?w=400"]', 'active', 25),

-- Health & Hygiene
('Vitamin D3 Supplement', 'HealthPlus', 'health_supplements', 'vitamins', 'High-potency Vitamin D3 for bone health', 450.00, 9, false, true, true,
'{"vitamin_d3": "2000IU", "bioavailability": "high"}',
'["vitamin d3", "coconut oil", "vegetarian capsule"]',
'["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"]', 'active', 30),

('Probiotics Complex', 'GutHealth', 'health_supplements', 'probiotics', 'Multi-strain probiotic for digestive health', 650.00, 10, false, true, true,
'{"cfu_count": "50 billion", "strains": "12", "shelf_stable": "yes"}',
'["lactobacillus", "bifidobacterium", "prebiotic fiber"]',
'["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400"]', 'active', 20);