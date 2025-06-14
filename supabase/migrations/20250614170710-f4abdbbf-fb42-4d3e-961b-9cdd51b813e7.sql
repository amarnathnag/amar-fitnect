
-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert initial categories
INSERT INTO categories (name, description) VALUES
('Grocery & Food', 'Healthy and organic grocery items'),
('Health Supplements', 'Vitamins, protein powders, and wellness pills'),
('Health Gear & Equipment', 'Fitness accessories, resistance bands, and devices');

-- Update products table to add workflow-related columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS workflow_status TEXT DEFAULT 'draft' CHECK (workflow_status IN ('draft', 'pending_review', 'approved', 'rejected', 'published'));
ALTER TABLE products ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS auto_health_score INTEGER;
ALTER TABLE products ADD COLUMN IF NOT EXISTS manual_override BOOLEAN DEFAULT false;

-- Create product workflow history table
CREATE TABLE product_workflow_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  status_from TEXT,
  status_to TEXT NOT NULL,
  admin_id UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin workflow tracking table
CREATE TABLE admin_workflow_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type TEXT NOT NULL CHECK (task_type IN ('review_product', 'approve_product', 'update_inventory')),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  assigned_admin_id UUID,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Function to auto-calculate health score
CREATE OR REPLACE FUNCTION calculate_auto_health_score(ingredients_list jsonb)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 7;
  ingredient TEXT;
  bad_ingredients TEXT[] := ARRAY['refined oil', 'sugar', 'maida', 'artificial flavoring', 'preservatives'];
  good_ingredients TEXT[] := ARRAY['olive oil', 'whole grain', 'fiber', 'protein', 'organic', 'natural'];
BEGIN
  -- Loop through ingredients and adjust score
  FOR ingredient IN SELECT jsonb_array_elements_text(ingredients_list)
  LOOP
    -- Check for bad ingredients
    IF ingredient ILIKE ANY(bad_ingredients) THEN
      score := score - 1;
    END IF;
    
    -- Check for good ingredients  
    IF ingredient ILIKE ANY(good_ingredients) THEN
      score := score + 1;
    END IF;
  END LOOP;
  
  -- Ensure score is between 1-10
  RETURN GREATEST(1, LEAST(10, score));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate health score on product insert/update
CREATE OR REPLACE FUNCTION update_auto_health_score()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ingredients IS NOT NULL AND NOT NEW.manual_override THEN
    NEW.auto_health_score := calculate_auto_health_score(NEW.ingredients);
    
    -- Use auto score if no manual health_score is set
    IF NEW.health_score IS NULL THEN
      NEW.health_score := NEW.auto_health_score;
    END IF;
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_auto_health_score
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_auto_health_score();

-- Insert sample workflow data
INSERT INTO admin_workflow_tasks (task_type, product_id, priority, due_date) 
SELECT 'review_product', id, 'medium', now() + interval '2 days'
FROM products 
WHERE workflow_status = 'pending_review'
LIMIT 5;
