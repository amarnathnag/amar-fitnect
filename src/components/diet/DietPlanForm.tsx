
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Utensils } from 'lucide-react';

interface DietPlanFormProps {
  onCreatePlan: (name: string, goal: string) => Promise<void>;
}

const DietPlanForm = ({ onCreatePlan }: DietPlanFormProps) => {
  const [planName, setPlanName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const goals = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Weight Maintenance' },
    { value: 'thyroid-control', label: 'Thyroid Control' },
    { value: 'pcos-management', label: 'PCOS Management' }
  ];

  const handleCreatePlan = async () => {
    if (!planName || !selectedGoal) {
      alert('Please fill in plan name and goal');
      return;
    }

    await onCreatePlan(planName, selectedGoal);
    setPlanName('');
    setSelectedGoal('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-green-500" />
          Create New Diet Plan
        </CardTitle>
        <CardDescription>
          Design a personalized diet plan based on your health goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="planName">Diet Plan Name</Label>
            <Input 
              id="planName"
              placeholder="e.g., My Weight Loss Plan"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Health Goal</Label>
            <Select value={selectedGoal} onValueChange={setSelectedGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                {goals.map((goal) => (
                  <SelectItem key={goal.value} value={goal.value}>
                    {goal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleCreatePlan}
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={!planName || !selectedGoal}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Diet Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default DietPlanForm;
