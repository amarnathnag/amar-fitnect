import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ScheduledWorkout {
  id: string;
  user_id: string;
  workout_id: string;
  workout_title: string;
  scheduled_date: string;
  scheduled_time: string | null;
  reminder_enabled: boolean;
  reminder_sent: boolean;
  status: 'scheduled' | 'completed' | 'skipped' | 'missed';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScheduleWorkoutData {
  workout_id: string;
  workout_title: string;
  scheduled_date: string;
  scheduled_time?: string;
  reminder_enabled?: boolean;
  notes?: string;
}

export const useScheduledWorkouts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [scheduledWorkouts, setScheduledWorkouts] = useState<ScheduledWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScheduledWorkouts = async () => {
    if (!user) {
      setScheduledWorkouts([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('scheduled_workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setScheduledWorkouts((data || []) as ScheduledWorkout[]);
    } catch (error) {
      console.error('Error fetching scheduled workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduledWorkouts();
  }, [user]);

  const scheduleWorkout = async (data: ScheduleWorkoutData) => {
    if (!user) {
      toast({ title: "Please login to schedule workouts", variant: "destructive" });
      return null;
    }

    try {
      const { data: newWorkout, error } = await supabase
        .from('scheduled_workouts')
        .insert({
          user_id: user.id,
          workout_id: data.workout_id,
          workout_title: data.workout_title,
          scheduled_date: data.scheduled_date,
          scheduled_time: data.scheduled_time || null,
          reminder_enabled: data.reminder_enabled ?? true,
          notes: data.notes || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Workout scheduled successfully! 📅" });
      await fetchScheduledWorkouts();
      return newWorkout;
    } catch (error) {
      console.error('Error scheduling workout:', error);
      toast({ title: "Failed to schedule workout", variant: "destructive" });
      return null;
    }
  };

  const updateScheduledWorkout = async (id: string, updates: Partial<ScheduledWorkout>) => {
    try {
      const { error } = await supabase
        .from('scheduled_workouts')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Workout updated!" });
      await fetchScheduledWorkouts();
    } catch (error) {
      console.error('Error updating scheduled workout:', error);
      toast({ title: "Failed to update workout", variant: "destructive" });
    }
  };

  const deleteScheduledWorkout = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_workouts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Scheduled workout removed" });
      await fetchScheduledWorkouts();
    } catch (error) {
      console.error('Error deleting scheduled workout:', error);
      toast({ title: "Failed to delete workout", variant: "destructive" });
    }
  };

  const getWorkoutsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return scheduledWorkouts.filter(w => w.scheduled_date === dateStr);
  };

  const getUpcomingWorkouts = (days: number = 7) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);

    return scheduledWorkouts.filter(w => {
      const workoutDate = new Date(w.scheduled_date);
      return workoutDate >= today && workoutDate <= futureDate && w.status === 'scheduled';
    });
  };

  return {
    scheduledWorkouts,
    loading,
    scheduleWorkout,
    updateScheduledWorkout,
    deleteScheduledWorkout,
    getWorkoutsForDate,
    getUpcomingWorkouts,
    refetch: fetchScheduledWorkouts,
  };
};
