
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, UserCircle, LogIn } from 'lucide-react';

interface MobileNavigationProps {
  user: { isAuthenticated: boolean } | null;
  isOpen: boolean;
  toggleMenu: () => void;
  openLoginModal: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  user, 
  isOpen, 
  toggleMenu,
  openLoginModal
}) => {
  return (
    <div className="md:hidden flex items-center">
      {user && user.isAuthenticated ? (
        <NavLink to="/profile" className="mr-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <UserCircle className="h-4 w-4" />
          </Button>
        </NavLink>
      ) : (
        <Button 
          variant="default" 
          size="sm" 
          className="mr-2 flex items-center gap-1"
          onClick={openLoginModal}
        >
          <LogIn className="h-4 w-4" />
        </Button>
      )}
      <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileNavigation;
