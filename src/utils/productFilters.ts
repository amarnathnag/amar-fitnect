
interface Product {
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
}

interface FilterOptions {
  category?: string;
  search?: string;
  sortBy?: string;
  minHealthScore?: number;
  maxHealthScore?: number;
  isOrganic?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
}

export const filterProducts = (products: Product[], options: FilterOptions): Product[] => {
  let filteredProducts = [...products];
  
  console.log('Filtering products with options:', options);
  console.log('Total products before filtering:', filteredProducts.length);

  // Apply category filter
  if (options.category && options.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === options.category);
    console.log('After category filter:', filteredProducts.length);
  }

  // Apply search filter
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.brand.toLowerCase().includes(searchLower) ||
      (p.description && p.description.toLowerCase().includes(searchLower))
    );
    console.log('After search filter:', filteredProducts.length);
  }

  // Apply health score filters
  if (options.minHealthScore !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.health_score >= options.minHealthScore!);
    console.log('After min health score filter:', filteredProducts.length);
  }

  if (options.maxHealthScore !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.health_score <= options.maxHealthScore!);
    console.log('After max health score filter:', filteredProducts.length);
  }

  // Apply dietary preference filters
  if (options.isOrganic) {
    filteredProducts = filteredProducts.filter(p => p.is_organic);
    console.log('After organic filter:', filteredProducts.length);
  }

  if (options.isVegetarian) {
    filteredProducts = filteredProducts.filter(p => p.is_vegetarian);
    console.log('After vegetarian filter:', filteredProducts.length);
  }

  if (options.isVegan) {
    filteredProducts = filteredProducts.filter(p => p.is_vegan);
    console.log('After vegan filter:', filteredProducts.length);
  }

  console.log('Final filtered products:', filteredProducts.length);
  return filteredProducts;
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price_low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price_high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sortedProducts.sort((a, b) => (b.user_rating || 0) - (a.user_rating || 0));
    default:
      return sortedProducts.sort((a, b) => b.health_score - a.health_score);
  }
};
