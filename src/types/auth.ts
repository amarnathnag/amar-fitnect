
export interface User {
  id?: string;  // Making id optional to accommodate existing code
  name?: string;
  email: string;
  isAuthenticated: boolean;
  isPremium?: boolean;
  isAdmin?: boolean;
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
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  isLoading: boolean;
  profileData: ProfileData | null;
  isProfileComplete: boolean;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  fetchProfile: () => Promise<void>;
  upgradeToPremium: () => boolean; // New method for upgrading to premium
}
