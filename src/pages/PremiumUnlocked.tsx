
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, Utensils, FileText, Activity, BarChart2, 
  Calendar, Star, Download, ShoppingCart, Crown, 
  ArrowRight, Book, Phone, MessageSquare, UserCheck, Plus, Save
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PremiumUnlocked = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'workouts');
  
  // In a real implementation, this would be determined by checking the user's subscription status
  const isPremium = true;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-health-primary to-health-accent py-6 mb-8">
          <div className="container-custom text-white">
            <div className="flex items-center mb-2">
              <Crown className="mr-2 h-5 w-5" />
              <h2 className="text-xl font-bold">Premium Access Unlocked</h2>
            </div>
            <p className="opacity-90">Welcome to your personalized health journey. Explore all premium features below.</p>
          </div>
        </div>
        
        <div className="container-custom mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-4 mb-8">
              <TabsTrigger value="workouts" className="text-center py-3">
                <Dumbbell className="h-4 w-4 mr-2" /> Workouts
              </TabsTrigger>
              <TabsTrigger value="diet" className="text-center py-3">
                <Utensils className="h-4 w-4 mr-2" /> Diet Plans
              </TabsTrigger>
              <TabsTrigger value="tracker" className="text-center py-3">
                <Activity className="h-4 w-4 mr-2" /> Progress
              </TabsTrigger>
              <TabsTrigger value="blogs" className="text-center py-3">
                <FileText className="h-4 w-4 mr-2" /> Articles
              </TabsTrigger>
            </TabsList>
            
            {/* Workouts Tab */}
            <TabsContent value="workouts" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Premium Workout Programs</h3>
                <Button className="bg-health-primary hover:bg-health-dark">
                  <Plus className="mr-2 h-4 w-4" /> Create Custom Workout
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <WorkoutProgramCard 
                  title="Full Body Fat Burn Program" 
                  description="Complete 3-week plan for maximum calorie burn and toning"
                  difficulty="Intermediate"
                  duration="3 weeks"
                  sessions={15}
                />
                
                <WorkoutProgramCard 
                  title="Muscle Gain Intensity Level 2" 
                  description="Progressive overload routine for visible muscle development"
                  difficulty="Advanced"
                  duration="4 weeks"
                  sessions={20}
                />
                
                <WorkoutProgramCard 
                  title="Mobility + Flexibility Routine" 
                  description="Improve joint health and flexibility with guided video routines"
                  difficulty="All Levels"
                  duration="Ongoing"
                  sessions={12}
                  hasVideo={true}
                />
                
                <WorkoutProgramCard 
                  title="PCOS & Thyroid-Friendly Workout" 
                  description="Adaptive exercises designed for hormonal health conditions"
                  difficulty="Beginner"
                  duration="6 weeks"
                  sessions={18}
                  isAdaptive={true}
                />
              </div>
            </TabsContent>
            
            {/* Diet Tab */}
            <TabsContent value="diet" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Custom Diet Plan Creator</h3>
                <Button className="bg-health-primary hover:bg-health-dark">
                  <Plus className="mr-2 h-4 w-4" /> Create New Diet Plan
                </Button>
              </div>
              
              <DietCreatorSection />
            </TabsContent>
            
            {/* Progress Tracker Tab */}
            <TabsContent value="tracker" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Progress Tracking Dashboard</h3>
                <Button variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" /> View Full Analytics
                </Button>
              </div>
              
              <ProgressTrackerSection />
            </TabsContent>
            
            {/* Blog Articles Tab */}
            <TabsContent value="blogs" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Premium Health Articles</h3>
                <Button variant="outline">
                  <Book className="mr-2 h-4 w-4" /> Browse All Articles
                </Button>
              </div>
              
              <BlogArticlesSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Diet Creator Section Component
const DietCreatorSection = () => {
  const [savedPlans, setSavedPlans] = useState([
    { id: 1, name: "Weight Loss Plan", createdAt: "2024-01-15", type: "Weight Loss" },
    { id: 2, name: "Muscle Gain Diet", createdAt: "2024-01-10", type: "Muscle Gain" },
  ]);

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Create Your Custom Diet Plan</CardTitle>
          <CardDescription>Use our AI-powered diet generator to create personalized meal plans</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                <Activity className="h-6 w-6" />
              </div>
              <span>Weight Loss</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                <Dumbbell className="h-6 w-6" />
              </div>
              <span>Muscle Gain</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                <Activity className="h-6 w-6" />
              </div>
              <span>Thyroid Control</span>
            </Button>
          </div>
          
          <Button className="w-full bg-health-primary hover:bg-health-dark">
            Generate My Diet Plan
          </Button>
        </CardContent>
      </Card>

      <div>
        <h4 className="text-lg font-semibold mb-4">Your Saved Diet Plans</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {savedPlans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <Badge variant="outline">{plan.type}</Badge>
                </div>
                <CardDescription>Created on {plan.createdAt}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress Tracker Section Component
const ProgressTrackerSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-lg">
              <Activity className="mr-2 h-5 w-5 text-health-primary" />
              Workouts Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-health-primary mb-2">12</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-health-primary" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-health-primary mb-2">7</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Days active</p>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-lg">
              <BarChart2 className="mr-2 h-5 w-5 text-health-primary" />
              Weight Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-health-primary mb-2">-2.5kg</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Track New Measurement</CardTitle>
          <CardDescription>Log your progress to see detailed analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4">
              <div className="text-center">
                <Activity className="h-6 w-6 mx-auto mb-2" />
                <div>Log Workout</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="text-center">
                <BarChart2 className="h-6 w-6 mx-auto mb-2" />
                <div>Record Weight</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2" />
                <div>Body Measurements</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Blog Articles Section Component
const BlogArticlesSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <Badge className="w-fit mb-2">Expert Article</Badge>
          <CardTitle className="text-lg">Hormonal Balance for Women: The Complete Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            A comprehensive look at maintaining hormonal health through diet, exercise, and lifestyle changes.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Read Article</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <Badge className="w-fit mb-2" variant="outline">Nutrition</Badge>
          <CardTitle className="text-lg">Building Mental Resilience Through Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            How regular physical activity can transform your mindset and mental health.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Read Article</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <Badge className="w-fit mb-2" variant="secondary">Myth Busting</Badge>
          <CardTitle className="text-lg">Sugar and Thyroid: Separating Fact from Fiction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Scientific research on the actual relationship between sugar consumption and thyroid function.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Read Article</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Helper components
const WorkoutProgramCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  sessions,
  hasVideo = false,
  isAdaptive = false
}: { 
  title: string; 
  description: string; 
  difficulty: string;
  duration: string;
  sessions: number;
  hasVideo?: boolean;
  isAdaptive?: boolean;
}) => (
  <Card className="overflow-hidden border-2 hover:border-health-primary transition-all duration-300">
    <div className="bg-gray-100 dark:bg-gray-800 h-32 flex items-center justify-center">
      <Dumbbell className="h-16 w-16 text-gray-400" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>{title}</CardTitle>
        {hasVideo && <Badge variant="outline">Video</Badge>}
        {isAdaptive && <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Adaptive</Badge>}
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="grid grid-cols-3 gap-2 text-sm mb-4">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
          <p className="font-medium">{difficulty}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Duration</p>
          <p className="font-medium">{duration}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Sessions</p>
          <p className="font-medium">{sessions}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-health-primary hover:bg-health-dark">
        Start Program <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

export default PremiumUnlocked;
