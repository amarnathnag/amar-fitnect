import { supabase } from "@/integrations/supabase/client";
import { Gym, GymMedia, GymReview, JobPosting, JobApplication } from "@/types/gym";
import { dummyGyms, dummyJobs } from "./dummyData";

// Gym CRUD Operations
export const fetchGyms = async (search?: string, pincode?: string) => {
  try {
    // Use secure function to get public gym info (no owner details)
    const { data, error } = await supabase
      .rpc('get_public_gym_info');

    if (error) {
      console.warn('Using dummy data, Supabase error:', error);
      // Fallback to dummy data
      let filteredGyms = [...dummyGyms];
      
      if (search) {
        const lowerCaseSearch = search.toLowerCase();
        filteredGyms = filteredGyms.filter(gym => 
          gym.name.toLowerCase().includes(lowerCaseSearch) || 
          gym.location.toLowerCase().includes(lowerCaseSearch)
        );
      }
      
      if (pincode) {
        filteredGyms = filteredGyms.filter(gym => 
          gym.location_pincode === pincode
        );
      }
      
      return filteredGyms;
    }

    let filteredGyms = data || [];
    
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filteredGyms = filteredGyms.filter(gym => 
        gym.name.toLowerCase().includes(lowerCaseSearch) || 
        gym.location.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    if (pincode) {
      filteredGyms = filteredGyms.filter(gym => 
        gym.location_pincode === pincode
      );
    }
    
    // Add dummy data if no real data
    if (filteredGyms.length === 0) {
      return dummyGyms.filter(gym => {
        if (search) {
          const lowerCaseSearch = search.toLowerCase();
          return gym.name.toLowerCase().includes(lowerCaseSearch) || 
                 gym.location.toLowerCase().includes(lowerCaseSearch);
        }
        if (pincode) {
          return gym.location_pincode === pincode;
        }
        return true;
      });
    }
    
    return filteredGyms;
  } catch (error) {
    console.warn('Error fetching gyms, using dummy data:', error);
    // Fallback to dummy data
    let filteredGyms = [...dummyGyms];
    
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filteredGyms = filteredGyms.filter(gym => 
        gym.name.toLowerCase().includes(lowerCaseSearch) || 
        gym.location.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    if (pincode) {
      filteredGyms = filteredGyms.filter(gym => 
        gym.location_pincode === pincode
      );
    }
    
    return filteredGyms;
  }
};

export const fetchGymById = async (gymId: string) => {
  try {
    // Use secure function to get gym details with proper access control
    const { data, error } = await supabase
      .rpc('get_gym_details', { gym_id: gymId });

    if (error || !data || data.length === 0) {
      console.warn('Using dummy data for gym detail, Supabase error:', error);
      // Fallback to dummy data
      const gym = dummyGyms.find(g => g.id === gymId);
      if (!gym) {
        throw new Error('Gym not found');
      }
      return gym;
    }

    return data[0]; // Return the first (and only) result
  } catch (error) {
    console.warn('Error fetching gym by ID, using dummy data:', error);
    // Fallback to dummy data
    const gym = dummyGyms.find(g => g.id === gymId);
    if (!gym) {
      throw new Error('Gym not found');
    }
    return gym;
  }
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
  // For demonstration, using dummy job data
  let filteredJobs = [...dummyJobs];
  
  if (gymId) {
    filteredJobs = filteredJobs.filter(job => job.gym_id === gymId);
  }
  
  return filteredJobs;
};

export const fetchJobPostingById = async (jobId: string) => {
  const job = dummyJobs.find(j => j.id === jobId);
  
  if (!job) {
    throw new Error('Job posting not found');
  }
  
  return job;
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
  return {
    totalGyms: dummyGyms.length,
    totalTrainers: 15,  // Static example number
    totalMembers: 500   // Static example number
  };
};
