
-- Add period_tracking column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN period_tracking JSONB;

-- Add a comment to describe the column
COMMENT ON COLUMN public.user_profiles.period_tracking IS 'Stores period tracking data as JSON including last_period_date, cycle_length, period_length, symptoms, and notes';
