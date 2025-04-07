
import { WorkoutPlan } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface WorkoutCategoryContentProps {
  workouts: WorkoutPlan[];
  category: string;
}

const WorkoutCategoryContent = ({ workouts, category }: WorkoutCategoryContentProps) => {
  const filteredWorkouts = workouts.filter(workout => workout.category === category);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredWorkouts.map(workout => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutCategoryContent;
