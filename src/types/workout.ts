
export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  duration?: string;
}

export interface WorkoutInstructions {
  steps: string[];
  targetedMuscles?: string[];
  healthBenefits?: string[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: number;
  category: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'beginner-full-body' | 'pcos-friendly' | 'fat-loss' | 'senior-friendly' | 'kids-fitness' | 'yoga' | 'swimming' | 'cycling' | 'dancing' | 'martial-arts' | 'stretching';
  image: string;
  exercises: WorkoutExercise[];
  detailedInstructions?: WorkoutInstructions;
}
