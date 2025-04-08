
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, Utensils, FileText, Activity, BarChart2, 
  Calendar, Star, Download, ShoppingCart, Crown, 
  ArrowRight, Book, Phone, MessageSquare, UserCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PremiumUnlocked = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
          <Tabs defaultValue="workouts" className="w-full">
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-5 mb-8">
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
              <TabsTrigger value="benefits" className="text-center py-3">
                <Star className="h-4 w-4 mr-2" /> Benefits
              </TabsTrigger>
            </TabsList>
            
            {/* Workouts Tab */}
            <TabsContent value="workouts" className="mt-0">
              <h3 className="text-2xl font-bold mb-6">Premium Workout Programs</h3>
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
              <h3 className="text-2xl font-bold mb-6">Personalized Diet Chart System</h3>
              <Card className="mb-8 border-2 border-dashed border-gray-200 dark:border-gray-700 p-6">
                <CardHeader className="pb-2">
                  <CardTitle>Generate Your Custom Diet Plan</CardTitle>
                  <CardDescription>Select your goal and preferences to create a tailored nutrition plan</CardDescription>
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
                  
                  <div className="pt-4">
                    <Button className="w-full bg-health-primary hover:bg-health-dark">
                      Generate My Diet Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Diet Plan Features</CardTitle>
                      <Utensils className="h-5 w-5 text-health-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <CheckItem />
                        </div>
                        <span>Breakfast-lunch-dinner-snack meal plan</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <CheckItem />
                        </div>
                        <span>Calorie and macronutrient breakdowns</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <CheckItem />
                        </div>
                        <span>Alternative meal suggestions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <CheckItem />
                        </div>
                        <span>
                          <Button variant="ghost" className="px-0 h-auto" onClick={() => {}}>
                            Export as PDF <Download className="ml-1 h-4 w-4" />
                          </Button>
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Weekly Grocery List</CardTitle>
                      <ShoppingCart className="h-5 w-5 text-health-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      Automatically generated shopping list based on your meal plan.
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Grocery List
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Progress Tracker Tab */}
            <TabsContent value="tracker" className="mt-0">
              <h3 className="text-2xl font-bold mb-6">Monthly Progress Tracker</h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl text-center mb-8">
                <BarChart2 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-medium mb-2">Start Tracking Your Progress</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Record your workouts, measurements, and see your progress visualized over time.
                </p>
                <Button>Initialize Tracker</Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="mr-2 h-5 w-5 text-health-primary" />
                      Workout Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Log completed workouts and track calories burned over time.
                    </p>
                    <Button variant="outline" size="sm">Log Workout</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="mr-2 h-5 w-5 text-health-primary" />
                      Body Measurements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Record weight, waist size, muscle percentage, and more.
                    </p>
                    <Button variant="outline" size="sm">Log Measurements</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <BarChart2 className="mr-2 h-5 w-5 text-health-primary" />
                      Visualizations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Graph-based visualizations of your progress journey.
                    </p>
                    <Button variant="outline" size="sm">View Graphs</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Blog Articles Tab */}
            <TabsContent value="blogs" className="mt-0">
              <h3 className="text-2xl font-bold mb-6">Premium Health Articles</h3>
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
              
              <div className="mt-8 text-center">
                <Button className="bg-health-primary hover:bg-health-dark">
                  <Book className="mr-2 h-4 w-4" />
                  View All Premium Articles
                </Button>
              </div>
            </TabsContent>
            
            {/* Benefits Tab */}
            <TabsContent value="benefits" className="mt-0">
              <h3 className="text-2xl font-bold mb-6">Premium Member Benefits</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <div className="bg-health-light dark:bg-health-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 text-health-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <CardTitle>Doctor Consultation Discount</CardTitle>
                    <CardDescription>20% off on all online doctor consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Use your premium status to get discounted rates when booking doctor appointments through our platform.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/doctor-consultation')}>
                      Book Consultation
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <div className="bg-health-light dark:bg-health-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 text-health-primary">
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <CardTitle>Free Fitness Consultation</CardTitle>
                    <CardDescription>One complimentary fitness coaching call</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Schedule your free 30-minute session with a certified fitness coach to discuss your goals.
                    </p>
                    <Button variant="outline" className="w-full">
                      Schedule Call
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2">
                  <CardHeader>
                    <div className="bg-health-light dark:bg-health-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 text-health-primary">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <CardTitle>Priority Chat Support</CardTitle>
                    <CardDescription>Get faster responses in our health chatbot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Premium members receive priority handling of their queries in our AI chat assistant.
                    </p>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/chat')}>
                      Try Premium Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
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

const CheckItem = () => (
  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-green-600"
    >
      <path 
        d="M10 3L4.5 8.5L2 6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default PremiumUnlocked;
