
export type Language = 'english' | 'hindi' | 'bengali';

export type CommonTranslationKey = 
  'language' | 'english' | 'hindi' | 'bengali' | 
  'login' | 'signup' | 'logout' | 'profile' |
  'home' | 'about' | 'contact' | 'chat' |
  'welcomeMessage' | 'aboutTitle' | 'contactTitle' |
  'errorTitle' | 'errorMessage' | 'retry' |
  'apiKeyMissing' | 'apiKeyInvalid' | 'networkError' |
  'language_changed';

export type WorkoutTranslationKey =
  'workouts' | 'exercises' | 'sets' | 'more_exercises' | 
  'start_workout' | 'personalized_workout_plan' |
  'custom_workout_routine' | 'check_bmi_first' |
  'workout_routines' | 'workout_description' |
  'weight_loss' | 'muscle_gain' | 'maintenance';

export type DietTranslationKey = 
  'diet_plans' | 'bmi_calculator';

export type ExerciseTranslationKey =
  'exerciseDetailTitle' | 'exerciseDetailDescription' |
  'duration' | 'difficulty' | 'calories' | 'targets' |
  'steps' | 'tips' | 'beginner' | 'intermediate' | 'advanced';
  
export type TranslationKey = 
  CommonTranslationKey | 
  WorkoutTranslationKey | 
  DietTranslationKey | 
  ExerciseTranslationKey;

export interface TranslationMap {
  [key: string]: {
    english: string;
    hindi: string;
    bengali: string;
  };
}
