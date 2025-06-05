
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crown, ShoppingBag } from 'lucide-react';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
