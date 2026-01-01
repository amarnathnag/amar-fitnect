import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Clock, Dumbbell, Flag, Heart, PlayCircle, CheckCircle2, Flame, User, ArrowLeft, Star, Timer, History } from 'lucide-react';
import { workouts } from '@/data/workouts';
import { WorkoutPlan } from '@/types/workout';
import WorkoutTimer, { WorkoutStats } from '@/components/workouts/WorkoutTimer';
import WorkoutHistory from '@/components/workouts/WorkoutHistory';
import { useWorkoutHistory } from '@/hooks/useWorkoutHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WorkoutDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const { saveWorkoutCompletion, saving } = useWorkoutHistory();
  
  const [progress, setProgress] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(-1); // -1 means not started
  const [showTimer, setShowTimer] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [completionStats, setCompletionStats] = useState<WorkoutStats | null>(null);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('workout');
  
  const workout: WorkoutPlan | undefined = workouts.find(w => w.id === id);
  
  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Workout not found</h1>
            <Button onClick={() => navigate('/workouts')}>
              Back to Workouts
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStartWorkout = () => {
    setShowTimer(true);
    setCurrentExercise(0);
    setProgress(1);
  };

  const handleStartManual = () => {
    setShowTimer(false);
    setCurrentExercise(0);
    setProgress(1);
  };

  const handleNextExercise = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setProgress(Math.round(((currentExercise + 2) / (workout.exercises.length + 1)) * 100));
    } else {
      // Workout completed manually
      setProgress(100);
      setCompletionStats({
        totalTime: parseInt(workout.duration) * 60,
        exercisesCompleted: workout.exercises.length,
        totalExercises: workout.exercises.length
      });
      setShowCompletionDialog(true);
    }
  };

  const handleTimerComplete = (stats: WorkoutStats) => {
    setProgress(100);
    setCurrentExercise(-2);
    setCompletionStats(stats);
    setShowTimer(false);
    setShowCompletionDialog(true);
  };

  const handleExerciseChange = (index: number) => {
    setCurrentExercise(index);
    setProgress(Math.round(((index + 1) / workout.exercises.length) * 100));
  };

  const handleSaveCompletion = async () => {
    if (!completionStats || !user) return;

    await saveWorkoutCompletion({
      workout_id: workout.id,
      workout_title: workout.title,
      duration_minutes: Math.round(completionStats.totalTime / 60),
      calories_burned: workout.calories,
      exercises_completed: completionStats.exercisesCompleted,
      total_exercises: completionStats.totalExercises,
      notes: notes || undefined,
      rating: rating || undefined
    });

    setShowCompletionDialog(false);
    setCurrentExercise(-2);
    setRating(0);
    setNotes('');
  };

  const handleBackToStart = () => {
    setCurrentExercise(-1);
    setProgress(0);
    setShowTimer(false);
    setCompletionStats(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-6">
        <div className="container-custom">
          <div className="mb-6">
            <Button variant="outline" className="mb-4" onClick={() => navigate('/workouts')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workouts
            </Button>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="workout" className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4" />
                  Workout
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  My History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="workout">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Workout Info */}
                  <div>
                    {/* Workout Image */}
                    <div className="relative rounded-xl overflow-hidden h-64 mb-6">
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
                        <h1 className="text-2xl text-white font-bold mb-2">{workout.title}</h1>
                        <div className="flex items-center gap-4 text-white/90 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {workout.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-4 w-4" /> ~{workout.calories} cal
                          </span>
                        </div>
                      </div>
                    </div>
                    
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
                    
                    {/* Start Buttons */}
                    {currentExercise === -1 && (
                      <div className="space-y-3">
                        <Button 
                          onClick={handleStartWorkout}
                          className="w-full text-lg py-6 bg-gradient-to-r from-health-primary to-health-accent hover:from-health-dark hover:to-health-primary text-white flex items-center justify-center gap-2"
                        >
                          <Timer className="h-5 w-5" /> Start with Timer
                        </Button>
                        <Button 
                          onClick={handleStartManual}
                          variant="outline"
                          className="w-full py-4"
                        >
                          <PlayCircle className="h-5 w-5 mr-2" /> Manual Mode (No Timer)
                        </Button>
                      </div>
                    )}
                    
                    {/* Manual Mode Progress */}
                    {currentExercise >= 0 && currentExercise < workout.exercises.length && !showTimer && (
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
                          {currentExercise < workout.exercises.length - 1 ? 'Next Exercise' : 'Complete Workout'}
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

                  {/* Right Column - Timer or Exercise List */}
                  <div>
                    {showTimer && currentExercise >= 0 ? (
                      <WorkoutTimer
                        exercises={workout.exercises}
                        workoutTitle={workout.title}
                        onComplete={handleTimerComplete}
                        onExerciseChange={handleExerciseChange}
                      />
                    ) : (
                      <div className="space-y-4">
                        {/* Progress bar */}
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {/* Exercise List */}
                        <div className="bg-card rounded-lg border p-4">
                          <h2 className="text-lg font-bold mb-4">{translateText("exercises", language)}</h2>
                          <ul className="space-y-3">
                            {workout.exercises.map((exercise, index) => (
                              <li key={index} className={`p-3 rounded-lg transition-all ${
                                currentExercise === index 
                                  ? 'bg-health-primary/10 border border-health-primary/30' 
                                  : index < currentExercise 
                                    ? 'bg-green-50 dark:bg-green-900/20' 
                                    : 'bg-muted/30'
                              }`}>
                                <div className="flex items-center gap-3">
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
                                  <div className="flex-1">
                                    <p className="font-medium">{exercise.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {exercise.sets} sets × {exercise.reps}
                                      {exercise.duration && ` • ${exercise.duration}`}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Detailed Instructions */}
                {workout.detailedInstructions && (
                  <div className="mt-8">
                    <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
                      <ResizablePanel defaultSize={40} minSize={25}>
                        <div className="p-6">
                          <h2 className="text-xl font-bold mb-4">{translateText("step_by_step", language)}</h2>
                          <ol className="list-decimal list-inside space-y-3">
                            {workout.detailedInstructions.steps.map((step, index) => (
                              <li key={index} className="text-gray-700 dark:text-gray-300">
                                <span className="ml-2">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </ResizablePanel>
                      
                      <ResizableHandle withHandle />
                      
                      <ResizablePanel defaultSize={60}>
                        <div className="p-6 grid md:grid-cols-2 gap-6">
                          {workout.detailedInstructions.targetedMuscles && (
                            <div>
                              <h3 className="font-medium mb-3 flex items-center gap-2">
                                <Dumbbell className="h-4 w-4 text-health-primary" />
                                {translateText("targeted_muscles", language)}
                              </h3>
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
                            <div>
                              <h3 className="font-medium mb-3 flex items-center gap-2">
                                <Heart className="h-4 w-4 text-health-primary" />
                                {translateText("health_benefits", language)}
                              </h3>
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
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <WorkoutHistory showStats={true} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Workout Complete! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-1 text-health-primary" />
                <div className="text-lg font-bold">
                  {completionStats ? Math.round(completionStats.totalTime / 60) : 0}
                </div>
                <p className="text-xs text-muted-foreground">Minutes</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                <div className="text-lg font-bold">{workout.calories}</div>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <Dumbbell className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                <div className="text-lg font-bold">
                  {completionStats?.exercisesCompleted || 0}/{completionStats?.totalExercises || 0}
                </div>
                <p className="text-xs text-muted-foreground">Exercises</p>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>How was this workout?</Label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= rating 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 hover:text-yellow-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="How did you feel? Any modifications made?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowCompletionDialog(false)}>
              Skip
            </Button>
            <Button 
              onClick={handleSaveCompletion} 
              disabled={saving || !user}
              className="bg-health-primary hover:bg-health-dark"
            >
              {saving ? 'Saving...' : 'Save Progress'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default WorkoutDetail;
