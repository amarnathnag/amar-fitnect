
import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Dumbbell, ShoppingBag, Calendar } from 'lucide-react';

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

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
