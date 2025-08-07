import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { useDietPlans } from '@/hooks/useDietPlans';
import { usePeriodTracking } from '@/hooks/usePeriodTracking';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import { 
  User, 
  Heart, 
  Utensils, 
  Calendar, 
  Activity, 
  Target, 
  Scale, 
  Ruler,
  Clock,
  Droplets,
  Moon,
  Apple
} from 'lucide-react';

const ProfileDataSummary = () => {
  const { user, profileData } = useAuth();
  const { dietPlans } = useDietPlans();
  const { periodData } = usePeriodTracking();
  const { progressData } = useDailyProgress();

  if (!user) {
    return null;
  }

  // Get today's progress
  const today = new Date().toISOString().split('T')[0];
  const todayProgress = progressData.find(p => p.date === today);

  // Calculate age if DOB is available
  const calculateAge = (dateOfBirth: string | null): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = profileData?.date_of_birth ? calculateAge(profileData.date_of_birth) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Complete Profile Overview
        </CardTitle>
        <CardDescription>All your health and wellness data in one place</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{profileData?.full_name || 'Not set'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{age ? `${age} years` : 'Not set'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gender</p>
              <Badge variant={profileData?.gender ? 'default' : 'secondary'}>
                {profileData?.gender || 'Not set'}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-medium flex items-center gap-1">
                <Ruler className="h-3 w-3" />
                {profileData?.height ? `${profileData.height} cm` : 'Not set'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium flex items-center gap-1">
                <Scale className="h-3 w-3" />
                {profileData?.weight ? `${profileData.weight} kg` : 'Not set'}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Health & Fitness Goals */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Health & Fitness Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Fitness Goal</p>
              <Badge variant={profileData?.fitness_goal ? 'default' : 'secondary'}>
                {profileData?.fitness_goal || 'Not set'}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Target Weight</p>
              <p className="font-medium flex items-center gap-1">
                <Target className="h-3 w-3" />
                {profileData?.target_weight ? `${profileData.target_weight} kg` : 'Not set'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Activity Level</p>
              <Badge variant={profileData?.activity_level ? 'default' : 'secondary'}>
                {profileData?.activity_level || 'Not set'}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Food Preference</p>
              <Badge variant={profileData?.food_preference ? 'default' : 'secondary'} className="flex items-center gap-1">
                <Apple className="h-3 w-3" />
                {profileData?.food_preference || 'Not set'}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Diet Plans */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Diet Plans ({dietPlans.length})
          </h3>
          {dietPlans.length > 0 ? (
            <div className="space-y-2">
              {dietPlans.slice(0, 3).map((plan) => (
                <div key={plan.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="font-medium">{plan.name}</span>
                  <Badge variant="outline">{plan.goal}</Badge>
                </div>
              ))}
              {dietPlans.length > 3 && (
                <p className="text-sm text-muted-foreground">+{dietPlans.length - 3} more plans</p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No diet plans created yet</p>
          )}
        </div>

        <Separator />

        {/* Daily Progress Today */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Today's Progress
          </h3>
          {todayProgress ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Droplets className="h-3 w-3" />
                  Water Intake
                </p>
                <p className="font-medium">{todayProgress.water_intake || 0} glasses</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Moon className="h-3 w-3" />
                  Sleep
                </p>
                <p className="font-medium">{todayProgress.sleep_hours || 0} hours</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Scale className="h-3 w-3" />
                  Weight
                </p>
                <p className="font-medium">{todayProgress.weight ? `${todayProgress.weight} kg` : 'Not logged'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Mood</p>
                <Badge variant="outline">{todayProgress.mood || 'Not set'}</Badge>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No progress logged for today</p>
          )}
        </div>

        {/* Period Tracking (Female users only) */}
        {user.gender === 'female' && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-pink-500" />
                Period Tracking
              </h3>
              {periodData ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cycle Length</p>
                    <p className="font-medium">{periodData.cycle_length || 28} days</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Period Length</p>
                    <p className="font-medium">{periodData.period_length || 5} days</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Period</p>
                    <p className="font-medium">
                      {periodData.last_period_date 
                        ? new Date(periodData.last_period_date).toLocaleDateString()
                        : 'Not set'
                      }
                    </p>
                  </div>
                  {periodData.symptoms && periodData.symptoms.length > 0 && (
                    <div className="space-y-1 col-span-2 md:col-span-3">
                      <p className="text-sm text-muted-foreground">Recent Symptoms</p>
                      <div className="flex flex-wrap gap-1">
                        {periodData.symptoms.slice(0, 4).map((symptom) => (
                          <Badge key={symptom} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                        {periodData.symptoms.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{periodData.symptoms.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No period tracking data available</p>
              )}
            </div>
          </>
        )}

        <Separator />

        {/* Health Issues & Allergies */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            Health Information
          </h3>
          <div className="space-y-3">
            {profileData?.health_issues && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Health Issues</p>
                <p className="font-medium">{profileData.health_issues}</p>
              </div>
            )}
            {profileData?.allergies && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Allergies</p>
                <p className="font-medium">{profileData.allergies}</p>
              </div>
            )}
            {profileData?.medical_conditions && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medical Conditions</p>
                <p className="font-medium">{profileData.medical_conditions}</p>
              </div>
            )}
            {!profileData?.health_issues && !profileData?.allergies && !profileData?.medical_conditions && (
              <p className="text-muted-foreground">No health information recorded</p>
            )}
          </div>
        </div>

        <Separator />

        {/* Data Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Data Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-500">{dietPlans.length}</div>
              <p className="text-xs text-muted-foreground">Diet Plans</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-500">{progressData.length}</div>
              <p className="text-xs text-muted-foreground">Progress Days</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-lg font-bold text-purple-500">
                {profileData?.period_tracking ? '1' : '0'}
              </div>
              <p className="text-xs text-muted-foreground">Period Data</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-lg font-bold text-orange-500">
                {profileData ? 'Complete' : 'Incomplete'}
              </div>
              <p className="text-xs text-muted-foreground">Profile</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDataSummary;