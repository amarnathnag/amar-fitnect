
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Heart, Star, Users, Weight, Flame } from 'lucide-react';
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
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full max-w-4xl bg-muted/50 p-1 rounded-xl">
          <TabsTrigger 
            value="weight-loss" 
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-primary data-[state=active]:to-health-primary/80 data-[state=active]:text-white transition-all duration-300"
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium">{translateText("weight_loss", language)}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="muscle-gain"
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-primary data-[state=active]:to-health-primary/80 data-[state=active]:text-white transition-all duration-300"
          >
            <Dumbbell className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium">{translateText("muscle_gain", language)}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="maintenance" 
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-primary data-[state=active]:to-health-primary/80 data-[state=active]:text-white transition-all duration-300"
          >
            <Weight className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium">{translateText("maintenance", language)}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="beginner-full-body" 
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-primary data-[state=active]:to-health-primary/80 data-[state=active]:text-white transition-all duration-300"
          >
            <Star className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium">{translateText("beginner_full_body", language)}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="pcos-friendly" 
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-primary data-[state=active]:to-health-primary/80 data-[state=active]:text-white transition-all duration-300"
          >
            <Heart className="h-5 w-5 text-pink-500" />
            <span className="text-xs md:text-sm font-medium">{translateText("pcos_friendly", language)}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="senior-kids" 
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-primary data-[state=active]:to-health-primary/80 data-[state=active]:text-white transition-all duration-300"
          >
            <Users className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium hidden md:inline">{translateText("senior_friendly", language)}/{translateText("kids_fitness", language)}</span>
            <span className="text-xs md:text-sm font-medium md:hidden">More</span>
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
