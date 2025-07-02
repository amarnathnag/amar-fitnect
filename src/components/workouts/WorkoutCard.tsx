
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Play, Timer, Flame, Dumbbell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { WorkoutPlan } from "@/types/workout";

interface WorkoutCardProps {
  workout: WorkoutPlan;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const { language } = useLanguage();

  return (
    <Card className="health-card overflow-hidden group hover:shadow-lg transition-all duration-300 border border-muted/50">
      <div className="relative h-52 w-full overflow-hidden">
        <img 
          src={workout.image} 
          alt={workout.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-gray-800/90 text-health-primary px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            {workout.level}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl text-white font-bold mb-1 drop-shadow-md">{workout.title}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{workout.description}</p>
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-health-light dark:bg-health-primary/10 p-2 rounded-full">
              <Timer className="h-4 w-4 text-health-primary" />
            </div>
            <span className="text-sm font-medium">{workout.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-health-light dark:bg-health-primary/10 p-2 rounded-full">
              <Flame className="h-4 w-4 text-health-primary" />
            </div>
            <span className="text-sm font-medium">{workout.calories} cal</span>
          </div>
        </div>

        <h3 className="text-sm font-medium text-muted-foreground mb-3">{translateText("exercises", language)}</h3>
        <ul className="space-y-2">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <li key={index} className="text-sm flex justify-between items-center py-1 border-b border-muted/30 last:border-0">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-3.5 w-3.5 text-health-primary" />
                <span>{exercise.name}</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-muted/30 rounded-full">
                {exercise.sets} × {exercise.reps}
              </span>
            </li>
          ))}
          {workout.exercises.length > 3 && (
            <li className="text-sm text-health-primary font-medium text-center pt-1">
              +{workout.exercises.length - 3} {translateText("more_exercises", language)}
            </li>
          )}
        </ul>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-800/20 p-4">
        <Button asChild className="w-full bg-gradient-to-r from-health-primary to-health-primary/90 hover:from-health-dark hover:to-health-dark/90 text-white py-2 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
          <Link to={`/workout/${workout.id}`}>
            <Play className="h-4 w-4" /> {translateText("start_workout", language)}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
