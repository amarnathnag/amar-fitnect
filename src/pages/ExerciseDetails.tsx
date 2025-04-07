
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Timer, 
  Flame, 
  Target, 
  ListChecks,
  Heart,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: string;
}

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: number;
  category: string;
  image: string;
  exercises: Exercise[];
  detailedInstructions?: {
    steps: string[];
    targetedMuscles?: string[];
    healthBenefits?: string[];
  };
}

// This is a simplified version for demo purposes - in a real app, you'd fetch this from an API
const getWorkoutById = (id: string): WorkoutPlan | undefined => {
  // In a real application, this would come from an API or a more organized data source
  // For demonstration, we're using a simplified approach with hardcoded data
  const workouts: WorkoutPlan[] = [
    // Weight Loss Workouts
    {
      id: 'hiit-cardio',
      title: 'HIIT Cardio Blast',
      description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular health.',
      level: 'Intermediate',
      duration: '30 min',
      calories: 400,
      category: 'weight-loss',
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Jumping Jacks', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'Mountain Climbers', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'Burpees', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'High Knees', sets: 3, reps: '45 sec', duration: '15 sec rest' },
        { name: 'Squat Jumps', sets: 3, reps: '45 sec', duration: '15 sec rest' },
      ],
      detailedInstructions: {
        steps: [
          "Start with a warm-up of light jogging in place for 2 minutes",
          "For Jumping Jacks: Stand with feet together, arms at sides, then jump feet apart while raising arms overhead",
          "For Mountain Climbers: Begin in plank position, alternately drive knees toward chest quickly",
          "For Burpees: Start standing, drop to a squat, kick feet back to plank, return to squat, then jump up",
          "For High Knees: Run in place, lifting knees as high as possible",
          "For Squat Jumps: Lower into squat position, then explosively jump upward"
        ],
        targetedMuscles: ["Quadriceps", "Hamstrings", "Calves", "Core", "Shoulders"],
        healthBenefits: ["Improved cardiovascular health", "Enhanced metabolism", "Better endurance"]
      }
    },
    {
      id: 'full-body-burn',
      title: 'Full Body Fat Burn',
      description: 'A comprehensive workout targeting all major muscle groups to boost metabolism and burn fat.',
      level: 'Beginner',
      duration: '45 min',
      calories: 350,
      category: 'weight-loss',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '15 reps' },
        { name: 'Push-ups (Modified if needed)', sets: 3, reps: '10 reps' },
        { name: 'Lunges', sets: 3, reps: '12 reps each leg' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12 reps each arm' },
        { name: 'Plank', sets: 3, reps: '30 sec hold' },
      ],
      detailedInstructions: {
        steps: [
          "Start with 5 minutes of light cardio to warm up",
          "For Bodyweight Squats: Stand with feet shoulder-width apart, lower your hips as if sitting in a chair, then return to standing",
          "For Push-ups: Start in plank position, lower chest toward floor by bending elbows, then push back up (modify by using knees)",
          "For Lunges: Step forward with one leg, lower until both knees are bent at 90 degrees, then return to start",
          "For Dumbbell Rows: With a dumbbell in one hand, hinge forward with back flat, pull dumbbell toward hip, then lower",
          "For Plank: Hold a push-up position with body in straight line from head to heels"
        ],
        targetedMuscles: ["Quadriceps", "Chest", "Back", "Core", "Glutes"],
        healthBenefits: ["Increased muscle tone", "Enhanced fat burning", "Improved posture"]
      }
    },
    
    // Muscle Gain Workouts
    {
      id: 'upper-body-strength',
      title: 'Upper Body Strength',
      description: 'Build muscle and strength in your chest, back, shoulders, and arms.',
      level: 'Intermediate',
      duration: '50 min',
      calories: 300,
      category: 'muscle-gain',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10 reps' },
        { name: 'Pull-ups/Assisted Pull-ups', sets: 4, reps: '8-10 reps' },
        { name: 'Shoulder Press', sets: 3, reps: '10-12 reps' },
        { name: 'Bicep Curls', sets: 3, reps: '12 reps' },
        { name: 'Tricep Dips', sets: 3, reps: '12 reps' },
      ],
      detailedInstructions: {
        steps: [
          "Start with arm circles and shoulder mobility exercises for 5 minutes",
          "For Bench Press: Lie on a bench, grasp barbell with hands just wider than shoulders, lower to chest, then press up",
          "For Pull-ups: Hang from bar with hands wider than shoulders, pull up until chin clears bar (use assist machine if needed)",
          "For Shoulder Press: Seated or standing, press dumbbells from shoulder height straight overhead",
          "For Bicep Curls: Stand with dumbbells at sides, palms forward, curl weights to shoulders",
          "For Tricep Dips: Using parallel bars or bench, lower body by bending elbows, then push back up"
        ],
        targetedMuscles: ["Chest", "Back", "Shoulders", "Biceps", "Triceps"],
        healthBenefits: ["Increased upper body strength", "Improved posture", "Enhanced functional mobility"]
      }
    },
    // Additional workouts would be added here
  ];
  
  return workouts.find(workout => workout.id === id);
};

