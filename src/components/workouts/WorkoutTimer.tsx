import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, Pause, SkipForward, RotateCcw, Volume2, VolumeX, 
  Timer, Flame, Dumbbell, CheckCircle2
} from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: string;
}

interface WorkoutTimerProps {
  exercises: Exercise[];
  workoutTitle: string;
  onComplete: (stats: WorkoutStats) => void;
  onExerciseChange?: (index: number) => void;
}

export interface WorkoutStats {
  totalTime: number;
  exercisesCompleted: number;
  totalExercises: number;
}

const parseTime = (timeStr: string | undefined): number => {
  if (!timeStr) return 45; // Default 45 seconds
  const match = timeStr.match(/(\d+)\s*(sec|min|s|m)/i);
  if (match) {
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    if (unit === 'min' || unit === 'm') return value * 60;
    return value;
  }
  return 45;
};

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ 
  exercises, 
  workoutTitle,
  onComplete,
  onExerciseChange 
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const REST_TIME = 15; // 15 seconds rest between sets
  const EXERCISE_REST_TIME = 30; // 30 seconds rest between exercises

  const currentExercise = exercises[currentExerciseIndex];
  const exerciseTime = parseTime(currentExercise?.reps);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play beep sound
  const playBeep = useCallback((frequency: number = 800, duration: number = 200, count: number = 1) => {
    if (!soundEnabled || !audioContextRef.current) return;

    const playTone = (delay: number) => {
      setTimeout(() => {
        const oscillator = audioContextRef.current!.createOscillator();
        const gainNode = audioContextRef.current!.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current!.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContextRef.current!.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current!.currentTime + duration / 1000);
        
        oscillator.start();
        oscillator.stop(audioContextRef.current!.currentTime + duration / 1000);
      }, delay);
    };

    for (let i = 0; i < count; i++) {
      playTone(i * (duration + 100));
    }
  }, [soundEnabled]);

  // Play countdown beep
  const playCountdownBeep = useCallback(() => {
    playBeep(600, 150, 1);
  }, [playBeep]);

  // Play exercise complete sound
  const playCompleteSound = useCallback(() => {
    playBeep(1000, 300, 2);
  }, [playBeep]);

  // Play workout complete sound
  const playWorkoutCompleteSound = useCallback(() => {
    playBeep(1200, 400, 3);
  }, [playBeep]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 4 && prev > 1) {
            playCountdownBeep();
          }
          if (prev === 1) {
            playCompleteSound();
          }
          return prev - 1;
        });
        setTotalTime(prev => prev + 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  const handleTimerComplete = () => {
    if (isResting) {
      // Rest complete, start next set or exercise
      setIsResting(false);
      if (currentSet < currentExercise.sets) {
        setCurrentSet(prev => prev + 1);
        setTimeRemaining(exerciseTime);
      } else {
        // Exercise complete
        setCompletedExercises(prev => [...prev, currentExerciseIndex]);
        
        if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex(prev => prev + 1);
          setCurrentSet(1);
          setIsResting(true);
          setTimeRemaining(EXERCISE_REST_TIME);
          onExerciseChange?.(currentExerciseIndex + 1);
        } else {
          // Workout complete!
          setIsRunning(false);
          playWorkoutCompleteSound();
          onComplete({
            totalTime,
            exercisesCompleted: exercises.length,
            totalExercises: exercises.length
          });
        }
      }
    } else {
      // Exercise set complete, start rest
      setIsResting(true);
      if (currentSet < currentExercise.sets) {
        setTimeRemaining(REST_TIME);
      } else {
        setTimeRemaining(EXERCISE_REST_TIME);
      }
    }
  };

  const startTimer = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(exerciseTime);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const skipExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCompletedExercises(prev => [...prev, currentExerciseIndex]);
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
      setTimeRemaining(parseTime(exercises[currentExerciseIndex + 1]?.reps));
      onExerciseChange?.(currentExerciseIndex + 1);
    } else {
      // Complete workout
      setIsRunning(false);
      playWorkoutCompleteSound();
      onComplete({
        totalTime,
        exercisesCompleted: completedExercises.length + 1,
        totalExercises: exercises.length
      });
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsResting(false);
    setTimeRemaining(0);
    setTotalTime(0);
    setCompletedExercises([]);
    onExerciseChange?.(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((currentExerciseIndex + (currentSet - 1) / currentExercise?.sets) / exercises.length) * 100;

  return (
    <Card className="border-2 border-health-primary/20 bg-gradient-to-br from-health-light/50 to-white dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-health-primary" />
            <h3 className="font-semibold text-lg">Workout Timer</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-health-primary/10">
              <Flame className="h-3 w-3 mr-1" />
              {formatTime(totalTime)}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="h-8 w-8"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Current Exercise Display */}
        <div className={`text-center p-6 rounded-xl mb-6 transition-all ${
          isResting 
            ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300' 
            : 'bg-gradient-to-br from-health-primary/10 to-health-accent/10 border-2 border-health-primary/30'
        }`}>
          <div className="mb-2">
            <Badge className={isResting ? 'bg-blue-500' : 'bg-health-primary'}>
              {isResting ? '🧘 REST' : `Exercise ${currentExerciseIndex + 1}/${exercises.length}`}
            </Badge>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isResting ? 'Rest Time' : currentExercise?.name}
          </h2>
          
          {!isResting && (
            <p className="text-muted-foreground">
              Set {currentSet} of {currentExercise?.sets}
            </p>
          )}

          {/* Timer Display */}
          <div className={`text-6xl font-bold my-6 font-mono ${
            timeRemaining <= 3 && isRunning ? 'text-red-500 animate-pulse' : 'text-health-primary'
          }`}>
            {formatTime(timeRemaining)}
          </div>

          {/* Timer Progress */}
          <Progress 
            value={isResting 
              ? ((isResting && currentSet >= currentExercise?.sets ? EXERCISE_REST_TIME : REST_TIME) - timeRemaining) / (isResting && currentSet >= currentExercise?.sets ? EXERCISE_REST_TIME : REST_TIME) * 100
              : (exerciseTime - timeRemaining) / exerciseTime * 100
            } 
            className="h-2 mb-4"
          />
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={resetTimer}
            className="h-12 w-12 rounded-full"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            onClick={isRunning ? pauseTimer : startTimer}
            className={`h-16 w-16 rounded-full ${
              isRunning 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-health-primary hover:bg-health-dark'
            }`}
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={skipExercise}
            className="h-12 w-12 rounded-full"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Exercise List Mini */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Workout Progress</h4>
          <Progress value={progressPercent} className="h-2" />
          <div className="grid grid-cols-2 gap-2 mt-3">
            {exercises.slice(0, 6).map((exercise, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-2 text-xs p-2 rounded-lg transition-all ${
                  completedExercises.includes(index) 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : index === currentExerciseIndex 
                      ? 'bg-health-primary/10 border border-health-primary/30 font-medium'
                      : 'bg-muted/50'
                }`}
              >
                {completedExercises.includes(index) ? (
                  <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                ) : (
                  <Dumbbell className="h-3 w-3 flex-shrink-0" />
                )}
                <span className="truncate">{exercise.name}</span>
              </div>
            ))}
            {exercises.length > 6 && (
              <div className="text-xs text-muted-foreground p-2">
                +{exercises.length - 6} more
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimer;
