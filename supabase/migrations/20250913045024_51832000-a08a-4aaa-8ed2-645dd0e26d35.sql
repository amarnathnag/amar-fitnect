-- Fix security vulnerability: Restrict emergency reports access
-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Allow users to view all emergency reports" ON public.emergency_reports;

-- Create new restrictive policy for viewing emergency reports
-- Users can only view their own reports, admins can view all
CREATE POLICY "Users can view own emergency reports, admins can view all" 
ON public.emergency_reports 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (
      SELECT email FROM auth.users 
      WHERE id = auth.uid()
    )
  )
);