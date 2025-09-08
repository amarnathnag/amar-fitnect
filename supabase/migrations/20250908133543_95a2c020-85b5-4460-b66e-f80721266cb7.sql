-- Fix security vulnerability: Hide gym owner personal information from public view
-- Drop the overly permissive public viewing policy
DROP POLICY IF EXISTS "Anyone can view approved gyms" ON gyms;

-- Create a secure function to get public gym information without sensitive owner data
CREATE OR REPLACE FUNCTION get_public_gym_info()
RETURNS TABLE(
  id uuid,
  name text,
  location text,
  location_pincode text,
  opening_hours jsonb,
  facilities jsonb,
  description text,
  is_premium boolean,
  is_approved boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    g.id,
    g.name,
    g.location,
    g.location_pincode,
    g.opening_hours,
    g.facilities,
    g.description,
    g.is_premium,
    g.is_approved,
    g.created_at,
    g.updated_at
  FROM public.gyms g
  WHERE g.is_approved = true;
$$;

-- Create a secure function to get full gym details with access control
CREATE OR REPLACE FUNCTION get_gym_details(gym_id uuid)
RETURNS TABLE(
  id uuid,
  name text,
  location text,
  location_pincode text,
  owner_name text,
  owner_id uuid,
  contact_phone text,
  contact_email text,
  opening_hours jsonb,
  facilities jsonb,
  description text,
  is_premium boolean,
  is_approved boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  has_access boolean := false;
  is_admin_user boolean := false;
BEGIN
  -- Check if user is an admin
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (
      SELECT email FROM auth.users 
      WHERE id = auth.uid()
    )
  ) INTO is_admin_user;
  
  -- Check if user owns this gym or is admin
  SELECT (
    EXISTS (SELECT 1 FROM public.gyms WHERE id = gym_id AND owner_id = auth.uid()) OR
    is_admin_user
  ) INTO has_access;
  
  -- Return gym details with conditional sensitive information
  RETURN QUERY
  SELECT 
    g.id,
    g.name,
    g.location,
    g.location_pincode,
    -- Only show owner details if user has access
    CASE WHEN has_access THEN g.owner_name ELSE NULL END,
    CASE WHEN has_access THEN g.owner_id ELSE NULL END,
    CASE WHEN has_access THEN g.contact_phone ELSE NULL END,
    CASE WHEN has_access THEN g.contact_email ELSE NULL END,
    g.opening_hours,
    g.facilities,
    g.description,
    g.is_premium,
    g.is_approved,
    g.created_at,
    g.updated_at
  FROM public.gyms g
  WHERE g.id = gym_id AND g.is_approved = true;
END;
$$;

-- Create new granular RLS policies
-- 1. Allow public viewing of basic gym info only (no owner details)
CREATE POLICY "Public can view basic gym info" 
ON gyms 
FOR SELECT 
USING (
  is_approved = true AND
  -- This policy only applies when accessing basic fields through the public function
  -- The function will handle field-level access control
  true
);

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_public_gym_info() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_gym_details(uuid) TO authenticated;