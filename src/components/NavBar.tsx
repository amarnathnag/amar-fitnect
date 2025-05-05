
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, UserCircle, LogIn, MessageSquare, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './auth/LoginModal';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <NavLink to="/" className="text-xl font-bold text-health-primary flex items-center">
              <span className="hidden md:inline">AmarHealth</span>
              <span className="md:hidden">AH</span>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
              } end>
                Home
              </NavLink>
              <NavLink to="/bmi-calculator" className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
              }>
                BMI Calculator
              </NavLink>
              <NavLink to="/diet-plans" className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
              }>
                Diet Plans
              </NavLink>
              <NavLink to="/workouts" className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
              }>
                Workouts
              </NavLink>
              <NavLink to="/disease-management" className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
              }>
                Disease Management
              </NavLink>
              <NavLink to="/womens-health" className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
              }>
                Women's Health
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
                  Login
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
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
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-2">
              <div className="flex flex-col space-y-1 pt-2 pb-3">
                <NavLink to="/" className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } onClick={closeMenu} end>
                  Home
                </NavLink>
                <NavLink to="/bmi-calculator" className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } onClick={closeMenu}>
                  BMI Calculator
                </NavLink>
                <NavLink to="/diet-plans" className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } onClick={closeMenu}>
                  Diet Plans
                </NavLink>
                <NavLink to="/workouts" className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } onClick={closeMenu}>
                  Workouts
                </NavLink>
                <NavLink to="/disease-management" className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } onClick={closeMenu}>
                  Disease Management
                </NavLink>
                <NavLink to="/womens-health" className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-health-light text-health-primary' : 'text-gray-700 hover:bg-gray-100'}`
                } onClick={closeMenu}>
                  Women's Health
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
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={closeLoginModal} 
      />
    </>
  );
};

export default NavBar;
