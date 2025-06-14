
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductSearch from '@/components/marketplace/ProductSearch';
import CartSidebar from '@/components/marketplace/CartSidebar';
import HealthProductsSection from '@/components/marketplace/HealthProductsSection';
import CategorySection from '@/components/marketplace/CategorySection';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Filter, Heart, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'health_score';
  const minHealthScore = searchParams.get('minHealthScore') ? Number(searchParams.get('minHealthScore')) : undefined;
  const maxHealthScore = searchParams.get('maxHealthScore') ? Number(searchParams.get('maxHealthScore')) : undefined;
  const isOrganic = searchParams.get('isOrganic') === 'true';
  const isVegetarian = searchParams.get('isVegetarian') === 'true';
  const isVegan = searchParams.get('isVegan') === 'true';
  
  // Memoize the options object to prevent unnecessary re-renders
  const productOptions = useMemo(() => ({
    category: category === 'food' ? '' : category, // Fix 'food' category issue
    search,
    sortBy,
    minHealthScore,
    maxHealthScore,
    isOrganic,
    isVegetarian,
    isVegan
  }), [category, search, sortBy, minHealthScore, maxHealthScore, isOrganic, isVegetarian, isVegan]);
  
  const { products, loading, categories } = useProducts(productOptions);
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const handleFilterChange = (filters: any) => {
    console.log('Filter change:', filters);
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== false) {
        newParams.set(key, value as string);
      } else {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams);
  };

  // Group products by category for featured sections
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    products.forEach(product => {
      if (product.category) {
        if (!grouped[product.category]) {
          grouped[product.category] = [];
        }
        grouped[product.category].push(product);
      }
    });
    return grouped;
  }, [products]);

  const categoryDescriptions: Record<string, string> = {
    dairy: 'Fresh dairy products and plant-based alternatives for daily nutrition',
    bakery: 'Wholesome breads, cookies, and baked goods for every meal',
    beverages: 'Healthy drinks, teas, and natural beverages to stay hydrated',
    snacks: 'Nutritious snacks and protein bars for energy on-the-go',
    grains: 'Whole grains, cereals, and superfoods for sustained energy',
    oils: 'Premium cooking oils and healthy fats for heart-healthy cooking',
    spices: 'Organic spices and condiments to enhance flavor and health',
    frozen: 'Convenient frozen foods that retain nutritional value',
    personal_care: 'Natural personal care products for health and wellness',
    household: 'Eco-friendly household essentials for sustainable living',
    supplements: 'Premium vitamins and supplements for optimal health'
  };

  // Get current filters for display - make sure to map correctly
  const currentFilters = {
    category,
    sortBy,
    minHealthScore,
    maxHealthScore,
    isOrganic,
    isVegetarian,
    isVegan
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">AmarHealth Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover 100+ healthy products with AI-powered health insights across 10+ categories
            </p>
          </div>

          <Tabs defaultValue="all-products" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all-products">All Products</TabsTrigger>
                <TabsTrigger value="featured-categories" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Featured Categories
                </TabsTrigger>
                <TabsTrigger value="health-supplements" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Health Supplements
                </TabsTrigger>
              </TabsList>

              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartCount})
              </Button>
            </div>

            <TabsContent value="all-products" className="space-y-6">
              <div className="mb-6">
                <ProductSearch 
                  onSearch={(query) => handleFilterChange({ search: query })}
                  initialValue={search}
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <ProductFilters 
                      categories={categories}
                      onFilterChange={handleFilterChange}
                      currentFilters={currentFilters}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex gap-8">
                <div className="hidden md:block w-64 flex-shrink-0">
                  <ProductFilters 
                    categories={categories}
                    onFilterChange={handleFilterChange}
                    currentFilters={currentFilters}
                  />
                </div>

                <div className="flex-grow">
                  <ProductGrid 
                    products={products}
                    loading={loading}
                    onAddToCart={addToCart}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="featured-categories" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore our comprehensive collection organized by product type
                </p>
              </div>

              {Object.entries(productsByCategory).map(([categoryKey, categoryProducts]) => (
                <CategorySection
                  key={categoryKey}
                  title={categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1) + ' & Alternatives'}
                  description={categoryDescriptions[categoryKey] || 'High-quality products for your health and wellness'}
                  products={categoryProducts}
                  onAddToCart={addToCart}
                />
              ))}
            </TabsContent>

            <TabsContent value="health-supplements">
              <HealthProductsSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={cartTotal}
      />
      
      <Footer />
    </div>
  );
};

export default Marketplace;
