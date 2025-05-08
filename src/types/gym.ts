
export interface Gym {
  id: string;
  name: string;
  owner_name: string;
  owner_id: string;
  address: string;
  location_pincode: string;
  contact_phone?: string;
  contact_email?: string;
  opening_hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  facilities?: {
    weight_training?: boolean;
    cardio?: boolean;
    crossfit?: boolean;
    zumba?: boolean;
    personal_training?: boolean;
    diet_consultant?: boolean;
    [key: string]: boolean | undefined;
  };
  description?: string;
  is_premium: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface GymMedia {
  id: string;
  gym_id: string;
  media_type: 'image' | 'video';
  url: string;
  is_featured: boolean;
  created_at: string;
}

export interface GymReview {
  id: string;
  gym_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface JobPosting {
  id: string;
  gym_id: string;
  title: string;
  description: string;
  experience_required?: string;
  working_hours?: string;
  salary_range?: string;
  deadline?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  desired_role: string;
  years_experience?: number;
  resume_url?: string;
  preferred_location?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}
