
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                <Heart className="h-12 w-12 text-gray-400" />
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
