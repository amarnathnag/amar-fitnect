
import React from 'react';
import EnhancedProfileSetup from '@/components/profile/EnhancedProfileSetup';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ProfileSetup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <EnhancedProfileSetup />
      <Footer />
    </div>
  );
};

export default ProfileSetup;
