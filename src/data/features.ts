
import { ReactNode } from 'react';
import { ActivitySquare, Utensils, Dumbbell, Calendar, PieChart, Activity } from 'lucide-react';

export interface FeatureItem {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
}

export const featuresData: FeatureItem[] = [
  {
    title: "BMI Calculator",
    href: "/bmi-calculator",
    description: "Calculate your Body Mass Index and get health insights.",
    icon: <PieChart className="h-6 w-6 mb-2 text-health-primary" />,
  },
  {
    title: "Diet Plans",
    href: "/diet-plans",
    description: "Discover personalized nutrition plans for your health goals.",
    icon: <Utensils className="h-6 w-6 mb-2 text-health-primary" />,
  },
  {
    title: "Workouts",
    href: "/workouts",
    description: "Access guided workout routines for every fitness level.",
    icon: <Dumbbell className="h-6 w-6 mb-2 text-health-primary" />,
  },
  {
    title: "Disease Management",
    href: "/disease-management",
    description: "Learn how to manage chronic conditions through lifestyle.",
    icon: <Activity className="h-6 w-6 mb-2 text-health-primary" />,
  },
  {
    title: "Women's Health",
    href: "/womens-health",
    description: "Resources tailored for women's specific health needs.",
    icon: <Calendar className="h-6 w-6 mb-2 text-health-primary" />,
  },
  {
    title: "Daily Routine",
    href: "/daily-routine",
    description: "Create healthy daily habits for optimal wellbeing.",
    icon: <ActivitySquare className="h-6 w-6 mb-2 text-health-primary" />,
  },
];
