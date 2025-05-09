
import { supabase } from "@/integrations/supabase/client";
import { Gym, GymMedia, GymReview, JobPosting, JobApplication } from "@/types/gym";

// Gym CRUD Operations
export const fetchGyms = async (search?: string, pincode?: string) => {
  let query = supabase
    .from('gyms')
    .select('*')
    .eq('is_approved', true);
  
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  if (pincode) {
    query = query.eq('location_pincode', pincode);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching gyms:', error);
    throw error;
  }
  
  return data as Gym[];
};

export const fetchGymById = async (gymId: string) => {
  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .eq('id', gymId)
    .single();
  
  if (error) {
    console.error('Error fetching gym:', error);
    throw error;
  }
  
  return data as Gym;
};

export const fetchGymMedia = async (gymId: string) => {
  const { data, error } = await supabase
    .from('gym_media')
    .select('*')
    .eq('gym_id', gymId);
  
  if (error) {
    console.error('Error fetching gym media:', error);
    throw error;
  }
  
  return data as GymMedia[];
};

export const fetchGymReviews = async (gymId: string) => {
  const { data, error } = await supabase
    .from('gym_reviews')
    .select(`
      *,
      profiles:user_id (full_name)
    `)
    .eq('gym_id', gymId);
  
  if (error) {
    console.error('Error fetching gym reviews:', error);
    throw error;
  }
  
  return data as unknown as (GymReview & { profiles: { full_name: string } })[];
};

export const createGym = async (gym: Omit<Gym, 'id' | 'created_at' | 'updated_at' | 'is_approved'>) => {
  const { data, error } = await supabase
    .from('gyms')
    .insert([gym])
    .select();
  
  if (error) {
    console.error('Error creating gym:', error);
    throw error;
  }
  
  return data[0] as Gym;
};

export const updateGym = async (gymId: string, gym: Partial<Gym>) => {
  const { data, error } = await supabase
    .from('gyms')
    .update(gym)
    .eq('id', gymId)
    .select();
  
  if (error) {
    console.error('Error updating gym:', error);
    throw error;
  }
  
  return data[0] as Gym;
};

export const uploadGymMedia = async (gymId: string, file: File, type: 'image' | 'video', isFeatured: boolean = false) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${gymId}/${fileName}`;
  
  const { error: uploadError } = await supabase
    .storage
    .from('gym-media')
    .upload(filePath, file);
  
  if (uploadError) {
    console.error('Error uploading media:', uploadError);
    throw uploadError;
  }
  
  const { data: urlData } = supabase
    .storage
    .from('gym-media')
    .getPublicUrl(filePath);
  
  const mediaObject = {
    gym_id: gymId,
    media_type: type,
    url: urlData.publicUrl,
    is_featured: isFeatured
  };
  
  const { data, error } = await supabase
    .from('gym_media')
    .insert([mediaObject])
    .select();
  
  if (error) {
    console.error('Error saving media record:', error);
    throw error;
  }
  
  return data[0] as GymMedia;
};

// Job Postings CRUD Operations
export const fetchJobPostings = async (gymId?: string) => {
  let query = supabase
    .from('job_postings')
    .select(`
      *,
      gyms:gym_id (name, location)
    `)
    .eq('is_active', true);
  
  if (gymId) {
    query = query.eq('gym_id', gymId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching job postings:', error);
    throw error;
  }
  
  return data as unknown as (JobPosting & { gyms: { name: string, location: string } })[];
};

export const fetchJobPostingById = async (jobId: string) => {
  const { data, error } = await supabase
    .from('job_postings')
    .select(`
      *,
      gyms:gym_id (name, location, contact_email, contact_phone)
    `)
    .eq('id', jobId)
    .single();
  
  if (error) {
    console.error('Error fetching job posting:', error);
    throw error;
  }
  
  return data as unknown as (JobPosting & { gyms: { name: string, location: string, contact_email: string, contact_phone: string } });
};

export const createJobPosting = async (jobPosting: Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('job_postings')
    .insert([jobPosting])
    .select();
  
  if (error) {
    console.error('Error creating job posting:', error);
    throw error;
  }
  
  return data[0] as JobPosting;
};

export const updateJobPosting = async (jobId: string, jobPosting: Partial<JobPosting>) => {
  const { data, error } = await supabase
    .from('job_postings')
    .update(jobPosting)
    .eq('id', jobId)
    .select();
  
  if (error) {
    console.error('Error updating job posting:', error);
    throw error;
  }
  
  return data[0] as JobPosting;
};

// Job Applications CRUD Operations
export const submitJobApplication = async (application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert([application])
    .select();
  
  if (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
  
  return data[0] as JobApplication;
};

export const fetchMyJobApplications = async (userEmail: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select(`
      *,
      job_postings:job_id (title, gym_id, gyms:gym_id (name))
    `)
    .eq('applicant_email', userEmail);
  
  if (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
  
  return data;
};

export const fetchApplicationsForGym = async (gymId: string) => {
  const { data, error } = await supabase
    .from('job_applications')
    .select(`
      *,
      job_postings:job_id (title)
    `)
    .eq('job_postings.gym_id', gymId);
  
  if (error) {
    console.error('Error fetching applications for gym:', error);
    throw error;
  }
  
  return data;
};

export const updateApplicationStatus = async (applicationId: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
  const { data, error } = await supabase
    .from('job_applications')
    .update({ status })
    .eq('id', applicationId)
    .select();
  
  if (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
  
  return data[0] as JobApplication;
};

// Stats
export const fetchGymStats = async () => {
  const { count: totalGyms, error: gymsError } = await supabase
    .from('gyms')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true);
  
  const { count: totalTrainers, error: trainersError } = await supabase
    .from('job_postings')
    .select('*', { count: 'exact', head: true })
    .ilike('title', '%trainer%')
    .eq('is_active', true);
  
  if (gymsError || trainersError) {
    console.error('Error fetching stats:', gymsError || trainersError);
    throw gymsError || trainersError;
  }
  
  return {
    totalGyms: totalGyms || 0,
    totalTrainers: totalTrainers || 0,
    // For member count, we'd ideally have a separate table, but for now let's return a placeholder
    totalMembers: 5000
  };
};
