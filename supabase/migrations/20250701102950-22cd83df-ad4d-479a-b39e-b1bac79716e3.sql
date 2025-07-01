
-- Add is_banned column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN is_banned boolean DEFAULT false;

-- Add admin policy to allow admins to view and manage all user profiles
CREATE POLICY "Admins can view all user profiles"
ON public.user_profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (
      SELECT email FROM auth.users 
      WHERE id = auth.uid()
    )
  )
);

CREATE POLICY "Admins can update all user profiles"
ON public.user_profiles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = (
      SELECT email FROM auth.users 
      WHERE id = auth.uid()
    )
  )
);
