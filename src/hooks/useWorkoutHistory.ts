import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface WorkoutCompletion {
  id: string;
  user_id: string;
  workout_id: string;
  workout_title: string;
  duration_minutes: number;
  calories_burned: number;
  exercises_completed: number;
  total_exercises: number;
  completed_at: string;
  notes: string | null;
  rating: number | null;
  created_at: string;
}

export interface SaveWorkoutData {
  workout_id: string;
  workout_title: string;
  duration_minutes: number;
  calories_burned: number;
  exercises_completed: number;
  total_exercises: number;
  notes?: string;
  rating?: number;
}

export const useWorkoutHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [history, setHistory] = useState<WorkoutCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchHistory = async () => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('workout_completions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching workout history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const saveWorkoutCompletion = async (data: SaveWorkoutData) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to save your workout progress",
        variant: "destructive"
      });
      return null;
    }

    setSaving(true);
    try {
      const { data: result, error } = await supabase
        .from('workout_completions')
        .insert({
          user_id: user.id,
          workout_id: data.workout_id,
          workout_title: data.workout_title,
          duration_minutes: data.duration_minutes,
          calories_burned: data.calories_burned,
          exercises_completed: data.exercises_completed,
          total_exercises: data.total_exercises,
          notes: data.notes || null,
          rating: data.rating || null
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Workout Saved! 🎉",
        description: `Great job completing ${data.workout_title}!`
      });

      await fetchHistory();
      return result;
    } catch (error) {
      console.error('Error saving workout:', error);
      toast({
        title: "Error",
        description: "Failed to save workout completion",
        variant: "destructive"
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  const deleteWorkoutCompletion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('workout_completions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Deleted",
        description: "Workout record removed"
      });

      await fetchHistory();
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast({
        title: "Error",
        description: "Failed to delete workout record",
        variant: "destructive"
      });
    }
  };

  // Statistics calculations
  const getStats = () => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const monthlyWorkouts = history.filter(w => {
      const date = new Date(w.completed_at);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });

    const totalWorkouts = history.length;
    const monthlyCount = monthlyWorkouts.length;
    const totalCalories = history.reduce((sum, w) => sum + w.calories_burned, 0);
    const totalMinutes = history.reduce((sum, w) => sum + w.duration_minutes, 0);
    const averageRating = history.filter(w => w.rating).length > 0
      ? history.filter(w => w.rating).reduce((sum, w) => sum + (w.rating || 0), 0) / history.filter(w => w.rating).length
      : 0;

    // Calculate current streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sortedDates = [...new Set(history.map(w => 
      new Date(w.completed_at).toDateString()
    ))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    for (let i = 0; i < sortedDates.length; i++) {
      const workoutDate = new Date(sortedDates[i]);
      workoutDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i || (i === 0 && daysDiff <= 1)) {
        streak++;
      } else {
        break;
      }
    }

    return {
      totalWorkouts,
      monthlyCount,
      totalCalories,
      totalMinutes,
      averageRating: Math.round(averageRating * 10) / 10,
      currentStreak: streak
    };
  };

  return {
    history,
    loading,
    saving,
    saveWorkoutCompletion,
    deleteWorkoutCompletion,
    getStats,
    refetch: fetchHistory
  };
};
