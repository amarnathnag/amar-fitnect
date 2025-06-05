import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import FeaturedBlogSection from '@/components/blog/FeaturedBlogSection';
import PremiumProfiles from '@/components/premium/PremiumProfiles';
import PremiumHeroSection from '@/components/premium/PremiumHeroSection';
import GenderSpecificContent from '@/components/womens-health/GenderSpecificContent';
import { ArrowRight, ActivitySquare, Utensils, Dumbbell, Calendar, PieChart, Activity, Sparkles, Crown, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
          /* Regular Hero Section */
          <section className="relative bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-20 md:py-32">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="animate-fade-in-up">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    Your Personalized <span className="text-health-primary">Diet & Fitness</span> Companion
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Get science-backed meal plans, workouts & daily routines tailored specifically for you and your health goals.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="btn-primary" asChild>
                      <Link to="/bmi-calculator">
                        Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="btn-outline" asChild>
                      <Link to="/diet-plans">
                        Explore Diet Plans
                      </Link>
                    </Button>
                    <Button variant="outline" className="btn-outline" asChild>
                      <Link to="/marketplace">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Health Marketplace
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/5 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800/30">
                    <Crown className="h-5 w-5 text-amber-500" />
                    <span className="text-amber-800 dark:text-amber-300 font-medium">
                      <Link to="/subscription" className="hover:underline">
                        New Premium Features Available
                      </Link>
                    </span>
                    <ArrowRight className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
                <div className="hidden md:block relative">
                  <div className="aspect-square bg-white dark:bg-card rounded-lg p-2 shadow-xl relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2153&q=80" 
                      alt="Healthy food and fitness" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute -right-6 bottom-20 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-fade-in">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-health-primary"></div>
                        <span className="text-sm font-medium">Personalized Plans</span>
                      </div>
                    </div>
                    <div className="absolute -left-6 top-20 bg-white dark:bg-card p-4 rounded-xl shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-health-secondary"></div>
                        <span className="text-sm font-medium">Health Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Better Health</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                From personalized meal plans to fitness tracking and health marketplace - all in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<Utensils className="h-8 w-8 text-health-primary" />}
                title="Diet Plans"
                description="Personalized meal plans based on your goals"
                link="/diet-plans"
              />
              <FeatureCard 
                icon={<Dumbbell className="h-8 w-8 text-health-primary" />}
                title="Workouts"
                description="Custom fitness routines for all levels"
                link="/workouts"
              />
              <FeatureCard 
                icon={<ShoppingBag className="h-8 w-8 text-health-primary" />}
                title="Health Marketplace"
                description="Curated health products with AI insights"
                link="/marketplace"
              />
              <FeatureCard 
                icon={<Calendar className="h-8 w-8 text-health-primary" />}
                title="Daily Routine"
                description="Track your progress and stay motivated"
                link="/daily-routine"
              />
            </div>
          </div>
        </section>

        {/* Gender-Specific Content - Only show for female users */}
        <GenderSpecificContent />

        {/* Premium Profiles Section */}
        <PremiumProfiles />

        {/* Blog Section */}
        <FeaturedBlogSection />

        {/* Premium Features Section - Only show if not premium */}
        {!isPremium && (
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
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-health-primary to-health-accent text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Health?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Start your journey today with personalized diet plans, workout routines, and health management tools.
              </p>
              <Button className="bg-white text-health-primary hover:bg-gray-100 hover:text-health-dark" size="lg" asChild>
                <Link to="/bmi-calculator">
                  Check Your BMI Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) => (
  <Link to={link} className="group">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group-hover:border-health-primary/30">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2 group-hover:text-health-primary transition-colors">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </Link>
);

// Premium feature card component
const PremiumFeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="mb-3">
      {icon}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

// Missing imports
import { FileText, Bot, BookOpen, Users } from 'lucide-react';

export default Index;
