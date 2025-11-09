
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/womens-health/HeroSection';
import TabNavigation from '@/components/womens-health/TabNavigation';
import DoctorConsultationCTA from '@/components/womens-health/DoctorConsultationCTA';
import GenderSpecificContent from '@/components/womens-health/GenderSpecificContent';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const WomensHealth = () => {
  const [activeTab, setActiveTab] = useState("period-tracking");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, profileData } = useAuth();

  useEffect(() => {
    // If user is logged in and is male, redirect to profile
    if (user && profileData?.gender === 'male') {
      navigate('/profile');
    }
  }, [user, profileData, navigate]);

  // Show warning if user is male
  if (user && profileData?.gender === 'male') {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow container-custom py-12">
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This section is specifically designed for women's health. Redirecting you to your profile...
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Gender-Specific Content */}
        <section className="py-8">
          <div className="container-custom">
            <GenderSpecificContent />
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container-custom">
            <TabNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isMobile={isMobile} 
            />
          </div>
        </section>

        {/* Doctor Consultation CTA */}
        <DoctorConsultationCTA />
      </main>

      <Footer />
    </div>
  );
};

export default WomensHealth;
