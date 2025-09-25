import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, TrendingUp, Calendar, Zap, Target } from 'lucide-react';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import DailyProgressSummary from './daily-progress/DailyProgressSummary';
import ProgressDialog from './daily-progress/ProgressDialog';
import { Progress } from "@/components/ui/progress";

interface QuickStats {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const EnhancedDailyProgressTracker = () => {
  const { progressData, saveDailyProgress, isLoading } = useDailyProgress();
  const [showDialog, setShowDialog] = useState(false);

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    return progressData.find(p => p.date === today);
  };

  const getWeeklyStats = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weekData = progressData.filter(p => {
      const date = new Date(p.date);
      return date >= weekAgo && date <= today;
    });

    const totalExerciseMinutes = weekData.reduce((sum, day) => {
      if (day.exercises && Array.isArray(day.exercises)) {
        return sum + day.exercises.reduce((daySum: number, exercise: any) => 
          daySum + (exercise.duration || 0), 0
        );
      }
      return sum;
    }, 0);

    const totalCalories = weekData.reduce((sum, day) => {
      if (day.exercises && Array.isArray(day.exercises)) {
        return sum + day.exercises.reduce((daySum: number, exercise: any) => 
          daySum + (exercise.calories || 0), 0
        );
      }
      return sum;
    }, 0);

    const avgWater = weekData.reduce((sum, day) => sum + (day.water_intake || 0), 0) / Math.max(weekData.length, 1);
    const avgSleep = weekData.reduce((sum, day) => sum + (day.sleep_hours || 0), 0) / Math.max(weekData.length, 1);

    return {
      exerciseMinutes: totalExerciseMinutes,
      calories: totalCalories,
      avgWater: Math.round(avgWater),
      avgSleep: avgSleep.toFixed(1),
      daysTracked: weekData.length
    };
  };

  const todayProgress = getTodayProgress();
  const weeklyStats = getWeeklyStats();

  const quickStats: QuickStats[] = [
    {
      label: "Weekly Exercise",
      value: `${weeklyStats.exerciseMinutes} min`,
      icon: <Activity className="h-5 w-5" />,
      color: "text-green-500",
      trend: weeklyStats.exerciseMinutes > 150 ? "+12%" : "Keep going!"
    },
    {
      label: "Calories Burned",
      value: `${weeklyStats.calories}`,
      icon: <Zap className="h-5 w-5" />,
      color: "text-orange-500",
      trend: weeklyStats.calories > 1000 ? "Great!" : "Good start"
    },
    {
      label: "Avg Water Intake",
      value: `${weeklyStats.avgWater}L`,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-blue-500",
      trend: weeklyStats.avgWater >= 2 ? "Perfect!" : "Drink more"
    },
    {
      label: "Avg Sleep",
      value: `${weeklyStats.avgSleep}h`,
      icon: <Target className="h-5 w-5" />,
      color: "text-purple-500",
      trend: parseFloat(weeklyStats.avgSleep) >= 7 ? "Excellent!" : "Improve"
    }
  ];

  const getDailyGoalProgress = () => {
    if (!todayProgress) return { water: 0, exercise: 0, sleep: 0 };
    
    const waterGoal = 3; // 3L daily goal
    const exerciseGoal = 60; // 60 minutes daily goal
    const sleepGoal = 8; // 8 hours daily goal

    const todayExerciseMinutes = todayProgress.exercises && Array.isArray(todayProgress.exercises) 
      ? todayProgress.exercises.reduce((sum: number, ex: any) => sum + (ex.duration || 0), 0)
      : 0;

    return {
      water: Math.min((todayProgress.water_intake || 0) / waterGoal * 100, 100),
      exercise: Math.min(todayExerciseMinutes / exerciseGoal * 100, 100),
      sleep: Math.min((todayProgress.sleep_hours || 0) / sleepGoal * 100, 100)
    };
  };

  const dailyGoals = getDailyGoalProgress();

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                </div>
                {stat.trend && (
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Progress Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Daily Progress Tracker
              </CardTitle>
              <CardDescription>Track your daily exercises, water intake, and wellness data</CardDescription>
            </div>
            <Button 
              onClick={() => setShowDialog(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Progress
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Daily Goals Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">Water Goal</span>
                <span className="text-sm text-muted-foreground">{dailyGoals.water.toFixed(0)}%</span>
              </div>
              <Progress value={dailyGoals.water} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {todayProgress?.water_intake || 0}L of 3L daily goal
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Exercise Goal</span>
                <span className="text-sm text-muted-foreground">{dailyGoals.exercise.toFixed(0)}%</span>
              </div>
              <Progress value={dailyGoals.exercise} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {todayProgress?.exercises && Array.isArray(todayProgress.exercises) 
                  ? todayProgress.exercises.reduce((sum: number, ex: any) => sum + (ex.duration || 0), 0)
                  : 0} min of 60 min goal
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-600">Sleep Goal</span>
                <span className="text-sm text-muted-foreground">{dailyGoals.sleep.toFixed(0)}%</span>
              </div>
              <Progress value={dailyGoals.sleep} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {todayProgress?.sleep_hours || 0}h of 8h goal
              </p>
            </div>
          </div>

          {/* Today's Progress Summary */}
          <div className="border-t pt-4">
            <DailyProgressSummary todayProgress={todayProgress} />
          </div>

          {/* Progress Streak */}
          {progressData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Progress Streak</p>
                  <p className="text-sm text-muted-foreground">
                    {weeklyStats.daysTracked} days tracked this week
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  {weeklyStats.daysTracked}/7 days
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Dialog */}
      <ProgressDialog 
        open={showDialog}
        onOpenChange={setShowDialog}
        onSave={async (data) => {
          await saveDailyProgress(data);
          setShowDialog(false);
        }}
        isLoading={isLoading} 
      />
    </div>
  );
};

export default EnhancedDailyProgressTracker;