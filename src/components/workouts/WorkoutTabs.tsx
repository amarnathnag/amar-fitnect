import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Heart, Star, Users, Weight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { WorkoutPlan } from "@/types/workout";
import WorkoutCategoryContent from "./WorkoutCategoryContent";
import SeniorsKidsWorkouts from "./SeniorsKidsWorkouts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface WorkoutTabsProps {
  workouts: WorkoutPlan[];
}

const CATEGORIES = [
  { value: 'weight-loss', icon: <Heart className="h-5 w-5" />, labelKey: 'weight_loss' },
  { value: 'muscle-gain', icon: <Dumbbell className="h-5 w-5" />, label: 'Muscle' },
  { value: 'maintenance', icon: <Weight className="h-5 w-5" />, labelKey: 'maintenance' },
  { value: 'beginner-full-body', icon: <Star className="h-5 w-5" />, label: 'Beginner' },
  { value: 'pcos-friendly', icon: <Heart className="h-5 w-5" />, label: 'PCOS' },
  { value: 'yoga', icon: <span className="text-lg">🧘</span>, label: 'Yoga' },
  { value: 'swimming', icon: <span className="text-lg">🏊</span>, label: 'Swim' },
  { value: 'cycling', icon: <span className="text-lg">🚴</span>, label: 'Cycling' },
  { value: 'dancing', icon: <span className="text-lg">💃</span>, label: 'Dance' },
  { value: 'martial-arts', icon: <span className="text-lg">🥊</span>, label: 'Martial' },
  { value: 'stretching', icon: <span className="text-lg">🤸</span>, label: 'Stretch' },
  { value: 'senior-kids', icon: <Users className="h-5 w-5" />, label: 'More' },
];

const triggerClass = "flex flex-col items-center gap-1 py-3 px-3 min-w-[70px] rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300 shrink-0";

const WorkoutTabs = ({ workouts }: WorkoutTabsProps) => {
  const { language } = useLanguage();
  
  return (
    <Tabs defaultValue="weight-loss" className="w-full">
      <div className="flex justify-center mb-12">
        <ScrollArea className="w-full max-w-6xl">
          <TabsList className="inline-flex w-max gap-1 bg-gradient-to-r from-muted/80 to-muted/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-muted/50">
            {CATEGORIES.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value} className={triggerClass}>
                {cat.icon}
                <span className="text-[10px] md:text-xs font-semibold whitespace-nowrap">
                  {cat.labelKey ? translateText(cat.labelKey as any, language) : cat.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {CATEGORIES.filter(c => c.value !== 'senior-kids').map(cat => (
        <TabsContent key={cat.value} value={cat.value} className="animate-fade-in">
          <WorkoutCategoryContent workouts={workouts} category={cat.value} />
        </TabsContent>
      ))}
      <TabsContent value="senior-kids" className="animate-fade-in">
        <SeniorsKidsWorkouts workouts={workouts} />
      </TabsContent>
    </Tabs>
  );
};

export default WorkoutTabs;
