-- Drop and recreate views with explicit SECURITY INVOKER to fix linter warnings
DROP VIEW IF EXISTS public.public_gyms;
DROP VIEW IF EXISTS public.public_doctors;

-- Create a public view for gyms that excludes contact details with SECURITY INVOKER
CREATE VIEW public.public_gyms 
WITH (security_invoker = true)
AS
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

-- Create a public view for doctors that excludes contact details with SECURITY INVOKER
CREATE VIEW public.public_doctors
WITH (security_invoker = true)
AS
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

-- Add comments explaining the security model
COMMENT ON VIEW public.public_gyms IS 'Public view of gyms excluding contact details. Use get_gym_details() for full info if authorized.';
COMMENT ON VIEW public.public_doctors IS 'Public view of doctors excluding contact details. Use get_doctor_details() for full info if authorized.';