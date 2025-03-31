
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClipboardList, Calculator } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 py-12">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Women's Health & Disease Management</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Specialized care for women's unique health needs including hormonal disorders, 
            pregnancy, menstrual health and comprehensive wellness management.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/diet-plans">
              <Button variant="outline" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Explore Diet Plans
              </Button>
            </Link>
            <Link to="/diet-plans#diet-ingredients">
              <Button variant="outline" className="gap-2">
                <Calculator className="h-4 w-4" />
                Diet Cost Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
