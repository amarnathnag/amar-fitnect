-- Fix remaining function security warnings
-- Update existing functions to have proper search_path settings

-- Fix calculate_auto_health_score function
CREATE OR REPLACE FUNCTION public.calculate_auto_health_score(ingredients_list jsonb)
RETURNS integer
LANGUAGE plpgsql
SET search_path = ''
AS $$
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
$$;

-- Fix check_low_stock function
CREATE OR REPLACE FUNCTION public.check_low_stock()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.stock_quantity <= 10 AND OLD.stock_quantity > 10 THEN
    INSERT INTO public.admin_notifications (type, title, message, related_id, priority)
    VALUES (
      'low_stock',
      'Low Stock Alert',
      'Product "' || NEW.name || '" is running low (Stock: ' || NEW.stock_quantity || ')',
      NEW.id,
      'medium'
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Fix update_auto_health_score function
CREATE OR REPLACE FUNCTION public.update_auto_health_score()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.ingredients IS NOT NULL AND NOT NEW.manual_override THEN
    NEW.auto_health_score := public.calculate_auto_health_score(NEW.ingredients);
    
    -- Use auto score if no manual health_score is set
    IF NEW.health_score IS NULL THEN
      NEW.health_score := NEW.auto_health_score;
    END IF;
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;