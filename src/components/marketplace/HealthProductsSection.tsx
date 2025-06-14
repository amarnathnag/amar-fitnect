
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Leaf, Award, ShoppingCart } from 'lucide-react';

const HealthProductsSection = () => {
  const healthProducts = [
    {
      id: 1,
      name: "Organic Whey Protein",
      brand: "HealthFit",
      price: 45.99,
      rating: 4.8,
      healthScore: 95,
      category: "Supplements",
      benefits: ["Muscle Building", "Post-Workout Recovery"],
      organic: true,
      vegetarian: true,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Multivitamin Complex",
      brand: "VitalLife",
      price: 29.99,
      rating: 4.6,
      healthScore: 92,
      category: "Vitamins",
      benefits: ["Immune Support", "Energy Boost"],
      organic: false,
      vegetarian: true,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      brand: "PureHealth",
      price: 24.99,
      rating: 4.7,
      healthScore: 89,
      category: "Supplements",
      benefits: ["Heart Health", "Brain Function"],
      organic: true,
      vegetarian: false,
      image: "https://plus.unsplash.com/premium_photo-1675798831631-f8238cec7632?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Probiotic Capsules",
      brand: "GutWell",
      price: 34.99,
      rating: 4.5,
      healthScore: 91,
      category: "Digestive Health",
      benefits: ["Digestive Support", "Gut Health"],
      organic: true,
      vegetarian: true,
      image: "https://images.unsplash.com/photo-1607619056574-7d8d3ee536b2?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Collagen Powder",
      brand: "BeautyBoost",
      price: 39.99,
      rating: 4.4,
      healthScore: 86,
      category: "Beauty & Wellness",
      benefits: ["Skin Health", "Joint Support"],
      organic: false,
      vegetarian: false,
      image: "https://images.unsplash.com/photo-1628882799745-922b9ff99a19?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Green Tea Extract",
      brand: "NaturePure",
      price: 19.99,
      rating: 4.6,
      healthScore: 88,
      category: "Herbal",
      benefits: ["Antioxidants", "Weight Management"],
      organic: true,
      vegetarian: true,
      image: "https://images.unsplash.com/photo-1597318181353-54b6d3910071?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      name: "Magnesium Supplement",
      brand: "MineralsPlus",
      price: 22.99,
      rating: 4.3,
      healthScore: 85,
      category: "Minerals",
      benefits: ["Sleep Support", "Muscle Function"],
      organic: false,
      vegetarian: true,
      image: "https://images.unsplash.com/photo-1630526724344-935b018a1a38?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      name: "Turmeric Curcumin",
      brand: "HerbalWise",
      price: 27.99,
      rating: 4.7,
      healthScore: 93,
      category: "Herbal",
      benefits: ["Anti-Inflammatory", "Joint Health"],
      organic: true,
      vegetarian: true,
      image: "https://images.unsplash.com/photo-1552089123-2d26226fc2b7?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Premium Health Products</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover high-quality supplements and health products with AI-powered health insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {healthProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.brand}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                <div className={`text-sm font-medium ${getHealthScoreColor(product.healthScore)}`}>
                  Health Score: {product.healthScore}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {product.organic && (
                  <Badge variant="secondary" className="text-xs">
                    <Leaf className="h-3 w-3 mr-1" />
                    Organic
                  </Badge>
                )}
                {product.vegetarian && (
                  <Badge variant="secondary" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Vegetarian
                  </Badge>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium">Key Benefits:</p>
                <div className="flex flex-wrap gap-1">
                  {product.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthProductsSection;
