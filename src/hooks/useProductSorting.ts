
import { useMemo } from 'react';
import type { Product } from '@/types/product';

export const useProductSorting = (products: Product[], sortBy: string = 'health_score') => {
  return useMemo(() => {
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
  }, [products, sortBy]);
};
