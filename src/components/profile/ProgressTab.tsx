
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Save, Weight, Calendar, Heart, Activity, FileText } from 'lucide-react';

interface ProgressTabProps {
  userData: {
    progress: {
      startingWeight: number;
      currentWeight: number;
      weightGoal: number;
      startDate: string;
      workoutsCompleted: number;
      streakDays: number;
    }
  };
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveChanges: () => void;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ userData, handleProgressChange, saveChanges }) => {
  // Calculate weight progress percentage
  const startToGoalDiff = userData.progress.startingWeight - userData.progress.weightGoal;
  const currentToStartDiff = userData.progress.startingWeight - userData.progress.currentWeight;
  const progressPercentage = Math.round((currentToStartDiff / startToGoalDiff) * 100);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Weight className="h-5 w-5 text-health-primary" /> Weight Progress
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Starting: {userData.progress.startingWeight} kg</span>
            <span>Current: {userData.progress.currentWeight} kg</span>
            <span>Goal: {userData.progress.weightGoal} kg</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {progressPercentage}% of your weight goal achieved
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{userData.progress.startDate}</p>
              </div>
              <Calendar className="h-5 w-5 text-health-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Workouts Done</p>
                <p className="font-medium">{userData.progress.workoutsCompleted}</p>
              </div>
              <Activity className="h-5 w-5 text-health-secondary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
                <p className="font-medium">{userData.progress.streakDays} days</p>
              </div>
              <Heart className="h-5 w-5 text-red-500" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-health-primary" /> Update Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
            <Input 
              id="currentWeight" 
              name="currentWeight" 
              type="number" 
              value={userData.progress.currentWeight} 
              onChange={handleProgressChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workoutsCompleted">Workouts Completed</Label>
            <Input 
              id="workoutsCompleted" 
              name="workoutsCompleted" 
              type="number" 
              value={userData.progress.workoutsCompleted} 
              onChange={handleProgressChange} 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveChanges}>
          <Save className="mr-2 h-4 w-4" /> Update Progress
        </Button>
      </div>
    </div>
  );
};

export default ProgressTab;
