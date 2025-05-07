
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, MessageSquare } from 'lucide-react';
import { featuresData } from '@/data/features';

interface MobileMenuProps {
  isOpen: boolean;
  user: { isAuthenticated: boolean } | null;
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, user, closeMenu }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-2">
      <div className="flex flex-col space-y-1 pt-2 pb-3">
        <NavLink to="/" className={({ isActive }) => 
          `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
        } onClick={closeMenu} end>
          Home
        </NavLink>
        
        {user && user.isAuthenticated ? (
          <>
            {featuresData.map((feature) => (
              <NavLink 
                key={feature.title}
                to={feature.href} 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } 
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "h-4 w-4 mr-1" })}
                  {feature.title}
                </div>
              </NavLink>
            ))}
            
            <NavLink to="/doctor-consultation" className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
            } onClick={closeMenu}>
              Doctor Consultation
            </NavLink>
            
            <NavLink to="/blog" className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
            } onClick={closeMenu}>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Blog
              </div>
            </NavLink>
            
            <NavLink to="/chat" className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
            } onClick={closeMenu}>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </div>
            </NavLink>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default MobileMenu;
