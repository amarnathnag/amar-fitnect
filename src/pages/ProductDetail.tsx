
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProductInfo from '@/components/product-detail/ProductInfo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Award, Leaf, Heart, AlertTriangle, Package, Minus, Plus, Tag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { sampleProducts } from '@/data/sampleProducts';
import { supabase } from '@/integrations/supabase/client';
import { convertDbProductToProduct } from '@/utils/productMapping';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/types/product';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: 'percentage' | 'fixed' } | null>(null);

  // Sample coupons (in real app, these would come from backend)
  const availableCoupons = [
    { code: 'HEALTH10', discount: 10, type: 'percentage' as const, minAmount: 100 },
    { code: 'ORGANIC15', discount: 15, type: 'percentage' as const, minAmount: 200 },
    { code: 'SAVE50', discount: 50, type: 'fixed' as const, minAmount: 300 },
    { code: 'WELCOME20', discount: 20, type: 'percentage' as const, minAmount: 150 }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching product with ID:', id);
        
        // First try to get from Supabase
        const { data: dbProduct, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .eq('status', 'active')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching product from database:', error);
        }

        if (dbProduct) {
          console.log('Found product in database:', dbProduct);
          const convertedProduct = convertDbProductToProduct(dbProduct);
          setProduct(convertedProduct);
        } else {
          // Fallback to sample data
          console.log('Product not found in database, checking sample data');
          const sampleProduct = sampleProducts.find(p => p.id === id);
          if (sampleProduct) {
            console.log('Found product in sample data:', sampleProduct);
            setProduct(sampleProduct);
          } else {
            console.log('Product not found in sample data either');
            setProduct(null);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.quantity_options && product.quantity_options.length > 0) {
      setSelectedQuantity(0);
    }
  }, [product]);

  const currentQuantityOption = product?.quantity_options?.[selectedQuantity] || {
    value: 1,
    unit: 'unit',
    price: product?.price || 0
  };

  const basePrice = currentQuantityOption.price * quantity;
  
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (basePrice * appliedCoupon.discount) / 100;
    } else {
      return appliedCoupon.discount;
    }
  };

  const discountAmount = calculateDiscount();
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    
    if (!coupon) {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
      return;
    }

    if (basePrice < coupon.minAmount) {
      toast({
        title: "Minimum Amount Not Met",
        description: `This coupon requires a minimum purchase of ₹${coupon.minAmount}`,
        variant: "destructive",
      });
      return;
    }

    setAppliedCoupon(coupon);
    toast({
      title: "Coupon Applied!",
      description: `You saved ₹${coupon.type === 'percentage' ? (basePrice * coupon.discount / 100).toFixed(2) : coupon.discount} with coupon ${coupon.code}`,
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your order.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // Create a modified product with the selected quantity option details
    const productWithQuantity = {
      ...product,
      price: finalPrice / quantity, // Adjusted price per unit including discount
      quantity_selected: currentQuantityOption.value * quantity,
      unit_selected: currentQuantityOption.unit,
      appliedDiscount: discountAmount,
      appliedCoupon: appliedCoupon?.code
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productWithQuantity);
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} (${currentQuantityOption.unit}) added to cart`,
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
                  <label className="text-lg font-medium">Select Package:</label>
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

              {/* Quantity Selector */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">Quantity:</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product.stock_quantity || 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-500">
                    (Max: {product.stock_quantity})
                  </span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Apply Coupon
                </Label>
                
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <div>
                      <Badge className="bg-green-600 text-white">
                        {appliedCoupon.code}
                      </Badge>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        {appliedCoupon.type === 'percentage' 
                          ? `${appliedCoupon.discount}% off` 
                          : `₹${appliedCoupon.discount} off`
                        }
                      </p>
                    </div>
                    <Button onClick={handleRemoveCoupon} variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Available coupons: HEALTH10, ORGANIC15, SAVE50, WELCOME20</p>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Base Price:</span>
                    <span className="text-lg">₹{basePrice.toFixed(2)}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount:</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">Total:</span>
                      <div className="text-right">
                        {discountAmount > 0 && (
                          <div className="text-lg text-gray-500 line-through">
                            ₹{basePrice.toFixed(2)}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          ₹{finalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
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
                  : `Add ${quantity}x ${currentQuantityOption.unit} to Cart - ₹${finalPrice.toFixed(2)}`
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
                      {Array.isArray(product.ingredients) 
                        ? product.ingredients.join(', ')
                        : JSON.stringify(product.ingredients)
                      }
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
