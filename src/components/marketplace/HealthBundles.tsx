import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown, Lock, Package, Sparkles, ArrowRight, 
  Scale, Dumbbell, Shield, Heart, Zap, Leaf,
  Check, ShoppingCart, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface BundleProduct {
  name: string;
  originalPrice: number;
}

interface HealthBundle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  products: BundleProduct[];
  originalTotal: number;
  discountedPrice: number;
  discountPercent: number;
  tag: string;
  benefits: string[];
}

const bundles: HealthBundle[] = [
  {
    id: 'weight-loss-kit',
    name: 'Weight Loss Starter Kit',
    description: 'Complete kit for your weight loss journey with premium supplements and healthy snacks',
    icon: <Scale className="h-6 w-6" />,
    gradient: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-200 dark:border-orange-700',
    products: [
      { name: 'Green Tea Extract', originalPrice: 599 },
      { name: 'Apple Cider Vinegar Gummies', originalPrice: 449 },
      { name: 'Protein Shake Mix', originalPrice: 899 },
      { name: 'Fiber Supplement', originalPrice: 349 },
    ],
    originalTotal: 2296,
    discountedPrice: 1599,
    discountPercent: 30,
    tag: 'Best Seller',
    benefits: ['Boost Metabolism', 'Suppress Appetite', 'Increase Energy']
  },
  {
    id: 'immunity-booster',
    name: 'Immunity Booster Pack',
    description: 'Strengthen your immune system with powerful vitamins and antioxidants',
    icon: <Shield className="h-6 w-6" />,
    gradient: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-200 dark:border-green-700',
    products: [
      { name: 'Vitamin C 1000mg', originalPrice: 399 },
      { name: 'Zinc + Elderberry', originalPrice: 549 },
      { name: 'Multivitamin Gold', originalPrice: 699 },
      { name: 'Turmeric Curcumin', originalPrice: 499 },
    ],
    originalTotal: 2146,
    discountedPrice: 1499,
    discountPercent: 30,
    tag: 'Popular',
    benefits: ['Enhanced Immunity', 'Antioxidant Protection', 'Daily Wellness']
  },
  {
    id: 'muscle-gain-pro',
    name: 'Muscle Gain Pro Bundle',
    description: 'Premium supplements for serious muscle building and recovery',
    icon: <Dumbbell className="h-6 w-6" />,
    gradient: 'from-blue-500 to-purple-500',
    borderColor: 'border-blue-200 dark:border-blue-700',
    products: [
      { name: 'Whey Protein Isolate', originalPrice: 1299 },
      { name: 'BCAA Complex', originalPrice: 699 },
      { name: 'Creatine Monohydrate', originalPrice: 499 },
      { name: 'Pre-Workout Energy', originalPrice: 599 },
    ],
    originalTotal: 3096,
    discountedPrice: 2199,
    discountPercent: 29,
    tag: 'Pro Choice',
    benefits: ['Build Muscle', 'Faster Recovery', 'Peak Performance']
  },
  {
    id: 'heart-health',
    name: 'Heart Health Essentials',
    description: 'Support cardiovascular health with omega-3s and heart-friendly nutrients',
    icon: <Heart className="h-6 w-6" />,
    gradient: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-200 dark:border-pink-700',
    products: [
      { name: 'Omega-3 Fish Oil', originalPrice: 599 },
      { name: 'CoQ10 200mg', originalPrice: 799 },
      { name: 'Magnesium Complex', originalPrice: 449 },
      { name: 'Garlic Extract', originalPrice: 299 },
    ],
    originalTotal: 2146,
    discountedPrice: 1549,
    discountPercent: 28,
    tag: 'Heart Smart',
    benefits: ['Healthy Heart', 'Lower Cholesterol', 'Better Circulation']
  },
  {
    id: 'energy-vitality',
    name: 'Energy & Vitality Pack',
    description: 'Natural energy boosters for sustained vitality throughout the day',
    icon: <Zap className="h-6 w-6" />,
    gradient: 'from-yellow-500 to-orange-500',
    borderColor: 'border-yellow-200 dark:border-yellow-700',
    products: [
      { name: 'Vitamin B12 Complex', originalPrice: 449 },
      { name: 'Iron + Vitamin C', originalPrice: 399 },
      { name: 'Ashwagandha Extract', originalPrice: 549 },
      { name: 'Ginseng Energy', originalPrice: 499 },
    ],
    originalTotal: 1896,
    discountedPrice: 1299,
    discountPercent: 32,
    tag: 'Top Rated',
    benefits: ['All-Day Energy', 'Mental Clarity', 'Reduced Fatigue']
  },
  {
    id: 'plant-power',
    name: 'Plant Power Bundle',
    description: 'Premium plant-based nutrition for vegans and health enthusiasts',
    icon: <Leaf className="h-6 w-6" />,
    gradient: 'from-teal-500 to-green-500',
    borderColor: 'border-teal-200 dark:border-teal-700',
    products: [
      { name: 'Plant Protein Blend', originalPrice: 999 },
      { name: 'Spirulina Superfood', originalPrice: 599 },
      { name: 'Vegan D3 + K2', originalPrice: 449 },
      { name: 'Chlorella Detox', originalPrice: 549 },
    ],
    originalTotal: 2596,
    discountedPrice: 1799,
    discountPercent: 31,
    tag: '100% Vegan',
    benefits: ['Plant Nutrition', 'Natural Detox', 'Sustainable Energy']
  },
];

