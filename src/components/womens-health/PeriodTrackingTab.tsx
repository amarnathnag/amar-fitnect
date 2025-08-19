
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, TrendingUp, AlertCircle, Heart, Save, Moon, Droplets, ThermometerSun, Bell, Target, Activity } from 'lucide-react';
import { usePeriodTracking } from '@/hooks/usePeriodTracking';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

  return (
    <div className="space-y-6">
      {/* Enhanced Period Tracker */}
      <Card className="border-2 border-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                🌸 Smart Period Tracker
              </CardTitle>
              <CardDescription className="text-sm font-medium">
                Your personalized cycle companion with AI insights ✨
              </CardDescription>
            </div>
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
            className="w-full bg-pink-500 hover:bg-pink-600"
            onClick={handleSaveData}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Period Data
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Cycle Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Cycle Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-sm font-medium">Next Period Expected</span>
                <span className="text-green-600 font-bold">
                  {calculateNextPeriod() || 'Enter cycle data'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm font-medium">Ovulation Window</span>
                <span className="text-blue-600 font-bold">
                  {calculateOvulationWindow() || 'Enter cycle data'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-sm font-medium">Current Cycle Day</span>
                <span className="text-purple-600 font-bold">
                  {getCurrentCycleDay() ? `Day ${getCurrentCycleDay()}` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <span className="text-sm font-medium">Days Until Next Period</span>
                <span className="text-pink-600 font-bold">
                  {lastPeriodDate && cycleLength ? 
                    Math.max(0, parseInt(cycleLength) - (getCurrentCycleDay() || 0)) : 'N/A'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-500" />
            Fertility & Health Insights
          </CardTitle>
          <CardDescription>
            Understanding your cycle for better health management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Fertile Window</h4>
              <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <p>• Most fertile: 2-3 days before ovulation</p>
                <p>• Ovulation typically occurs mid-cycle</p>
                <p>• Fertile window lasts about 6 days</p>
                <p>• Track basal body temperature for accuracy</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Cycle Phases</h4>
              <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <p>• Menstrual phase: Days 1-5</p>
                <p>• Follicular phase: Days 1-13</p>
                <p>• Ovulation: Around day 14</p>
                <p>• Luteal phase: Days 15-28</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-purple-600">When to See a Doctor</h4>
              <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <p>• Cycles shorter than 21 days</p>
                <p>• Cycles longer than 35 days</p>
                <p>• Severe pain affecting daily life</p>
                <p>• Irregular bleeding patterns</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => navigate('/doctor-consultation')}>
            <Plus className="mr-2 h-4 w-4" />
            Consult Gynecologist
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PeriodTrackingTab;
