
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

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
        <NavLink to="/gyms" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Gyms
        </NavLink>
        <NavLink to="/jobs" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Jobs
        </NavLink>
        <NavLink to="/doctor-consultation" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
          Doctors
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
              Chat
            </NavLink>
            <NavLink to="/premium-ai" onClick={closeMenu} className="block px-3 py-2 hover:bg-gray-100 rounded-md">
              Premium AI
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
