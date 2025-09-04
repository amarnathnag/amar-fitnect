-- Fix the security definer view warning by removing it and using a different approach
DROP VIEW IF EXISTS public.doctors_public;

-- Update existing functions to have proper search_path
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE email = (
      SELECT email 
      FROM auth.users 
      WHERE id = auth.uid()
    )
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role::text FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.calculate_age(birth_date date)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SET search_path = ''
AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, birth_date));
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_email(user_uuid uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT email FROM auth.users WHERE id = user_uuid;
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_order_notification()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.admin_notifications (type, title, message, related_id, priority)
  VALUES (
    'new_order',
    'New Order Received',
    'Order #' || NEW.id || ' has been placed for ₹' || NEW.total_amount,
    NEW.id,
    'high'
  );
  RETURN NEW;
END;
$$;

-- Create a secure function to get public doctor information
CREATE OR REPLACE FUNCTION public.get_doctors_public(specialty_filter text DEFAULT NULL)
RETURNS TABLE (
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
    created_at timestamp with time zone,
    updated_at timestamp with time zone
) 
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
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
        d.created_at,
        d.updated_at
    FROM public.doctors d
    WHERE (specialty_filter IS NULL OR d.specialty = specialty_filter);
$$;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION public.get_doctors_public(text) TO public;