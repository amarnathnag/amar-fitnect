
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 py-12">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Women's Health & Disease Management</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Specialized care for women's unique health needs including hormonal disorders, 
            pregnancy, menstrual health and comprehensive wellness management.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
