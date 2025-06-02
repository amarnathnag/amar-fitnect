
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, TrendingUp, AlertCircle, Heart, Save } from 'lucide-react';
import { usePeriodTracking } from '@/hooks/usePeriodTracking';

const PeriodTrackingTab = () => {
  const { periodData, savePeriodData } = usePeriodTracking();
  const [lastPeriodDate, setLastPeriodDate] = useState(periodData?.last_period_date || '');
  const [cycleLength, setCycleLength] = useState(periodData?.cycle_length?.toString() || '28');
  const [periodLength, setPeriodLength] = useState(periodData?.period_length?.toString() || '5');
  const [symptoms, setSymptoms] = useState<string[]>(periodData?.symptoms || []);

  const commonSymptoms = [
    'Cramps', 'Bloating', 'Mood swings', 'Headache', 
    'Fatigue', 'Acne', 'Breast tenderness', 'Back pain'
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
      symptoms: symptoms.length > 0 ? symptoms : null
    };

    await savePeriodData(data);
  };

  return (
    <div className="space-y-6">
      {/* Period Tracker */}
      <Card className="border-2 border-pink-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-pink-500" />
            <CardTitle>Period Tracker</CardTitle>
          </div>
          <CardDescription>
            Track your menstrual cycle and get personalized insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <Button 
            className="w-full bg-pink-500 hover:bg-pink-600"
            onClick={handleSaveData}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Period Data
          </Button>
        </CardContent>
      </Card>

      {/* Cycle Insights */}
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
                  {lastPeriodDate ? 
                    new Date(new Date(lastPeriodDate).getTime() + parseInt(cycleLength) * 24 * 60 * 60 * 1000).toLocaleDateString() :
                    'Enter last period date'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm font-medium">Ovulation Window</span>
                <span className="text-blue-600 font-bold">
                  {lastPeriodDate ? 
                    `${Math.floor(parseInt(cycleLength) / 2) - 2} to ${Math.floor(parseInt(cycleLength) / 2) + 2} days` :
                    'Enter cycle data'
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <span className="text-sm font-medium">Cycle Day</span>
                <span className="text-purple-600 font-bold">
                  {lastPeriodDate ? 
                    Math.floor((new Date().getTime() - new Date(lastPeriodDate).getTime()) / (24 * 60 * 60 * 1000)) + 1 :
                    'N/A'
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
              Health Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Iron-Rich Foods</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Include spinach, lentils, and lean meat during your period</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Stay Hydrated</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Drink 8-10 glasses of water daily to reduce bloating</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Light Exercise</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Gentle yoga or walking can help reduce cramps</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Period Problems Management */}
      <Card>
        <CardHeader>
          <CardTitle>Common Period Problems & Solutions</CardTitle>
          <CardDescription>
            Get help managing menstrual health issues and when to consult a doctor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-red-600">Heavy Bleeding</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Use iron supplements with doctor approval</li>
                <li>• Track flow intensity daily</li>
                <li>• Consult doctor if changing pad/tampon hourly</li>
                <li>• Consider hormonal birth control options</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Irregular Cycles</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Maintain consistent sleep schedule</li>
                <li>• Manage stress through meditation</li>
                <li>• Track cycles for 3+ months</li>
                <li>• See doctor for cycles shorter than 21 days</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-purple-600">Severe Cramps</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Apply heat therapy to lower abdomen</li>
                <li>• Try anti-inflammatory medications</li>
                <li>• Practice gentle stretching exercises</li>
                <li>• Consider magnesium supplements</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">PCOS-Related Issues</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• Follow low-glycemic diet</li>
                <li>• Include omega-3 rich foods</li>
                <li>• Regular moderate exercise</li>
                <li>• Monitor insulin levels</li>
              </ul>
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
