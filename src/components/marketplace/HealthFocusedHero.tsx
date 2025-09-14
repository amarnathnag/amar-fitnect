
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Heart, Leaf, Sparkles, TrendingUp } from 'lucide-react';

const HealthFocusedHero = () => {
  const healthStats = [
    { icon: Award, label: 'Health Scored Products', value: '2,500+', color: 'text-green-600', gradient: 'from-green-500 to-emerald-500' },
    { icon: Leaf, label: 'Organic Certified', value: '850+', color: 'text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Heart, label: 'Plant-Based Options', value: '1,200+', color: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Avg Health Score', value: '9.2/10', color: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' }
  ];

  const premiumFeatures = [
    'AI-Powered Health Recommendations',
    'Personalized Nutrition Analysis',
    'Premium Organic Products',
    'Expert Diet Consultations'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-blue-900/20 rounded-3xl p-8 mb-8 border border-green-100 dark:border-green-800">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-700 dark:to-emerald-700 rounded-full blur-3xl opacity-20 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-700 rounded-full blur-2xl opacity-20 translate-y-12 -translate-x-12"></div>
      
      <div className="relative text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Premium Health Marketplace
          </h2>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Discover premium health products with AI-powered recommendations, detailed nutritional analysis, and personalized health insights
        </p>
        
        {/* Premium Features */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {premiumFeatures.map((feature, index) => (
            <Badge 
              key={index}
              className="bg-white/80 text-gray-700 px-4 py-2 text-sm border border-green-200 hover:bg-white hover:shadow-md transition-all duration-300 backdrop-blur-sm"
            >
              ✨ {feature}
            </Badge>
          ))}
        </div>
        
        <div className="mt-6">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 text-sm hover:shadow-lg transition-all duration-300 animate-pulse">
            🚀 New: AI Health Assistant Available - Upgrade to Premium!
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {healthStats.map((stat, index) => (
          <Card key={index} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
            <CardContent className="p-6 text-center relative overflow-hidden">
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              
              {/* Stats */}
              <div className="relative">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">
                  {stat.label}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 text-sm hover:shadow-lg transition-all duration-300 border border-green-200">
          <Award className="h-4 w-4 mr-2" />
          AI Health Score System
        </Badge>
        <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 py-3 text-sm hover:shadow-lg transition-all duration-300 border border-emerald-200">
          <Leaf className="h-4 w-4 mr-2" />
          100% Organic Verified
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-3 text-sm hover:shadow-lg transition-all duration-300 border border-purple-200">
          <Heart className="h-4 w-4 mr-2" />
          Premium Plant-Based
        </Badge>
        <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-6 py-3 text-sm hover:shadow-lg transition-all duration-300 border border-blue-200">
          <TrendingUp className="h-4 w-4 mr-2" />
          Expert Curated
        </Badge>
      </div>
    </div>
  );
};

export default HealthFocusedHero;
