-- Create a public view for gyms that excludes contact details
CREATE OR REPLACE VIEW public.public_gyms AS
SELECT 
    id,
    name,
    location,
    location_pincode,
    opening_hours,
    facilities,
    description,
    is_premium,
    is_approved,
    created_at,
    updated_at
FROM public.gyms
WHERE is_approved = true;

-- Create a public view for doctors that excludes contact details
CREATE OR REPLACE VIEW public.public_doctors AS
SELECT 
    id,
    name,
    specialty,
    experience,
    rating,
    review_count,
    price,
    image_url,
    bio,
    languages,
    available_days,
    next_available,
    location,
    created_at,
    updated_at
FROM public.doctors;

-- Grant SELECT on these views to authenticated and anon roles
GRANT SELECT ON public.public_gyms TO anon, authenticated;
GRANT SELECT ON public.public_doctors TO anon, authenticated;

-- Drop the overly permissive public SELECT policy on gyms
DROP POLICY IF EXISTS "Public can view basic gym info" ON public.gyms;

-- Create a more restrictive policy - only owners and admins can see full gym details
CREATE POLICY "Only owners and admins can view full gym details"
ON public.gyms
FOR SELECT
USING (
    owner_id = auth.uid() 
    OR is_admin_user()
);

-- Drop the overly permissive public SELECT policy on doctors
DROP POLICY IF EXISTS "Anyone can view basic doctor info" ON public.doctors;

-- The "Users with appointments can view contact details" policy already exists and is correct
-- We just need to ensure there's a base policy for authenticated users to see non-contact info
-- Actually, let's keep a restricted policy that allows viewing through the function only

-- Create policy for authenticated users to see doctors (needed for the appointment policy to work)
CREATE POLICY "Authenticated users can view doctors for booking"
ON public.doctors
FOR SELECT
TO authenticated
USING (true);

-- Add comment explaining the security model
COMMENT ON VIEW public.public_gyms IS 'Public view of gyms excluding contact details. Use get_gym_details() for full info if authorized.';
COMMENT ON VIEW public.public_doctors IS 'Public view of doctors excluding contact details. Use get_doctor_details() for full info if authorized.';