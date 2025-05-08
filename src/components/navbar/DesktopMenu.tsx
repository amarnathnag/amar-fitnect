
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, ChevronDown, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopMenuProps {
  user: { isAuthenticated: boolean; isPremium?: boolean } | null;
  openLoginModal: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ user, openLoginModal }) => {
  const { logout } = useAuth();

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

      <NavLink to="/gyms" className="px-3 py-2 hover:text-primary">Gyms</NavLink>
      <NavLink to="/jobs" className="px-3 py-2 hover:text-primary">Jobs</NavLink>
      <NavLink to="/doctor-consultation" className="px-3 py-2 hover:text-primary">Doctors</NavLink>

      {user && user.isPremium && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-3 py-2 hover:text-primary inline-flex items-center">
              Premium <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <NavLink to="/chat" className="w-full">Chat</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink to="/premium-ai" className="w-full">Premium AI</NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

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
