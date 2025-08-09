
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './auth/LoginModal';
import Logo from './navbar/Logo';
import DesktopMenu from './navbar/DesktopMenu';
import MobileNavigation from './navbar/MobileNavigation';
import MobileMenu from './navbar/MobileMenu';
import BackButton from './BackButton';

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
            {/* Back + Logo */}
            <div className="flex items-center gap-2">
              <BackButton />
              <Logo />
            </div>

            {/* Desktop Menu */}
            <DesktopMenu 
              user={user}
              openLoginModal={openLoginModal}
            />

            {/* Mobile Menu Button */}
            <MobileNavigation
              user={user}
              isOpen={isOpen}
              toggleMenu={toggleMenu}
              openLoginModal={openLoginModal}
            />
          </div>

          {/* Mobile Menu */}
          <MobileMenu 
            isOpen={isOpen} 
            user={user} 
            closeMenu={closeMenu} 
          />
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
