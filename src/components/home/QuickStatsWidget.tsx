import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Flame, Dumbbell, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AchievementBadges from './AchievementBadges';

interface DailyProgress {
  exercises: any[];
  water_intake: number;
  date: string;
}

const QuickStatsWidget: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todayProgress, setTodayProgress] = useState<DailyProgress | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchStats = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Fetch today's progress
      const { data: todayData } = await supabase
        .from('daily_progress')
        .select('exercises, water_intake, date')
        .eq('user_id', user!.id)
        .eq('date', today)
        .single();

      if (todayData) {
        setTodayProgress({
          exercises: Array.isArray(todayData.exercises) ? todayData.exercises : [],
          water_intake: todayData.water_intake || 0,
          date: todayData.date
        });
      }

      // Calculate streak
      const { data: allProgress } = await supabase
        .from('daily_progress')
        .select('date')
        .eq('user_id', user!.id)
        .order('date', { ascending: false });

      if (allProgress && allProgress.length > 0) {
        let currentStreak = 0;
        const dates = allProgress.map(p => p.date);
        const todayDate = new Date();
        
        for (let i = 0; i < dates.length; i++) {
          const expectedDate = new Date(todayDate);
          expectedDate.setDate(expectedDate.getDate() - i);
          const expectedDateStr = format(expectedDate, 'yyyy-MM-dd');
          
          if (dates.includes(expectedDateStr)) {
            currentStreak++;
          } else if (i === 0) {
            // Today not logged yet, check from yesterday
            continue;
          } else {
            break;
          }
        }
        setStreak(currentStreak);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) return null;

  const exerciseCount = todayProgress?.exercises?.length || 0;
  const waterIntake = todayProgress?.water_intake || 0;
  const waterGoal = 8; // 8 glasses goal
  const waterProgress = Math.min((waterIntake / waterGoal) * 100, 100);

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Today's Progress</h3>
                <p className="text-sm text-muted-foreground">{format(new Date(), 'EEEE, MMMM d')}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/fitness-dashboard')}
                className="text-primary hover:text-primary/80"
              >
                View Dashboard
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Workouts */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Dumbbell className="h-5 w-5 text-orange-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Workouts</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{exerciseCount}</p>
                <p className="text-xs text-muted-foreground">exercises today</p>
              </div>

              {/* Water Intake */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Water</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{waterIntake}<span className="text-sm font-normal text-muted-foreground">/{waterGoal}</span></p>
                <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${waterProgress}%` }}
                  />
                </div>
              </div>

              {/* Streak */}
              <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Flame className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Streak</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{streak}</p>
                <p className="text-xs text-muted-foreground">day{streak !== 1 ? 's' : ''} strong</p>
              </div>
            </div>

            {/* Achievement Badges */}
            {streak > 0 && (
              <div className="mt-4 p-4 bg-background/60 rounded-xl border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Achievements</p>
                    <p className="text-xs text-muted-foreground">Unlock badges with your streak</p>
                  </div>
                  <AchievementBadges currentStreak={streak} />
                </div>
              </div>
            )}

            {!todayProgress && (
              <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Log today's progress to keep your streak!</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/fitness-dashboard')}
                >
                  Log Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuickStatsWidget;
