
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Save } from 'lucide-react';
import { usePeriodTracking } from '@/hooks/usePeriodTracking';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import EditableDietPlansCard from './EditableDietPlansCard';
import EditableWorkoutProgressCard from './EditableWorkoutProgressCard';
import EditableHealthGoalsCard from './EditableHealthGoalsCard';

const HealthDataTab = () => {
  const { periodData, savePeriodData, isLoading } = usePeriodTracking();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSavePeriodData = async () => {
    if (!periodData) {
      toast({
        title: "No Data to Save",
        description: "Please add period tracking data first",
        variant: "destructive",
      });
      return;
    }

    try {
      await savePeriodData(periodData);
      toast({
        title: "Success",
        description: "Period tracking data saved to your profile",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save period tracking data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Editable Diet Plans */}
        <EditableDietPlansCard />

        {/* Period Tracking Summary - Only for female users */}
        {user?.gender === 'female' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                Period Tracking
              </CardTitle>
              <CardDescription>Your menstrual cycle and health data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {periodData ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Cycle Length</p>
                        <p className="font-medium">{periodData.cycle_length || 28} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Period Length</p>
                        <p className="font-medium">{periodData.period_length || 5} days</p>
                      </div>
                    </div>
                    
                    {periodData.last_period_date && (
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <p className="text-sm font-medium">Last Period</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(periodData.last_period_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    {periodData.symptoms && periodData.symptoms.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Recent Symptoms:</p>
                        <div className="flex flex-wrap gap-1">
                          {periodData.symptoms.slice(0, 3).map((symptom) => (
                            <Badge key={symptom} variant="outline" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Period Tracker
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={handleSavePeriodData}
                        disabled={isLoading}
                        className="flex items-center gap-1"
                      >
                        <Save className="h-3 w-3" />
                        Save to Profile
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No period tracking data recorded yet</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Period Tracking
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Editable Workout Progress */}
        <EditableWorkoutProgressCard />

        {/* Editable Health Goals - Show for male users */}
        <EditableHealthGoalsCard />
      </div>

      {/* Data Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Health Data Summary</CardTitle>
          <CardDescription>All your tracked health information in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="text-lg font-bold">7</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Diet Plans</p>
            </div>
            {user?.gender === 'female' && (
              <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <div className="text-lg font-bold">{periodData?.cycle_length || 28}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Cycle</p>
              </div>
            )}
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold">12</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Workouts</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold">7</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDataTab;
