
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ActivitySquare, Utensils, Dumbbell, Calendar, PieChart, Activity } from 'lucide-react';

const FeaturesDropdown = () => {
  const features = [
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

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100">Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {features.map((feature) => (
                <li key={feature.title}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={feature.href}
                      className={({ isActive }) => cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        isActive 
                          ? "bg-health-light text-health-primary" 
                          : "hover:bg-gray-100 hover:text-health-primary"
                      )}
                    >
                      <div className="flex flex-col items-center md:items-start">
                        {feature.icon}
                        <div className="text-sm font-medium leading-none">{feature.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </NavLink>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default FeaturesDropdown;
