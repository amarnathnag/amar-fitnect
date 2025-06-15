
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Heart, Leaf, Sparkles, TrendingUp } from 'lucide-react';

const HealthFocusedHero = () => {
  const healthStats = [
    { icon: Award, label: 'Health Scored Products', value: '30+', color: 'text-green-600' },
    { icon: Leaf, label: 'Organic Options', value: '5+', color: 'text-emerald-600' },
    { icon: Heart, label: 'Vegan Products', value: '15+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Avg Health Score', value: '8.7/10', color: 'text-blue-600' }
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-blue-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Health-Focused Marketplace
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover carefully curated products with detailed health ratings, organic options, and nutritional benefits
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {healthStats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white/90 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm hover:bg-green-200 transition-colors">
          <Award className="h-4 w-4 mr-2" />
          Health Score Rated
        </Badge>
        <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2 text-sm hover:bg-emerald-200 transition-colors">
          <Leaf className="h-4 w-4 mr-2" />
          Organic Certified
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 px-4 py-2 text-sm hover:bg-purple-200 transition-colors">
          <Heart className="h-4 w-4 mr-2" />
          Plant-Based Options
        </Badge>
      </div>
    </div>
  );
};

export default HealthFocusedHero;
