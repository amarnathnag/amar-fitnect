
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Dumbbell, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PremiumProfiles = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium;
  
  // If user is not premium, show upgrade prompt instead
  if (!isPremium) {
    return (
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Premium Professional Profiles</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Upgrade to premium for exclusive access to top healthcare professionals and fitness experts.
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-amber-200/50 dark:border-amber-800/30">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Premium Feature Locked</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Access to doctor consultations and gym profiles is exclusive for premium members.
            </p>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600" asChild>
              <Link to="/subscription">
                Upgrade to Premium
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  // For premium users, show the full content
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Premium Professional Profiles</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with top healthcare professionals and fitness experts to reach your health goals faster.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctor Profiles */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-health-primary/10 to-health-accent/5 p-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-health-primary" />
                Doctor Profiles
              </CardTitle>
              <CardDescription>
                Get personalized care from certified medical professionals
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Our network includes specialists in various fields of medicine ready to provide:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-primary/20 flex items-center justify-center text-xs text-health-primary mt-0.5">✓</span>
                    <span>Online video consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-primary/20 flex items-center justify-center text-xs text-health-primary mt-0.5">✓</span>
                    <span>Personalized treatment plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-primary/20 flex items-center justify-center text-xs text-health-primary mt-0.5">✓</span>
                    <span>Follow-up support via chat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-primary/20 flex items-center justify-center text-xs text-health-primary mt-0.5">✓</span>
                    <span>Prescription management services</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-4" asChild>
                  <Link to="/doctor-consultation" className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Book a Consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Gym Owner Profiles */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-health-secondary/10 to-health-accent/5 p-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-health-secondary" />
                Gym Owner Profiles
              </CardTitle>
              <CardDescription>
                Discover top fitness facilities and expert trainers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Partner gyms offer premium services to help you reach your fitness goals:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-secondary/20 flex items-center justify-center text-xs text-health-secondary mt-0.5">✓</span>
                    <span>State-of-the-art equipment and facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-secondary/20 flex items-center justify-center text-xs text-health-secondary mt-0.5">✓</span>
                    <span>Certified personal trainers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-secondary/20 flex items-center justify-center text-xs text-health-secondary mt-0.5">✓</span>
                    <span>Group fitness classes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-health-secondary/20 flex items-center justify-center text-xs text-health-secondary mt-0.5">✓</span>
                    <span>Fitness assessment and progress tracking</span>
                  </li>
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-health-secondary text-health-secondary hover:bg-health-secondary hover:text-white" 
                  asChild
                >
                  <Link to="/gyms" className="flex items-center justify-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    View Gyms
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

export default PremiumProfiles;
