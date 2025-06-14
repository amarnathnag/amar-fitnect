
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Product {
  ingredients?: any;
  allergens?: string[];
  nutritional_info?: Record<string, any>;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

interface ProductDetailsTabsProps {
  product: Product;
  reviews: Review[];
}

const ProductDetailsTabs: React.FC<ProductDetailsTabsProps> = ({ product, reviews }) => {
  return (
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
                {reviews.map((review: Review) => (
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
  );
};

export default ProductDetailsTabs;
