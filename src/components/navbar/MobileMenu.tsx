
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Dumbbell, Briefcase, ShoppingBag } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  user: { isAuthenticated: boolean; isPremium?: boolean } | null;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, user, closeMenu }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 border-t">
      <div className="flex flex-col space-y-3">
        <NavLink to="/" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Home
        </NavLink>
        <NavLink to="/bmi-calculator" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          BMI Calculator
        </NavLink>
        <NavLink to="/diet-plans" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Diet Plans
        </NavLink>
        <NavLink to="/disease-management" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Disease Management
        </NavLink>
        <NavLink to="/workouts" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Workouts
        </NavLink>
        <NavLink to="/womens-health" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Women's Health
        </NavLink>
        <NavLink to="/daily-routine" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Daily Routine
        </NavLink>
        <NavLink to="/community" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Community
        </NavLink>
        <NavLink to="/marketplace" onClick={closeMenu} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
          <ShoppingBag className="h-4 w-4 mr-2" /> Health Marketplace
        </NavLink>
        <NavLink to="/blog" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Blog
        </NavLink>
        <NavLink to="/about" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          About
        </NavLink>

        {user && user.isPremium && (
          <>
            <div className="border-t my-2"></div>
            <div className="px-3 py-1">
              <p className="text-sm font-semibold text-gray-500">Premium</p>
            </div>
            <NavLink to="/chat" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
              AI Chat
            </NavLink>
            <NavLink to="/premium-ai" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
              Premium AI
            </NavLink>
            
            <div className="px-3 py-1 mt-2">
              <p className="text-sm font-semibold text-gray-500">Premium Services</p>
            </div>
            <NavLink to="/gyms" onClick={closeMenu} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
              <Dumbbell className="h-4 w-4 mr-2" /> Gyms
            </NavLink>
            <NavLink to="/jobs" onClick={closeMenu} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
              <Briefcase className="h-4 w-4 mr-2" /> Jobs
            </NavLink>
            <NavLink to="/doctor-consultation" onClick={closeMenu} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2" 
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
          </>
        )}

        {user && user.isAuthenticated && (
          <>
            <div className="border-t my-2"></div>
            <div className="px-3 py-1">
              <p className="text-sm font-semibold text-gray-500">Account</p>
            </div>
            <NavLink to="/profile" onClick={closeMenu} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
              <User className="h-4 w-4 mr-2" /> Profile
            </NavLink>
            {!user.isPremium && (
              <NavLink to="/subscription" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
                Upgrade to Premium
              </NavLink>
            )}
            <Button 
              onClick={handleLogout}
              variant="ghost"
              className="justify-start px-3 py-2 h-auto font-normal w-full text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
