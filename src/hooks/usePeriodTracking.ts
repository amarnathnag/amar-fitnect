
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PeriodTrackingData {
  id: string;
  last_period_date?: string;
  cycle_length?: number;
  period_length?: number;
  symptoms?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const usePeriodTracking = () => {
  const [periodData, setPeriodData] = useState<PeriodTrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchPeriodData = async () => {
    try {
      setIsLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log('No active session found when fetching period data');
        return;
      }

      const { data, error } = await supabase
        .from('period_tracking')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .order('updated_at', { ascending: false })
        .maybeSingle();

      if (error) {
        console.error('Error fetching period data:', error);
        toast({
          title: "Error",
          description: "Could not fetch your period tracking data.",
          variant: "destructive",
        });
        return;
      }

      setPeriodData(data);
    } catch (error) {
      console.error('Error in fetchPeriodData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePeriodData = async (data: Partial<PeriodTrackingData>) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to save period data",
          variant: "destructive",
        });
        return null;
      }

      const userId = sessionData.session.user.id;

      // Check if record exists
      const { data: existingData } = await supabase
        .from('period_tracking')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      let result;
      if (existingData) {
        // Update existing record
        result = await supabase
          .from('period_tracking')
          .update(data)
          .eq('user_id', userId)
          .select()
          .single();
      } else {
        // Create new record
        result = await supabase
          .from('period_tracking')
          .insert([{ 
            user_id: userId,
            ...data 
          }])
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving period data:', result.error);
        toast({
          title: "Error",
          description: "Could not save period data.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Success",
        description: "Period data saved successfully!",
      });

      await fetchPeriodData();
      return result.data;
    } catch (error) {
      console.error('Error in savePeriodData:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchPeriodData();
  }, []);

  return {
    periodData,
    isLoading,
    fetchPeriodData,
    savePeriodData
  };
};
