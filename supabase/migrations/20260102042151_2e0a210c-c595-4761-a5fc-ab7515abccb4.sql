-- Create scheduled_workouts table for workout planning
CREATE TABLE public.scheduled_workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workout_id TEXT NOT NULL,
  workout_title TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  reminder_enabled BOOLEAN DEFAULT true,
  reminder_sent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'skipped', 'missed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scheduled_workouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own scheduled workouts"
  ON public.scheduled_workouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scheduled workouts"
  ON public.scheduled_workouts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scheduled workouts"
  ON public.scheduled_workouts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scheduled workouts"
  ON public.scheduled_workouts FOR DELETE
  USING (auth.uid() = user_id);

-- Create user_xp table for leaderboard tracking
CREATE TABLE public.user_xp (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_xp INTEGER DEFAULT 0,
  weekly_xp INTEGER DEFAULT 0,
  monthly_xp INTEGER DEFAULT 0,
  total_workouts INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  display_name TEXT,
  show_on_leaderboard BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_xp ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_xp
CREATE POLICY "Users can view leaderboard entries"
  ON public.user_xp FOR SELECT
  USING (show_on_leaderboard = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own XP entry"
  ON public.user_xp FOR ALL
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_scheduled_workouts_updated_at
  BEFORE UPDATE ON public.scheduled_workouts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_xp_updated_at
  BEFORE UPDATE ON public.user_xp
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();