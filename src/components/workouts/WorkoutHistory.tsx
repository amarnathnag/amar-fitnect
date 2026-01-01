import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Calendar, Clock, Flame, Dumbbell, Star, Trash2, 
  TrendingUp, Award, Target, Activity
} from 'lucide-react';
import { useWorkoutHistory, WorkoutCompletion } from '@/hooks/useWorkoutHistory';
import { format, formatDistanceToNow } from 'date-fns';

interface WorkoutHistoryProps {
  limit?: number;
  showStats?: boolean;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ limit, showStats = true }) => {
  const { history, loading, deleteWorkoutCompletion, getStats } = useWorkoutHistory();
  
  const displayHistory = limit ? history.slice(0, limit) : history;
  const stats = getStats();

  const renderRating = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-health-primary/10 to-health-primary/5 border-health-primary/20">
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 mx-auto mb-2 text-health-primary" />
              <div className="text-2xl font-bold text-health-primary">{stats.totalWorkouts}</div>
              <p className="text-xs text-muted-foreground">Total Workouts</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4 text-center">
              <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-orange-500">{stats.totalCalories.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Calories Burned</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-purple-500">{stats.currentStreak}</div>
              <p className="text-xs text-muted-foreground">Day Streak 🔥</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-blue-500">{Math.round(stats.totalMinutes / 60)}h</div>
              <p className="text-xs text-muted-foreground">Total Time</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* History List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-health-primary" />
              Workout History
            </CardTitle>
            <Badge variant="outline">{history.length} workouts</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {displayHistory.length === 0 ? (
            <div className="text-center py-8">
              <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No completed workouts yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete a workout to see your history here!
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {displayHistory.map((workout: WorkoutCompletion) => (
                  <div 
                    key={workout.id}
                    className="group p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold truncate">{workout.workout_title}</h4>
                          {renderRating(workout.rating)}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(workout.completed_at), 'MMM d, yyyy')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {workout.duration_minutes} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {workout.calories_burned} cal
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {workout.exercises_completed}/{workout.total_exercises}
                          </span>
                        </div>
                        
                        {workout.notes && (
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                            📝 {workout.notes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {formatDistanceToNow(new Date(workout.completed_at), { addSuffix: true })}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteWorkoutCompletion(workout.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutHistory;
