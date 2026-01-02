import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  total_xp: number;
  weekly_xp: number;
  monthly_xp: number;
  total_workouts: number;
  current_streak: number;
  longest_streak: number;
  display_name: string | null;
  show_on_leaderboard: boolean;
  updated_at: string;
  rank?: number;
}

type LeaderboardType = 'total_xp' | 'weekly_xp' | 'monthly_xp' | 'total_workouts' | 'current_streak' | 'longest_streak';

export const useLeaderboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async (type: LeaderboardType = 'total_xp', limit: number = 50) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_xp')
        .select('*')
        .eq('show_on_leaderboard', true)
        .order(type, { ascending: false })
        .limit(limit);

      if (error) throw error;

      const rankedData = (data || []).map((entry, index) => ({
        ...entry,
        rank: index + 1,
      })) as LeaderboardEntry[];

      setLeaderboard(rankedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEntry = async () => {
    if (!user) {
      setUserEntry(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setUserEntry(data as LeaderboardEntry | null);
    } catch (error) {
      console.error('Error fetching user entry:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchUserEntry();
  }, [user]);

  const updateUserXP = async (xpToAdd: number, workoutCompleted: boolean = false) => {
    if (!user) return;

    try {
      // First check if user has an entry
      const { data: existing } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Update existing entry
        const updates = {
          total_xp: (existing.total_xp || 0) + xpToAdd,
          weekly_xp: (existing.weekly_xp || 0) + xpToAdd,
          monthly_xp: (existing.monthly_xp || 0) + xpToAdd,
          total_workouts: workoutCompleted ? (existing.total_workouts || 0) + 1 : existing.total_workouts,
          current_streak: workoutCompleted ? (existing.current_streak || 0) + 1 : existing.current_streak,
          longest_streak: workoutCompleted 
            ? Math.max((existing.longest_streak || 0), (existing.current_streak || 0) + 1)
            : existing.longest_streak,
        };

        await supabase
          .from('user_xp')
          .update(updates)
          .eq('user_id', user.id);
      } else {
        // Create new entry
        await supabase
          .from('user_xp')
          .insert({
            user_id: user.id,
            total_xp: xpToAdd,
            weekly_xp: xpToAdd,
            monthly_xp: xpToAdd,
            total_workouts: workoutCompleted ? 1 : 0,
            current_streak: workoutCompleted ? 1 : 0,
            longest_streak: workoutCompleted ? 1 : 0,
            display_name: user.email?.split('@')[0] || 'Anonymous',
          });
      }

      await fetchUserEntry();
    } catch (error) {
      console.error('Error updating XP:', error);
    }
  };

  const updateDisplayName = async (displayName: string) => {
    if (!user) return;

    try {
      const { data: existing } = await supabase
        .from('user_xp')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('user_xp')
          .update({ display_name: displayName })
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('user_xp')
          .insert({
            user_id: user.id,
            display_name: displayName,
          });
      }

      toast({ title: "Display name updated!" });
      await fetchUserEntry();
    } catch (error) {
      console.error('Error updating display name:', error);
      toast({ title: "Failed to update display name", variant: "destructive" });
    }
  };

  const toggleLeaderboardVisibility = async (show: boolean) => {
    if (!user) return;

    try {
      await supabase
        .from('user_xp')
        .update({ show_on_leaderboard: show })
        .eq('user_id', user.id);

      toast({ title: show ? "You're now visible on the leaderboard!" : "You're now hidden from the leaderboard" });
      await fetchUserEntry();
      await fetchLeaderboard();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const getUserRank = (type: LeaderboardType = 'total_xp') => {
    if (!userEntry) return null;
    const index = leaderboard.findIndex(e => e.user_id === userEntry.user_id);
    return index >= 0 ? index + 1 : null;
  };

  return {
    leaderboard,
    userEntry,
    loading,
    fetchLeaderboard,
    updateUserXP,
    updateDisplayName,
    toggleLeaderboardVisibility,
    getUserRank,
    refetch: () => {
      fetchLeaderboard();
      fetchUserEntry();
    },
  };
};
