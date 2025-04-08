import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bot, Brain, Star, Sparkles, CheckCircle, Crown, Calendar, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

import { X, Utensils, Dumbbell, Activity, Moon, Heart } from 'lucide-react';

const PremiumAi = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isPremium = false;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {!isPremium ? (
          <PremiumUpsell />
        ) : (
          <PremiumDashboard />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

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
              onClick={() => navigate('/subscription')}
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
            onClick={() => navigate('/subscription')}
          >
            <Crown className="mr-2 h-5 w-5" /> Get Premium Access
          </Button>
        </div>
      </div>
    </div>
  );
};

const PremiumDashboard = () => {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Badge variant="default" className="mb-2 bg-yellow-500">
              <Crown className="mr-2 h-4 w-4" /> Premium Active
            </Badge>
            <h1 className="text-3xl font-bold">Your Premium Dashboard</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" /> Manage Subscription
          </Button>
        </div>
        
        <Tabs defaultValue="ai-tools">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="ai-tools" className="text-center py-3">
              <Brain className="h-4 w-4 mr-2" /> AI Tools
            </TabsTrigger>
            <TabsTrigger value="premium-content" className="text-center py-3">
              <FileText className="h-4 w-4 mr-2" /> Premium Content
            </TabsTrigger>
            <TabsTrigger value="health-reports" className="text-center py-3">
              <CheckCircle className="h-4 w-4 mr-2" /> My Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-tools" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PremiumToolCard 
                title="AI Diet Generator" 
                description="Create personalized meal plans based on your health profile"
                icon={<Utensils className="h-5 w-5" />}
                action={() => {}}
              />
              <PremiumToolCard 
                title="Workout Builder" 
                description="Generate custom workout routines tailored to your fitness level"
                icon={<Dumbbell className="h-5 w-5" />}
                action={() => {}}
              />
              <PremiumToolCard 
                title="Health Assistant" 
                description="Get answers to complex health questions from our advanced AI"
                icon={<Bot className="h-5 w-5" />}
                action={() => {}}
              />
              <PremiumToolCard 
                title="Condition Manager" 
                description="Receive guidance for managing specific health conditions"
                icon={<Activity className="h-5 w-5" />}
                action={() => {}}
              />
              <PremiumToolCard 
                title="Sleep Optimizer" 
                description="Analyze your sleep patterns and get personalized recommendations"
                icon={<Moon className="h-5 w-5" />}
                action={() => {}}
              />
              <PremiumToolCard 
                title="Stress Tracker" 
                description="Monitor stress levels and learn personalized coping techniques"
                icon={<Heart className="h-5 w-5" />}
                action={() => {}}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="premium-content" className="mt-0">
            <p className="text-center text-lg mb-8">
              Access exclusive health articles, research, and educational resources.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2">New</Badge>
                  <CardTitle className="text-lg">Advanced HIIT Protocols for Fat Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Learn the science-backed high-intensity interval training methods for optimal fat loss.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Article</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2" variant="outline">Research</Badge>
                  <CardTitle className="text-lg">Nutrition Strategies for Hormonal Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover dietary approaches to support optimal hormonal health for both men and women.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Article</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2" variant="secondary">Guide</Badge>
                  <CardTitle className="text-lg">Sleep Optimization Blueprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A comprehensive guide to improving sleep quality for better health and recovery.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Article</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="health-reports" className="mt-0">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium mb-2">No Reports Generated Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start using our premium tools to generate personalized health reports and insights.
              </p>
              <Button>Generate Your First Report</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const PremiumFeature = ({ title, description }: { title: string; description: string }) => (
  <li className="flex">
    <Sparkles className="h-5 w-5 text-health-primary mr-3 flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </li>
);

const ComparisonRow = ({ 
  feature, 
  free, 
  premium, 
  highlight = false 
}: { 
  feature: string; 
  free: boolean | string; 
  premium: boolean | string;
  highlight?: boolean;
}) => (
  <tr className="border-b border-gray-200 dark:border-gray-700">
    <td className="px-4 py-3">{feature}</td>
    <td className="px-4 py-3 text-center">
      {typeof free === 'boolean' ? (
        free ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
      ) : (
        <span className="text-sm">{free}</span>
      )}
    </td>
    <td className={`px-4 py-3 text-center ${highlight ? 'bg-health-light dark:bg-health-primary/10' : ''}`}>
      {typeof premium === 'boolean' ? (
        premium ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />
      ) : (
        <span className="text-sm font-medium">{premium}</span>
      )}
    </td>
  </tr>
);

const PremiumToolCard = ({ 
  title, 
  description, 
  icon, 
  action 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  action: () => void;
}) => (
  <Card className="hover:shadow-md transition-all duration-300">
    <CardHeader>
      <div className="bg-health-light dark:bg-health-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-health-primary">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="outline" className="w-full" onClick={action}>
        Launch Tool
      </Button>
    </CardFooter>
  </Card>
);

export default PremiumAi;
