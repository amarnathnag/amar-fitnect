
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DoctorConsultationCTA = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/10">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Consult with experienced healthcare professionals specializing in women's health for personalized advice and treatment plans.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link to="/doctor-consultation">
            <Button size="lg" className="btn-primary">
              Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorConsultationCTA;
