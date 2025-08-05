import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductSearch from '@/components/marketplace/ProductSearch';
import CartSidebar from '@/components/marketplace/CartSidebar';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ArrowLeft, Filter, ShoppingCart, Heart } from 'lucide-react';
import { marketplaceCategories, categoryMapping } from '@/data/marketplaceCategories';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'health_score';
  const minHealthScore = searchParams.get('minHealthScore') ? Number(searchParams.get('minHealthScore')) : undefined;
  const maxHealthScore = searchParams.get('maxHealthScore') ? Number(searchParams.get('maxHealthScore')) : undefined;
  const isOrganic = searchParams.get('isOrganic') === 'true';
  const isVegetarian = searchParams.get('isVegetarian') === 'true';
  const isVegan = searchParams.get('isVegan') === 'true';
  
  // Find the category data
  const category = marketplaceCategories.find(cat => cat.id === categoryId);
  const mappedCategory = categoryId ? categoryMapping[categoryId] : '';
  
  const productOptions = useMemo(() => ({
    category: mappedCategory,
    search,
    sortBy,
    minHealthScore,
    maxHealthScore,
    isOrganic,
    isVegetarian,
    isVegan
  }), [mappedCategory, search, sortBy, minHealthScore, maxHealthScore, isOrganic, isVegetarian, isVegan]);
  
  const { products, loading, categories } = useProducts(productOptions);
  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const hasHealthFilters = minHealthScore > 0 || maxHealthScore < 10 || isOrganic || isVegan || isVegetarian;

  const handleFilterChange = (filters: any) => {
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

  const handleAddToCart = (product: any, quantityOption?: any) => {
    let productToAdd = product;
    
    if (quantityOption) {
      productToAdd = {
        ...product,
        price: quantityOption.price,
        quantity_selected: quantityOption.value,
        unit_selected: quantityOption.unit
      };
    }
    
    addToCart(productToAdd);
  };

  const currentFilters = {
    category: mappedCategory,
    sortBy,
    minHealthScore,
    maxHealthScore,
    isOrganic,
    isVegetarian,
    isVegan
  };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = category.icon;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavBar />
      
      <main className="flex-grow">
        {/* Category Hero */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 py-12">
          <div className="container-custom">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>
            
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl ${category.color} flex items-center justify-center`}>
                <IconComponent className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                  {category.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {products.length} products available
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 flex-grow dark:bg-gray-800/80 dark:border-gray-700">
              <ProductSearch 
                onSearch={(query) => handleFilterChange({ search: query })}
                initialValue={search}
              />
            </div>

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

          {/* Filters Toggle for Mobile */}
          <div className="lg:hidden mb-6">
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
                    {category.name}
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

export default CategoryProducts;