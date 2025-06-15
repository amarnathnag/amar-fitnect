
import type { Product } from '@/types/product';

export const categoryToDbMapping: Record<string, 'supplements' | 'food' | 'fitness_gear' | 'wellness'> = {
  'dairy': 'food',
  'bakery': 'food',
  'beverages': 'food',
  'snacks': 'food',
  'grains': 'food',
  'oils': 'food',
  'spices': 'food',
  'frozen': 'food',
  'protein': 'food',
  'breakfast': 'food',
  'sweeteners': 'food',
  'personal_care': 'wellness',
  'household': 'wellness',
  'supplements': 'supplements'
};

// Helper function to convert database products to our Product interface
export const convertDbProductToProduct = (dbProduct: any): Product => {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    brand: dbProduct.brand,
    price: Number(dbProduct.price),
    health_score: dbProduct.health_score,
    image_urls: Array.isArray(dbProduct.image_urls) ? dbProduct.image_urls : [],
    health_impact_summary: dbProduct.health_impact_summary || '',
    is_organic: dbProduct.is_organic || false,
    is_vegetarian: dbProduct.is_vegetarian || false,
    is_vegan: dbProduct.is_vegan || false,
    stock_quantity: dbProduct.stock_quantity || 0,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory || '',
    description: dbProduct.description,
    user_rating: dbProduct.user_rating ? Number(dbProduct.user_rating) : undefined,
    review_count: dbProduct.review_count,
    allergens: Array.isArray(dbProduct.allergens) ? dbProduct.allergens : [],
    ingredients: Array.isArray(dbProduct.ingredients) ? dbProduct.ingredients : [],
    nutritional_info: typeof dbProduct.nutritional_info === 'object' ? dbProduct.nutritional_info : undefined,
    admin_notes: dbProduct.admin_notes,
    auto_health_score: dbProduct.auto_health_score,
    created_at: dbProduct.created_at,
    updated_at: dbProduct.updated_at,
    manual_override: dbProduct.manual_override,
    seller_id: dbProduct.seller_id,
    status: dbProduct.status,
    workflow_status: dbProduct.workflow_status
  };
};
