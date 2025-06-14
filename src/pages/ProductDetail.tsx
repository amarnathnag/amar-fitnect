
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductInfo from '@/components/product-detail/ProductInfo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Award, Leaf, Heart, AlertTriangle, Package } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { sampleProducts } from '@/data/sampleProducts';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  
  const product = sampleProducts.find(p => p.id === id);

  useEffect(() => {
    if (product?.quantity_options && product.quantity_options.length > 0) {
      setSelectedQuantity(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQuantityOption = product.quantity_options?.[selectedQuantity] || {
    value: 1,
    unit: 'unit',
    price: product.price
  };

  const handleAddToCart = () => {
    addToCart(product, currentQuantityOption);
    toast({
      title: "Added to Cart",
      description: `${product.name} (${currentQuantityOption.unit}) added to cart`,
    });
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/marketplace')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-2xl border border-gray-200 p-4 dark:bg-gray-800 dark:border-gray-700">
                <img
                  src={product.image_urls?.[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{product.brand}</p>
                <Badge variant="outline" className="mb-4">
                  {product.subcategory}
                </Badge>
              </div>

              {/* Health Score and Badges */}
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className={`text-lg px-4 py-2 ${getHealthScoreColor(product.health_score)}`}>
                  <Award className="h-5 w-5 mr-2" />
                  Health Score: {product.health_score}/10
                </Badge>
                
                <div className="flex gap-2">
                  {product.is_organic && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <Leaf className="h-4 w-4 mr-1" />
                      Organic
                    </Badge>
                  )}
                  {product.is_vegan && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      <Heart className="h-4 w-4 mr-1" />
                      Vegan
                    </Badge>
                  )}
                  {product.is_vegetarian && !product.is_vegan && (
                    <Badge variant="outline" className="bg-orange-100 text-orange-700">
                      Vegetarian
                    </Badge>
                  )}
                </div>
              </div>

              {/* Warnings */}
              {product.warnings && product.warnings.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Important Warnings
                  </h3>
                  <div className="space-y-1">
                    {product.warnings.map((warning, index) => (
                      <Badge key={index} variant="destructive" className="mr-2 mb-1">
                        {warning}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              {product.quantity_options && product.quantity_options.length > 1 && (
                <div className="space-y-3">
                  <label className="text-lg font-medium">Select Quantity:</label>
                  <Select 
                    value={selectedQuantity.toString()} 
                    onValueChange={(value) => setSelectedQuantity(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.quantity_options.map((option, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {option.unit} - ₹{option.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Price and Stock */}
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  ₹{currentQuantityOption.price}
                  {currentQuantityOption.unit !== 'unit' && (
                    <span className="text-lg text-gray-500 ml-2">({currentQuantityOption.unit})</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className={`text-sm font-medium ${
                    product.stock_quantity > 10 
                      ? 'text-green-600' 
                      : product.stock_quantity > 0 
                        ? 'text-orange-600' 
                        : 'text-red-600'
                  }`}>
                    {product.stock_quantity > 0 
                      ? `${product.stock_quantity} in stock` 
                      : 'Out of stock'
                    }
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                size="lg"
                className="w-full h-14 text-lg"
              >
                {product.stock_quantity === 0 
                  ? 'Out of Stock' 
                  : `Add ${currentQuantityOption.unit} to Cart - ₹${currentQuantityOption.price}`
                }
              </Button>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Health Impact</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {product.health_impact_summary}
                </p>
                
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Ingredients and Nutritional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.ingredients && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Ingredients</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {product.ingredients.join(', ')}
                    </div>
                  </div>
                )}
                
                {product.allergens && product.allergens.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-red-600">Allergens</h3>
                    <div className="text-sm text-red-600">
                      {product.allergens.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Nutritional Information */}
              {product.nutritional_info && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Nutritional Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(product.nutritional_info).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
