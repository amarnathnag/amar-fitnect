
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <TabsList className="mb-4">
        <TabsTrigger value="senior">{translateText("senior_friendly", language)}</TabsTrigger>
        <TabsTrigger value="kids">{translateText("kids_fitness", language)}</TabsTrigger>
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
