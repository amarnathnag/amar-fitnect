import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Lock, Target, Leaf, Heart, Dumbbell, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnhancedProductCard from './EnhancedProductCard';
import type { Product } from '@/types/product';

interface RecommendedForYouProps {
  onAddToCart: (product: Product, quantityOption?: any) => void;
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({ onAddToCart }) => {
  const { user, profileData, isProfileComplete } = useAuth();
  const { products, loading } = useProducts({});

  const isPremium = user?.isPremium;

  // Get recommendation icon based on fitness goal
  const getGoalIcon = (goal: string | null) => {
    switch (goal) {
      case 'weight_loss':
      case 'weight_gain':
        return <Scale className="h-4 w-4" />;
      case 'muscle_gain':
        return <Dumbbell className="h-4 w-4" />;
      case 'maintain_fitness':
        return <Heart className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  // Get goal display text
  const getGoalText = (goal: string | null) => {
    switch (goal) {
      case 'weight_loss':
        return 'Weight Loss';
      case 'weight_gain':
        return 'Weight Gain';
      case 'muscle_gain':
        return 'Muscle Building';
      case 'maintain_fitness':
        return 'Fitness Maintenance';
      default:
        return 'General Wellness';
    }
  };

  // Recommend products based on user profile
  const recommendedProducts = useMemo(() => {
    if (!products.length) return [];

    let filtered = [...products];

    // Filter based on food preference
    if (profileData?.food_preference === 'vegetarian') {
      filtered = filtered.filter(p => p.is_vegetarian || p.is_vegan);
    }

    // Score products based on fitness goals
    const scoredProducts = filtered.map(product => {
      let score = product.health_score || 5;

      // Boost organic products for health-focused goals
      if (product.is_organic) {
        score += 1;
      }

      // Fitness goal-specific scoring
      switch (profileData?.fitness_goal) {
        case 'weight_loss':
          // Prefer low-calorie, high-fiber products
          if (product.category === 'food' && product.is_organic) score += 2;
          if (product.subcategory?.toLowerCase().includes('salad') || 
              product.subcategory?.toLowerCase().includes('green')) score += 2;
          break;
        case 'muscle_gain':
        case 'weight_gain':
          // Prefer protein-rich products and supplements
          if (product.category === 'supplements') score += 2;
          if (product.name.toLowerCase().includes('protein') || 
              product.name.toLowerCase().includes('whey')) score += 3;
          break;
        case 'maintain_fitness':
          // Balanced nutrition
          if (product.health_score >= 8) score += 2;
          break;
      }

      return { ...product, recommendationScore: score };
    });

    // Sort by recommendation score and take top 4
    return scoredProducts
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 4);
  }, [products, profileData]);

  // Locked state for non-premium users
  if (!isPremium) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5" />
        
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">
                Recommended for You
              </span>
            </CardTitle>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unlock Personalized Recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Get AI-powered product suggestions based on your health goals, dietary preferences, and wellness journey.
            </p>
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

  // Profile incomplete state
  if (!isProfileComplete) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 border-purple-200 dark:border-purple-700">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
        
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                Recommended for You
              </span>
            </CardTitle>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 flex items-center justify-center">
              <Target className="h-10 w-10 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Complete Your Profile
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Set up your health goals and dietary preferences to get personalized product recommendations.
            </p>
            <Link to="/profile-setup">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                <Target className="h-4 w-4 mr-2" />
                Complete Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-700">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
              Loading Recommendations...
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // No recommendations available
  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-700">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-700 dark:to-emerald-700 rounded-full blur-3xl opacity-20 -translate-y-16 translate-x-16" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
              Recommended for You
            </span>
          </CardTitle>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
            <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-600 dark:text-green-400">
              {getGoalIcon(profileData?.fitness_goal || null)}
              <span className="ml-1">{getGoalText(profileData?.fitness_goal || null)}</span>
            </Badge>
            {profileData?.food_preference && (
              <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-400">
                <Leaf className="h-3 w-3 mr-1" />
                {profileData.food_preference === 'vegetarian' ? 'Vegetarian' : 'Non-Vegetarian'}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Personalized picks based on your health goals and dietary preferences
        </p>
      </CardHeader>

      <CardContent className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedProducts.map(product => (
            <EnhancedProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
