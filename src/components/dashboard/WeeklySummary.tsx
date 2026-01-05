import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Flame, 
  Droplets, 
  Moon, 
  TrendingUp, 
  Award,
  Calendar,
  Target
} from 'lucide-react';
import { ShareableImageGenerator } from '@/components/social/ShareableImageGenerator';
import { useAuth } from '@/contexts/AuthContext';
import { useLeaderboard } from '@/hooks/useLeaderboard';

interface WeeklySummaryProps {
  weeklyProgress: Array<{
    date: string;
    exercises: any[];
    water_intake: number;
    sleep_hours: number;
  }>;
  goals?: {
    workouts: number;
    water: number;
    sleep: number;
  };
}

export const WeeklySummary: React.FC<WeeklySummaryProps> = ({ 
  weeklyProgress,
  goals = { workouts: 5, water: 8, sleep: 8 }
}) => {
  const { user, profileData } = useAuth();
  const { userEntry } = useLeaderboard();

  // Calculate weekly stats
  const totalWorkouts = weeklyProgress.filter(day => 
    day.exercises && Array.isArray(day.exercises) && day.exercises.length > 0
  ).length;

  const totalCalories = weeklyProgress.reduce((sum, day) => {
    if (day.exercises && Array.isArray(day.exercises)) {
      return sum + day.exercises.reduce((cal: number, ex: any) => cal + (ex.caloriesBurned || 0), 0);
    }
    return sum;
  }, 0);

  const avgWaterIntake = weeklyProgress.length > 0
    ? Math.round(weeklyProgress.reduce((sum, day) => sum + (day.water_intake || 0), 0) / weeklyProgress.length)
    : 0;

  const avgSleep = weeklyProgress.length > 0
    ? (weeklyProgress.reduce((sum, day) => sum + (day.sleep_hours || 0), 0) / weeklyProgress.length).toFixed(1)
    : '0';

  // Calculate goal progress
  const workoutProgress = Math.min((totalWorkouts / goals.workouts) * 100, 100);
  const waterProgress = Math.min((avgWaterIntake / goals.water) * 100, 100);
  const sleepProgress = Math.min((parseFloat(avgSleep) / goals.sleep) * 100, 100);

  // Get achievements for the week
  const achievements: string[] = [];
  if (totalWorkouts >= goals.workouts) achievements.push('Workout Goal Met');
  if (avgWaterIntake >= goals.water) achievements.push('Hydration Champion');
  if (parseFloat(avgSleep) >= goals.sleep) achievements.push('Sleep Master');
  if (userEntry?.current_streak && userEntry.current_streak >= 7) achievements.push('Week Warrior');

  const shareableStats = {
    weeklyWorkouts: totalWorkouts,
    totalCalories,
    currentStreak: userEntry?.current_streak || 0,
    leaderboardRank: userEntry ? undefined : undefined, // Would need to calculate from leaderboard
    achievements,
    userName: profileData?.full_name || user?.email?.split('@')[0] || 'Fitness Enthusiast'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Weekly Summary
          </h2>
          <p className="text-muted-foreground">Your fitness journey this week</p>
        </div>
        {achievements.length > 0 && (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
            <Award className="h-3 w-3 mr-1" />
            {achievements.length} Achievement{achievements.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Workouts</p>
                <p className="text-3xl font-bold text-green-600">{totalWorkouts}</p>
              </div>
              <Trophy className="h-10 w-10 text-green-500/50" />
            </div>
            <Progress value={workoutProgress} className="mt-3 h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">
              {totalWorkouts}/{goals.workouts} goal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-3xl font-bold text-orange-600">{totalCalories.toLocaleString()}</p>
              </div>
              <Flame className="h-10 w-10 text-orange-500/50" />
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              Great progress!
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Water</p>
                <p className="text-3xl font-bold text-blue-600">{avgWaterIntake}</p>
                <p className="text-xs text-muted-foreground">glasses/day</p>
              </div>
              <Droplets className="h-10 w-10 text-blue-500/50" />
            </div>
            <Progress value={waterProgress} className="mt-2 h-1.5" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Sleep</p>
                <p className="text-3xl font-bold text-purple-600">{avgSleep}</p>
                <p className="text-xs text-muted-foreground">hours/night</p>
              </div>
              <Moon className="h-10 w-10 text-purple-500/50" />
            </div>
            <Progress value={sleepProgress} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              This Week's Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-400"
                >
                  🏆 {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Streak & XP Info */}
      {userEntry && (
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{userEntry.current_streak || 0}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{userEntry.weekly_xp || 0}</div>
                  <div className="text-xs text-muted-foreground">Weekly XP</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{userEntry.total_xp || 0}</div>
                  <div className="text-xs text-muted-foreground">Total XP</div>
                </div>
              </div>
              <Target className="h-12 w-12 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shareable Image Generator */}
      <ShareableImageGenerator stats={shareableStats} variant="summary" />
    </div>
  );
};
