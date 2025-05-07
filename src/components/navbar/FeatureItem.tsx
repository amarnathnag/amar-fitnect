
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { FeatureItem as FeatureItemType } from "@/data/features";

interface FeatureItemProps {
  feature: FeatureItemType;
  closeMenu?: () => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature, closeMenu }) => {
  return (
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
          onClick={closeMenu}
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
  );
};

export default FeatureItem;
