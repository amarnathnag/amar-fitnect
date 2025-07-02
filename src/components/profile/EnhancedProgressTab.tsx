import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Save, TrendingUp, Target, Weight } from 'lucide-react';
import { ProfileData } from '@/types/auth';

interface EnhancedProgressTabProps {
  profileData: ProfileData | null;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
}

const EnhancedProgressTab: React.FC<EnhancedProgressTabProps> = ({ profileData, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentWeight = profileData?.weight || 0;
  const targetWeight = profileData?.target_weight || 0;
  const height = profileData?.height || 0;

  // Calculate BMI
  const bmi = height > 0 && currentWeight > 0 ? (currentWeight / Math.pow(height / 100, 2)).toFixed(1) : 0;

  // Calculate progress towards goal
  const progressToGoal = targetWeight > 0 && currentWeight > 0 
    ? Math.min(100, Math.max(0, ((currentWeight - targetWeight) / currentWeight) * 100))
    : 0;

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Progress data is already stored in the main profile
      // This could be extended to save workout progress, etc.
      await onSave({});
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeight || 'N/A'} kg</div>
            <p className="text-xs text-muted-foreground">
              Update in Personal Info tab
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Weight</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{targetWeight || 'N/A'} kg</div>
            <p className="text-xs text-muted-foreground">
              Set your goal in Personal Info
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BMI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bmi || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {bmi && parseFloat(bmi as string) > 0 ? 
                parseFloat(bmi as string) < 18.5 ? 'Underweight' :
                parseFloat(bmi as string) < 25 ? 'Normal' :
                parseFloat(bmi as string) < 30 ? 'Overweight' : 'Obese'
                : 'Enter height & weight'
              }
            </p>
          </CardContent>
        </Card>
      </div>

      {targetWeight > 0 && currentWeight > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Weight Goal Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Goal</span>
                <span>{Math.abs(currentWeight - targetWeight).toFixed(1)} kg remaining</span>
              </div>
              <Progress value={progressToGoal} className="w-full" />
            </div>
            <p className="text-sm text-muted-foreground">
              {currentWeight > targetWeight 
                ? `You need to lose ${(currentWeight - targetWeight).toFixed(1)} kg to reach your goal`
                : currentWeight < targetWeight
                ? `You need to gain ${(targetWeight - currentWeight).toFixed(1)} kg to reach your goal`
                : 'Congratulations! You\'ve reached your goal weight!'
              }
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Fitness Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Current Fitness Goal</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {profileData?.fitness_goal 
                  ? profileData.fitness_goal.replace('_', ' ').toUpperCase()
                  : 'No goal set - update in Personal Info'
                }
              </p>
            </div>
            <div>
              <Label>Food Preference</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {profileData?.food_preference 
                  ? profileData.food_preference.replace('_', ' ').toUpperCase()
                  : 'Not specified'
                }
              </p>
            </div>
            {profileData?.health_issues && (
              <div>
                <Label>Health Considerations</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {profileData.health_issues}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedProgressTab;