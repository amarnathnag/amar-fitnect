
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Activity, TrendingUp, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkoutProgressData {
  workoutsThisMonth: number;
  currentStreak: number;
  weightProgress: number;
}

const EditableWorkoutProgressCard = () => {
  const [data, setData] = useState<WorkoutProgressData>({
    workoutsThisMonth: 12,
    currentStreak: 7,
    weightProgress: -2.5
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(data);
  const { toast } = useToast();

  const handleSave = () => {
    setData(editData);
    setIsEditDialogOpen(false);
    toast({
      title: "Progress Updated",
      description: "Your workout progress has been saved successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Workout Progress
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto h-6 w-6 p-0"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-3 w-3" />
          </Button>
        </CardTitle>
        <CardDescription>Your fitness journey and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{data.workoutsThisMonth}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Workouts</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{data.currentStreak}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Day Streak</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {data.weightProgress > 0 ? '+' : ''}{data.weightProgress}kg
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          <TrendingUp className="mr-2 h-4 w-4" />
          View Detailed Progress
        </Button>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Workout Progress</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Workouts This Month</label>
                <Input 
                  type="number"
                  value={editData.workoutsThisMonth} 
                  onChange={(e) => setEditData({...editData, workoutsThisMonth: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Current Streak (Days)</label>
                <Input 
                  type="number"
                  value={editData.currentStreak} 
                  onChange={(e) => setEditData({...editData, currentStreak: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Weight Progress (kg)</label>
                <Input 
                  type="number"
                  step="0.1"
                  value={editData.weightProgress} 
                  onChange={(e) => setEditData({...editData, weightProgress: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EditableWorkoutProgressCard;
