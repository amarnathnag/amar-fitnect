
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroSection from '@/components/womens-health/HeroSection';
import TabNavigation from '@/components/womens-health/TabNavigation';
import DoctorConsultationCTA from '@/components/womens-health/DoctorConsultationCTA';
import GenderSpecificContent from '@/components/womens-health/GenderSpecificContent';

const WomensHealth = () => {
  const [activeTab, setActiveTab] = useState("menstrual-health");
  const isMobile = useIsMobile();

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
