
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { DailyProgressData } from '@/hooks/useDailyProgress';

interface DailyProgressSummaryProps {
  todayProgress: DailyProgressData | undefined;
}

const DailyProgressSummary = ({ todayProgress }: DailyProgressSummaryProps) => {
  const totalCaloriesBurned = todayProgress?.exercises?.reduce((sum, ex) => sum + ex.calories_burned, 0) || 0;
  const totalExerciseTime = todayProgress?.exercises?.reduce((sum, ex) => sum + ex.duration, 0) || 0;

  return (
    <>
      {/* Today's Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-bold text-blue-500">{totalExerciseTime}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Minutes Today</p>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-500">{totalCaloriesBurned}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Calories Burned</p>
        </div>
        <div className="text-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <div className="text-lg font-bold text-cyan-500">{todayProgress?.water_intake || 0}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Glasses Water</p>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-lg font-bold text-purple-500">{todayProgress?.sleep_hours || 0}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Hours Sleep</p>
        </div>
      </div>

      {/* Today's Exercises */}
      {todayProgress?.exercises && todayProgress.exercises.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Today's Exercises:</h4>
          <div className="space-y-2">
            {todayProgress.exercises.map((exercise, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <div>
                  <span className="font-medium">{exercise.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({exercise.type})</span>
                </div>
                <div className="text-sm">
                  <Badge variant="outline">{exercise.duration} min</Badge>
                  <Badge variant="secondary" className="ml-1">{exercise.calories_burned} cal</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DailyProgressSummary;
