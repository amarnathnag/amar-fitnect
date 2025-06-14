
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from 'lucide-react';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import DailyProgressSummary from './daily-progress/DailyProgressSummary';
import ProgressDialog from './daily-progress/ProgressDialog';

const DailyProgressTracker = () => {
  const { progressData, saveDailyProgress, isLoading } = useDailyProgress();

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    return progressData.find(p => p.date === today);
  };

  const todayProgress = getTodayProgress();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Daily Progress Tracker
        </CardTitle>
        <CardDescription>Track your daily exercises, water intake, and wellness data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DailyProgressSummary todayProgress={todayProgress} />
          <ProgressDialog onSave={saveDailyProgress} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyProgressTracker;
