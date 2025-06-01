
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, Activity, Brain, Flower } from 'lucide-react';

const GenderSpecificContent = () => {
  const { user, profileData } = useAuth();
  
  // Only show if user is logged in and identified as female
  if (!user || !profileData?.gender || profileData.gender !== 'female') {
    return null;
  }

  const femaleHealthFeatures = [
    {
      icon: <Calendar className="h-6 w-6 text-pink-500" />,
      title: "Period Tracking",
      description: "Track your menstrual cycle and get personalized insights",
      badge: "Coming Soon"
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Reproductive Health",
      description: "Comprehensive guidance for reproductive wellness",
      badge: "Premium"
    },
    {
      icon: <Activity className="h-6 w-6 text-purple-500" />,
      title: "Hormonal Balance",
      description: "Manage hormonal health through nutrition and lifestyle",
      badge: "Available"
    },
    {
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      title: "Mental Wellness",
      description: "Mental health support tailored for women",
      badge: "Premium"
    },
    {
      icon: <Flower className="h-6 w-6 text-green-500" />,
      title: "Pregnancy Support",
      description: "Guidance through all stages of pregnancy",
      badge: "Premium"
    }
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-2 px-3 py-1 border-pink-200 text-pink-700">
          <Heart className="mr-2 h-4 w-4" /> Women's Health
        </Badge>
        <h2 className="text-2xl font-bold mb-4">Specialized Care for Women</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Access specialized health features designed specifically for women's unique health needs and lifecycle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {femaleHealthFeatures.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-pink-200 transition-all duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-full w-fit">
                {feature.icon}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <Badge variant={feature.badge === 'Premium' ? 'default' : feature.badge === 'Coming Soon' ? 'secondary' : 'outline'} className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <CardDescription className="text-sm">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GenderSpecificContent;
