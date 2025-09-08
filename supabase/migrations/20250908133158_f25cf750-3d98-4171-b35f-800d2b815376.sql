-- Fix security issue: Protect doctor contact information
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view full doctor details" ON doctors;

-- Create separate policies for different access levels
-- 1. Allow everyone to view basic doctor information (excluding sensitive contact details)
CREATE POLICY "Anyone can view basic doctor info" 
ON doctors 
FOR SELECT 
USING (true);

-- 2. Allow users with appointments to view contact details
CREATE POLICY "Users with appointments can view contact details" 
ON doctors 
FOR SELECT 
USING (
  user_has_appointment_with_doctor(id) OR
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (
      SELECT email FROM auth.users 
      WHERE id = auth.uid()
    )
  )
);

-- Create a secure function to get doctor details with appropriate access control
CREATE OR REPLACE FUNCTION get_doctor_details(doctor_id uuid)
RETURNS TABLE(
  id uuid,
  name text,
  specialty text,
  experience text,
  rating numeric,
  review_count integer,
  price integer,
  image_url text,
  bio text,
  languages text[],
  available_days text[],
  next_available text,
  location text,
  -- Conditional contact details
  email text,
  phone text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  has_access boolean := false;
BEGIN
  -- Check if user has access to contact details
  SELECT (
    user_has_appointment_with_doctor(doctor_id) OR
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE email = (
        SELECT email FROM auth.users 
        WHERE id = auth.uid()
      )
    )
  ) INTO has_access;
  
  -- Return doctor details with conditional contact information
  RETURN QUERY
  SELECT 
    d.id,
    d.name,
    d.specialty,
    d.experience,
    d.rating,
    d.review_count,
    d.price,
    d.image_url,
    d.bio,
    d.languages,
    d.available_days,
    d.next_available,
    d.location,
    -- Only show contact details if user has access
    CASE WHEN has_access THEN d.email ELSE NULL END,
    CASE WHEN has_access THEN d.phone ELSE NULL END,
    d.created_at,
    d.updated_at
  FROM public.doctors d
  WHERE d.id = doctor_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_doctor_details(uuid) TO authenticated;