import { useEffect, useCallback, useRef } from 'react';
import { useScheduledWorkouts } from './useScheduledWorkouts';
import { useToast } from './use-toast';

export const useWorkoutNotifications = () => {
  const { scheduledWorkouts } = useScheduledWorkouts();
  const { toast } = useToast();
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const notifiedIdsRef = useRef<Set<string>>(new Set());

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast({ title: 'Browser notifications not supported', variant: 'destructive' });
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') {
      toast({ title: 'Notifications blocked. Enable in browser settings.', variant: 'destructive' });
      return false;
    }
    const result = await Notification.requestPermission();
    return result === 'granted';
  }, [toast]);

  const sendNotification = useCallback((title: string, body: string) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'workout-reminder',
        requireInteraction: true,
      });
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
    toast({ title: `🏋️ ${title}`, description: body });
  }, [toast]);

  const checkUpcomingWorkouts = useCallback(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    scheduledWorkouts
      .filter(w => w.status === 'scheduled' && w.reminder_enabled && w.scheduled_date === today && w.scheduled_time)
      .forEach(workout => {
        if (notifiedIdsRef.current.has(workout.id)) return;
        const [hours, minutes] = workout.scheduled_time!.split(':').map(Number);
        const workoutTime = new Date(now);
        workoutTime.setHours(hours, minutes, 0, 0);
        const diffMs = workoutTime.getTime() - now.getTime();
        const diffMin = diffMs / 60000;

        if (diffMin <= 15 && diffMin > -5) {
          notifiedIdsRef.current.add(workout.id);
          const timeStr = diffMin <= 0 ? 'now!' : `in ${Math.round(diffMin)} minutes`;
          sendNotification(
            'Workout Reminder',
            `${workout.workout_title} starts ${timeStr}`
          );
        }
      });
  }, [scheduledWorkouts, sendNotification]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Don't auto-request, wait for user action
    }
    checkUpcomingWorkouts();
    checkIntervalRef.current = setInterval(checkUpcomingWorkouts, 60000);
    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, [checkUpcomingWorkouts]);

  return { requestPermission, sendNotification, permissionStatus: typeof Notification !== 'undefined' ? Notification.permission : 'denied' };
};
