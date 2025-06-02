
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Utensils, Activity, Heart, TrendingUp } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';
import { usePeriodTracking } from '@/hooks/usePeriodTracking';
import { useAuth } from '@/contexts/AuthContext';

const HealthDataTab = () => {
  const { dietPlans } = useDietPlans();
  const { periodData } = usePeriodTracking();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Diet Plans Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-green-500" />
              Diet Plans
            </CardTitle>
            <CardDescription>Your saved diet plans and nutrition tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Plans Created</span>
                <Badge variant="outline">{dietPlans.length}</Badge>
              </div>
              
              {dietPlans.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent Plans:</p>
                  {dietPlans.slice(0, 3).map((plan) => (
                    <div key={plan.id} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <span className="text-sm">{plan.name}</span>
                      <Badge variant="secondary" className="text-xs">{plan.goal.replace('-', ' ')}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No diet plans created yet</p>
              )}
              
              <Button variant="outline" size="sm" className="w-full">
                View All Diet Plans
              </Button>
            </div>
          </CardContent>
        </Card>

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
                  </>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No period tracking data recorded yet</p>
                )}
                
                <Button variant="outline" size="sm" className="w-full">
                  View Period Tracker
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Workout Progress - Show for all users */}
        <Card className={user?.gender === 'female' ? 'md:col-span-1' : 'md:col-span-2'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Workout Progress
            </CardTitle>
            <CardDescription>Your fitness journey and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">12</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Workouts</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">7</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Day Streak</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">-2.5kg</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Progress</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Detailed Progress
            </Button>
          </CardContent>
        </Card>

        {/* Health Goals - Show for male users when female doesn't have period tracking */}
        {user?.gender === 'male' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Health Goals
              </CardTitle>
              <CardDescription>Your fitness and wellness objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="text-sm">Weight Goal</span>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="text-sm">Muscle Gain</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <span className="text-sm">Cardio Fitness</span>
                  <Badge variant="outline">Achieved</Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                Update Goals
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HealthDataTab;
