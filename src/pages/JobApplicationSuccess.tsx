
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from 'lucide-react';

const JobApplicationSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-8 pb-16 flex items-center">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your application. The gym will review your details and contact you soon.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
              <Button asChild>
                <Link to="/jobs">Browse More Jobs</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-left">
              <h2 className="text-lg font-semibold mb-3">What happens next?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <span>Your application has been sent to the gym owner</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <span>They will review your details and qualifications</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <span>You may be contacted for an interview or additional information</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <span>You can check your application status in your profile</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobApplicationSuccess;
