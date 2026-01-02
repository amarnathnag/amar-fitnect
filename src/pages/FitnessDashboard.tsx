import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, TrendingUp, Dumbbell, Apple, Target, Calendar, BarChart3, Trophy } from 'lucide-react';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import DailyProgressSummary from '@/components/profile/daily-progress/DailyProgressSummary';
import ProgressDialog from '@/components/profile/daily-progress/ProgressDialog';
import ProgressCharts from '@/components/dashboard/ProgressCharts';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import WorkoutCalendar from '@/components/workouts/WorkoutCalendar';
import Leaderboard from '@/components/workouts/Leaderboard';
const FitnessDashboard = () => {
  const { user, profileData } = useAuth();
  const { progressData, saveDailyProgress, isLoading } = useDailyProgress();

  // Calculate stats from progress data
  const last7Days = progressData.slice(-7);
  const totalWorkouts = last7Days.filter(d => d.exercises && d.exercises.length > 0).length;
  const avgWaterIntake = last7Days.reduce((sum, d) => sum + (d.water_intake || 0), 0) / 7;
  const avgSleepHours = last7Days.reduce((sum, d) => sum + (d.sleep_hours || 0), 0) / 7;

  // Weekly exercise data for chart
  const weeklyExerciseData = last7Days.map((day, index) => ({
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(day.date).getDay()],
    exercises: day.exercises?.length || 0,
    calories: day.exercises?.reduce((sum: number, ex: any) => sum + (ex.calories || 0), 0) || 0,
  }));

  // Nutrition data
  const nutritionData = [
    { name: 'Protein', value: 30, color: 'hsl(var(--primary))' },
    { name: 'Carbs', value: 40, color: 'hsl(var(--secondary))' },
    { name: 'Fats', value: 30, color: 'hsl(var(--accent))' },
  ];

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    return progressData.find(p => p.date === today);
  };

  const todayProgress = getTodayProgress();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
          <div className="container-custom">
            <div className="flex items-center gap-4 mb-4">
              <Activity className="h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Fitness Dashboard</h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Track your exercise, nutrition, and progress all in one place
            </p>
          </div>
        </section>

        <div className="container-custom py-12">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-6 lg:w-[900px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="planner" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Planner</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Leaderboard</span>
              </TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="exercise">Exercise</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalWorkouts}</div>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Water Intake</CardTitle>
                    <Apple className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgWaterIntake.toFixed(1)} L</div>
                    <p className="text-xs text-muted-foreground">Daily average</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Sleep</CardTitle>
                    <Calendar className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgSleepHours.toFixed(1)} hrs</div>
                    <p className="text-xs text-muted-foreground">Per night</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
                    <Target className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{profileData?.weight || 'N/A'} kg</div>
                    <p className="text-xs text-muted-foreground">Target: {profileData?.target_weight || 'N/A'} kg</p>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Progress Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Today's Progress
                  </CardTitle>
                  <CardDescription>Track your daily exercises, water intake, and wellness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DailyProgressSummary todayProgress={todayProgress} />
                  <ProgressDialog onSave={saveDailyProgress} isLoading={isLoading} />
                </CardContent>
              </Card>

              {/* Goals Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Goals</CardTitle>
                  <CardDescription>Your progress towards fitness goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Weekly Workout Goal</span>
                      <span className="text-sm text-muted-foreground">{totalWorkouts}/5</span>
                    </div>
                    <Progress value={(totalWorkouts / 5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Daily Water Goal</span>
                      <span className="text-sm text-muted-foreground">{(todayProgress?.water_intake || 0)}/2.5 L</span>
                    </div>
                    <Progress value={((todayProgress?.water_intake || 0) / 2.5) * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Sleep Goal</span>
                      <span className="text-sm text-muted-foreground">{(todayProgress?.sleep_hours || 0)}/8 hrs</span>
                    </div>
                    <Progress value={((todayProgress?.sleep_hours || 0) / 8) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Planner Tab */}
            <TabsContent value="planner" className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Workout Planner</h2>
              </div>
              <WorkoutCalendar />
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Leaderboard</h2>
              </div>
              <Leaderboard />
            </TabsContent>

            {/* Trends Tab - Weekly/Monthly Charts */}
            <TabsContent value="trends" className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Progress Trends</h2>
              </div>
              <ProgressCharts progressData={progressData} />
            </TabsContent>

            {/* Exercise Stats Tab */}
            <TabsContent value="exercise" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Weekly Exercise Activity
                  </CardTitle>
                  <CardDescription>Number of exercises completed per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyExerciseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }} 
                      />
                      <Bar dataKey="exercises" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-secondary" />
                    Calories Burned (Estimate)
                  </CardTitle>
                  <CardDescription>Estimated calories burned from workouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyExerciseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }} 
                      />
                      <Line type="monotone" dataKey="calories" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nutrition Tab */}
            <TabsContent value="nutrition" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5 text-accent" />
                    Macro Distribution
                  </CardTitle>
                  <CardDescription>Your recommended macronutrient breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={nutritionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="hsl(var(--primary))"
                          dataKey="value"
                        >
                          {nutritionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            borderColor: 'hsl(var(--border))',
                            color: 'hsl(var(--foreground))'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4 w-full">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Daily Calories</span>
                          <span className="text-muted-foreground">2000 kcal</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Protein</span>
                          <span className="text-muted-foreground">150g</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Carbohydrates</span>
                          <span className="text-muted-foreground">200g</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Fats</span>
                          <span className="text-muted-foreground">67g</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Tips</CardTitle>
                  <CardDescription>Based on your fitness goal: {profileData?.fitness_goal || 'General Health'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Hydration</h4>
                    <p className="text-sm text-muted-foreground">Aim for 2.5-3L of water daily, more if exercising intensely</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Protein Timing</h4>
                    <p className="text-sm text-muted-foreground">Consume protein within 30 minutes post-workout for optimal muscle recovery</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Meal Frequency</h4>
                    <p className="text-sm text-muted-foreground">Eat 4-6 smaller meals throughout the day to maintain energy levels</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FitnessDashboard;
