
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getFilteredFeatures } from '@/data/features';
import { useAuth } from '@/contexts/AuthContext';

const FeaturesDropdown = () => {
  const { user, profileData } = useAuth();
  
  // Get filtered features based on user's gender
  const features = getFilteredFeatures(profileData?.gender);

  if (!user) {
    return null; // Don't show features dropdown when not logged in
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 w-80 lg:w-96 lg:grid-cols-2">
              {features.map((feature) => (
                <FeatureItem
                  key={feature.title}
                  title={feature.title}
                  href={feature.href}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const FeatureItem = ({ title, href, description, icon: Icon }: {
  title: string;
  href: string;
  description: string;
  icon: any;
}) => {
  return (
    <Link 
      to={href}
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-health-primary" />
        <div className="text-sm font-medium leading-none group-hover:text-health-primary transition-colors">
          {title}
        </div>
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </Link>
  );
};

export default FeaturesDropdown;