interface HealthBundlesProps {
  onAddBundle: (bundle: HealthBundle) => void;
}

const HealthBundles: React.FC<HealthBundlesProps> = ({ onAddBundle }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addingBundle, setAddingBundle] = useState<string | null>(null);

  const isPremium = user?.isPremium;

  const handleAddBundle = (bundle: HealthBundle) => {
    setAddingBundle(bundle.id);
    
    setTimeout(() => {
      onAddBundle(bundle);
      toast({
        title: "Bundle Added! 🎉",
        description: `${bundle.name} has been added to your cart with ${bundle.discountPercent}% discount!`,
      });
      setAddingBundle(null);
    }, 500);
  };

  // Locked state for non-premium users
  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
        
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">
                Health Bundles
              </span>
            </CardTitle>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Lock className="h-3 w-3 mr-1" />
              Premium Feature
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 flex items-center justify-center">
              <Package className="h-10 w-10 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unlock Curated Health Bundles
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
              Get exclusive access to pre-curated health bundles with up to 32% discount on premium products.
            </p>
            
            {/* Preview of bundles */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {bundles.slice(0, 4).map(bundle => (
                <Badge 
                  key={bundle.id}
                  variant="outline" 
                  className={`${bundle.borderColor} opacity-60`}
                >
                  {bundle.icon}
                  <span className="ml-1">{bundle.name.split(' ')[0]}</span>
                </Badge>
              ))}
            </div>

            <Link to="/subscription">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 border-purple-200 dark:border-purple-700">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded-full blur-3xl opacity-20 -translate-y-20 translate-x-20" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              Health Bundles
            </span>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
            <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-600 dark:text-green-400">
              <Sparkles className="h-3 w-3 mr-1" />
              Up to 32% Off
            </Badge>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Pre-curated bundles designed by health experts for your wellness goals
        </p>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundles.map(bundle => (
            <Card 
              key={bundle.id} 
              className={`group relative overflow-hidden bg-white dark:bg-gray-800 ${bundle.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Tag */}
              <div className="absolute top-3 right-3 z-10">
                <Badge className={`bg-gradient-to-r ${bundle.gradient} text-white text-xs`}>
                  <Star className="h-3 w-3 mr-1" />
                  {bundle.tag}
                </Badge>
              </div>

              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${bundle.gradient} shadow-md`}>
                    {bundle.icon}
                    <div className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {bundle.description}
                    </p>
                  </div>
                </div>

                {/* Products list */}
                <div className="space-y-1.5 mb-3">
                  {bundle.products.map((product, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400 truncate max-w-[120px]">
                          {product.name}
                        </span>
                      </div>
                      <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {bundle.benefits.map((benefit, idx) => (
                    <Badge 
                      key={idx}
                      variant="secondary" 
                      className="text-[10px] px-1.5 py-0 bg-gray-100 dark:bg-gray-700"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-500 line-through">₹{bundle.originalTotal}</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      ₹{bundle.discountedPrice}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Save {bundle.discountPercent}%
                  </Badge>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  onClick={() => handleAddBundle(bundle)}
                  disabled={addingBundle === bundle.id}
                  className={`w-full bg-gradient-to-r ${bundle.gradient} hover:opacity-90 text-white shadow-md`}
                >
                  {addingBundle === bundle.id ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add Bundle to Cart
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthBundles;
