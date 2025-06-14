
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DailyProgressData {
  id: string;
  user_id: string;
  date: string;
  exercises: {
    name: string;
    duration: number;
    calories_burned: number;
    type: string;
  }[];
  water_intake: number;
  sleep_hours: number;
  mood: string;
  weight?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useDailyProgress = () => {
  const [progressData, setProgressData] = useState<DailyProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchDailyProgress = async () => {
    try {
      setIsLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log('No active session found when fetching daily progress');
        return;
      }

      const { data, error } = await supabase
        .from('daily_progress')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching daily progress:', error);
        toast({
          title: "Error",
          description: "Could not fetch your daily progress data.",
          variant: "destructive",
        });
        return;
      }

      setProgressData((data as DailyProgressData[]) || []);
    } catch (error) {
      console.error('Error in fetchDailyProgress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDailyProgress = async (data: Partial<DailyProgressData>) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to save progress data",
          variant: "destructive",
        });
        return null;
      }

      const userId = sessionData.session.user.id;
      const today = new Date().toISOString().split('T')[0];

      // Check if record exists for today
      const { data: existingData } = await supabase
        .from('daily_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('date', today)
        .maybeSingle();

      let result;
      if (existingData) {
        // Update existing record
        result = await supabase
          .from('daily_progress')
          .update(data)
          .eq('user_id', userId)
          .eq('date', today)
          .select()
          .single();
      } else {
        // Create new record
        result = await supabase
          .from('daily_progress')
          .insert([{ 
            user_id: userId,
            date: today,
            ...data 
          }])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving daily progress:', result.error);
        toast({
          title: "Error",
          description: "Could not save progress data.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Daily progress saved successfully!",
      });

      await fetchDailyProgress();
      return result.data;
    } catch (error) {
      console.error('Error in saveDailyProgress:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchDailyProgress();
  }, []);

  return {
    progressData,
    isLoading,
    fetchDailyProgress,
    saveDailyProgress
  };
};
