
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Heart, Star, Users, Weight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { WorkoutPlan } from "@/types/workout";
import WorkoutCategoryContent from "./WorkoutCategoryContent";
import SeniorsKidsWorkouts from "./SeniorsKidsWorkouts";

interface WorkoutTabsProps {
  workouts: WorkoutPlan[];
}

const WorkoutTabs = ({ workouts }: WorkoutTabsProps) => {
  const { language } = useLanguage();
  
  return (
    <Tabs defaultValue="weight-loss" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="weight-loss" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>{translateText("weight_loss", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="muscle-gain" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span>{translateText("muscle_gain", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            <Weight className="h-4 w-4" />
            <span>{translateText("maintenance", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="beginner-full-body" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>{translateText("beginner_full_body", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="pcos-friendly" className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-pink-500" />
            <span>{translateText("pcos_friendly", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="senior-kids" className="flex items-center gap-2 relative">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">{translateText("senior_friendly", language)}/{translateText("kids_fitness", language)}</span>
            <span className="md:hidden">More</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Weight Loss Workouts Tab */}
      <TabsContent value="weight-loss" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="weight-loss" />
      </TabsContent>

      {/* Muscle Gain Workouts Tab */}
      <TabsContent value="muscle-gain" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="muscle-gain" />
      </TabsContent>

      {/* Maintenance Workouts Tab */}
      <TabsContent value="maintenance" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="maintenance" />
      </TabsContent>

      {/* Beginner Full Body Workouts Tab */}
      <TabsContent value="beginner-full-body" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="beginner-full-body" />
      </TabsContent>

      {/* PCOS & Thyroid-Friendly Workouts Tab */}
      <TabsContent value="pcos-friendly" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="pcos-friendly" />
      </TabsContent>

      {/* Seniors and Kids Tab (Combined) */}
      <TabsContent value="senior-kids" className="animate-fade-in">
        <SeniorsKidsWorkouts workouts={workouts} />
      </TabsContent>
    </Tabs>
  );
};

export default WorkoutTabs;
