
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

export interface PeriodTrackingData {
  last_period_date?: string;
  cycle_length?: number;
  period_length?: number;
  symptoms?: string[];
  notes?: string;
  updated_at?: string;
}

export const usePeriodTracking = () => {
  const { profileData, updateProfile } = useAuth();
  const [periodData, setPeriodData] = useState<PeriodTrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update local state when profile data changes
  useEffect(() => {
    if (profileData?.period_tracking) {
      setPeriodData(profileData.period_tracking);
    } else {
      setPeriodData(null);
    }
  }, [profileData]);

  const fetchPeriodData = async () => {
    // Period data is already available through profileData
    // No separate fetch needed since it's part of the profile
    setIsLoading(false);
  };

  const savePeriodData = async (data: Partial<PeriodTrackingData>) => {
    try {
      setIsLoading(true);
      
      const updatedPeriodData = {
        ...periodData,
        ...data,
        updated_at: new Date().toISOString()
      };

      // Update the profile with the new period tracking data
      await updateProfile({
        period_tracking: updatedPeriodData
      });

      setPeriodData(updatedPeriodData);

      toast({
        title: "Success",
        description: "Period data saved successfully!",
      });

      return updatedPeriodData;
    } catch (error) {
      console.error('Error in savePeriodData:', error);
      toast({
        title: "Error",
        description: "Could not save period data.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    periodData,
    isLoading,
    fetchPeriodData,
    savePeriodData
  };
};