const ExerciseDetails = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('id');
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (workoutId) {
      const foundWorkout = getWorkoutById(workoutId);
      if (foundWorkout) {
        setWorkout(foundWorkout);
      }
    }
  }, [workoutId]);

  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
            <p className="mb-6">The workout you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/workouts">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workouts
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-64 md:h-96">
          <div className="absolute inset-0">
            <img 
              src={workout.image} 
              alt={workout.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
            <Button variant="outline" size="sm" className="w-fit mb-4 bg-black/20 border-white/20 text-white hover:bg-black/40 hover:text-white" asChild>
              <Link to="/workouts">
                <ArrowLeft className="mr-2 h-4 w-4" /> {translateText("workouts", language)}
              </Link>
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{workout.title}</h1>
            <p className="text-white/90 max-w-2xl">{workout.description}</p>
            
            <div className="flex items-center mt-6 text-white">
              <div className="flex items-center mr-4">
                <Timer className="h-5 w-5 mr-1" />
                <span>{workout.duration}</span>
              </div>
              <div className="flex items-center mr-4">
                <Flame className="h-5 w-5 mr-1" />
                <span>~{workout.calories} calories</span>
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {workout.level}
              </div>
            </div>
          </div>
        </section>
        
        {/* Workout Details Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Exercise List */}
              <div className="md:col-span-2">
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{translateText("exercises", language)}</h2>
                    <div className="space-y-6">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{exercise.name}</h3>
                            <div className="text-gray-600 dark:text-gray-400 flex flex-wrap gap-4 mt-1">
                              <span className="inline-flex items-center text-sm">
                                {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                              </span>
                              {exercise.duration && (
                                <span className="inline-flex items-center text-sm">
                                  <Timer className="h-4 w-4 mr-1" />
                                  {exercise.duration}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <span className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Detailed Instructions */}
                {workout.detailedInstructions && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">{translateText("step_by_step", language)}</h2>
                      <ol className="space-y-4 list-decimal pl-5">
                        {workout.detailedInstructions.steps.map((step, index) => (
                          <li key={index} className="pl-2">
                            <span className="text-base">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Sidebar */}
              <div>
                {/* Targeted Muscles */}
                {workout.detailedInstructions?.targetedMuscles && (
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-health-primary" />
                        {translateText("targeted_muscles", language)}
                      </h3>
                      <ul className="space-y-2">
                        {workout.detailedInstructions.targetedMuscles.map((muscle, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-health-primary mr-2"></span>
                            {muscle}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {/* Health Benefits */}
                {workout.detailedInstructions?.healthBenefits && (
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-health-primary" />
                        {translateText("health_benefits", language)}
                      </h3>
                      <ul className="space-y-2">
                        {workout.detailedInstructions.healthBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-health-primary mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                {/* Actions */}
                <Card>
                  <CardContent className="p-6">
                    <Button className="w-full mb-3 bg-health-primary hover:bg-health-dark">
                      <ListChecks className="mr-2 h-4 w-4" /> Track This Workout
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" /> Share Workout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Workouts CTA */}
        <section className="py-12">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-8">Looking for more workouts?</h2>
              <Button size="lg" asChild>
                <Link to="/workouts">
                  Explore All Workouts
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExerciseDetails;
