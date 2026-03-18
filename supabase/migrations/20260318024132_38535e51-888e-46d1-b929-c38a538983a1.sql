-- Fix gym_media RLS policies: replace broken subquery with correct one
DROP POLICY IF EXISTS "Users can create their own media" ON public.gym_media;
DROP POLICY IF EXISTS "Users can delete their own media" ON public.gym_media;
DROP POLICY IF EXISTS "Users can update their own media" ON public.gym_media;
DROP POLICY IF EXISTS "Users can view their own media" ON public.gym_media;

CREATE POLICY "Users can create their own media" ON public.gym_media
  FOR INSERT TO authenticated
  WITH CHECK (gym_id IN (SELECT gyms.id FROM public.gyms WHERE gyms.owner_id = auth.uid()));

CREATE POLICY "Users can delete their own media" ON public.gym_media
  FOR DELETE TO authenticated
  USING (gym_id IN (SELECT gyms.id FROM public.gyms WHERE gyms.owner_id = auth.uid()));

CREATE POLICY "Users can update their own media" ON public.gym_media
  FOR UPDATE TO authenticated
  USING (gym_id IN (SELECT gyms.id FROM public.gyms WHERE gyms.owner_id = auth.uid()))
  WITH CHECK (gym_id IN (SELECT gyms.id FROM public.gyms WHERE gyms.owner_id = auth.uid()));

CREATE POLICY "Users can view their own media" ON public.gym_media
  FOR SELECT TO authenticated
  USING (gym_id IN (SELECT gyms.id FROM public.gyms WHERE gyms.owner_id = auth.uid()));

-- Fix doctors RLS: remove the broad SELECT policy that exposes contact info
DROP POLICY IF EXISTS "Authenticated users can view doctors for booking" ON public.doctors;

-- Add a policy that allows authenticated users to view doctors via the public_doctors view/RPC (non-contact columns)
-- The existing public_doctors view and get_doctors_public RPC already exclude email/phone
-- We keep the appointment-gated policy for contact detail access
-- Add a SELECT policy for non-contact column access using the security definer function
