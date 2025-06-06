
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductSearch from '@/components/marketplace/ProductSearch';
import CartSidebar from '@/components/marketplace/CartSidebar';
import HealthProductsSection from '@/components/marketplace/HealthProductsSection';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Filter, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'health_score';
  
  // Memoize the options object to prevent unnecessary re-renders
  const productOptions = useMemo(() => ({
    category,
    search,
    sortBy
  }), [category, search, sortBy]);
  
  const { products, loading, categories } = useProducts(productOptions);
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const handleFilterChange = (filters: any) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value as string);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Health Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover healthy products with AI-powered health insights
            </p>
          </div>

          <Tabs defaultValue="all-products" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all-products">All Products</TabsTrigger>
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
                      currentFilters={{
                        category,
                        sort: sortBy
                      }}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex gap-8">
                <div className="hidden md:block w-64 flex-shrink-0">
                  <ProductFilters 
                    categories={categories}
                    onFilterChange={handleFilterChange}
                    currentFilters={{
                      category,
                      sort: sortBy
                    }}
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
