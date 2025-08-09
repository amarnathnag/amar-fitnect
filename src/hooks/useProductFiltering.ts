
import { useMemo } from 'react';
import type { Product, UseProductsOptions } from '@/types/product';
import { sampleProducts } from '@/data/sampleProducts';
import { groceryProducts } from '@/data/groceryProducts';
import { additionalProducts } from '@/data/additionalProducts';
import { newCategoryProducts } from '@/data/newCategoryProducts';

export const useProductFiltering = (products: Product[], options: UseProductsOptions, useFallback: boolean = false) => {
  return useMemo(() => {
    let productsToFilter = products;
    
    // If using fallback mode, combine all sample data
    if (useFallback || products.length === 0) {
      productsToFilter = [
        ...sampleProducts,
        ...groceryProducts,
        ...additionalProducts,
        ...newCategoryProducts
      ];
    }
    
    if (!productsToFilter || productsToFilter.length === 0) {
      return [];
    }

    let filtered = [...productsToFilter];

    // Apply category filter with improved mapping
    if (options.category && options.category !== 'all') {
      filtered = filtered.filter(product => {
        const categoryLower = options.category!.toLowerCase();
        const productCategory = product.category?.toLowerCase();
        const productSubcategory = product.subcategory?.toLowerCase();
        
        // Direct category match
        if (productCategory === categoryLower || productSubcategory === categoryLower) {
          return true;
        }
        
        // Handle special category mappings for breakfast
        if (categoryLower === 'breakfast') {
          return productCategory === 'breakfast' || 
                 productSubcategory === 'breakfast' ||
                 product.name?.toLowerCase().includes('breakfast') ||
                 product.name?.toLowerCase().includes('cereal') ||
                 product.name?.toLowerCase().includes('oats') ||
                 product.name?.toLowerCase().includes('milk') ||
                 product.name?.toLowerCase().includes('coffee') ||
                 product.name?.toLowerCase().includes('tea');
        }
        
        // Handle other specific mappings
        const categoryMappings: Record<string, string[]> = {
          'grains': ['atta', 'rice', 'dal', 'grain', 'wheat', 'quinoa'],
          'protein': ['meat', 'fish', 'egg', 'protein', 'chicken'],
          'dairy': ['dairy', 'milk', 'cheese', 'yogurt', 'butter'],
          'healthy_snacks': ['snack', 'chip', 'biscuit', 'cookie', 'chocolate'],
          'health_supplements': ['supplement', 'vitamin', 'protein powder'],
          'oils': ['oil', 'ghee', 'masala', 'spice'],
          'premium': ['gourmet', 'organic', 'premium'],
          'grocery': ['grocery']
        };
        
        const mappedTerms = categoryMappings[categoryLower] || [];
        if (mappedTerms.some(term => 
          productCategory?.includes(term) ||
          productSubcategory?.includes(term) ||
          product.name?.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term)
        )) {
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
        (product.category && product.category.toLowerCase().includes(searchLower)) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(searchLower)) ||
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
