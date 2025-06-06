
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, AlertCircle } from 'lucide-react';
import { usePeriodTracking } from '@/hooks/usePeriodTracking';
import { useAuth } from '@/contexts/AuthContext';

const PeriodDataViewer = () => {
  const { periodData } = usePeriodTracking();
  const { user } = useAuth();

  if (user?.gender !== 'female' || !periodData) {
    return null;
  }

  const calculateNextPeriod = () => {
    if (!periodData.last_period_date || !periodData.cycle_length) return null;
    
    const lastDate = new Date(periodData.last_period_date);
    const nextDate = new Date(lastDate.getTime() + (periodData.cycle_length * 24 * 60 * 60 * 1000));
    return nextDate;
  };

  const getDaysUntilNext = () => {
    const nextPeriod = calculateNextPeriod();
    if (!nextPeriod) return null;
    
    const today = new Date();
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nextPeriod = calculateNextPeriod();
  const daysUntilNext = getDaysUntilNext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-pink-500" />
          Period Tracking Overview
        </CardTitle>
        <CardDescription>Your menstrual cycle tracking data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Cycle Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <div className="text-lg font-bold text-pink-500">{periodData.cycle_length || 28}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cycle Length (days)</p>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-lg font-bold text-red-500">{periodData.period_length || 5}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Period Length (days)</p>
            </div>
          </div>

          {/* Last Period */}
          {periodData.last_period_date && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Last Period</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(periodData.last_period_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}

          {/* Next Period Prediction */}
          {nextPeriod && daysUntilNext !== null && (
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Next Period Expected</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {nextPeriod.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <Badge variant="outline" className="mt-1">
                {daysUntilNext > 0 ? `In ${daysUntilNext} days` : daysUntilNext === 0 ? 'Today' : `${Math.abs(daysUntilNext)} days late`}
              </Badge>
            </div>
          )}

          {/* Recent Symptoms */}
          {periodData.symptoms && periodData.symptoms.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="font-medium text-sm">Recent Symptoms</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {periodData.symptoms.slice(0, 6).map((symptom) => (
                  <Badge key={symptom} variant="outline" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
                {periodData.symptoms.length > 6 && (
                  <Badge variant="secondary" className="text-xs">
                    +{periodData.symptoms.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {periodData.notes && (
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm font-medium mb-1">Notes:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{periodData.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PeriodDataViewer;
