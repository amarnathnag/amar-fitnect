
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, User, Settings, BarChart, FileText, Save, Heart, Activity, Weight, Calendar } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  
  // Mock user data - in a real app this would come from an API or state management
  const [userData, setUserData] = useState({
    personal: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      age: 28,
      gender: "male",
      height: 175,
      weight: 70,
      targetWeight: 65,
    },
    preferences: {
      dietType: "vegetarian",
      goal: "weightLoss",
      allergies: "None",
      medicalConditions: "None",
      activityLevel: "moderate",
    },
    progress: {
      startingWeight: 75,
      currentWeight: 70,
      weightGoal: 65,
      startDate: "2023-08-15",
      workoutsCompleted: 24,
      streakDays: 14,
    }
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      personal: {
        ...userData.personal,
        [name]: value
      }
    });
  };

  const handlePreferencesChange = (name, value) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        [name]: value
      }
    });
  };

  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      progress: {
        ...userData.progress,
        [name]: value
      }
    });
  };

  const saveChanges = () => {
    // In a real app, this would send data to an API
    toast({
      title: "Changes saved!",
      description: "Your profile has been updated successfully.",
    });
  };

  // Calculate weight progress percentage
  const startToGoalDiff = userData.progress.startingWeight - userData.progress.weightGoal;
  const currentToStartDiff = userData.progress.startingWeight - userData.progress.currentWeight;
  const progressPercentage = Math.round((currentToStartDiff / startToGoalDiff) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="sticky top-20">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-health-light flex items-center justify-center">
                      <User className="h-12 w-12 text-health-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{userData.personal.name}</CardTitle>
                  <CardDescription className="text-center">{userData.personal.email}</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="space-y-1">
                    <Button 
                      variant={activeTab === "personal" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab("personal")}
                    >
                      <User className="mr-2 h-4 w-4" /> Personal Info
                    </Button>
                    <Button 
                      variant={activeTab === "preferences" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab("preferences")}
                    >
                      <Settings className="mr-2 h-4 w-4" /> Preferences
                    </Button>
                    <Button 
                      variant={activeTab === "progress" ? "default" : "ghost"} 
                      className="w-full justify-start" 
                      onClick={() => setActiveTab("progress")}
                    >
                      <BarChart className="mr-2 h-4 w-4" /> Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>{
                    activeTab === "personal" ? "Personal Information" : 
                    activeTab === "preferences" ? "Health Preferences" : 
                    "Progress Tracking"
                  }</CardTitle>
                  <CardDescription>{
                    activeTab === "personal" ? "Update your personal details" : 
                    activeTab === "preferences" ? "Set your health and diet preferences" : 
                    "Track your health and fitness journey"
                  }</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeTab === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={userData.personal.name} 
                            onChange={handlePersonalChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={userData.personal.email} 
                            onChange={handlePersonalChange} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input 
                            id="age" 
                            name="age" 
                            type="number" 
                            value={userData.personal.age} 
                            onChange={handlePersonalChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <RadioGroup 
                            value={userData.personal.gender} 
                            onValueChange={(value) => handlePersonalChange({target: {name: "gender", value}})}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input 
                            id="height" 
                            name="height" 
                            type="number" 
                            value={userData.personal.height} 
                            onChange={handlePersonalChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Current Weight (kg)</Label>
                          <Input 
                            id="weight" 
                            name="weight" 
                            type="number" 
                            value={userData.personal.weight} 
                            onChange={handlePersonalChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                          <Input 
                            id="targetWeight" 
                            name="targetWeight" 
                            type="number" 
                            value={userData.personal.targetWeight} 
                            onChange={handlePersonalChange} 
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={saveChanges}>
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="dietType">Diet Preference</Label>
                          <Select 
                            value={userData.preferences.dietType} 
                            onValueChange={(value) => handlePreferencesChange("dietType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select diet type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="vegetarian">Vegetarian</SelectItem>
                              <SelectItem value="nonVegetarian">Non-Vegetarian</SelectItem>
                              <SelectItem value="vegan">Vegan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="goal">Health Goal</Label>
                          <Select 
                            value={userData.preferences.goal} 
                            onValueChange={(value) => handlePreferencesChange("goal", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your goal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weightLoss">Weight Loss</SelectItem>
                              <SelectItem value="weightGain">Weight Gain</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                              <SelectItem value="toning">Toning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="activityLevel">Activity Level</Label>
                        <Select 
                          value={userData.preferences.activityLevel} 
                          onValueChange={(value) => handlePreferencesChange("activityLevel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                            <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                            <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                            <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                            <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies or Food Restrictions</Label>
                        <Textarea 
                          id="allergies" 
                          placeholder="List any food allergies or restrictions" 
                          value={userData.preferences.allergies}
                          onChange={(e) => handlePreferencesChange("allergies", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                        <Textarea 
                          id="medicalConditions" 
                          placeholder="List any relevant medical conditions" 
                          value={userData.preferences.medicalConditions}
                          onChange={(e) => handlePreferencesChange("medicalConditions", e.target.value)}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={saveChanges}>
                          <Save className="mr-2 h-4 w-4" /> Save Preferences
                        </Button>
                      </div>
                    </div>
                  )}

                  {activeTab === "progress" && (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <Weight className="h-5 w-5 text-health-primary" /> Weight Progress
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Starting: {userData.progress.startingWeight} kg</span>
                            <span>Current: {userData.progress.currentWeight} kg</span>
                            <span>Goal: {userData.progress.weightGoal} kg</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          <p className="text-sm text-muted-foreground text-center">
                            {progressPercentage}% of your weight goal achieved
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <Card>
                            <CardContent className="p-4 flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Start Date</p>
                                <p className="font-medium">{userData.progress.startDate}</p>
                              </div>
                              <Calendar className="h-5 w-5 text-health-primary" />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Workouts Done</p>
                                <p className="font-medium">{userData.progress.workoutsCompleted}</p>
                              </div>
                              <Activity className="h-5 w-5 text-health-secondary" />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Day Streak</p>
                                <p className="font-medium">{userData.progress.streakDays} days</p>
                              </div>
                              <Heart className="h-5 w-5 text-red-500" />
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <FileText className="h-5 w-5 text-health-primary" /> Update Progress
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                            <Input 
                              id="currentWeight" 
                              name="currentWeight" 
                              type="number" 
                              value={userData.progress.currentWeight} 
                              onChange={handleProgressChange} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="workoutsCompleted">Workouts Completed</Label>
                            <Input 
                              id="workoutsCompleted" 
                              name="workoutsCompleted" 
                              type="number" 
                              value={userData.progress.workoutsCompleted} 
                              onChange={handleProgressChange} 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={saveChanges}>
                          <Save className="mr-2 h-4 w-4" /> Update Progress
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
