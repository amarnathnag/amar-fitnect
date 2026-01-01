-- Create workout_completions table to track completed workouts
CREATE TABLE public.workout_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  workout_id TEXT NOT NULL,
  workout_title TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  calories_burned INTEGER NOT NULL,
  exercises_completed INTEGER NOT NULL,
  total_exercises INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.workout_completions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own workout completions" 
ON public.workout_completions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workout completions" 
ON public.workout_completions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workout completions" 
ON public.workout_completions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workout completions" 
ON public.workout_completions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_workout_completions_user_id ON public.workout_completions(user_id);
CREATE INDEX idx_workout_completions_completed_at ON public.workout_completions(completed_at DESC);