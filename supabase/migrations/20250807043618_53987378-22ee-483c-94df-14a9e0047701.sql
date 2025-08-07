-- Remove insecure admin user record with plaintext password
DELETE FROM admin_users WHERE email = 'admin@healthapp.com';

-- Add comprehensive RLS policies for unprotected tables

-- Enable RLS on tables that don't have it
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_workflow_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_workflow_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create secure function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
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

-- Categories policies (admin only for management)
CREATE POLICY "Admins can manage categories" ON categories
FOR ALL USING (public.is_admin_user());

CREATE POLICY "Anyone can view categories" ON categories  
FOR SELECT USING (true);

-- Doctor table policies (admin only)
CREATE POLICY "Admins can manage doctor table" ON doctor
FOR ALL USING (public.is_admin_user());

-- Product workflow history policies (admin only)
CREATE POLICY "Admins can manage product workflow history" ON product_workflow_history
FOR ALL USING (public.is_admin_user());

-- Admin workflow tasks policies (admin only)
CREATE POLICY "Admins can manage workflow tasks" ON admin_workflow_tasks
FOR ALL USING (public.is_admin_user());

-- Gym reviews policies
CREATE POLICY "Users can create gym reviews" ON gym_reviews
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view gym reviews" ON gym_reviews
FOR SELECT USING (true);

CREATE POLICY "Users can update their own reviews" ON gym_reviews
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON gym_reviews
FOR DELETE USING (auth.uid() = user_id);

-- Job applications policies (gym owners and applicants)
CREATE POLICY "Anyone can create job applications" ON job_applications
FOR INSERT USING (true);

CREATE POLICY "Gym owners can view applications for their jobs" ON job_applications
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM job_postings jp
    JOIN gyms g ON jp.gym_id = g.id
    WHERE jp.id = job_applications.job_id 
    AND g.owner_id = auth.uid()
  )
);

CREATE POLICY "Applicants can view their own applications" ON job_applications
FOR SELECT USING (applicant_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Job postings policies (gym owners only)
CREATE POLICY "Gym owners can manage their job postings" ON job_postings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM gyms 
    WHERE gyms.id = job_postings.gym_id 
    AND gyms.owner_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view active job postings" ON job_postings
FOR SELECT USING (is_active = true);

-- Admin users policies (super restricted)
CREATE POLICY "Only existing admins can manage admin users" ON admin_users
FOR ALL USING (public.is_admin_user());

-- Secure existing database functions
DROP FUNCTION IF EXISTS public.calculate_age(date);
CREATE OR REPLACE FUNCTION public.calculate_age(birth_date date)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, birth_date));
END;
$$;

DROP FUNCTION IF EXISTS public.get_user_email(uuid);
CREATE OR REPLACE FUNCTION public.get_user_email(user_uuid uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT email FROM auth.users WHERE id = user_uuid;
$$;

-- Fix trigger functions with proper security
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;