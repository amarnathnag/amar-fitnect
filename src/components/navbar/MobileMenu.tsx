
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

  const linkClass = "flex items-center px-3 py-3 min-h-[44px] hover:bg-muted active:bg-muted/70 rounded-md text-foreground transition-colors";

  return (
    <div className="md:hidden py-3 border-t border-border animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
      <div className="flex flex-col space-y-1">
        <NavLink to="/" onClick={closeMenu} className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/bmi-calculator" onClick={closeMenu} className={linkClass}>
          BMI Calculator
        </NavLink>
        <NavLink to="/diet-plans" onClick={closeMenu} className={linkClass}>
          Diet Plans
        </NavLink>
        <NavLink to="/disease-management" onClick={closeMenu} className={linkClass}>
          Disease Management
        </NavLink>
        <NavLink to="/workouts" onClick={closeMenu} className={linkClass}>
          Workouts
        </NavLink>
        <NavLink to="/fitness-dashboard" onClick={closeMenu} className={linkClass}>
          Fitness Dashboard
        </NavLink>
        <NavLink to="/womens-health" onClick={closeMenu} className={linkClass}>
          Women's Health
        </NavLink>
        <NavLink to="/daily-routine" onClick={closeMenu} className={linkClass}>
          Daily Routine
        </NavLink>
        <NavLink to="/community" onClick={closeMenu} className={linkClass}>
          Community
        </NavLink>
        <NavLink to="/marketplace" onClick={closeMenu} className={linkClass}>
          <ShoppingBag className="h-4 w-4 mr-2" /> Health Marketplace
        </NavLink>
        <NavLink to="/blog" onClick={closeMenu} className={linkClass}>
          Blog
        </NavLink>
        <NavLink to="/about" onClick={closeMenu} className={linkClass}>
          About
        </NavLink>

        {user && user.isPremium && (
          <>
            <div className="border-t border-border my-2"></div>
            <div className="px-3 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Premium</p>
            </div>
            <NavLink to="/chat" onClick={closeMenu} className={linkClass}>
              AI Chat
            </NavLink>
            <NavLink to="/premium-ai" onClick={closeMenu} className={linkClass}>
              Premium AI
            </NavLink>

            <div className="px-3 py-1 mt-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Premium Services</p>
            </div>
            <NavLink to="/gyms" onClick={closeMenu} className={linkClass}>
              <Dumbbell className="h-4 w-4 mr-2" /> Gyms
            </NavLink>
            <NavLink to="/jobs" onClick={closeMenu} className={linkClass}>
              <Briefcase className="h-4 w-4 mr-2" /> Jobs
            </NavLink>
            <NavLink to="/doctor-consultation" onClick={closeMenu} className={linkClass}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
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
            <div className="border-t border-border my-2"></div>
            <div className="px-3 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Account</p>
            </div>
            <NavLink to="/profile" onClick={closeMenu} className={linkClass}>
              <User className="h-4 w-4 mr-2" /> Profile
            </NavLink>
            {!user.isPremium && (
              <NavLink to="/subscription" onClick={closeMenu} className={linkClass}>
                Upgrade to Premium
              </NavLink>
            )}
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="justify-start px-3 py-3 min-h-[44px] h-auto font-normal w-full text-destructive hover:text-destructive hover:bg-destructive/10"
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
