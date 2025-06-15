
import { useState } from 'react';
import { productCategories } from '@/data/productCategories';
import type { UseProductsOptions } from '@/types/product';
import { useSupabaseProducts } from './useSupabaseProducts';
import { useProductFiltering } from './useProductFiltering';
import { useProductSorting } from './useProductSorting';

export const useProducts = (options: UseProductsOptions = {}) => {
  const [categories] = useState<string[]>(productCategories);
  
  const { products: supabaseProducts, loading: supabaseLoading, error } = useSupabaseProducts(options);
  
  // If no products from database, use sample data with filtering
  const fallbackProducts = useProductFiltering([], options, true);
  
  // Use database products if available, otherwise use filtered sample data
  const productsToUse = supabaseProducts.length > 0 ? supabaseProducts : fallbackProducts;
  
  // Apply sorting
  const sortedProducts = useProductSorting(productsToUse, options.sortBy);
  
  const loading = supabaseLoading;

  const refetch = () => {
    // Refetch functionality can be added here if needed
    console.log('Refetch requested');
  };

  return {
    products: sortedProducts,
    categories,
    loading,
    refetch
  };
};
