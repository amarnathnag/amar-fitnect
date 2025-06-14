
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  id?: number;
  name: string;
  duration: number;
  calories_burned: number;
  type: string;
}

interface ExerciseFormProps {
  currentExercise: Exercise;
  setCurrentExercise: React.Dispatch<React.SetStateAction<Exercise>>;
  exercises: Exercise[];
  onAddExercise: () => void;
  onRemoveExercise: (id: number) => void;
}

const exerciseTypes = [
  'Cardio', 'Strength Training', 'Yoga', 'Running', 'Cycling', 
  'Swimming', 'Walking', 'Dancing', 'Sports', 'Other'
];

const ExerciseForm = ({ 
  currentExercise, 
  setCurrentExercise, 
  exercises, 
  onAddExercise, 
  onRemoveExercise 
}: ExerciseFormProps) => {
  const { toast } = useToast();

  const handleAddExercise = () => {
    if (!currentExercise.name || !currentExercise.duration) {
      toast({
        title: "Validation Error",
        description: "Please fill in exercise name and duration",
        variant: "destructive",
      });
      return;
    }
    onAddExercise();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium flex items-center gap-2">
        <Activity className="h-4 w-4" />
        Exercises
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Exercise Name</Label>
          <Input 
            value={currentExercise.name}
            onChange={(e) => setCurrentExercise(prev => ({...prev, name: e.target.value}))}
            placeholder="e.g., Morning Run"
          />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <Select 
            value={currentExercise.type} 
            onValueChange={(value) => setCurrentExercise(prev => ({...prev, type: value}))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {exerciseTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Duration (minutes)</Label>
          <Input 
            type="number"
            value={currentExercise.duration}
            onChange={(e) => setCurrentExercise(prev => ({...prev, duration: parseInt(e.target.value) || 0}))}
          />
        </div>
        <div className="space-y-2">
          <Label>Calories Burned</Label>
          <Input 
            type="number"
            value={currentExercise.calories_burned}
            onChange={(e) => setCurrentExercise(prev => ({...prev, calories_burned: parseInt(e.target.value) || 0}))}
          />
        </div>
      </div>
      
      <Button onClick={handleAddExercise} variant="outline" size="sm">
        <Plus className="h-3 w-3 mr-1" />
        Add Exercise
      </Button>

      {exercises.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Added Exercises:</p>
          {exercises.map((exercise) => (
            <div key={exercise.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
              <span>{exercise.name} - {exercise.duration} min</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemoveExercise(exercise.id!)}
                className="text-red-500"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseForm;
