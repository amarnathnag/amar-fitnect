-- Add target weight and additional profile fields to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS target_weight NUMERIC,
ADD COLUMN IF NOT EXISTS activity_level TEXT DEFAULT 'moderate',
ADD COLUMN IF NOT EXISTS allergies TEXT,
ADD COLUMN IF NOT EXISTS medical_conditions TEXT,
ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
ADD COLUMN IF NOT EXISTS privacy_settings JSONB DEFAULT '{"profile_visibility": "private", "data_sharing": false}'::jsonb;

-- Create a function to calculate age from date of birth
CREATE OR REPLACE FUNCTION calculate_age(birth_date DATE)
RETURNS INTEGER AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, birth_date));
END;
$$ LANGUAGE plpgsql IMMUTABLE;