-- First, drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view doctors" ON public.doctors;

-- Create a new policy for public basic doctor information (excluding sensitive contact details)
CREATE POLICY "Public can view basic doctor info"
ON public.doctors
FOR SELECT
TO public
USING (true);

-- However, we need to modify our approach since RLS policies can't selectively hide columns
-- Instead, let's create a view for public doctor information

-- Create a public view that excludes sensitive information
CREATE OR REPLACE VIEW public.doctors_public AS
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

-- Grant public access to the view
GRANT SELECT ON public.doctors_public TO public;

-- Create a more restrictive policy for the main doctors table
DROP POLICY IF EXISTS "Public can view basic doctor info" ON public.doctors;

-- Only authenticated users can see full doctor details (including contact info)
CREATE POLICY "Authenticated users can view full doctor details"
ON public.doctors
FOR SELECT
TO authenticated
USING (true);

-- Admins can manage doctors
CREATE POLICY "Admins can manage doctors"
ON public.doctors
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE email = (
            SELECT email FROM auth.users 
            WHERE id = auth.uid()
        )
    )
);

-- Create a function to check if user has an appointment with a doctor
CREATE OR REPLACE FUNCTION public.user_has_appointment_with_doctor(doctor_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.appointments 
        WHERE doctor_id = $1 
        AND user_id = auth.uid()
        AND status IN ('confirmed', 'pending')
    );
$$;