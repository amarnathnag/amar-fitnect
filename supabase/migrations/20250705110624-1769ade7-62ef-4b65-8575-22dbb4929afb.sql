-- Enable RLS for gyms table
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view approved gyms
CREATE POLICY "Anyone can view approved gyms" ON gyms
FOR SELECT USING (is_approved = true);

-- Allow gym owners to view and update their own gyms
CREATE POLICY "Gym owners can manage their own gyms" ON gyms
FOR ALL USING (owner_id = auth.uid());

-- Allow anyone to create gym registrations (they need approval)
CREATE POLICY "Anyone can register a gym" ON gyms
FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Allow admins to manage all gyms
CREATE POLICY "Admins can manage all gyms" ON gyms
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  )
);