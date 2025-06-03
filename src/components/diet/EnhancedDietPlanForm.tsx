
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calculator, Utensils, Zap } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';
import { useToast } from "@/hooks/use-toast";

interface DietPlanFormData {
  planName: string;
  healthGoal: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  foodPreference: string;
  budgetLevel: string;
  enableTimewisePlan: boolean;
}

const EnhancedDietPlanForm = () => {
  const { createDietPlan } = useDietPlans();
  const { toast } = useToast();
  const [formData, setFormData] = useState<DietPlanFormData>({
    planName: '',
    healthGoal: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    foodPreference: '',
    budgetLevel: '',
    enableTimewisePlan: false
  });
  const [calculatedBMR, setCalculatedBMR] = useState<number | null>(null);
  const [recommendedCalories, setRecommendedCalories] = useState<number | null>(null);

  const healthGoals = [
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'fat-loss', label: 'Fat Loss' },
    { value: 'pcos-management', label: 'PCOS Management' },
    { value: 'thyroid-support', label: 'Thyroid Support' },
    { value: 'diabetic-friendly', label: 'Diabetic-friendly' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'balanced-nutrition', label: 'Balanced Nutrition' }
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)', multiplier: 1.2 },
    { value: 'lightly-active', label: 'Lightly Active (light exercise 1-3 days/week)', multiplier: 1.375 },
    { value: 'moderately-active', label: 'Moderately Active (moderate exercise 3-5 days/week)', multiplier: 1.55 },
    { value: 'very-active', label: 'Very Active (hard exercise 6-7 days/week)', multiplier: 1.725 },
    { value: 'extremely-active', label: 'Extremely Active (very hard exercise, physical job)', multiplier: 1.9 }
  ];

  const foodPreferences = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'eggetarian', label: 'Eggetarian' }
  ];

  const budgetLevels = [
    { value: 'low', label: 'Low Budget' },
    { value: 'medium', label: 'Medium Budget' },
    { value: 'high', label: 'High Budget' }
  ];

  const calculateBMR = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    
    if (!age || !weight || !height || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in age, gender, weight, and height to calculate BMR",
        variant: "destructive",
      });
      return;
    }

    let bmr: number;
    
    // Mifflin-St Jeor Equation
    if (formData.gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const activityMultiplier = activityLevels.find(level => level.value === formData.activityLevel)?.multiplier || 1.2;
    const dailyCalories = Math.round(bmr * activityMultiplier);

    setCalculatedBMR(Math.round(bmr));
    setRecommendedCalories(dailyCalories);

    toast({
      title: "BMR Calculated!",
      description: `Your BMR is ${Math.round(bmr)} calories. Daily requirement: ${dailyCalories} calories.`,
    });
  };

  const handleInputChange = (field: keyof DietPlanFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDietPlan = async () => {
    if (!formData.planName || !formData.healthGoal) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the plan name and health goal",
        variant: "destructive",
      });
      return;
    }

    try {
      const plan = await createDietPlan(formData.planName, formData.healthGoal);
      
      if (plan) {
        toast({
          title: "Diet Plan Generated!",
          description: `${formData.planName} has been created successfully. ${formData.enableTimewisePlan ? 'Time-wise meal planning enabled.' : ''}`,
        });

        // Reset form
        setFormData({
          planName: '',
          healthGoal: '',
          age: '',
          gender: '',
          weight: '',
          height: '',
          activityLevel: '',
          foodPreference: '',
          budgetLevel: '',
          enableTimewisePlan: false
        });
        setCalculatedBMR(null);
        setRecommendedCalories(null);
      }
    } catch (error) {
      console.error('Error generating diet plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate diet plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-green-500" />
          Create Custom Diet Plan
        </CardTitle>
        <CardDescription>
          Design a personalized diet plan based on your specific needs and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="planName">Diet Plan Name *</Label>
              <Input 
                id="planName"
                placeholder="e.g., My Weight Loss Plan"
                value={formData.planName}
                onChange={(e) => handleInputChange('planName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Health Goal *</Label>
              <Select value={formData.healthGoal} onValueChange={(value) => handleInputChange('healthGoal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  {healthGoals.map((goal) => (
                    <SelectItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Physical Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Physical Information</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input 
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height"
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={calculateBMR}
              className="flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              Calculate BMR
            </Button>
            
            {calculatedBMR && recommendedCalories && (
              <div className="flex gap-2">
                <Badge variant="outline">BMR: {calculatedBMR} cal</Badge>
                <Badge variant="secondary">Daily: {recommendedCalories} cal</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {activityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Food Preference</Label>
              <Select value={formData.foodPreference} onValueChange={(value) => handleInputChange('foodPreference', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  {foodPreferences.map((pref) => (
                    <SelectItem key={pref.value} value={pref.value}>
                      {pref.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Budget Level</Label>
              <Select value={formData.budgetLevel} onValueChange={(value) => handleInputChange('budgetLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetLevels.map((budget) => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Time-wise Meal Plan Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="timewise-toggle">Enable Time-wise Meal Plan</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate specific meal times and portions throughout the day
              </p>
            </div>
            <Switch
              id="timewise-toggle"
              checked={formData.enableTimewisePlan}
              onCheckedChange={(checked) => handleInputChange('enableTimewisePlan', checked)}
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={generateDietPlan}
          className="w-full bg-green-500 hover:bg-green-600 text-lg py-6"
          disabled={!formData.planName || !formData.healthGoal}
        >
          <Zap className="mr-2 h-5 w-5" />
          Generate Diet Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default EnhancedDietPlanForm;
