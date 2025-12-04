import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, Droplets, Calendar } from 'lucide-react';
import { DailyProgressData } from '@/hooks/useDailyProgress';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks } from 'date-fns';

interface ProgressChartsProps {
  progressData: DailyProgressData[];
}

const ProgressCharts = ({ progressData }: ProgressChartsProps) => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');

  // Get weekly data (last 7 days)
  const getWeeklyData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayData = progressData.find(p => p.date === dateStr);
      last7Days.push({
        date: format(date, 'EEE'),
        fullDate: dateStr,
        workouts: dayData?.exercises?.length || 0,
        waterIntake: dayData?.water_intake || 0,
        sleepHours: dayData?.sleep_hours || 0,
      });
    }
    return last7Days;
  };

  // Get monthly data (last 4 weeks aggregated)
  const getMonthlyData = () => {
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(new Date(), i));
      const weekEnd = endOfWeek(subWeeks(new Date(), i));
      const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
      
      let totalWorkouts = 0;
      let totalWater = 0;
      let totalSleep = 0;
      let daysWithData = 0;

      daysInWeek.forEach(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const dayData = progressData.find(p => p.date === dateStr);
        if (dayData) {
          totalWorkouts += dayData.exercises?.length || 0;
          totalWater += dayData.water_intake || 0;
          totalSleep += dayData.sleep_hours || 0;
          daysWithData++;
        }
      });

      weeks.push({
        week: `Week ${4 - i}`,
        dateRange: `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`,
        workouts: totalWorkouts,
        avgWater: daysWithData > 0 ? +(totalWater / daysWithData).toFixed(1) : 0,
        avgSleep: daysWithData > 0 ? +(totalSleep / daysWithData).toFixed(1) : 0,
      });
    }
    return weeks;
  };

  const weeklyData = getWeeklyData();
  const monthlyData = getMonthlyData();
  const displayData = timeRange === 'weekly' ? weeklyData : monthlyData;
  const xAxisKey = timeRange === 'weekly' ? 'date' : 'week';

  return (
    <div className="space-y-6">
      {/* Time Range Toggle */}
      <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as 'weekly' | 'monthly')} className="w-full">
        <TabsList className="grid w-full max-w-[300px] grid-cols-2">
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Monthly
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Workout Frequency Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Workout Frequency
          </CardTitle>
          <CardDescription>
            {timeRange === 'weekly' ? 'Number of exercises per day' : 'Total exercises per week'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  borderRadius: '8px',
                }} 
                formatter={(value: number) => [`${value} exercises`, 'Workouts']}
              />
              <Bar 
                dataKey="workouts" 
                fill="hsl(var(--primary))" 
                radius={[6, 6, 0, 0]}
                name="Workouts"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Water Intake Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Water Intake Trends
          </CardTitle>
          <CardDescription>
            {timeRange === 'weekly' ? 'Daily water intake (liters)' : 'Average daily intake per week'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={displayData}>
              <defs>
                <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                domain={[0, 'auto']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  borderRadius: '8px',
                }} 
                formatter={(value: number) => [`${value} L`, 'Water Intake']}
              />
              <Area 
                type="monotone" 
                dataKey={timeRange === 'weekly' ? 'waterIntake' : 'avgWater'} 
                stroke="hsl(199, 89%, 48%)" 
                strokeWidth={2}
                fill="url(#waterGradient)"
                name="Water"
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Goal indicator */}
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-0.5 bg-primary opacity-50" />
            <span>Goal: 2.5L daily</span>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Sleep Patterns
          </CardTitle>
          <CardDescription>
            {timeRange === 'weekly' ? 'Hours of sleep per night' : 'Average sleep per week'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                domain={[0, 12]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                  borderRadius: '8px',
                }} 
                formatter={(value: number) => [`${value} hours`, 'Sleep']}
              />
              <Line 
                type="monotone" 
                dataKey={timeRange === 'weekly' ? 'sleepHours' : 'avgSleep'} 
                stroke="hsl(270, 70%, 60%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(270, 70%, 60%)', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Sleep"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-0.5 bg-purple-500 opacity-50" />
            <span>Recommended: 7-9 hours</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressCharts;
