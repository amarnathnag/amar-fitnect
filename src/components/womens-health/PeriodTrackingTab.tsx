
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Plus, TrendingUp, AlertCircle, Heart, Save, Moon, Droplets, ThermometerSun, Bell, Target, Activity, Sparkles, Brain, Info } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { usePeriodTracking } from '@/hooks/usePeriodTracking';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const PeriodTrackingTab = () => {
  const navigate = useNavigate();
  const { periodData, savePeriodData } = usePeriodTracking();
  const { updateProfile } = useAuth();
  const { toast } = useToast();
  const [lastPeriodDate, setLastPeriodDate] = useState(periodData?.last_period_date || '');
  const [cycleLength, setCycleLength] = useState(periodData?.cycle_length?.toString() || '28');
  const [periodLength, setPeriodLength] = useState(periodData?.period_length?.toString() || '5');
  const [symptoms, setSymptoms] = useState<string[]>(periodData?.symptoms || []);
  const [notes, setNotes] = useState(periodData?.notes || '');
  const [moodRating, setMoodRating] = useState(5);
  const [flowIntensity, setFlowIntensity] = useState('medium');
  const [waterIntake, setWaterIntake] = useState(8);
  const [sleepHours, setSleepHours] = useState(8);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(true);

  // Update form when periodData changes
  useEffect(() => {
    if (periodData) {
      setLastPeriodDate(periodData.last_period_date || '');
      setCycleLength(periodData.cycle_length?.toString() || '28');
      setPeriodLength(periodData.period_length?.toString() || '5');
      setSymptoms(periodData.symptoms || []);
      setNotes(periodData.notes || '');
    }
  }, [periodData]);

  const commonSymptoms = [
    'Cramps', 'Bloating', 'Mood swings', 'Headache', 
    'Fatigue', 'Acne', 'Breast tenderness', 'Back pain',
    'Nausea', 'Food cravings', 'Insomnia', 'Hot flashes'
  ];

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveData = async () => {
    const data = {
      last_period_date: lastPeriodDate || null,
      cycle_length: cycleLength ? parseInt(cycleLength) : null,
      period_length: periodLength ? parseInt(periodLength) : null,
      symptoms: symptoms.length > 0 ? symptoms : null,
      notes: notes || null,
      mood_rating: moodRating,
      flow_intensity: flowIntensity,
      water_intake: waterIntake,
      sleep_hours: sleepHours
    };

    // Save both to period tracking and profile
    const result = await savePeriodData(data);
    if (result) {
      // Also update profile with period data
      await updateProfile({
        period_tracking: data
      });
      
      toast({
        title: "✨ Period Data Saved!",
        description: "Your cycle insights have been updated successfully.",
      });
    }
  };

  const calculateNextPeriod = () => {
    if (!lastPeriodDate || !cycleLength) return null;
    const lastDate = new Date(lastPeriodDate);
    const nextDate = new Date(lastDate.getTime() + parseInt(cycleLength) * 24 * 60 * 60 * 1000);
    return nextDate.toLocaleDateString();
  };

  const calculateOvulationWindow = () => {
    if (!lastPeriodDate || !cycleLength) return null;
    const ovulationDay = Math.floor(parseInt(cycleLength) / 2);
    return `Day ${ovulationDay - 2} to ${ovulationDay + 2}`;
  };

  const getCurrentCycleDay = () => {
    if (!lastPeriodDate) return null;
    const lastDate = new Date(lastPeriodDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000));
    return daysDiff + 1;
  };

  const getCyclePhase = () => {
    const cycleDay = getCurrentCycleDay();
    if (!cycleDay || !periodLength) return 'Unknown';
    
    const periodLengthNum = parseInt(periodLength);
    const cycleLengthNum = parseInt(cycleLength);
    
    if (cycleDay <= periodLengthNum) return 'Menstrual';
    if (cycleDay <= cycleLengthNum / 2 - 3) return 'Follicular';
    if (cycleDay <= cycleLengthNum / 2 + 3) return 'Ovulation';
    return 'Luteal';
  };

  const getPhaseColor = (phase: string) => {
    switch(phase) {
      case 'Menstrual': return 'bg-red-500';
      case 'Follicular': return 'bg-green-500';
      case 'Ovulation': return 'bg-purple-500';
      case 'Luteal': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseEmoji = (phase: string) => {
    switch(phase) {
      case 'Menstrual': return '🩸';
      case 'Follicular': return '🌱';
      case 'Ovulation': return '🌸';
      case 'Luteal': return '🌙';
      default: return '📅';
    }
  };

  const isPeriodDay = (date: Date) => {
    if (!lastPeriodDate || !periodLength) return false;
    const lastDate = new Date(lastPeriodDate);
    const periodLengthNum = parseInt(periodLength);
    const daysSinceLastPeriod = differenceInDays(date, lastDate);
    return daysSinceLastPeriod >= 0 && daysSinceLastPeriod < periodLengthNum;
  };

  const isOvulationDay = (date: Date) => {
    if (!lastPeriodDate || !cycleLength) return false;
    const lastDate = new Date(lastPeriodDate);
    const ovulationDay = Math.floor(parseInt(cycleLength) / 2);
    const expectedOvulation = addDays(lastDate, ovulationDay);
    return isSameDay(date, expectedOvulation);
  };

  const isPredictedPeriod = (date: Date) => {
    if (!lastPeriodDate || !cycleLength || !periodLength) return false;
    const lastDate = new Date(lastPeriodDate);
    const nextPeriodStart = addDays(lastDate, parseInt(cycleLength));
    const periodLengthNum = parseInt(periodLength);
    const daysDiff = differenceInDays(date, nextPeriodStart);
    return daysDiff >= 0 && daysDiff < periodLengthNum;
  };

  const getDaysUntilNext = () => {
    if (!lastPeriodDate || !cycleLength) return null;
    const cycleDay = getCurrentCycleDay();
    if (!cycleDay) return null;
    return Math.max(0, parseInt(cycleLength) - cycleDay);
  };

  const getCycleProgress = () => {
    const cycleDay = getCurrentCycleDay();
    if (!cycleDay || !cycleLength) return 0;
    return (cycleDay / parseInt(cycleLength)) * 100;
  };

  const currentPhase = getCyclePhase();
  const daysUntilNext = getDaysUntilNext();

  return (
    <div className="space-y-6">
      {/* Cycle Overview Card */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/30 dark:to-rose-950/30 border-pink-200 dark:border-pink-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Phase</p>
                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400 flex items-center gap-2">
                  {getPhaseEmoji(currentPhase)} {currentPhase}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full ${getPhaseColor(currentPhase)}`}></div>
            </div>
            <Progress value={getCycleProgress()} className="mt-4" />
            <p className="text-xs text-muted-foreground mt-2">
              Day {getCurrentCycleDay() || 0} of {cycleLength}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Period In</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {daysUntilNext !== null ? daysUntilNext : '--'}
                </p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <CalendarIcon className="h-12 w-12 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Wellness Score</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {Math.round(((waterIntake / 8) + (sleepHours / 8) + (moodRating / 10)) / 3 * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">health tracking</p>
              </div>
              <Heart className="h-12 w-12 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      {showCalendar && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Cycle Calendar View
            </CardTitle>
            <CardDescription>
              Track your period, ovulation, and fertility windows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  period: (date) => isPeriodDay(date),
                  ovulation: (date) => isOvulationDay(date),
                  predicted: (date) => isPredictedPeriod(date),
                }}
                modifiersStyles={{
                  period: { backgroundColor: 'hsl(var(--destructive) / 0.3)', fontWeight: 'bold' },
                  ovulation: { backgroundColor: 'hsl(var(--primary) / 0.3)', fontWeight: 'bold' },
                  predicted: { backgroundColor: 'hsl(var(--muted) / 0.5)', border: '2px dashed hsl(var(--destructive))' },
                }}
              />
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive/30"></div>
                <span>Period Days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-primary/30"></div>
                <span>Ovulation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted/50 border-2 border-dashed border-destructive"></div>
                <span>Predicted Period</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Period Tracker */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-indigo-50/50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  🌸 Smart Period Tracker
                </CardTitle>
                <CardDescription className="text-sm font-medium">
                  Your personalized cycle companion with AI insights ✨
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {showCalendar ? 'Hide' : 'Show'} Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Cycle Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod">Last Period Date</Label>
              <Input 
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycleLength">Cycle Length (days)</Label>
              <Input 
                id="cycleLength"
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                min="21"
                max="35"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="periodLength">Period Length (days)</Label>
              <Input 
                id="periodLength"
                type="number"
                value={periodLength}
                onChange={(e) => setPeriodLength(e.target.value)}
                min="3"
                max="7"
              />
            </div>
          </div>

          {/* Daily Tracking Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Daily Tracking
              </h4>
              
              <div className="space-y-3">
                <div>
                  <Label>Flow Intensity</Label>
                  <div className="flex gap-2 mt-1">
                    {['light', 'medium', 'heavy'].map((intensity) => (
                      <Badge
                        key={intensity}
                        variant={flowIntensity === intensity ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFlowIntensity(intensity)}
                      >
                        {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Mood Rating (1-10)</Label>
                  <Input 
                    type="range"
                    min="1"
                    max="10"
                    value={moodRating}
                    onChange={(e) => setMoodRating(parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span className="font-medium">{moodRating}</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                Wellness Tracking
              </h4>
              
              <div className="space-y-3">
                <div>
                  <Label>Water Intake (glasses)</Label>
                  <Input 
                    type="number"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(parseInt(e.target.value))}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Sleep Hours</Label>
                  <Input 
                    type="number"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseInt(e.target.value))}
                    min="0"
                    max="12"
                    step="0.5"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms Tracking */}
          <div className="space-y-2">
            <Label>Current Symptoms</Label>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={symptoms.includes(symptom) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-pink-100"
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes & Observations</Label>
            <Textarea 
              id="notes"
              placeholder="Add any additional notes about your cycle, mood, or symptoms..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg"
            onClick={handleSaveData}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Period Data
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Cycle Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Cycle Predictions
            </CardTitle>
            <CardDescription>Smart insights based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Next Period Expected</span>
                  <p className="text-lg font-bold text-green-700 dark:text-green-400">
                    {calculateNextPeriod() || 'Enter cycle data'}
                  </p>
                </div>
                <CalendarIcon className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Ovulation Window</span>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                    {calculateOvulationWindow() || 'Enter cycle data'}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Current Cycle Day</span>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-400">
                    {getCurrentCycleDay() ? `Day ${getCurrentCycleDay()}` : 'N/A'}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-xl border border-pink-200 dark:border-pink-800">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Days Until Next Period</span>
                  <p className="text-lg font-bold text-pink-700 dark:text-pink-400">
                    {daysUntilNext !== null ? daysUntilNext : 'N/A'}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-pink-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <ThermometerSun className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Heat Therapy</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Apply heating pad for 15-20 minutes to reduce cramps</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Droplets className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Hydration Goal</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Target: {waterIntake >= 8 ? 'Great job!' : 'Increase water intake'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Moon className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Sleep Quality</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{sleepHours >= 7 ? 'Good sleep pattern' : 'Aim for 7-9 hours'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Target className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Cycle Regularity</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {cycleLength && parseInt(cycleLength) >= 21 && parseInt(cycleLength) <= 35 
                      ? 'Normal cycle length' 
                      : 'Consider consulting a doctor'
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fertility & Health Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Fertility & Health Education
          </CardTitle>
          <CardDescription>
            Understanding your cycle for better health management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-700 dark:text-green-400">Fertile Window</h4>
              </div>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>✨ Most fertile: 2-3 days before ovulation</p>
                <p>🌸 Ovulation typically occurs mid-cycle</p>
                <p>📅 Fertile window lasts about 6 days</p>
                <p>🌡️ Track basal body temperature for accuracy</p>
              </div>
            </div>
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">Cycle Phases</h4>
              </div>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>🩸 Menstrual phase: Days 1-5</p>
                <p>🌱 Follicular phase: Days 1-13</p>
                <p>🌸 Ovulation: Around day 14</p>
                <p>🌙 Luteal phase: Days 15-28</p>
              </div>
            </div>
            <div className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold text-purple-700 dark:text-purple-400">When to See a Doctor</h4>
              </div>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>⚠️ Cycles shorter than 21 days</p>
                <p>⚠️ Cycles longer than 35 days</p>
                <p>🚨 Severe pain affecting daily life</p>
                <p>📊 Irregular bleeding patterns</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button 
            variant="outline" 
            className="w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all" 
            onClick={() => navigate('/doctor-consultation')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Consult with Gynecologist
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PeriodTrackingTab;
