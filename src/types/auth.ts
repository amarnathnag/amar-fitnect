
export interface User {
  id?: string;
  name?: string;
  email: string;
  isAuthenticated: boolean;
  isPremium?: boolean;
  isAdmin?: boolean;
  gender?: 'male' | 'female' | 'other' | null;
}

export interface PeriodTrackingData {
  last_period_date?: string;
  cycle_length?: number;
  period_length?: number;
  symptoms?: string[];
  notes?: string;
  updated_at?: string;
}

export interface ProfileData {
  id: string;
  full_name: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  height: number | null;
  weight: number | null;
  fitness_goal: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintain_fitness' | null;
  food_preference: 'vegetarian' | 'non_vegetarian' | null;
  health_issues: string | null;
  period_tracking?: PeriodTrackingData | null;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  signInWithGoogle?: () => Promise<any>;
  logout: () => void;
  isLoading: boolean;
  profileData: ProfileData | null;
  isProfileComplete: boolean;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  fetchProfile: () => Promise<void>;
  upgradeToPremium: () => boolean;
}
