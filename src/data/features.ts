
import { LucideIcon, ActivitySquare, Utensils, Dumbbell, Calendar, PieChart, Activity } from 'lucide-react';

export interface FeatureItem {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

export const featuresData: FeatureItem[] = [
  {
    title: "BMI Calculator",
    href: "/bmi-calculator",
    description: "Calculate your Body Mass Index and get health insights.",
    icon: PieChart,
  },
  {
    title: "Diet Plans",
    href: "/diet-plans",
    description: "Discover personalized nutrition plans for your health goals.",
    icon: Utensils,
  },
  {
    title: "Workouts",
    href: "/workouts",
    description: "Access guided workout routines for every fitness level.",
    icon: Dumbbell,
  },
  {
    title: "Disease Management",
    href: "/disease-management",
    description: "Learn how to manage chronic conditions through lifestyle.",
    icon: Activity,
  },
  {
    title: "Women's Health",
    href: "/womens-health",
    description: "Resources tailored for women's specific health needs.",
    icon: Calendar,
  },
  {
    title: "Daily Routine",
    href: "/daily-routine",
    description: "Create healthy daily habits for optimal wellbeing.",
    icon: ActivitySquare,
  },
];
