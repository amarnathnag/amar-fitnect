
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import FeatureItem from './navbar/FeatureItem';
import { featuresData } from '@/data/features';

interface FeaturesDropdownProps {
  closeMenu?: () => void;
}

const FeaturesDropdown: React.FC<FeaturesDropdownProps> = ({ closeMenu }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100">Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {featuresData.map((feature) => (
                <FeatureItem 
                  key={feature.title} 
                  feature={feature} 
                  closeMenu={closeMenu}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default FeaturesDropdown;
