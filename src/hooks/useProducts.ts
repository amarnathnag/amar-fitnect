import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { groceryProducts } from '@/data/groceryProducts';
import { productCategories } from '@/data/productCategories';
import { filterProducts, sortProducts } from '@/utils/productFilters';

interface UseProductsOptions {
  category?: string;
  search?: string;
  sortBy?: string;
  minHealthScore?: number;
  maxHealthScore?: number;
  isOrganic?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      if (!isMounted) return;

      try {
        setLoading(true);
        
        // Filter products using the utility function
        const filteredProducts = filterProducts(groceryProducts, {
          category: options.category === 'food' ? '' : options.category,
          search: options.search,
          minHealthScore: options.minHealthScore,
          maxHealthScore: options.maxHealthScore,
          isOrganic: options.isOrganic,
          isVegetarian: options.isVegetarian,
          isVegan: options.isVegan
        });

        // Sort products using the utility function
        const sortedProducts = sortProducts(filteredProducts, options.sortBy || 'health_score');

        if (isMounted) {
          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error('Error filtering products:', error);
        if (isMounted) {
          setProducts(groceryProducts);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const fetchCategories = async () => {
      if (isMounted) {
        setCategories(productCategories);
      }
    };

    fetchProducts();
    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [options.category, options.search, options.sortBy, options.minHealthScore, options.maxHealthScore, options.isOrganic, options.isVegetarian, options.isVegan]);

  return {
    products,
    categories,
    loading,
    refetch: () => {
      // Trigger re-fetch by updating a dependency
    }
  };
};
