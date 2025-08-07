
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EditableDietPlansCard from './EditableDietPlansCard';
import EditableWorkoutProgressCard from './EditableWorkoutProgressCard';
import EditableHealthGoalsCard from './EditableHealthGoalsCard';
import DailyProgressTracker from './DailyProgressTracker';
import PeriodDataViewer from './PeriodDataViewer';
import ProfileDataSummary from './ProfileDataSummary';

const HealthDataTab = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Complete Profile Data Overview */}
      <ProfileDataSummary />

      {/* Daily Progress Tracker - Most Important */}
      <DailyProgressTracker />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Editable Diet Plans */}
        <EditableDietPlansCard />

        {/* Period Tracking Summary - Only for female users */}
        {user?.gender === 'female' && <PeriodDataViewer />}

        {/* Editable Workout Progress */}
        <EditableWorkoutProgressCard />

        {/* Editable Health Goals - Show for male users or when female users don't have period data */}
        <EditableHealthGoalsCard />
      </div>
    </div>
  );
};

export default HealthDataTab;
