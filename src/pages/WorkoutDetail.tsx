
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Clock, Dumbbell, Flag, Heart } from 'lucide-react';
import { workouts } from '@/data/workouts';
import { WorkoutPlan } from '@/types/workout';

const WorkoutDetail = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('id');
  const { language } = useLanguage();
  
  const workout: WorkoutPlan | undefined = workouts.find(w => w.id === workoutId);
  
  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Workout not found</h1>
            <Button asChild>
              <a href="/workouts">Back to Workouts</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-6">
        <div className="container-custom">
          <div className="mb-8">
            <Button variant="outline" className="mb-4" asChild>
              <a href="/workouts">← Back to Workouts</a>
            </Button>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Workout Image */}
              <div className="relative rounded-lg overflow-hidden h-64 md:h-auto">
                <img 
                  src={workout.image} 
                  alt={workout.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                    {workout.level}
                  </span>
                </div>
              </div>
              
              {/* Workout Details */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{workout.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-health-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translateText("duration", language)}</p>
                      <p className="font-medium">{workout.duration}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-health-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translateText("difficulty", language)}</p>
                      <p className="font-medium">{workout.level}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                    <Flag className="h-5 w-5 text-health-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translateText("calories_burned", language)}</p>
                      <p className="font-medium">{workout.calories}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <Button className="w-full text-lg py-6 btn-primary flex items-center justify-center gap-2">
                    <Heart className="h-5 w-5" /> {translateText("start_workout", language)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Exercise Details */}
          <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{translateText("exercises", language)}</h2>
                <ul className="space-y-4">
                  {workout.exercises.map((exercise, index) => (
                    <li key={index} className="border-b pb-2">
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                        {exercise.duration && ` (${exercise.duration})`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={70}>
              <div className="p-6">
                {workout.detailedInstructions && (
                  <>
                    <h2 className="text-xl font-bold mb-4">{translateText("step_by_step", language)}</h2>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">{translateText("steps", language)}</h3>
                        <ol className="list-decimal list-inside space-y-2">
                          {workout.detailedInstructions.steps.map((step, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      {workout.detailedInstructions.targetedMuscles && (
                        <div className="mb-4">
                          <h3 className="font-medium mb-2">{translateText("targeted_muscles", language)}</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {workout.detailedInstructions.targetedMuscles.map((muscle, index) => (
                              <li key={index} className="text-gray-700 dark:text-gray-300">{muscle}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {workout.detailedInstructions.healthBenefits && (
                        <div className="mb-4">
                          <h3 className="font-medium mb-2">{translateText("health_benefits", language)}</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {workout.detailedInstructions.healthBenefits.map((benefit, index) => (
                              <li key={index} className="text-gray-700 dark:text-gray-300">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
          
          {/* Progress bar section */}
          <div className="mt-12 mb-8">
            <h2 className="text-xl font-bold mb-6">Workout Progress Tracker</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <Button variant="outline" className="w-full">
                Track Your Progress
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutDetail;
