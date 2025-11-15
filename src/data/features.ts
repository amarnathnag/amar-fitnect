
import { LucideIcon, ActivitySquare, Utensils, Dumbbell, Calendar, PieChart, Activity } from 'lucide-react';

export interface FeatureItem {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  genderSpecific?: 'female' | 'male' | null;
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
    genderSpecific: 'female',
  },
  {
    title: "Men's Health",
    href: "/mens-health",
    description: "Workout tracking, muscle building, and health optimization for men.",
    icon: Dumbbell,
    genderSpecific: 'male',
  },
  {
    title: "Fitness Dashboard",
    href: "/fitness-dashboard",
    description: "Unified dashboard for exercise stats, nutrition, and progress.",
    icon: ActivitySquare,
  },
  {
    title: "Daily Routine",
    href: "/daily-routine",
    description: "Create healthy daily habits for optimal wellbeing.",
    icon: ActivitySquare,
  },
];

// Helper function to filter features based on user gender
export const getFilteredFeatures = (userGender?: 'male' | 'female' | 'other' | null) => {
  return featuresData.filter(feature => {
    if (!feature.genderSpecific) return true;
    return feature.genderSpecific === userGender;
  });
};
