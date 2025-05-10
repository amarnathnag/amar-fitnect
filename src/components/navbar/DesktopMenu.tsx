
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, ChevronDown, User, Dumbbell, Briefcase, StethoscopeIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface DesktopMenuProps {
  user: { isAuthenticated: boolean; isPremium?: boolean } | null;
  openLoginModal: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ user, openLoginModal }) => {
  const { logout } = useAuth();

  // Shows premium menu items only for premium users
  const renderPremiumItems = () => {
    if (!user?.isPremium) return null;
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 py-2 hover:text-primary inline-flex items-center">
            Premium <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <NavLink to="/chat" className="w-full">AI Chat</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink to="/premium-ai" className="w-full">Premium AI</NavLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Services</DropdownMenuLabel>
          
          <DropdownMenuItem asChild>
            <NavLink to="/gyms" className="w-full flex items-center">
              <Dumbbell className="mr-2 h-4 w-4" /> Gyms
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/jobs" className="w-full flex items-center">
              <Briefcase className="mr-2 h-4 w-4" /> Jobs
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/doctor-consultation" className="w-full flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="mr-2 h-4 w-4" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-5a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                <circle cx="20" cy="10" r="2"></circle>
              </svg>
              Doctors
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavLink to="/" className="px-3 py-2 hover:text-primary">Home</NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="px-3 py-2 hover:text-primary inline-flex items-center">
            Features <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <NavLink to="/bmi-calculator" className="w-full">BMI Calculator</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/diet-plans" className="w-full">Diet Plans</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/disease-management" className="w-full">Disease Management</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/workouts" className="w-full">Workouts</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/womens-health" className="w-full">Women's Health</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/daily-routine" className="w-full">Daily Routine</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink to="/community" className="w-full">Community</NavLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {renderPremiumItems()}

      <NavLink to="/blog" className="px-3 py-2 hover:text-primary">Blog</NavLink>

      <NavLink to="/about" className="px-3 py-2 hover:text-primary">About</NavLink>

      {user && user.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-2 flex items-center gap-1">
              <User className="h-4 w-4" /> Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <NavLink to="/profile" className="w-full">Profile</NavLink>
            </DropdownMenuItem>
            {!user.isPremium && (
              <DropdownMenuItem asChild>
                <NavLink to="/subscription" className="w-full">Upgrade to Premium</NavLink>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm" onClick={openLoginModal} className="ml-2">
          Sign In
        </Button>
      )}
    </div>
  );
};

export default DesktopMenu;
