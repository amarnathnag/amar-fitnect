
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Play, Timer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { WorkoutPlan } from "@/types/workout";

interface WorkoutCardProps {
  workout: WorkoutPlan;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const { language } = useLanguage();

  return (
    <Card className="health-card overflow-hidden">
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

        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{translateText("exercises", language)}</h3>
        <ul className="space-y-2">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <li key={index} className="text-sm flex justify-between">
              <span>{exercise.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {exercise.sets} {translateText("sets", language)} × {exercise.reps}
              </span>
            </li>
          ))}
          {workout.exercises.length > 3 && (
            <li className="text-sm text-health-primary font-medium">
              +{workout.exercises.length - 3} {translateText("more_exercises", language)}
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
        <Button asChild className="w-full btn-primary flex items-center justify-center gap-2">
          <Link to={`/workout-detail?id=${workout.id}`}>
            <Play className="h-4 w-4" /> {translateText("start_workout", language)}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
