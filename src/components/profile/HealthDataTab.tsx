
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EditableDietPlansCard from './EditableDietPlansCard';
import EditableWorkoutProgressCard from './EditableWorkoutProgressCard';
import EditableHealthGoalsCard from './EditableHealthGoalsCard';
import DailyProgressTracker from './DailyProgressTracker';
import PeriodDataViewer from './PeriodDataViewer';
import ProfileDataSummary from './ProfileDataSummary';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const HealthDataTab = () => {
  const { user, profileData } = useAuth();
  const isFemale = user?.gender === 'female' || profileData?.gender === 'female';
  const isMale = user?.gender === 'male' || profileData?.gender === 'male';

  return (
    <div className="space-y-6">
      {/* Gender-specific notice */}
      {isMale && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Focus on your exercise routine and daily progress tracking below. All data is saved to your profile.
          </AlertDescription>
        </Alert>
      )}

      {isFemale && (
        <Alert className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
          <Info className="h-4 w-4 text-pink-600" />
          <AlertDescription className="text-pink-900 dark:text-pink-100">
            Track your period, exercise, and wellness data. All information is securely saved to your profile.
          </AlertDescription>
        </Alert>
      )}

      {/* Complete Profile Data Overview */}
      <ProfileDataSummary />

      {/* Daily Progress Tracker - Available for ALL users */}
      <DailyProgressTracker />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Editable Diet Plans - Available for ALL users */}
        <EditableDietPlansCard />

        {/* Period Tracking Summary - ONLY for female users */}
        {isFemale && <PeriodDataViewer />}

        {/* Editable Workout Progress - Available for ALL users */}
        <EditableWorkoutProgressCard />

        {/* Editable Health Goals - Show for all users */}
        <EditableHealthGoalsCard />
      </div>
    </div>
  );
};

export default HealthDataTab;
