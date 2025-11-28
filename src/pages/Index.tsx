import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import FeaturedBlogSection from '@/components/blog/FeaturedBlogSection';
import PremiumProfiles from '@/components/premium/PremiumProfiles';
import PremiumHeroSection from '@/components/premium/PremiumHeroSection';
import GenderSpecificContent from '@/components/womens-health/GenderSpecificContent';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PremiumFeaturesSection from '@/components/home/PremiumFeaturesSection';
import CTASection from '@/components/home/CTASection';
import NewFeaturesCTA from '@/components/home/NewFeaturesCTA';
import WelcomeTour from '@/components/home/WelcomeTour';
import QuickStatsWidget from '@/components/home/QuickStatsWidget';

const Index = () => {
  const { user } = useAuth();
  const isPremium = user?.isPremium;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Conditional Hero Section */}
        {isPremium ? (
          <PremiumHeroSection />
        ) : (
          <HeroSection />
        )}

        {/* Quick Stats for logged-in users */}
        <QuickStatsWidget />

        {/* Features Section */}
        <FeaturesSection />

        {/* New Features CTA */}
        <NewFeaturesCTA />

        {/* Gender-Specific Content - Only show for female users */}
        <GenderSpecificContent />

        {/* Premium Profiles Section */}
        <PremiumProfiles />

        {/* Blog Section */}
        <FeaturedBlogSection />

        {/* Premium Features Section - Only show if not premium */}
        {!isPremium && <PremiumFeaturesSection />}

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
      
      {/* Welcome Tour for first-time users */}
      <WelcomeTour />
    </div>
  );
};

export default Index;
