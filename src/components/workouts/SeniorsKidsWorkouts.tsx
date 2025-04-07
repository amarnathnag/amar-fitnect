
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { WorkoutPlan } from "@/types/workout";
import WorkoutCategoryContent from "./WorkoutCategoryContent";

interface SeniorsKidsWorkoutsProps {
  workouts: WorkoutPlan[];
}

const SeniorsKidsWorkouts = ({ workouts }: SeniorsKidsWorkoutsProps) => {
  const { language } = useLanguage();
  
  return (
    <Tabs defaultValue="senior">
      <TabsList className="mb-6 bg-muted/50 p-1 mx-auto w-fit rounded-lg">
        <TabsTrigger 
          value="senior" 
          className="flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-secondary data-[state=active]:to-health-secondary/80 data-[state=active]:text-white transition-all duration-300"
        >
          <User className="h-4 w-4" />
          <span>{translateText("senior_friendly", language)}</span>
        </TabsTrigger>
        <TabsTrigger 
          value="kids" 
          className="flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-health-secondary data-[state=active]:to-health-secondary/80 data-[state=active]:text-white transition-all duration-300"
        >
          <Users className="h-4 w-4" />
          <span>{translateText("kids_fitness", language)}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="senior">
        <WorkoutCategoryContent workouts={workouts} category="senior-friendly" />
      </TabsContent>
      
      <TabsContent value="kids">
        <WorkoutCategoryContent workouts={workouts} category="kids-fitness" />
      </TabsContent>
    </Tabs>
  );
};

export default SeniorsKidsWorkouts;
