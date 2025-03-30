
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Heart, Weight, Timer, Play } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: number;
  category: 'weight-loss' | 'muscle-gain' | 'maintenance';
  image: string;
  exercises: {
    name: string;
    sets: number;
    reps: string;
    duration?: string;
  }[];
}

const Workouts = () => {
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
    },
    {
      id: 'lower-body-power',
      title: 'Lower Body Power',
      description: 'Build strong, powerful legs with this focused lower body strength workout.',
      level: 'Advanced',
      duration: '45 min',
      calories: 400,
      category: 'muscle-gain',
      image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Barbell Squats', sets: 4, reps: '8 reps' },
        { name: 'Deadlifts', sets: 4, reps: '8 reps' },
        { name: 'Leg Press', sets: 3, reps: '10 reps' },
        { name: 'Walking Lunges', sets: 3, reps: '12 steps each leg' },
        { name: 'Calf Raises', sets: 3, reps: '15 reps' },
      ],
    },
    
    // Maintenance Workouts
    {
      id: 'balanced-fitness',
      title: 'Balanced Fitness Routine',
      description: 'Maintain your current fitness level with this balanced full-body workout.',
      level: 'Beginner',
      duration: '40 min',
      calories: 250,
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '12 reps' },
        { name: 'Push-ups', sets: 3, reps: '10 reps' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12 reps each arm' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20 reps' },
        { name: 'Jumping Jacks', sets: 2, reps: '1 min' },
      ],
    },
    {
      id: 'bodyweight-circuit',
      title: 'Bodyweight Circuit',
      description: 'A convenient, equipment-free circuit to maintain fitness anywhere.',
      level: 'Intermediate',
      duration: '30 min',
      calories: 300,
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      exercises: [
        { name: 'Squats', sets: 3, reps: '15 reps' },
        { name: 'Push-ups', sets: 3, reps: '12 reps' },
        { name: 'Lunges', sets: 3, reps: '10 reps each leg' },
        { name: 'Plank', sets: 3, reps: '45 sec hold' },
        { name: 'Mountain Climbers', sets: 3, reps: '30 sec' },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Workout Routines</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Discover effective exercise programs tailored to your fitness goals, whether you're looking to lose weight, build muscle, or maintain your current fitness level.
              </p>
            </div>
          </div>
        </section>

        {/* Workouts Section */}
        <section className="py-12">
          <div className="container-custom">
            <Tabs defaultValue="weight-loss" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-full max-w-xl">
                  <TabsTrigger value="weight-loss" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Weight Loss</span>
                  </TabsTrigger>
                  <TabsTrigger value="muscle-gain" className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    <span>Muscle Gain</span>
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    <span>Maintenance</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Weight Loss Workouts */}
              <TabsContent value="weight-loss" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'weight-loss')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Exercises:</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} sets × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} more exercises
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button className="w-full btn-primary flex items-center justify-center gap-2">
                            <Play className="h-4 w-4" /> Start Workout
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Muscle Gain Workouts */}
              <TabsContent value="muscle-gain" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'muscle-gain')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Exercises:</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} sets × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} more exercises
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button className="w-full btn-primary flex items-center justify-center gap-2">
                            <Play className="h-4 w-4" /> Start Workout
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Maintenance Workouts */}
              <TabsContent value="maintenance" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workouts
                    .filter(workout => workout.category === 'maintenance')
                    .map(workout => (
                      <Card key={workout.id} className="health-card overflow-hidden">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={workout.image} 
                            alt={workout.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white dark:bg-gray-800 text-health-primary px-3 py-1 rounded-full text-xs font-medium">
                              {workout.level}
                            </span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-4">
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{workout.duration}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              ~{workout.calories} calories
                            </div>
                          </div>

                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Exercises:</h3>
                          <ul className="space-y-2">
                            {workout.exercises.slice(0, 3).map((exercise, index) => (
                              <li key={index} className="text-sm flex justify-between">
                                <span>{exercise.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">
                                  {exercise.sets} sets × {exercise.reps}
                                </span>
                              </li>
                            ))}
                            {workout.exercises.length > 3 && (
                              <li className="text-sm text-health-primary font-medium">
                                +{workout.exercises.length - 3} more exercises
                              </li>
                            )}
                          </ul>
                        </CardContent>
                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                          <Button className="w-full btn-primary flex items-center justify-center gap-2">
                            <Play className="h-4 w-4" /> Start Workout
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-health-primary to-health-accent text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Personalized Workout Plan?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Get a custom workout routine designed specifically for your fitness level, goals, and preferences.
              </p>
              <Button className="bg-white text-health-primary hover:bg-gray-100 hover:text-health-dark" size="lg" asChild>
                <Link to="/bmi-calculator">
                  Check Your BMI First <ArrowRight className="ml-2 h-4 w-4" />
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

export default Workouts;
