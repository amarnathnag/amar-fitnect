
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dumbbell, 
  Utensils, 
  BarChart3, 
  BookOpen, 
  ArrowRight,
  Crown,
  Plus
} from 'lucide-react';

const PremiumHeroSection = () => {
  const premiumFeatures = [
    {
      title: "Smart Workout Plans",
      description: "AI-powered workout routines tailored to your goals",
      icon: <Dumbbell className="h-8 w-8 text-health-primary" />,
      href: "/premium-unlocked?tab=workouts",
      action: "View Workouts",
      stats: "15+ Programs Available"
    },
    {
      title: "Custom Diet Creator",
      description: "Create and save personalized meal plans",
      icon: <Utensils className="h-8 w-8 text-health-primary" />,
      href: "/premium-unlocked?tab=diet",
      action: "Create Diet Plan",
      stats: "Save unlimited plans"
    },
    {
      title: "Progress Tracker",
      description: "Track your fitness journey with detailed analytics",
      icon: <BarChart3 className="h-8 w-8 text-health-primary" />,
      href: "/premium-unlocked?tab=tracker",
      action: "Track Progress",
      stats: "Monthly reports included"
    },
    {
      title: "Premium Articles",
      description: "Access exclusive health and wellness content",
      icon: <BookOpen className="h-8 w-8 text-health-primary" />,
      href: "/premium-unlocked?tab=blogs",
      action: "Read Articles",
      stats: "50+ Expert articles"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-health-primary/10 to-health-accent/10 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 px-4 py-2 rounded-full mb-4">
            <Crown className="h-5 w-5 text-amber-600" />
            <span className="text-amber-800 dark:text-amber-300 font-semibold">Premium Access Unlocked</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Complete Health <span className="text-health-primary">Ecosystem</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access all premium features to transform your health journey with personalized workouts, custom diet plans, progress tracking, and expert content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumFeatures.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-health-primary transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 p-3 bg-health-light dark:bg-health-primary/10 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {feature.stats}
                </div>
                <Button asChild className="w-full bg-health-primary hover:bg-health-dark">
                  <Link to={feature.href}>
                    {feature.action} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-health-primary to-health-accent text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Start Creating Your Custom Plans</h3>
              <p className="mb-6 opacity-90">
                Begin your personalized health journey with AI-powered recommendations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" asChild>
                  <Link to="/premium-unlocked?tab=diet">
                    <Plus className="mr-2 h-4 w-4" /> Create Diet Plan
                  </Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/premium-unlocked?tab=workouts">
                    <Dumbbell className="mr-2 h-4 w-4" /> Start Workout
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PremiumHeroSection;
