
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, LogIn, MessageSquare, BookOpen } from 'lucide-react';
import FeaturesDropdown from '../FeaturesDropdown';

interface DesktopMenuProps {
  user: { isAuthenticated: boolean } | null;
  openLoginModal: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ user, openLoginModal }) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavLink to="/" className={({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
      } end>
        Home
      </NavLink>
      
      {/* Show features dropdown only for authenticated users */}
      {user && user.isAuthenticated ? (
        <>
          <FeaturesDropdown />
          
          <NavLink to="/doctor-consultation" className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
          }>
            Doctor Consultation
          </NavLink>
          
          <NavLink to="/blog" className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
          }>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              Blog
            </div>
          </NavLink>
          
          <NavLink to="/chat" className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
          }>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Chat
            </div>
          </NavLink>
        </>
      ) : null}
      
      {/* Auth buttons */}
      {user && user.isAuthenticated ? (
        <NavLink to="/profile">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <UserCircle className="h-4 w-4" />
            Profile
          </Button>
        </NavLink>
      ) : (
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={openLoginModal}
        >
          <LogIn className="h-4 w-4" />
          Login / Signup
        </Button>
      )}
    </div>
  );
};

export default DesktopMenu;
