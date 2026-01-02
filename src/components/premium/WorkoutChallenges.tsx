import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWorkoutHistory } from '@/hooks/useWorkoutHistory';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy, Flame, Target, Zap, Star, Crown, Medal,
  Calendar, Dumbbell, Award, TrendingUp, CheckCircle,
  Clock, Sparkles, Gift, Shield
} from 'lucide-react';
import { toast } from 'sonner';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'milestone';
  icon: React.ReactNode;
  target: number;
  current: number;
  reward: string;
  gradient: string;
  expiresAt?: Date;
  completed: boolean;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requirement: string;
  requiredValue: number;
  currentValue: number;
  gradient: string;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

const WorkoutChallenges: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { history, getStats } = useWorkoutHistory();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedAchievement, setCelebratedAchievement] = useState<Achievement | null>(null);
  const [activeTab, setActiveTab] = useState('challenges');

  // Get stats from hook
  const stats = getStats();
  
  // Calculate user stats
  const totalWorkouts = history.length;
  const totalCalories = history.reduce((sum, c) => sum + (c.calories_burned || 0), 0);
  const totalMinutes = history.reduce((sum, c) => sum + (c.duration_minutes || 0), 0);
  const currentStreak = stats.currentStreak;
  const longestStreak = stats.currentStreak; // Using current streak as we don't track longest yet

  // Get workouts this week
  const getWeeklyWorkouts = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    return history.filter(c => new Date(c.completed_at) >= startOfWeek).length;
  };

  // Get workouts this month
  const getMonthlyWorkouts = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return history.filter(c => new Date(c.completed_at) >= startOfMonth).length;
  };

  // Daily challenges
  const dailyChallenges: Challenge[] = [
    {
      id: 'daily_workout',
      title: 'Daily Warrior',
      description: 'Complete 1 workout today',
      type: 'daily',
      icon: <Dumbbell className="h-5 w-5" />,
      target: 1,
      current: history.filter(c => new Date(c.completed_at).toDateString() === new Date().toDateString()).length,
      reward: '50 XP',
      gradient: 'from-blue-500 to-cyan-500',
      completed: history.some(c => new Date(c.completed_at).toDateString() === new Date().toDateString())
    },
    {
      id: 'daily_calories',
      title: 'Calorie Crusher',
      description: 'Burn 300+ calories today',
      type: 'daily',
      icon: <Flame className="h-5 w-5" />,
      target: 300,
      current: history
        .filter(c => new Date(c.completed_at).toDateString() === new Date().toDateString())
        .reduce((sum, c) => sum + (c.calories_burned || 0), 0),
      reward: '75 XP',
      gradient: 'from-orange-500 to-red-500',
      completed: history
        .filter(c => new Date(c.completed_at).toDateString() === new Date().toDateString())
        .reduce((sum, c) => sum + (c.calories_burned || 0), 0) >= 300
    }
  ];

  // Weekly challenges
  const weeklyChallenges: Challenge[] = [
    {
      id: 'weekly_5',
      title: 'Consistency King',
      description: 'Complete 5 workouts this week',
      type: 'weekly',
      icon: <Calendar className="h-5 w-5" />,
      target: 5,
      current: getWeeklyWorkouts(),
      reward: '200 XP + Badge',
      gradient: 'from-purple-500 to-pink-500',
      completed: getWeeklyWorkouts() >= 5
    },
    {
      id: 'weekly_calories',
      title: 'Weekly Burn',
      description: 'Burn 2000 calories this week',
      type: 'weekly',
      icon: <Zap className="h-5 w-5" />,
      target: 2000,
      current: history
        .filter(c => {
          const now = new Date();
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return new Date(c.completed_at) >= startOfWeek;
        })
        .reduce((sum, c) => sum + (c.calories_burned || 0), 0),
      reward: '250 XP',
      gradient: 'from-yellow-500 to-orange-500',
      completed: false
    }
  ];

  // Monthly challenges
  const monthlyChallenges: Challenge[] = [
    {
      id: 'monthly_20',
      title: 'Monthly Master',
      description: 'Complete 20 workouts this month',
      type: 'monthly',
      icon: <Trophy className="h-5 w-5" />,
      target: 20,
      current: getMonthlyWorkouts(),
      reward: '500 XP + Premium Badge',
      gradient: 'from-emerald-500 to-teal-500',
      completed: getMonthlyWorkouts() >= 20
    },
    {
      id: 'monthly_streak',
      title: 'Streak Legend',
      description: 'Maintain a 14-day workout streak',
      type: 'monthly',
      icon: <Flame className="h-5 w-5" />,
      target: 14,
      current: currentStreak,
      reward: '750 XP + Exclusive Badge',
      gradient: 'from-red-500 to-pink-500',
      completed: currentStreak >= 14
    }
  ];

  // All achievements
  const achievements: Achievement[] = [
    // Workout count achievements
    {
      id: 'first_workout',
      name: 'First Step',
      description: 'Complete your first workout',
      icon: <Dumbbell className="h-6 w-6" />,
      requirement: 'workouts',
      requiredValue: 1,
      currentValue: totalWorkouts,
      gradient: 'from-gray-400 to-gray-500',
      unlocked: totalWorkouts >= 1,
      rarity: 'common',
      xpReward: 50
    },
    {
      id: 'workout_10',
      name: 'Getting Started',
      description: 'Complete 10 workouts',
      icon: <Target className="h-6 w-6" />,
      requirement: 'workouts',
      requiredValue: 10,
      currentValue: totalWorkouts,
      gradient: 'from-blue-400 to-blue-500',
      unlocked: totalWorkouts >= 10,
      rarity: 'common',
      xpReward: 100
    },
    {
      id: 'workout_50',
      name: 'Dedicated Athlete',
      description: 'Complete 50 workouts',
      icon: <Medal className="h-6 w-6" />,
      requirement: 'workouts',
      requiredValue: 50,
      currentValue: totalWorkouts,
      gradient: 'from-green-400 to-emerald-500',
      unlocked: totalWorkouts >= 50,
      rarity: 'rare',
      xpReward: 250
    },
    {
      id: 'workout_100',
      name: 'Century Club',
      description: 'Complete 100 workouts',
      icon: <Trophy className="h-6 w-6" />,
      requirement: 'workouts',
      requiredValue: 100,
      currentValue: totalWorkouts,
      gradient: 'from-yellow-400 to-amber-500',
      unlocked: totalWorkouts >= 100,
      rarity: 'epic',
      xpReward: 500
    },
    {
      id: 'workout_500',
      name: 'Fitness Legend',
      description: 'Complete 500 workouts',
      icon: <Crown className="h-6 w-6" />,
      requirement: 'workouts',
      requiredValue: 500,
      currentValue: totalWorkouts,
      gradient: 'from-purple-400 to-pink-500',
      unlocked: totalWorkouts >= 500,
      rarity: 'legendary',
      xpReward: 1000
    },
    // Streak achievements
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: '7-day workout streak',
      icon: <Flame className="h-6 w-6" />,
      requirement: 'streak',
      requiredValue: 7,
      currentValue: longestStreak,
      gradient: 'from-orange-400 to-red-500',
      unlocked: longestStreak >= 7,
      rarity: 'rare',
      xpReward: 200
    },
    {
      id: 'streak_30',
      name: 'Monthly Dedication',
      description: '30-day workout streak',
      icon: <Flame className="h-6 w-6" />,
      requirement: 'streak',
      requiredValue: 30,
      currentValue: longestStreak,
      gradient: 'from-red-400 to-pink-500',
      unlocked: longestStreak >= 30,
      rarity: 'epic',
      xpReward: 500
    },
    {
      id: 'streak_100',
      name: 'Century Streak',
      description: '100-day workout streak',
      icon: <Crown className="h-6 w-6" />,
      requirement: 'streak',
      requiredValue: 100,
      currentValue: longestStreak,
      gradient: 'from-purple-400 to-indigo-500',
      unlocked: longestStreak >= 100,
      rarity: 'legendary',
      xpReward: 1500
    },
    // Calorie achievements
    {
      id: 'calories_1000',
      name: 'Calorie Burner',
      description: 'Burn 1,000 total calories',
      icon: <Zap className="h-6 w-6" />,
      requirement: 'calories',
      requiredValue: 1000,
      currentValue: totalCalories,
      gradient: 'from-yellow-400 to-orange-500',
      unlocked: totalCalories >= 1000,
      rarity: 'common',
      xpReward: 100
    },
    {
      id: 'calories_10000',
      name: 'Calorie Destroyer',
      description: 'Burn 10,000 total calories',
      icon: <Zap className="h-6 w-6" />,
      requirement: 'calories',
      requiredValue: 10000,
      currentValue: totalCalories,
      gradient: 'from-orange-400 to-red-500',
      unlocked: totalCalories >= 10000,
      rarity: 'rare',
      xpReward: 300
    },
    {
      id: 'calories_50000',
      name: 'Calorie Annihilator',
      description: 'Burn 50,000 total calories',
      icon: <Flame className="h-6 w-6" />,
      requirement: 'calories',
      requiredValue: 50000,
      currentValue: totalCalories,
      gradient: 'from-red-400 to-pink-500',
      unlocked: totalCalories >= 50000,
      rarity: 'epic',
      xpReward: 750
    },
    // Time achievements
    {
      id: 'time_60',
      name: 'Hour Hero',
      description: 'Workout for 60 total minutes',
      icon: <Clock className="h-6 w-6" />,
      requirement: 'minutes',
      requiredValue: 60,
      currentValue: totalMinutes,
      gradient: 'from-blue-400 to-cyan-500',
      unlocked: totalMinutes >= 60,
      rarity: 'common',
      xpReward: 75
    },
    {
      id: 'time_600',
      name: 'Ten Hour Champion',
      description: 'Workout for 10 total hours',
      icon: <Clock className="h-6 w-6" />,
      requirement: 'minutes',
      requiredValue: 600,
      currentValue: totalMinutes,
      gradient: 'from-cyan-400 to-teal-500',
      unlocked: totalMinutes >= 600,
      rarity: 'rare',
      xpReward: 250
    },
    {
      id: 'time_3000',
      name: 'Fifty Hour Legend',
      description: 'Workout for 50 total hours',
      icon: <Clock className="h-6 w-6" />,
      requirement: 'minutes',
      requiredValue: 3000,
      currentValue: totalMinutes,
      gradient: 'from-teal-400 to-emerald-500',
      unlocked: totalMinutes >= 3000,
      rarity: 'epic',
      xpReward: 600
    }
  ];

  // Check for newly unlocked achievements
  useEffect(() => {
    if (!user?.id) return;

    const celebratedKey = `celebrated_achievements_v2_${user.id}`;
    const celebrated = JSON.parse(localStorage.getItem(celebratedKey) || '[]');

    for (const achievement of achievements) {
      if (achievement.unlocked && !celebrated.includes(achievement.id)) {
        setCelebratedAchievement(achievement);
        setShowCelebration(true);
        celebrated.push(achievement.id);
        localStorage.setItem(celebratedKey, JSON.stringify(celebrated));
        break;
      }
    }
  }, [totalWorkouts, currentStreak, totalCalories, totalMinutes, user?.id]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${challenge.completed ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${challenge.gradient} text-white shadow-lg`}>
            {challenge.icon}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs capitalize">
              {challenge.type}
            </Badge>
            {challenge.completed && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
        </div>
        
        <h4 className="font-bold text-lg mb-1">{challenge.title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{challenge.current} / {challenge.target}</span>
            <span className="font-medium text-primary">{challenge.reward}</span>
          </div>
          <Progress 
            value={Math.min((challenge.current / challenge.target) * 100, 100)} 
            className="h-2"
          />
        </div>
        
        {!challenge.completed && (
          <Button 
            className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80"
            onClick={() => navigate('/workouts')}
          >
            <Dumbbell className="h-4 w-4 mr-2" />
            Start Workout
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
    <div
      className={`relative group p-4 rounded-xl border-2 transition-all duration-300 ${
        achievement.unlocked 
          ? 'border-transparent bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl hover:scale-105' 
          : 'border-dashed border-gray-300 dark:border-gray-700 opacity-60 grayscale'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.gradient} text-white shadow-lg ${!achievement.unlocked ? 'opacity-50' : ''}`}>
          {achievement.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold">{achievement.name}</h4>
            <Badge className={`text-[10px] px-1.5 py-0 text-white ${getRarityColor(achievement.rarity)}`}>
              {achievement.rarity}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
          
          {!achievement.unlocked && (
            <div className="space-y-1">
              <Progress 
                value={(achievement.currentValue / achievement.requiredValue) * 100} 
                className="h-1.5"
              />
              <p className="text-xs text-muted-foreground">
                {achievement.currentValue} / {achievement.requiredValue}
              </p>
            </div>
          )}
          
          {achievement.unlocked && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">+{achievement.xpReward} XP Earned</span>
            </div>
          )}
        </div>
      </div>
      
      {achievement.unlocked && (
        <div className="absolute -top-1 -right-1">
          <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{unlockedCount}/{achievements.length}</div>
            <div className="text-xs opacity-80">Achievements</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
            <div className="text-xs opacity-80">Total XP</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-xs opacity-80">Current Streak</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-4 text-center">
            <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-80" />
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <div className="text-xs opacity-80">Total Workouts</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="challenges" className="gap-2">
            <Target className="h-4 w-4" />
            Active Challenges
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Award className="h-4 w-4" />
            Achievements ({unlockedCount}/{achievements.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges" className="space-y-6">
          {/* Daily Challenges */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold">Daily Challenges</h3>
              <Badge variant="outline" className="text-xs">Resets at midnight</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {dailyChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>

          {/* Weekly Challenges */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold">Weekly Challenges</h3>
              <Badge variant="outline" className="text-xs">Resets Sunday</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {weeklyChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>

          {/* Monthly Challenges */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Trophy className="h-4 w-4 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold">Monthly Challenges</h3>
              <Badge variant="outline" className="text-xs">Premium Only</Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {monthlyChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievement Categories */}
          {['Workout Milestones', 'Streak Masters', 'Calorie Champions', 'Time Warriors'].map((category, idx) => {
            const categoryAchievements = achievements.filter(a => {
              if (idx === 0) return a.requirement === 'workouts';
              if (idx === 1) return a.requirement === 'streak';
              if (idx === 2) return a.requirement === 'calories';
              return a.requirement === 'minutes';
            });

            return (
              <div key={category}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  {idx === 0 && <Dumbbell className="h-5 w-5 text-primary" />}
                  {idx === 1 && <Flame className="h-5 w-5 text-orange-500" />}
                  {idx === 2 && <Zap className="h-5 w-5 text-yellow-500" />}
                  {idx === 3 && <Clock className="h-5 w-5 text-blue-500" />}
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {categoryAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Achievement Celebration Modal */}
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
          {celebratedAchievement && (
            <div className="relative">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-yellow-600/20 animate-pulse" />
              
              {/* Confetti */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        ['text-yellow-400', 'text-orange-400', 'text-pink-400', 'text-purple-400', 'text-cyan-400'][
                          Math.floor(Math.random() * 5)
                        ]
                      }`}
                      fill="currentColor"
                    />
                  </div>
                ))}
              </div>

              <div className="relative p-8 text-center">
                <div className="mb-4">
                  <Sparkles className="h-10 w-10 text-yellow-500 mx-auto animate-pulse" />
                </div>
                
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Achievement Unlocked! 🎉
                </h2>
                
                <div className="my-6 flex justify-center">
                  <div className={`p-6 rounded-full bg-gradient-to-br ${celebratedAchievement.gradient} text-white shadow-2xl animate-bounce`}>
                    {React.cloneElement(celebratedAchievement.icon as React.ReactElement, {
                      className: 'h-12 w-12',
                    })}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {celebratedAchievement.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {celebratedAchievement.description}
                </p>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <Badge className={`${getRarityColor(celebratedAchievement.rarity)} text-white capitalize`}>
                    {celebratedAchievement.rarity}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    +{celebratedAchievement.xpReward} XP
                  </Badge>
                </div>

                <Button 
                  onClick={() => setShowCelebration(false)} 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Awesome!
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutChallenges;
