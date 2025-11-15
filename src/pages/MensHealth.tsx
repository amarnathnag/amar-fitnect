import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dumbbell, Heart, TrendingUp, Activity, AlertCircle, Crown, Lock } from 'lucide-react';
import WorkoutTabs from '@/components/workouts/WorkoutTabs';
import { workouts } from '@/data/workouts';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import DailyProgressSummary from '@/components/profile/daily-progress/DailyProgressSummary';
import ProgressDialog from '@/components/profile/daily-progress/ProgressDialog';

const MensHealth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('workouts');
  const { progressData, saveDailyProgress, isLoading } = useDailyProgress();
  const isPremium = user?.isPremium;

  // Redirect female users
  useEffect(() => {
    if (user?.gender === 'female') {
      navigate('/womens-health');
    }
  }, [user, navigate]);

  // Filter muscle-building and strength workouts
  const muscleWorkouts = workouts.filter(w => 
    w.category === 'muscle-gain' || w.level === 'Advanced'
  );

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    return progressData.find(p => p.date === today);
  };

  const todayProgress = getTodayProgress();

  if (user?.gender === 'female') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <NavBar />
        <main className="flex-grow flex items-center justify-center p-4">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This section is designed for male users. Redirecting you to Women's Health...
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-4">
              <Dumbbell className="h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Men's Health Hub</h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Specialized workout plans, muscle building strategies, and health optimization for men
            </p>
          </div>
        </section>

        {/* Premium Notice */}
        {!isPremium && (
          <div className="container-custom py-6">
            <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
              <Crown className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-900 dark:text-amber-100">
                <div className="flex items-center justify-between">
                  <span>Unlock premium features including advanced muscle building plans and testosterone optimization guides</span>
                  <Button 
                    onClick={() => navigate('/subscription')} 
                    className="ml-4 bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Upgrade to Premium
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="container-custom py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-[800px]">
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="muscle-building">Muscle Building</TabsTrigger>
              <TabsTrigger value="testosterone">Testosterone Health</TabsTrigger>
              <TabsTrigger value="tracking">Progress Tracking</TabsTrigger>
            </TabsList>

            {/* Workouts Tab */}
            <TabsContent value="workouts" className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Specialized Workout Programs</h2>
                <p className="text-muted-foreground">
                  Science-backed workout routines designed specifically for male physiology and fitness goals
                </p>
              </div>
              <WorkoutTabs workouts={workouts} />
            </TabsContent>

            {/* Muscle Building Tab */}
            <TabsContent value="muscle-building" className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="h-8 w-8 text-primary" />
                  Muscle Building Programs
                </h2>
                <p className="text-muted-foreground">
                  Advanced programs focused on hypertrophy and strength gains
                </p>
              </div>

              {isPremium ? (
                <>
                  {/* Premium Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Crown className="h-5 w-5 text-amber-500" />
                          12-Week Muscle Mass Program
                        </CardTitle>
                        <CardDescription>Progressive overload program for maximum muscle growth</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Phase 1: Foundation (Weeks 1-4)</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Build neural adaptation and form</li>
                            <li>3-4 sets of 8-12 reps per exercise</li>
                            <li>Focus on compound movements</li>
                            <li>60-90 second rest periods</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Phase 2: Hypertrophy (Weeks 5-8)</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Increase volume and intensity</li>
                            <li>4-5 sets of 8-12 reps</li>
                            <li>Add isolation exercises</li>
                            <li>Progressive overload focus</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Phase 3: Strength & Size (Weeks 9-12)</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Peak performance training</li>
                            <li>Heavy compound lifts 5x5</li>
                            <li>High-volume accessory work</li>
                            <li>Deload week 12</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Crown className="h-5 w-5 text-amber-500" />
                          Nutrition for Muscle Growth
                        </CardTitle>
                        <CardDescription>Optimized meal plans for muscle building</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Caloric Surplus</h4>
                          <p className="text-sm text-muted-foreground">Consume 300-500 calories above maintenance for lean muscle gain</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Protein Intake</h4>
                          <p className="text-sm text-muted-foreground">1.6-2.2g protein per kg of body weight daily</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Meal Timing</h4>
                          <p className="text-sm text-muted-foreground">Protein every 3-4 hours, pre and post-workout nutrition</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">Supplements</h4>
                          <p className="text-sm text-muted-foreground">Creatine (5g daily), Whey protein, Multivitamin, Omega-3</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Workout Programs */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Muscle Building Workouts</CardTitle>
                      <CardDescription>Advanced routines for maximum hypertrophy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {muscleWorkouts.map(workout => (
                          <div key={workout.id} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                            <h4 className="font-semibold mb-2">{workout.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{workout.description}</p>
                            <div className="flex gap-2 text-xs text-muted-foreground">
                              <span className="px-2 py-1 bg-primary/10 rounded">{workout.level}</span>
                              <span className="px-2 py-1 bg-secondary/10 rounded">{workout.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-2 border-dashed border-border">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <Lock className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Premium Feature</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Upgrade to premium to access advanced muscle building programs, detailed nutrition plans, and personalized workout routines
                    </p>
                    <Button onClick={() => navigate('/subscription')} className="bg-primary hover:bg-primary/90">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Testosterone Health Tab */}
            <TabsContent value="testosterone" className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <Heart className="h-8 w-8 text-primary" />
                  Testosterone Optimization
                </h2>
                <p className="text-muted-foreground">
                  Natural strategies to optimize testosterone levels and hormonal health
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lifestyle Factors</CardTitle>
                    <CardDescription>Key habits that influence testosterone production</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Sleep Quality</h4>
                      <p className="text-sm text-muted-foreground">Aim for 7-9 hours of quality sleep. Testosterone production peaks during REM sleep</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Stress Management</h4>
                      <p className="text-sm text-muted-foreground">High cortisol suppresses testosterone. Practice meditation and stress reduction</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Body Composition</h4>
                      <p className="text-sm text-muted-foreground">Maintain healthy body fat levels (10-20%). Excess fat increases aromatization</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition for T-Levels</CardTitle>
                    <CardDescription>Foods and nutrients that support testosterone</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Zinc-Rich Foods</h4>
                      <p className="text-sm text-muted-foreground">Oysters, beef, pumpkin seeds. Aim for 11mg daily</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Vitamin D</h4>
                      <p className="text-sm text-muted-foreground">Sunlight exposure, fatty fish. Target 2000-4000 IU daily</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Healthy Fats</h4>
                      <p className="text-sm text-muted-foreground">Avocados, nuts, olive oil. Essential for hormone production</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exercise Impact</CardTitle>
                    <CardDescription>Workouts that boost testosterone</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Compound Lifts</h4>
                      <p className="text-sm text-muted-foreground">Squats, deadlifts, bench press. Heavy loads (85-95% 1RM) trigger testosterone release</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">HIIT Training</h4>
                      <p className="text-sm text-muted-foreground">High-intensity intervals 2-3x per week boost acute testosterone levels</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Recovery Time</h4>
                      <p className="text-sm text-muted-foreground">Avoid overtraining. Adequate rest between sessions is crucial</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Warning Signs</CardTitle>
                    <CardDescription>When to consider medical consultation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        If you experience persistent low energy, decreased muscle mass, reduced libido, or mood changes, consult a healthcare provider for testosterone testing.
                      </AlertDescription>
                    </Alert>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Age-Related Decline</h4>
                      <p className="text-sm text-muted-foreground">Testosterone naturally decreases ~1% per year after age 30. Healthy lifestyle can minimize this decline</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Track Your Progress
                </h2>
                <p className="text-muted-foreground">
                  Monitor your daily workouts, nutrition, and overall wellness
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Daily Progress Tracker
                  </CardTitle>
                  <CardDescription>Log your exercises, water intake, sleep, and mood</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DailyProgressSummary todayProgress={todayProgress} />
                  <ProgressDialog onSave={saveDailyProgress} isLoading={isLoading} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workout Consistency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">
                      {progressData.filter(d => d.exercises && d.exercises.length > 0).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Total workouts logged</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-secondary">7 days</p>
                    <p className="text-sm text-muted-foreground">Keep it going!</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Goal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-accent">4/5</p>
                    <p className="text-sm text-muted-foreground">Workouts completed</p>
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

export default MensHealth;
