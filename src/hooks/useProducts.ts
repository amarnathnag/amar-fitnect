
import { useState, useEffect } from 'react';
import { useSupabaseProducts } from './useSupabaseProducts';
import { enhancedCategoryMapping } from '@/data/marketplaceCategories';
import type { UseProductsOptions } from '@/types/product';

export const useProducts = (options: UseProductsOptions = {}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Enhanced category-based filtering using search terms and subcategories
  const enhancedOptions = {
    ...options,
    // If category is provided, get enhanced search terms and subcategories
    enhancedSearch: options.category && enhancedCategoryMapping[options.category] 
      ? {
          category: enhancedCategoryMapping[options.category].primary,
          searchTerms: enhancedCategoryMapping[options.category].searchTerms,
          subcategories: enhancedCategoryMapping[options.category].subcategories,
          originalSearch: options.search
        }
      : null
  };

  const { products: supabaseProducts, loading: supabaseLoading } = useSupabaseProducts(enhancedOptions);

  useEffect(() => {
    setLoading(supabaseLoading);
  }, [supabaseLoading]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = Array.from(new Set(supabaseProducts.map(p => p.category)));
    setCategories(uniqueCategories);
  }, [supabaseProducts]);

  // Client-side filtering for enhanced category matching
  const filteredProducts = supabaseProducts.filter(product => {
    // If we have enhanced search, apply additional filtering
    if (enhancedOptions.enhancedSearch) {
      const { searchTerms, subcategories, originalSearch } = enhancedOptions.enhancedSearch;
      
      // Check if product matches any search terms
      const matchesSearchTerms = searchTerms.some(term => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description?.toLowerCase().includes(term.toLowerCase()) ||
        product.subcategory?.toLowerCase().includes(term.toLowerCase())
      );

      // Check if product matches any subcategories
      const matchesSubcategories = subcategories.some(subcat =>
        product.subcategory?.toLowerCase().includes(subcat.toLowerCase())
      );

      // Include if matches search terms or subcategories
      const categoryMatch = matchesSearchTerms || matchesSubcategories;
      
      // If there's an original search term, also check that
      const searchMatch = !originalSearch || 
        product.name.toLowerCase().includes(originalSearch.toLowerCase()) ||
        product.description?.toLowerCase().includes(originalSearch.toLowerCase());

      return categoryMatch && searchMatch;
    }
    
    return true;
  });

  const refetch = () => {
    console.log('Refetch requested');
  };

  return {
    products: filteredProducts,
    loading,
    categories,
    refetch
  };
};
