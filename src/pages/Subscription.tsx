
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, ShieldCheck, BadgeCheck, CreditCard, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Subscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to subscribe to a premium plan",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    // Track plan selection for analytics (could be implemented later)
    const selectedPlan = plan === 'monthly' ? 'Monthly Premium' : 'Annual Premium';
    console.log(`Selected plan: ${selectedPlan}`);
    
    // Redirect to payment page
    navigate('/premium-payment', { 
      state: { 
        plan: plan, 
        price: plan === 'monthly' ? 99 : 999,
        discount: plan === 'annual' ? 189 : 0
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 px-3 py-1 border-health-primary text-health-primary">
              Premium Plans
            </Badge>
            <h1 className="text-4xl font-bold mb-3">Unlock Your Full Health Potential</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your needs and start your journey to better health with personalized recommendations, AI-powered insights, and expert guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mx-auto max-w-4xl">
            <Card className="border-2 hover:border-health-primary hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Monthly Premium</CardTitle>
                <CardDescription>Perfect for short-term health goals</CardDescription>
                <div className="mt-3 space-y-1">
                  <span className="text-4xl font-bold">₹99</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-3">
                  <FeatureItem included>Full access to all workouts</FeatureItem>
                  <FeatureItem included>AI-powered diet recommendations</FeatureItem>
                  <FeatureItem included>Progress tracking</FeatureItem>
                  <FeatureItem included>Health reports</FeatureItem>
                  <FeatureItem included>10% off doctor consultations</FeatureItem>
                  <FeatureItem>Priority customer support</FeatureItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe('monthly')} 
                  className="w-full py-6 text-lg bg-health-primary hover:bg-health-dark"
                >
                  <CreditCard className="mr-2 h-5 w-5" /> Subscribe Monthly
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-health-primary relative shadow-lg">
              <div className="absolute -top-4 right-4">
                <Badge className="bg-health-accent text-white px-3 py-1 flex items-center">
                  <Zap className="mr-1 h-4 w-4" /> Best Value
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Annual Premium</CardTitle>
                <CardDescription>For committed health transformation</CardDescription>
                <div className="mt-3 space-y-1">
                  <span className="text-4xl font-bold">₹999</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                  <div className="text-health-accent font-medium">Save ₹189</div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-3">
                  <FeatureItem included>Full access to all workouts</FeatureItem>
                  <FeatureItem included>AI-powered diet recommendations</FeatureItem>
                  <FeatureItem included>Progress tracking</FeatureItem>
                  <FeatureItem included>Health reports</FeatureItem>
                  <FeatureItem included>20% off doctor consultations</FeatureItem>
                  <FeatureItem included>Priority customer support</FeatureItem>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe('annual')} 
                  className="w-full py-6 text-lg bg-gradient-to-r from-health-primary to-health-accent hover:from-health-dark hover:to-health-accent/90 text-white"
                >
                  <Gift className="mr-2 h-5 w-5" /> Subscribe Yearly
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-16 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Premium Benefits Include</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <BenefitCard 
                title="Advanced Workouts" 
                description="Access to exclusive premium workout routines tailored to your specific goals."
                icon="Dumbbell"
              />
              <BenefitCard 
                title="Personalized Diet Plans" 
                description="AI-generated meal plans based on your health conditions and preferences."
                icon="Utensils"
              />
              <BenefitCard 
                title="Expert Consultations" 
                description="Discounted rates for one-on-one sessions with certified health professionals."
                icon="Users"
              />
              <BenefitCard 
                title="Health Insights" 
                description="Detailed analytics and reports to track your progress and health improvements."
                icon="BarChart2"
              />
              <BenefitCard 
                title="Premium Content" 
                description="Early access to health articles, research, and educational resources."
                icon="BookOpen"
              />
              <BenefitCard 
                title="Community Access" 
                description="Join exclusive groups with others on similar health journeys."
                icon="Heart"
              />
            </div>
          </div>
          
          {/* Premium Guarantees Section - New */}
          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Premium Guarantees</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <ShieldCheck className="h-12 w-12 text-health-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">30-Day Money Back</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If you're not satisfied with our premium features, get a full refund within 30 days.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <BadgeCheck className="h-12 w-12 text-health-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Expert-Verified Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All health information and recommendations are verified by medical professionals.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Zap className="h-12 w-12 text-health-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Continuous Updates</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Regular updates with new features, content, and improvements based on user feedback.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium mb-4">Still have questions?</h3>
            <Button variant="outline" onClick={() => navigate('/contact')} className="mx-auto">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const FeatureItem = ({ children, included = false }: { children: React.ReactNode; included?: boolean }) => (
  <li className="flex items-start">
    <span className="mr-2 mt-1 flex-shrink-0">
      {included ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />
      )}
    </span>
    <span className={included ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}>
      {children}
    </span>
  </li>
);

const BenefitCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  const IconComponent = () => {
    switch (icon) {
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6 text-health-primary" />;
      case 'Utensils':
        return <Utensils className="h-6 w-6 text-health-primary" />;
      case 'Users':
        return <Users className="h-6 w-6 text-health-primary" />;
      case 'BarChart2':
        return <BarChart2 className="h-6 w-6 text-health-primary" />;
      case 'BookOpen':
        return <BookOpen className="h-6 w-6 text-health-primary" />;
      case 'Heart':
        return <Heart className="h-6 w-6 text-health-primary" />;
      default:
        return <Zap className="h-6 w-6 text-health-primary" />;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
      <div className="mb-3">
        <IconComponent />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

import { Dumbbell, Utensils, Users, BarChart2, BookOpen, Heart } from 'lucide-react';

export default Subscription;
