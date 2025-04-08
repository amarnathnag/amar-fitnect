
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Clock, Dumbbell, Flag, Heart, PlayCircle, CheckCircle2, Flame, User, ArrowLeft } from 'lucide-react';
import { workouts } from '@/data/workouts';
import { WorkoutPlan } from '@/types/workout';

const WorkoutDetail = () => {
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('id');
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(-1); // -1 means not started
  
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

  const handleStartWorkout = () => {
    setCurrentExercise(0);
    setProgress(1); // Start with a little progress
  };

  const handleNextExercise = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setProgress(Math.round(((currentExercise + 2) / (workout.exercises.length + 1)) * 100));
    } else {
      // Workout completed
      setProgress(100);
      setCurrentExercise(-2); // -2 means completed
    }
  };

  const handleBackToStart = () => {
    setCurrentExercise(-1);
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-6">
        <div className="container-custom">
          <div className="mb-8">
            <Button variant="outline" className="mb-4" asChild>
              <a href="/workouts">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workouts
              </a>
            </Button>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Workout Image */}
              <div className="relative rounded-xl overflow-hidden h-64 md:h-auto">
                <img 
                  src={workout.image} 
                  alt={workout.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 dark:bg-gray-800/90 text-health-primary px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {workout.level}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{workout.duration}</span>
                    <span className="mx-2">•</span>
                    <Flame className="h-4 w-4" />
                    <span className="text-sm">~{workout.calories} calories</span>
                  </div>
                </div>
              </div>
              
              {/* Workout Details */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{workout.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{workout.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
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
                    <Flame className="h-5 w-5 text-health-primary" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{translateText("calories_burned", language)}</p>
                      <p className="font-medium">{workout.calories}</p>
                    </div>
                  </div>
                </div>
                
                {currentExercise === -1 && (
                  <Button 
                    onClick={handleStartWorkout}
                    className="w-full text-lg py-6 bg-gradient-to-r from-health-primary to-health-primary/90 hover:from-health-dark hover:to-health-dark/90 text-white flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="h-5 w-5" /> {translateText("start_workout", language)}
                  </Button>
                )}
                
                {currentExercise >= 0 && currentExercise < workout.exercises.length && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="bg-health-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                        {currentExercise + 1}
                      </span>
                      Current: {workout.exercises[currentExercise].name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {workout.exercises[currentExercise].sets} sets × {workout.exercises[currentExercise].reps}
                      {workout.exercises[currentExercise].duration && ` (${workout.exercises[currentExercise].duration})`}
                    </p>
                    <Button 
                      onClick={handleNextExercise} 
                      className="w-full bg-health-primary hover:bg-health-dark"
                    >
                      Next Exercise
                    </Button>
                  </div>
                )}
                
                {currentExercise === -2 && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-900/30">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
                      <h3 className="font-medium text-lg">Workout Completed!</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Great job! You've completed the entire workout.
                    </p>
                    <Button 
                      onClick={handleBackToStart} 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Start Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Progress bar section */}
          <div className="mt-6 mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Exercise Details */}
          <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{translateText("exercises", language)}</h2>
                <ul className="space-y-4">
                  {workout.exercises.map((exercise, index) => (
                    <li key={index} className={`border-b pb-2 ${currentExercise === index ? 'bg-health-light/30 -mx-2 px-2 py-2 rounded-md border-health-primary' : ''}`}>
                      <div className="flex items-center gap-2">
                        {index < currentExercise ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : currentExercise === index ? (
                          <div className="h-5 w-5 rounded-full bg-health-primary text-white flex items-center justify-center text-xs flex-shrink-0">
                            {index + 1}
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center text-xs flex-shrink-0">
                            {index + 1}
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {exercise.sets} {translateText("sets", language)} × {exercise.reps}
                            {exercise.duration && ` (${exercise.duration})`}
                          </p>
                        </div>
                      </div>
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
                        <ol className="list-decimal list-inside space-y-3">
                          {workout.detailedInstructions.steps.map((step, index) => (
                            <li key={index} className="text-gray-700 dark:text-gray-300">
                              <div className="inline-block bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-md ml-2 -mt-2">
                                {step}
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        {workout.detailedInstructions.targetedMuscles && (
                          <div className="mb-4">
                            <h3 className="font-medium mb-2">{translateText("targeted_muscles", language)}</h3>
                            <ul className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-1">
                              {workout.detailedInstructions.targetedMuscles.map((muscle, index) => (
                                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                                  <span className="h-2 w-2 rounded-full bg-health-primary mr-2"></span>
                                  {muscle}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {workout.detailedInstructions.healthBenefits && (
                          <div className="mb-4">
                            <h3 className="font-medium mb-2">{translateText("health_benefits", language)}</h3>
                            <ul className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md space-y-1">
                              {workout.detailedInstructions.healthBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                                  <span className="h-2 w-2 rounded-full bg-health-primary mr-2"></span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutDetail;
