
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Share2, Star, Leaf, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      navigate('/marketplace');
      return;
    }
    
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log('Fetching product with ID:', id);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }
      
      console.log('Fetched product:', data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      navigate('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatPrice = (price: number) => {
    // Convert from paise to rupees if price is in paise format (> 1000)
    const displayPrice = price > 1000 ? price / 100 : price;
    return displayPrice.toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div>Loading...</div>
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
          <div>Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={product.image_urls?.[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">{product.brand}</p>
                <p className="text-sm text-gray-500">{product.subcategory}</p>
              </div>

              <div className="flex items-center gap-4">
                <Badge className={`text-lg px-3 py-1 ${getHealthScoreColor(product.health_score)}`}>
                  <Award className="h-4 w-4 mr-1" />
                  Health Score: {product.health_score}/10
                </Badge>
                
                <div className="flex gap-2">
                  {product.is_organic && (
                    <Badge variant="secondary">
                      <Leaf className="h-3 w-3 mr-1" />
                      Organic
                    </Badge>
                  )}
                  {product.is_vegan && (
                    <Badge variant="secondary">
                      <Heart className="h-3 w-3 mr-1" />
                      Vegan
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">₹{formatPrice(product.price)}</div>
                <p className="text-sm text-gray-500">
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{product.health_impact_summary}</p>
                {product.description && (
                  <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.ingredients && (
                    <div>
                      <h4 className="font-semibold mb-2">Ingredients</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {JSON.stringify(product.ingredients, null, 2)}
                      </div>
                    </div>
                  )}
                  
                  {product.allergens && product.allergens.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Allergens</h4>
                      <div className="flex gap-2">
                        {product.allergens.map((allergen: string) => (
                          <Badge key={allergen} variant="destructive">{allergen}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.nutritional_info ? (
                    <div className="text-sm space-y-2">
                      {Object.entries(product.nutritional_info).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace('_', ' ')}:</span>
                          <span>{value as string}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No nutritional information available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review: any) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No reviews yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
