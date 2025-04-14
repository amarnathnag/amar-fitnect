
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import PremiumUpsell from '@/components/premium/PremiumUpsell';
import PremiumDashboard from '@/components/premium/PremiumDashboard';

const PremiumAi = () => {
  const { user } = useAuth();
  const isPremium = false; // In a real app, this would come from user data
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {!isPremium ? (
          <PremiumUpsell />
        ) : (
          <PremiumDashboard />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumAi;
