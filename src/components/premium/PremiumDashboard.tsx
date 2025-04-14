
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Crown, Brain, FileText, 
  CheckCircle, Bot, Utensils, Dumbbell, 
  Activity, Moon, Heart 
} from 'lucide-react';
import PremiumToolCard from './PremiumToolCard';

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

export default PremiumDashboard;
