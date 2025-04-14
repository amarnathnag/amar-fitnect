
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Crown, Star } from 'lucide-react';
import PremiumFeature from './PremiumFeature';
import ComparisonRow from './ComparisonRow';

const PremiumUpsell = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 px-3 py-1">
            <Crown className="mr-2 h-4 w-4 text-yellow-500" /> Premium Features
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Unlock Advanced AI Health Tools
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get personalized health recommendations, exclusive workout routines, and tailored meal plans powered by our advanced AI algorithms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">AI-Powered Health Features</h2>
            <ul className="space-y-4">
              <PremiumFeature 
                title="Personalized Diet Generator" 
                description="Get meal plans tailored to your health conditions, preferences, and goals."
              />
              <PremiumFeature 
                title="Advanced Fitness Analysis" 
                description="Receive workout recommendations based on your physical attributes and progress."
              />
              <PremiumFeature 
                title="Health Condition Management" 
                description="Detailed guidance for managing specific health conditions like PCOS, Diabetes, and Thyroid issues."
              />
              <PremiumFeature 
                title="Natural Language Health Queries" 
                description="Ask complex health questions and receive evidence-based responses."
              />
            </ul>
            <Button 
              className="mt-8 w-full bg-health-primary hover:bg-health-dark"
              onClick={() => navigate('/premium-payment')}
            >
              Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative bg-white dark:bg-gray-800 p-1 rounded-xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-health-primary/5 to-health-accent/5 rounded-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="AI Health Assistant" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md flex items-center">
              <Star className="text-yellow-500 h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Premium Experience</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left w-1/3">Features</th>
                  <th className="px-4 py-3 text-center">Free</th>
                  <th className="px-4 py-3 text-center bg-health-light dark:bg-health-primary/10 rounded-t-lg">Premium</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow 
                  feature="Basic Workouts" 
                  free={true} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="General Health Information" 
                  free={true} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="Progress Tracking" 
                  free="Limited" 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="Advanced AI Diet Plans" 
                  free={false} 
                  premium={true} 
                  highlight={true}
                />
                <ComparisonRow 
                  feature="Condition-Specific Routines" 
                  free={false} 
                  premium={true} 
                  highlight={true}
                />
                <ComparisonRow 
                  feature="Monthly Health Reports" 
                  free={false} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="Priority Chat Support" 
                  free={false} 
                  premium={true} 
                />
                <ComparisonRow 
                  feature="Doctor Consultation Discounts" 
                  free={false} 
                  premium="10-20%" 
                />
              </tbody>
              <tfoot>
                <tr>
                  <td className="px-4 py-4"></td>
                  <td className="px-4 py-4 text-center">
                    <Button variant="outline" disabled>Current Plan</Button>
                  </td>
                  <td className="px-4 py-4 text-center bg-health-light dark:bg-health-primary/10 rounded-b-lg">
                    <Button 
                      className="bg-health-primary hover:bg-health-dark"
                      onClick={() => navigate('/subscription')}
                    >
                      Subscribe Now
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to transform your health journey?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Join thousands of users who have achieved their health goals with our premium tools.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-health-primary to-health-accent hover:from-health-dark hover:to-health-accent/90"
            onClick={() => navigate('/premium-payment')}
          >
            <Crown className="mr-2 h-5 w-5" /> Get Premium Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpsell;
