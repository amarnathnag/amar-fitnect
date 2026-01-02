import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Clock, Bell, Trash2, CheckCircle, X, Dumbbell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useScheduledWorkouts, ScheduledWorkout } from '@/hooks/useScheduledWorkouts';
import { workouts } from '@/data/workouts';

const WorkoutCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [notes, setNotes] = useState('');

  const { 
    scheduledWorkouts, 
    loading, 
    scheduleWorkout, 
    updateScheduledWorkout, 
    deleteScheduledWorkout,
    getWorkoutsForDate,
    getUpcomingWorkouts 
  } = useScheduledWorkouts();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const upcomingWorkouts = getUpcomingWorkouts(7);

  const handleScheduleWorkout = async () => {
    if (!selectedDate || !selectedWorkout) return;

    const workout = workouts.find(w => w.id === selectedWorkout);
    if (!workout) return;

    await scheduleWorkout({
      workout_id: selectedWorkout,
      workout_title: workout.title,
      scheduled_date: format(selectedDate, 'yyyy-MM-dd'),
      scheduled_time: scheduledTime,
      reminder_enabled: reminderEnabled,
      notes: notes || undefined,
    });

    setIsScheduleDialogOpen(false);
    setSelectedWorkout('');
    setNotes('');
  };

  const handleMarkComplete = async (workout: ScheduledWorkout) => {
    await updateScheduledWorkout(workout.id, { status: 'completed' });
  };

  const handleSkipWorkout = async (workout: ScheduledWorkout) => {
    await updateScheduledWorkout(workout.id, { status: 'skipped' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'skipped': return 'bg-yellow-500';
      case 'missed': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  const renderDay = (day: Date) => {
    const dayWorkouts = getWorkoutsForDate(day);
    const hasWorkouts = dayWorkouts.length > 0;

    return (
      <button
        key={day.toISOString()}
        onClick={() => {
          setSelectedDate(day);
          setIsScheduleDialogOpen(true);
        }}
        className={`
          relative p-2 h-12 w-full rounded-lg transition-all
          ${isToday(day) ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}
          ${selectedDate && isSameDay(day, selectedDate) ? 'ring-2 ring-primary' : ''}
        `}
      >
        <span className="text-sm">{format(day, 'd')}</span>
        {hasWorkouts && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            {dayWorkouts.slice(0, 3).map((w, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${getStatusColor(w.status)}`}
              />
            ))}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Workout Planner
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-semibold min-w-[140px] text-center">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}
            {daysInMonth.map(renderDay)}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Skipped</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Workouts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5" />
            Upcoming Workouts (Next 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingWorkouts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No workouts scheduled. Click on a date to plan your workout!
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingWorkouts.map(workout => (
                <div
                  key={workout.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{workout.workout_title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(workout.scheduled_date), 'EEE, MMM d')}
                        {workout.scheduled_time && ` at ${workout.scheduled_time}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {workout.reminder_enabled && (
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleMarkComplete(workout)}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSkipWorkout(workout)}
                    >
                      <X className="h-4 w-4 text-yellow-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteScheduledWorkout(workout.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Schedule Workout for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
            </DialogTitle>
          </DialogHeader>

          {/* Existing workouts for this date */}
          {selectedDate && getWorkoutsForDate(selectedDate).length > 0 && (
            <div className="space-y-2 mb-4">
              <Label>Scheduled Workouts</Label>
              {getWorkoutsForDate(selectedDate).map(w => (
                <div key={w.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span>{w.workout_title}</span>
                  <Badge className={getStatusColor(w.status)}>{w.status}</Badge>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Workout</Label>
              <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a workout" />
                </SelectTrigger>
                <SelectContent>
                  {workouts.map(workout => (
                    <SelectItem key={workout.id} value={workout.id}>
                      {workout.title} ({workout.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Enable Reminder</Label>
              <Switch
                checked={reminderEnabled}
                onCheckedChange={setReminderEnabled}
              />
            </div>

            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes..."
              />
            </div>

            <Button
              className="w-full"
              onClick={handleScheduleWorkout}
              disabled={!selectedWorkout}
            >
              Schedule Workout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutCalendar;
