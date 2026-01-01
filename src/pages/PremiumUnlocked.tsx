
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
  Calendar, Download, Book, Plus, Save, Play, Crown, Shield, TrendingUp, Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DietPlanCreator from '@/components/diet/DietPlanCreator';
import { useDietPlans } from '@/hooks/useDietPlans';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import PremiumHeroSection from '@/components/premium/PremiumHeroSection';
import { workouts } from '@/data/workouts';
import { blogPosts } from '@/data/blogPosts';
import { useToast } from '@/hooks/use-toast';

const PremiumUnlocked = () => {
  const navigate = useNavigate();
  const { user, profileData } = useAuth();
  const { dietPlans } = useDietPlans();
  const { progressData, saveDailyProgress } = useDailyProgress();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'workouts');
  
  // State for progress tracking
  const [currentWeight, setCurrentWeight] = useState('');
  const [workoutCount, setWorkoutCount] = useState('');
  
  // Get premium workouts (first 15+)
  const premiumWorkouts = workouts.slice(0, 18);
  
  // Get premium blog posts
  const premiumBlogs = blogPosts.filter(post => post.isPremium).slice(0, 50);
  
  // Calculate progress stats
  const calculateProgressStats = () => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const monthlyProgress = progressData.filter(p => {
      const date = new Date(p.date);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });
    
    const totalWorkouts = monthlyProgress.reduce((sum, p) => {
      const exercises = Array.isArray(p.exercises) ? p.exercises : [];
      return sum + exercises.length;
    }, 0);
    
    const currentStreak = calculateStreak();
    const weightProgress = calculateWeightChange(monthlyProgress);
    
    return { totalWorkouts, currentStreak, weightProgress };
  };
  
  const calculateStreak = () => {
    if (progressData.length === 0) return 0;
    
    const sortedData = [...progressData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedData.length; i++) {
      const progressDate = new Date(sortedData[i].date);
      progressDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - progressDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const calculateWeightChange = (monthlyProgress: any[]) => {
    if (monthlyProgress.length < 2) return 0;
    
    const sortedProgress = [...monthlyProgress].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const firstWeight = sortedProgress[0]?.weight || profileData?.weight || 0;
    const lastWeight = sortedProgress[sortedProgress.length - 1]?.weight || firstWeight;
    
    return (Number(lastWeight) - Number(firstWeight)).toFixed(1);
  };
  
  const stats = calculateProgressStats();

  const handleUpdateProgress = async () => {
    if (currentWeight && workoutCount) {
      try {
        const today = new Date().toISOString().split('T')[0];
        await saveDailyProgress({
          date: today,
          weight: Number(currentWeight),
          exercises: Array(Number(workoutCount)).fill({ name: 'Workout', duration: '30 min' }),
          water_intake: 0,
          sleep_hours: 0
        });
        
        toast({
          title: "Progress Updated! ✅",
          description: "Your fitness data has been saved successfully.",
        });
        
        setCurrentWeight('');
        setWorkoutCount('');
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update progress. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleStartWorkout = (workoutId: string) => {
    navigate(`/workout/${workoutId}`);
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
                <div>
                  <h3 className="text-2xl font-bold">Premium Workout Programs</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{premiumWorkouts.length}+ Programs Available</p>
                </div>
                <Button className="bg-health-primary hover:bg-health-dark" onClick={() => navigate('/workouts')}>
                  <Plus className="mr-2 h-4 w-4" /> View All Programs
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumWorkouts.map((workout) => (
                  <Card key={workout.id} className="overflow-hidden border-2 hover:border-health-primary transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{workout.title}</CardTitle>
                        <Badge variant="outline" className="bg-health-primary/10 text-health-primary border-health-primary">
                          {workout.level}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{workout.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="font-medium">{workout.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Calories</p>
                          <p className="font-medium">{workout.calories}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sample Exercises:</p>
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <p key={index} className="text-xs text-gray-600 dark:text-gray-400">
                            • {exercise.name} - {exercise.sets} sets
                          </p>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-health-primary hover:bg-health-dark"
                        onClick={() => handleStartWorkout(workout.id)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Workout
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Diet Tab */}
            <TabsContent value="diet" className="mt-0">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Custom Diet Plan Creator</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Create and save personalized meal plans - Save unlimited plans</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/diet-plans')}>
                  <Utensils className="mr-2 h-4 w-4" /> All Diet Plans
                </Button>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <DietPlanCreator />
                  </CardContent>
                </Card>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Your Saved Diet Plans ({dietPlans.length})</h4>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Unlimited Storage
                    </Badge>
                  </div>
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
                <div>
                  <h3 className="text-2xl font-bold">Progress Tracking Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Track your fitness journey with detailed analytics</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/profile?tab=progress')}>
                  <BarChart2 className="mr-2 h-4 w-4" /> View Full Report
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-2 hover:border-health-primary transition-all">
                    <CardHeader className="text-center pb-3">
                      <CardTitle className="flex items-center justify-center text-lg">
                        <Activity className="mr-2 h-5 w-5 text-health-primary" />
                        Workouts Completed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-4xl font-bold text-health-primary mb-2">{stats.totalWorkouts}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
                      <div className="mt-3 flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">+15% from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 hover:border-health-primary transition-all">
                    <CardHeader className="text-center pb-3">
                      <CardTitle className="flex items-center justify-center text-lg">
                        <Calendar className="mr-2 h-5 w-5 text-health-primary" />
                        Current Streak
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-4xl font-bold text-health-primary mb-2">{stats.currentStreak}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Days active</p>
                      <div className="mt-3 flex items-center justify-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs text-gray-600">Keep it up!</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 hover:border-health-primary transition-all">
                    <CardHeader className="text-center pb-3">
                      <CardTitle className="flex items-center justify-center text-lg">
                        <BarChart2 className="mr-2 h-5 w-5 text-health-primary" />
                        Weight Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-4xl font-bold text-health-primary mb-2">
                        {Number(stats.weightProgress) > 0 ? '+' : ''}{stats.weightProgress}kg
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
                      <div className="mt-3 flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-gray-600">Track progress daily</span>
                      </div>
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
                <div>
                  <h3 className="text-2xl font-bold">Premium Health Articles</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{premiumBlogs.length}+ Expert Articles Available</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/blog')}>
                  <Book className="mr-2 h-4 w-4" /> Browse All Articles
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {premiumBlogs.slice(0, 9).map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="w-fit bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{article.date}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate(`/blog/${article.id}`)}
                      >
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {premiumBlogs.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="text-center py-12">
                    <Book className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-medium mb-2">No Premium Articles Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Premium health articles will be available soon!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumUnlocked;
