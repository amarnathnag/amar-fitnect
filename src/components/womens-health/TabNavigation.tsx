
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Flower, Heart, Brain, Activity, BarChart3, Timer } from 'lucide-react';
import MenstrualHealthTab from './MenstrualHealthTab';
import PregnancyCareTab from './PregnancyCareTab';
import HormonalHealthTab from './HormonalHealthTab';
import MentalHealthTab from './MentalHealthTab';
import BreastHealthTab from './BreastHealthTab';
import LifestylePlansTab from './LifestylePlansTab';
import PeriodTrackingTab from './PeriodTrackingTab';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
}

const TabNavigation = ({ activeTab, setActiveTab, isMobile }: TabNavigationProps) => {
  return (
    <Tabs 
      defaultValue="period-tracking" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-center mb-8">
        <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-1' : 'grid-cols-7'} w-full max-w-5xl`}>
          <TabsTrigger value="period-tracking" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Period Tracking</span>
          </TabsTrigger>
          <TabsTrigger value="menstrual-health" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Menstrual Health</span>
          </TabsTrigger>
          <TabsTrigger value="pregnancy" className="flex items-center gap-2">
            <Flower className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Pregnancy Care</span>
          </TabsTrigger>
          <TabsTrigger value="hormonal" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Hormonal Health</span>
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Mental Health</span>
          </TabsTrigger>
          <TabsTrigger value="breast-health" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Breast Health</span>
          </TabsTrigger>
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className={isMobile ? "text-xs" : ""}>Lifestyle Plans</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Period Tracking Tab */}
      <TabsContent value="period-tracking" className="animate-fade-in">
        <PeriodTrackingTab />
      </TabsContent>

      {/* Menstrual Health Tab */}
      <TabsContent value="menstrual-health" className="animate-fade-in">
        <MenstrualHealthTab />
      </TabsContent>

      {/* Pregnancy Care Tab */}
      <TabsContent value="pregnancy" className="animate-fade-in">
        <PregnancyCareTab />
      </TabsContent>

      {/* Hormonal Health Tab */}
      <TabsContent value="hormonal" className="animate-fade-in">
        <HormonalHealthTab />
      </TabsContent>

      {/* Mental Health Tab */}
      <TabsContent value="mental" className="animate-fade-in">
        <MentalHealthTab />
      </TabsContent>

      {/* Breast Health Tab */}
      <TabsContent value="breast-health" className="animate-fade-in">
        <BreastHealthTab />
      </TabsContent>

      {/* Lifestyle Plans Tab */}
      <TabsContent value="lifestyle" className="animate-fade-in">
        <LifestylePlansTab />
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
