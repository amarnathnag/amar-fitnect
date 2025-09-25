
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Save, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ExerciseForm from './ExerciseForm';
import WellnessForm from './WellnessForm';

interface Exercise {
  id?: number;
  name: string;
  duration: number;
  calories_burned: number;
  type: string;
}

interface WellnessData {
  water_intake: number;
  sleep_hours: number;
  mood: string;
  weight: number;
  notes: string;
}

interface ProgressDialogProps {
  onSave: (data: any) => Promise<any>;
  isLoading: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ProgressDialog = ({ onSave, isLoading, open, onOpenChange }: ProgressDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const dialogOpen = open !== undefined ? open : isDialogOpen;
  const setDialogOpen = onOpenChange !== undefined ? onOpenChange : setIsDialogOpen;
  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    name: '',
    duration: 0,
    calories_burned: 0,
    type: ''
  });
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [wellnessData, setWellnessData] = useState<WellnessData>({
    water_intake: 0,
    sleep_hours: 0,
    mood: '',
    weight: 0,
    notes: ''
  });
  const { toast } = useToast();

  const addExercise = () => {
    setExercises(prev => [...prev, { ...currentExercise, id: Date.now() }]);
    setCurrentExercise({
      name: '',
      duration: 0,
      calories_burned: 0,
      type: ''
    });
  };

  const removeExercise = (id: number) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const saveProgress = async () => {
    if (exercises.length === 0) {
      toast({
        title: "No Data",
        description: "Please add at least one exercise to save progress",
        variant: "destructive",
      });
      return;
    }

    const progressData = {
      exercises,
      ...wellnessData
    };

    const result = await onSave(progressData);
    if (result) {
      setDialogOpen(false);
      setExercises([]);
      setWellnessData({
        water_intake: 0,
        sleep_hours: 0,
        mood: '',
        weight: 0,
        notes: ''
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Log Today's Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Log Daily Progress - {new Date().toLocaleDateString()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <ExerciseForm
            currentExercise={currentExercise}
            setCurrentExercise={setCurrentExercise}
            exercises={exercises}
            onAddExercise={addExercise}
            onRemoveExercise={removeExercise}
          />

          <WellnessForm
            wellnessData={wellnessData}
            setWellnessData={setWellnessData}
          />

          <div className="flex gap-2">
            <Button onClick={saveProgress} disabled={isLoading} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Today's Progress
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressDialog;
