
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, FileText, Bot, BookOpen, Users } from 'lucide-react';

const PremiumFeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="mb-3">
      {icon}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const PremiumFeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 bg-amber-100/50 dark:bg-amber-900/20 px-3 py-1 rounded-full mb-4">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Premium Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock the Full Power of AmarHealth</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Take your health journey to the next level with personalized AI recommendations, exclusive content, and premium support.
            </p>
            <Button asChild className="bg-gradient-to-r from-health-primary to-health-accent hover:from-health-dark hover:to-health-accent/90">
              <Link to="/subscription">
                <Sparkles className="mr-2 h-5 w-5" /> Explore Premium
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <PremiumFeatureCard 
              icon={<Bot className="h-6 w-6 text-health-primary" />}
              title="AI Health Assistant"
              description="Get instant answers to your health questions"
            />
            <PremiumFeatureCard 
              icon={<FileText className="h-6 w-6 text-health-primary" />}
              title="Personalized Reports"
              description="Detailed health insights tailored for you"
            />
            <PremiumFeatureCard 
              icon={<Users className="h-6 w-6 text-health-primary" />}
              title="Doctor Consultation"
              description="Special rates for online doctor visits"
            />
            <PremiumFeatureCard 
              icon={<BookOpen className="h-6 w-6 text-health-primary" />}
              title="Exclusive Content"
              description="Access to premium health articles and guides"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeaturesSection;
