
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  health_score: number;
  image_urls: string[];
  health_impact_summary: string;
  is_organic: boolean;
  is_vegetarian: boolean;
  is_vegan: boolean;
  stock_quantity: number;
  category: string;
  subcategory: string;
  description?: string;
  user_rating?: number;
  review_count?: number;
  quantity_options?: Array<{
    value: number;
    unit: string;
    price: number;
  }>;
  warnings?: string[];
  allergens?: string[];
  ingredients?: string[];
  nutritional_info?: Record<string, any>;
  // Database-specific fields (optional for sample data)
  admin_notes?: string;
  auto_health_score?: number;
  created_at?: string;
  updated_at?: string;
  manual_override?: boolean;
  seller_id?: string;
  status?: string;
  workflow_status?: string;
}

export interface UseProductsOptions {
  category?: string;
  search?: string;
  sortBy?: string;
  minHealthScore?: number;
  maxHealthScore?: number;
  isOrganic?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
}
