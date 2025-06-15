import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductSearch from '@/components/marketplace/ProductSearch';
import CartSidebar from '@/components/marketplace/CartSidebar';
import CategoryHero from '@/components/marketplace/CategoryHero';
import HealthFocusedHero from '@/components/marketplace/HealthFocusedHero';
import FeaturedCategories from '@/components/marketplace/FeaturedCategories';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Filter, Grid3X3, Sparkles, Database, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'health_score';
  const minHealthScore = searchParams.get('minHealthScore') ? Number(searchParams.get('minHealthScore')) : undefined;
  const maxHealthScore = searchParams.get('maxHealthScore') ? Number(searchParams.get('maxHealthScore')) : undefined;
  const isOrganic = searchParams.get('isOrganic') === 'true';
  const isVegetarian = searchParams.get('isVegetarian') === 'true';
  const isVegan = searchParams.get('isVegan') === 'true';
  
  // Switch to browse tab when category is selected
  useEffect(() => {
    console.log('🔄 Category effect triggered:', { category, activeTab });
    if (category) {
      console.log('📂 Category detected, switching to browse tab');
      setActiveTab('browse');
    }
  }, [category]);
  
  const productOptions = useMemo(() => {
    const options = {
      category: category === 'food' ? '' : category,
      search,
      sortBy,
      minHealthScore,
      maxHealthScore,
      isOrganic,
      isVegetarian,
      isVegan
    };
    console.log('🔍 Product options updated:', options);
    return options;
  }, [category, search, sortBy, minHealthScore, maxHealthScore, isOrganic, isVegetarian, isVegan]);
  
  const { products, loading, categories } = useProducts(productOptions);
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const showDataAlert = !loading && products.length === 0 && !search && !category;
  const hasHealthFilters = minHealthScore > 0 || maxHealthScore < 10 || isOrganic || isVegan || isVegetarian;

  const handleFilterChange = (filters: any) => {
    console.log('🔧 Filter change requested:', filters);
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== false) {
        newParams.set(key, value as string);
        console.log(`✅ Setting filter: ${key} = ${value}`);
      } else {
        newParams.delete(key);
        console.log(`❌ Removing filter: ${key}`);
      }
    });
    
    console.log('🔗 Updating URL with new filters:', newParams.toString());
    setSearchParams(newParams);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    console.log('🎯 Category selection handler called:', selectedCategory);
    console.log('📊 Current state:', { activeTab, category });
    
    // Clear other filters when selecting a category
    const newParams = new URLSearchParams();
    newParams.set('category', selectedCategory);
    
    console.log('🔄 Setting new category and switching to browse tab');
    setSearchParams(newParams);
    setActiveTab('browse');
    
    console.log('✅ Category selection complete. New category:', selectedCategory);
  };

  const handleAddToCart = (product: any, quantityOption?: any) => {
    console.log('🛒 Adding to cart:', product.name, quantityOption);
    
    let productToAdd = product;
    
    if (quantityOption) {
      // If quantity option is provided, modify the product with selected options
      productToAdd = {
        ...product,
        price: quantityOption.price,
        quantity_selected: quantityOption.value,
        unit_selected: quantityOption.unit
      };
      console.log('📦 Modified product with quantity option:', productToAdd);
    }
    
    addToCart(productToAdd);
  };

  const currentFilters = {
    category,
    sortBy,
    minHealthScore,
    maxHealthScore,
    isOrganic,
    isVegetarian,
    isVegan
  };

  const getCategoryDisplayName = (cat: string) => {
    const categoryNames: Record<string, string> = {
      dairy: 'Dairy & Alternatives',
      bakery: 'Bakery & Breads',
      oils: 'Healthy Oils',
      grains: 'Grains & Cereals',
      grocery: 'Grocery Essentials',
      healthy_snacks: 'Healthy Snacks',
      health_supplements: 'Health Supplements',
      organic: 'Organic Products',
      vegan: 'Vegan Products',
      premium: 'Premium Selection'
    };
    return categoryNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Debug logging
  useEffect(() => {
    console.log('🔍 Marketplace Debug Info:');
    console.log('- Active Tab:', activeTab);
    console.log('- Category:', category);
    console.log('- Products Count:', products.length);
    console.log('- Loading:', loading);
    console.log('- Current URL:', window.location.href);
  }, [activeTab, category, products.length, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        {!hasHealthFilters && !search && !category ? (
          <HealthFocusedHero />
        ) : (
          <CategoryHero />
        )}
        
        <div className="container-custom py-8">
          {showDataAlert && (
            <Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
              <Database className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                No products found in the database. You may need to seed sample data first. 
                Go to Admin panel to add products or use the Sample Data Seeder.
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <TabsList className="grid w-full lg:w-auto grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                <TabsTrigger value="browse" className="flex items-center gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                  <Grid3X3 className="h-4 w-4" />
                  Browse Products
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
                  <Sparkles className="h-4 w-4" />
                  Categories
                </TabsTrigger>
              </TabsList>

              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white dark:bg-gray-800/80 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart 
                {cartCount > 0 && (
                  <Badge className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>

            <TabsContent value="browse" className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 dark:bg-gray-800/80 dark:border-gray-700">
                <ProductSearch 
                  onSearch={(query) => handleFilterChange({ search: query })}
                  initialValue={search}
                />
              </div>

              {/* Category Banner */}
              {category && (
                <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {getCategoryDisplayName(category)}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Showing {products.length} products in this category
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleFilterChange({ category: '' })}
                      className="bg-white/80 backdrop-blur-sm"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              )}

              {/* Filters Toggle for Mobile */}
              <div className="lg:hidden">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full bg-white/80 backdrop-blur-sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Health & Filters
                      {hasHealthFilters && (
                        <Heart className="h-4 w-4 ml-2 text-green-600" />
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-white/95 backdrop-blur-sm">
                    <ProductFilters 
                      categories={categories}
                      onFilterChange={handleFilterChange}
                      currentFilters={currentFilters}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="hidden lg:block">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 sticky top-8 dark:bg-gray-800/80 dark:border-gray-700">
                    <ProductFilters 
                      categories={categories}
                      onFilterChange={handleFilterChange}
                      currentFilters={currentFilters}
                    />
                  </div>
                </div>

                {/* Products Grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 dark:bg-gray-800/50 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {category ? `${getCategoryDisplayName(category)}` : 'Health-Focused Products'}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          ({products.length} items)
                        </span>
                      </h2>
                      {hasHealthFilters && (
                        <div className="flex items-center gap-2 text-green-600">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm font-medium">Health Filtered</span>
                        </div>
                      )}
                    </div>
                    <ProductGrid 
                      products={products}
                      loading={loading}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <FeaturedCategories onCategorySelect={handleCategorySelect} />
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
