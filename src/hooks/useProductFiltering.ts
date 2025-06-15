
import { useMemo } from 'react';
import type { Product, UseProductsOptions } from '@/types/product';
import { sampleProducts } from '@/data/sampleProducts';

export const useProductFiltering = (products: Product[], options: UseProductsOptions, useFallback: boolean = false) => {
  return useMemo(() => {
    let productsToFilter = useFallback ? sampleProducts : products;
    
    if (!productsToFilter || productsToFilter.length === 0) {
      return [];
    }

    let filtered = [...productsToFilter];

    // Apply category filter
    if (options.category && options.category !== 'all') {
      filtered = filtered.filter(product => {
        if (options.category === product.subcategory) {
          return true;
        }
        return false;
      });
    }

    // Apply search filter
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.brand.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply health score filters
    if (options.minHealthScore !== undefined) {
      filtered = filtered.filter(product => product.health_score >= options.minHealthScore!);
    }

    if (options.maxHealthScore !== undefined) {
      filtered = filtered.filter(product => product.health_score <= options.maxHealthScore!);
    }

    // Apply dietary preference filters
    if (options.isOrganic) {
      filtered = filtered.filter(product => product.is_organic);
    }

    if (options.isVegetarian) {
      filtered = filtered.filter(product => product.is_vegetarian);
    }

    if (options.isVegan) {
      filtered = filtered.filter(product => product.is_vegan);
    }

    return filtered;
  }, [products, options, useFallback]);
};
