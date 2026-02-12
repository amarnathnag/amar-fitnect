
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Heart, Star, Users, Weight, Flame, Bike, Music, Swords, StretchHorizontal } from 'lucide-react';
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
      <div className="flex justify-center mb-12">
        <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 w-full max-w-6xl bg-gradient-to-r from-muted/80 to-muted/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-muted/50">
          <TabsTrigger value="weight-loss" className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300">
            <Heart className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-semibold">{translateText("weight_loss", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="muscle-gain" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Dumbbell className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">{translateText("muscle_gain", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Weight className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">{translateText("maintenance", language)}</span>
          </TabsTrigger>
          <TabsTrigger value="beginner-full-body" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Star className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">Beginner</span>
          </TabsTrigger>
          <TabsTrigger value="pcos-friendly" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Heart className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">PCOS</span>
          </TabsTrigger>
          <TabsTrigger value="yoga" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <span className="text-lg">🧘</span>
            <span className="text-[10px] md:text-xs font-medium">Yoga</span>
          </TabsTrigger>
          <TabsTrigger value="swimming" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <span className="text-lg">🏊</span>
            <span className="text-[10px] md:text-xs font-medium">Swim</span>
          </TabsTrigger>
          <TabsTrigger value="cycling" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Bike className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">Cycling</span>
          </TabsTrigger>
          <TabsTrigger value="dancing" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Music className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">Dance</span>
          </TabsTrigger>
          <TabsTrigger value="martial-arts" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Swords className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">Martial</span>
          </TabsTrigger>
          <TabsTrigger value="stretching" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <StretchHorizontal className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">Stretch</span>
          </TabsTrigger>
          <TabsTrigger value="senior-kids" className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground transition-all duration-300">
            <Users className="h-5 w-5" />
            <span className="text-[10px] md:text-xs font-medium">More</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="weight-loss" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="weight-loss" />
      </TabsContent>
      <TabsContent value="muscle-gain" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="muscle-gain" />
      </TabsContent>
      <TabsContent value="maintenance" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="maintenance" />
      </TabsContent>
      <TabsContent value="beginner-full-body" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="beginner-full-body" />
      </TabsContent>
      <TabsContent value="pcos-friendly" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="pcos-friendly" />
      </TabsContent>
      <TabsContent value="yoga" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="yoga" />
      </TabsContent>
      <TabsContent value="swimming" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="swimming" />
      </TabsContent>
      <TabsContent value="cycling" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="cycling" />
      </TabsContent>
      <TabsContent value="dancing" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="dancing" />
      </TabsContent>
      <TabsContent value="martial-arts" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="martial-arts" />
      </TabsContent>
      <TabsContent value="stretching" className="animate-fade-in">
        <WorkoutCategoryContent workouts={workouts} category="stretching" />
      </TabsContent>
      <TabsContent value="senior-kids" className="animate-fade-in">
        <SeniorsKidsWorkouts workouts={workouts} />
      </TabsContent>
    </Tabs>
  );
};

export default WorkoutTabs;
