-- Fix job applications security by adding proper RLS policies

-- Allow applicants to view their own applications
CREATE POLICY "Applicants can view their own applications" 
ON public.job_applications 
FOR SELECT 
USING (applicant_email = get_user_email(auth.uid()));

-- Allow applicants to update their own applications
CREATE POLICY "Applicants can update their own applications" 
ON public.job_applications 
FOR UPDATE 
USING (applicant_email = get_user_email(auth.uid()));

-- Allow applicants to delete their own applications
CREATE POLICY "Applicants can delete their own applications" 
ON public.job_applications 
FOR DELETE 
USING (applicant_email = get_user_email(auth.uid()));

-- Restrict job application creation to authenticated users only
DROP POLICY IF EXISTS "Anyone can create job applications" ON public.job_applications;

CREATE POLICY "Authenticated users can create job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);