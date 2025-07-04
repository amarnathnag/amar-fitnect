-- Create comprehensive categories table with more organized data
INSERT INTO categories (name, description) VALUES
('food', 'All food products including fresh produce, packaged goods, and grocery items'),
('supplements', 'Health supplements, vitamins, and nutritional products'),
('fitness_gear', 'Fitness equipment, workout gear, and sports accessories'),
('wellness', 'General wellness products, personal care, and health monitoring'),
('dairy', 'Milk products, cheese, yogurt, and dairy alternatives'),
('bakery', 'Bread, pastries, and baked goods'),
('oils', 'Cooking oils, healthy fats, and oil-based products'),
('grains', 'Rice, wheat, cereals, and grain-based products'),
('protein', 'Meat, eggs, protein powders, and protein sources'),
('breakfast', 'Breakfast cereals, oats, and morning meal products'),
('sweeteners', 'Natural and artificial sweeteners, honey, sugar alternatives'),
('organic', 'Certified organic products across all categories'),
('vegan', 'Plant-based and vegan-certified products'),
('vegetarian', 'Vegetarian-friendly products'),
('beverages', 'Drinks, juices, teas, and liquid refreshments'),
('snacks', 'Healthy snacks, nuts, dried fruits, and quick bites'),
('spices', 'Herbs, spices, seasonings, and flavor enhancers'),
('frozen', 'Frozen foods, ice creams, and preserved items'),
('personal_care', 'Skincare, haircare, and personal hygiene products'),
('household', 'Cleaning products, kitchen essentials, and home care items')
ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;

-- Update product categories to match database enum values
UPDATE products SET category = 'food' WHERE category NOT IN ('food', 'supplements', 'fitness_gear', 'wellness');

-- Create admin notification system for better order management
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('new_order', 'product_review', 'low_stock', 'user_signup', 'system_alert')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id UUID, -- Can reference orders, products, users, etc.
  is_read BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  admin_id UUID -- If targeted to specific admin
);

-- Create trigger to automatically create notifications for new orders
CREATE OR REPLACE FUNCTION create_order_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO admin_notifications (type, title, message, related_id, priority)
  VALUES (
    'new_order',
    'New Order Received',
    'Order #' || NEW.id || ' has been placed for ₹' || NEW.total_amount,
    NEW.id,
    'high'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS order_notification_trigger ON orders;
CREATE TRIGGER order_notification_trigger
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION create_order_notification();

-- Create low stock notifications
CREATE OR REPLACE FUNCTION check_low_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock_quantity <= 10 AND OLD.stock_quantity > 10 THEN
    INSERT INTO admin_notifications (type, title, message, related_id, priority)
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
$$ LANGUAGE plpgsql;

-- Create the low stock trigger
DROP TRIGGER IF EXISTS low_stock_trigger ON products;
CREATE TRIGGER low_stock_trigger
  AFTER UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION check_low_stock();

-- Enable RLS on admin_notifications
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- Allow admins to manage notifications
CREATE POLICY "Admins can manage all notifications" ON admin_notifications
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  )
);