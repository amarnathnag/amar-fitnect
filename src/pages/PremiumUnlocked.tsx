
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dumbbell, Utensils, FileText, Activity, BarChart2,
  Calendar, Download, Book, Plus, Save, Play, Crown, Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DietPlanCreator from '@/components/diet/DietPlanCreator';
import { useDietPlans } from '@/hooks/useDietPlans';
import PremiumHeroSection from '@/components/premium/PremiumHeroSection';

const PremiumUnlocked = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dietPlans } = useDietPlans();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'workouts');
  
  // State for progress tracking
  const [currentWeight, setCurrentWeight] = useState('');
  const [workoutCount, setWorkoutCount] = useState('');
  
  const workoutPrograms = [
    {
      id: 1,
      title: "Full Body Fat Burn Program",
      description: "Complete 3-week plan for maximum calorie burn and toning",
      difficulty: "Intermediate",
      duration: "3 weeks",
      sessions: 15,
      exercises: [
        "Jumping Jacks - 3 sets of 30 seconds",
        "Push-ups - 3 sets of 12 reps",
        "Squats - 3 sets of 15 reps",
        "Burpees - 3 sets of 8 reps",
        "Plank - 3 sets of 45 seconds"
      ]
    },
    {
      id: 2,
      title: "Muscle Gain Intensity Level 2",
      description: "Progressive overload routine for visible muscle development",
      difficulty: "Advanced",
      duration: "4 weeks",
      sessions: 20,
      exercises: [
        "Deadlifts - 4 sets of 8 reps",
        "Bench Press - 4 sets of 10 reps",
        "Pull-ups - 4 sets of 6 reps",
        "Shoulder Press - 3 sets of 12 reps",
        "Barbell Rows - 4 sets of 10 reps"
      ]
    },
    {
      id: 3,
      title: "PCOS & Thyroid-Friendly Workout",
      description: "Adaptive exercises designed for hormonal health conditions",
      difficulty: "Beginner",
      duration: "6 weeks",
      sessions: 18,
      exercises: [
        "Walking - 30 minutes daily",
        "Yoga Flow - 20 minutes",
        "Light Weight Training - 3 sets of 12 reps",
        "Swimming - 25 minutes",
        "Stretching - 15 minutes"
      ]
    }
  ];

  const handleUpdateProgress = () => {
    if (currentWeight && workoutCount) {
      console.log('Updating progress:', { weight: currentWeight, workouts: workoutCount });
      alert('Progress updated successfully!');
    }
  };

  const handleStartWorkout = (workoutId: number) => {
    console.log('Starting workout:', workoutId);
    navigate('/workouts');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <PremiumHeroSection />
        
        {/* Premium Header with Navigation */}
        <div className="py-8 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-purple-200 dark:border-purple-800 shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 shadow-lg">
                    Premium Active
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Premium Health Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Access all premium features and AI-powered health tools
                </p>
              </div>
              <div className="flex gap-3 mt-4 lg:mt-0">
                <Button 
                  variant="outline" 
                  className="gap-2 bg-white/80 backdrop-blur-sm"
                  onClick={() => navigate('/premium-ai')}
                >
                  <Calendar className="h-4 w-4" /> AI Tools
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
                  onClick={() => navigate('/profile')}
                >
                  <Shield className="h-4 w-4" /> Account Settings
                </Button>
              </div>
            </div>
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
                <Button className="bg-health-primary hover:bg-health-dark" onClick={() => navigate('/workouts')}>
                  <Plus className="mr-2 h-4 w-4" /> Explore All Workouts
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workoutPrograms.map((workout) => (
                  <Card key={workout.id} className="overflow-hidden border-2 hover:border-health-primary transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{workout.title}</CardTitle>
                        <Badge variant="outline">{workout.difficulty}</Badge>
                      </div>
                      <CardDescription>{workout.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="font-medium">{workout.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Sessions</p>
                          <p className="font-medium">{workout.sessions}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sample Exercises:</p>
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <p key={index} className="text-xs text-gray-600 dark:text-gray-400">• {exercise}</p>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-health-primary hover:bg-health-dark"
                        onClick={() => handleStartWorkout(workout.id)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Program
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Diet Tab */}
            <TabsContent value="diet" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Custom Diet Plan Creator</h3>
              </div>
              
              <div className="space-y-6">
                <DietPlanCreator />

                <div>
                  <h4 className="text-lg font-semibold mb-4">Your Saved Diet Plans ({dietPlans.length})</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dietPlans.map((plan) => (
                      <Card key={plan.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <Badge variant="outline">{plan.goal.replace('-', ' ')}</Badge>
                          </div>
                          <CardDescription>Created on {new Date(plan.created_at).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pt-2">
                           <div className="flex gap-2 w-full">
                             <Button 
                               variant="outline" 
                               size="sm" 
                               className="flex-1"
                               onClick={() => {
                                 const dataStr = JSON.stringify(plan, null, 2);
                                 const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                                 const exportFileDefaultName = `${plan.name.replace(/\s+/g, '_')}_diet_plan.json`;
                                 const linkElement = document.createElement('a');
                                 linkElement.setAttribute('href', dataUri);
                                 linkElement.setAttribute('download', exportFileDefaultName);
                                 linkElement.click();
                               }}
                             >
                               <Download className="mr-2 h-4 w-4" /> Export
                             </Button>
                             <Button 
                               size="sm" 
                               className="flex-1"
                               onClick={() => navigate(`/diet-plans?plan=${plan.id}`)}
                             >
                               View Details
                             </Button>
                           </div>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {dietPlans.length === 0 && (
                      <Card className="col-span-full">
                        <CardContent className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No diet plans created yet. Create your first plan above!</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Progress Tracker Tab */}
            <TabsContent value="tracker" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Progress Tracking Dashboard</h3>
              </div>
              
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
                    <CardTitle>Update Your Progress</CardTitle>
                    <CardDescription>Log your progress to see detailed analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                        <Input 
                          id="currentWeight"
                          type="number"
                          placeholder="Enter current weight"
                          value={currentWeight}
                          onChange={(e) => setCurrentWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workoutCount">Workouts This Week</Label>
                        <Input 
                          id="workoutCount"
                          type="number"
                          placeholder="Enter workout count"
                          value={workoutCount}
                          onChange={(e) => setWorkoutCount(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-health-primary hover:bg-health-dark"
                      onClick={handleUpdateProgress}
                      disabled={!currentWeight || !workoutCount}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Update Progress
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Blog Articles Tab */}
            <TabsContent value="blogs" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Premium Health Articles</h3>
                <Button variant="outline" onClick={() => navigate('/blog')}>
                  <Book className="mr-2 h-4 w-4" /> Browse All Articles
                </Button>
              </div>
              
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
                     <Button 
                       variant="outline" 
                       className="w-full"
                       onClick={() => navigate('/blog?category=womens-health')}
                     >
                       Read Article
                     </Button>
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
                     <Button 
                       variant="outline" 
                       className="w-full"
                       onClick={() => navigate('/blog?category=mental-health')}
                     >
                       Read Article
                     </Button>
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
                     <Button 
                       variant="outline" 
                       className="w-full"
                       onClick={() => navigate('/blog?category=nutrition')}
                     >
                       Read Article
                     </Button>
                   </CardFooter>
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

export default PremiumUnlocked;
