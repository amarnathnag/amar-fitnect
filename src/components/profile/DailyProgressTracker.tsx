
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, Save, Calendar, Droplets, Moon, Heart } from 'lucide-react';
import { useDailyProgress } from '@/hooks/useDailyProgress';
import { useToast } from '@/hooks/use-toast';

const DailyProgressTracker = () => {
  const { progressData, saveDailyProgress, isLoading } = useDailyProgress();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    duration: 0,
    calories_burned: 0,
    type: ''
  });
  const [dailyData, setDailyData] = useState({
    exercises: [] as any[],
    water_intake: 0,
    sleep_hours: 0,
    mood: '',
    weight: 0,
    notes: ''
  });
  const { toast } = useToast();

  const exerciseTypes = [
    'Cardio', 'Strength Training', 'Yoga', 'Running', 'Cycling', 
    'Swimming', 'Walking', 'Dancing', 'Sports', 'Other'
  ];

  const moodOptions = [
    { value: 'excellent', label: '😊 Excellent', color: 'bg-green-500' },
    { value: 'good', label: '😃 Good', color: 'bg-blue-500' },
    { value: 'okay', label: '😐 Okay', color: 'bg-yellow-500' },
    { value: 'tired', label: '😴 Tired', color: 'bg-orange-500' },
    { value: 'stressed', label: '😰 Stressed', color: 'bg-red-500' }
  ];

  const addExercise = () => {
    if (!currentExercise.name || !currentExercise.duration) {
      toast({
        title: "Validation Error",
        description: "Please fill in exercise name and duration",
        variant: "destructive",
      });
      return;
    }

    setDailyData(prev => ({
      ...prev,
      exercises: [...prev.exercises, { ...currentExercise, id: Date.now() }]
    }));

    setCurrentExercise({
      name: '',
      duration: 0,
      calories_burned: 0,
      type: ''
    });
  };

  const removeExercise = (id: number) => {
    setDailyData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id)
    }));
  };

  const saveProgress = async () => {
    if (dailyData.exercises.length === 0) {
      toast({
        title: "No Data",
        description: "Please add at least one exercise to save progress",
        variant: "destructive",
      });
      return;
    }

    const result = await saveDailyProgress(dailyData);
    if (result) {
      setIsDialogOpen(false);
      setDailyData({
        exercises: [],
        water_intake: 0,
        sleep_hours: 0,
        mood: '',
        weight: 0,
        notes: ''
      });
    }
  };

  const getTodayProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    return progressData.find(p => p.date === today);
  };

  const todayProgress = getTodayProgress();
  const totalCaloriesBurned = todayProgress?.exercises?.reduce((sum, ex) => sum + ex.calories_burned, 0) || 0;
  const totalExerciseTime = todayProgress?.exercises?.reduce((sum, ex) => sum + ex.duration, 0) || 0;

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

          {/* Add Progress Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Log Today's Progress
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Log Daily Progress - {new Date().toLocaleDateString()}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Exercise Section */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Exercises
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Exercise Name</Label>
                      <Input 
                        value={currentExercise.name}
                        onChange={(e) => setCurrentExercise(prev => ({...prev, name: e.target.value}))}
                        placeholder="e.g., Morning Run"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={currentExercise.type} 
                        onValueChange={(value) => setCurrentExercise(prev => ({...prev, type: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {exerciseTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Duration (minutes)</Label>
                      <Input 
                        type="number"
                        value={currentExercise.duration}
                        onChange={(e) => setCurrentExercise(prev => ({...prev, duration: parseInt(e.target.value) || 0}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Calories Burned</Label>
                      <Input 
                        type="number"
                        value={currentExercise.calories_burned}
                        onChange={(e) => setCurrentExercise(prev => ({...prev, calories_burned: parseInt(e.target.value) || 0}))}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={addExercise} variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Exercise
                  </Button>

                  {dailyData.exercises.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Added Exercises:</p>
                      {dailyData.exercises.map((exercise) => (
                        <div key={exercise.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                          <span>{exercise.name} - {exercise.duration} min</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeExercise(exercise.id)}
                            className="text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Wellness Data */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      Water Intake (glasses)
                    </Label>
                    <Input 
                      type="number"
                      value={dailyData.water_intake}
                      onChange={(e) => setDailyData(prev => ({...prev, water_intake: parseInt(e.target.value) || 0}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Moon className="h-3 w-3" />
                      Sleep Hours
                    </Label>
                    <Input 
                      type="number"
                      step="0.5"
                      value={dailyData.sleep_hours}
                      onChange={(e) => setDailyData(prev => ({...prev, sleep_hours: parseFloat(e.target.value) || 0}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      Today's Mood
                    </Label>
                    <Select 
                      value={dailyData.mood} 
                      onValueChange={(value) => setDailyData(prev => ({...prev, mood: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="How are you feeling?" />
                      </SelectTrigger>
                      <SelectContent>
                        {moodOptions.map(mood => (
                          <SelectItem key={mood.value} value={mood.value}>
                            {mood.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg) - Optional</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      value={dailyData.weight}
                      onChange={(e) => setDailyData(prev => ({...prev, weight: parseFloat(e.target.value) || 0}))}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input 
                    value={dailyData.notes}
                    onChange={(e) => setDailyData(prev => ({...prev, notes: e.target.value}))}
                    placeholder="How did you feel today? Any achievements?"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveProgress} disabled={isLoading} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Today's Progress
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyProgressTracker;
