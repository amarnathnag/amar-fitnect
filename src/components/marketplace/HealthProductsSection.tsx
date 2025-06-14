
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Leaf, Award, ShoppingCart } from 'lucide-react';

const HealthProductsSection = () => {
  const healthProducts = [
    {
      id: 1,
      name: "Organic Whey Protein Isolate",
      brand: "HealthFit Pro",
      price: 49.99,
      rating: 4.8,
      healthScore: 95,
      category: "Protein Supplements",
      benefits: ["Muscle Building", "Post-Workout Recovery", "Weight Management"],
      organic: true,
      vegetarian: true,
      description: "25g of pure protein per serving with all essential amino acids",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Advanced Multivitamin Complex",
      brand: "VitalLife",
      price: 32.99,
      rating: 4.6,
      healthScore: 92,
      category: "Vitamins & Minerals",
      benefits: ["Immune Support", "Energy Boost", "Antioxidant Protection"],
      organic: false,
      vegetarian: true,
      description: "Complete daily nutrition with 25+ vitamins and minerals",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Premium Omega-3 Fish Oil",
      brand: "PureHealth",
      price: 28.99,
      rating: 4.7,
      healthScore: 89,
      category: "Essential Fatty Acids",
      benefits: ["Heart Health", "Brain Function", "Joint Support"],
      organic: true,
      vegetarian: false,
      description: "1000mg EPA/DHA per serving from wild-caught fish",
      image: "https://plus.unsplash.com/premium_photo-1675798831631-f8238cec7632?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "50 Billion Probiotic Complex",
      brand: "GutWell",
      price: 38.99,
      rating: 4.5,
      healthScore: 91,
      category: "Digestive Health",
      benefits: ["Digestive Support", "Gut Health", "Immune Function"],
      organic: true,
      vegetarian: true,
      description: "Multi-strain probiotics for optimal digestive wellness",
      image: "https://images.unsplash.com/photo-1607619056574-7d8d3ee536b2?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Hydrolyzed Collagen Peptides",
      brand: "BeautyBoost",
      price: 42.99,
      rating: 4.4,
      healthScore: 86,
      category: "Beauty & Wellness",
      benefits: ["Skin Health", "Joint Support", "Hair & Nails"],
      organic: false,
      vegetarian: false,
      description: "Type I & III collagen for youthful skin and strong joints",
      image: "https://images.unsplash.com/photo-1628882799745-922b9ff99a19?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Organic Green Tea Extract",
      brand: "NaturePure",
      price: 24.99,
      rating: 4.6,
      healthScore: 88,
      category: "Herbal Supplements",
      benefits: ["Antioxidants", "Weight Management", "Energy"],
      organic: true,
      vegetarian: true,
      description: "Standardized EGCG content for maximum antioxidant benefits",
      image: "https://images.unsplash.com/photo-1597318181353-54b6d3910071?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      name: "Magnesium Glycinate 400mg",
      brand: "MineralsPlus",
      price: 26.99,
      rating: 4.3,
      healthScore: 85,
      category: "Minerals",
      benefits: ["Sleep Support", "Muscle Function", "Stress Relief"],
      organic: false,
      vegetarian: true,
      description: "High-absorption magnesium for better sleep and recovery",
      image: "https://images.unsplash.com/photo-1630526724344-935b018a1a38?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      name: "Turmeric Curcumin with BioPerine",
      brand: "HerbalWise",
      price: 31.99,
      rating: 4.7,
      healthScore: 93,
      category: "Anti-Inflammatory",
      benefits: ["Anti-Inflammatory", "Joint Health", "Antioxidant"],
      organic: true,
      vegetarian: true,
      description: "95% curcuminoids with black pepper for enhanced absorption",
      image: "https://images.unsplash.com/photo-1552089123-2d26226fc2b7?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 9,
      name: "Plant-Based Protein Blend",
      brand: "VeganPower",
      price: 44.99,
      rating: 4.5,
      healthScore: 87,
      category: "Plant Protein",
      benefits: ["Muscle Building", "Vegan Friendly", "Digestive Health"],
      organic: true,
      vegetarian: true,
      description: "Pea, hemp, and rice protein blend with digestive enzymes",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 10,
      name: "Vitamin D3 + K2 Complex",
      brand: "BoneHealth",
      price: 29.99,
      rating: 4.6,
      healthScore: 90,
      category: "Bone Health",
      benefits: ["Bone Strength", "Immune Support", "Calcium Absorption"],
      organic: false,
      vegetarian: true,
      description: "5000 IU D3 with K2 for optimal bone and cardiovascular health",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-yellow-600 bg-yellow-100";
    return "text-orange-600 bg-orange-100";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Premium Health Supplements</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover scientifically-backed supplements with AI-powered health insights and detailed nutritional information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {healthProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
                />
              </div>
              <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
              <CardDescription className="font-medium">{product.brand}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {product.description}
                </p>
              )}

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                <Badge className={`text-xs font-semibold ${getHealthScoreColor(product.healthScore)}`}>
                  Health Score: {product.healthScore}
                </Badge>
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
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Key Benefits:</p>
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
