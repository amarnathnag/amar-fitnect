
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { fetchDoctors } from '@/services/doctorService';
import { Doctor } from '@/services/doctorService';
import UserAppointments from '@/components/doctor/UserAppointments';
import DoctorTabs from '@/components/doctor/DoctorTabs';
import HowItWorks from '@/components/doctor/HowItWorks';
import DoctorConsultationDialog from '@/components/doctor/DoctorConsultationDialog';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const DoctorConsultation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Check if user is authenticated and premium
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (!user.isPremium) {
      navigate('/subscription');
    }
  }, [user, navigate]);

  const { data: doctors = [], isLoading, error } = useQuery({
    queryKey: ['doctors', activeTab],
    queryFn: () => fetchDoctors(activeTab !== "all" ? activeTab : undefined),
  });

  const handleBookingSuccess = () => {
    setConsultationSuccess(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedDoctor(null);
      setConsultationSuccess(false);
    }
  };

  // Show premium-required message if not premium
  if (user && !user.isPremium) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-grow py-12 flex items-center justify-center">
          <div className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Premium Feature</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Doctor consultations are available exclusively for premium members.
              Upgrade to premium to access these features.
            </p>
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600" onClick={() => navigate('/subscription')}>
              Upgrade to Premium
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Expert Health Consultations</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with certified doctors and health experts for personalized guidance on your wellness journey.
            </p>
          </div>

          {user && (
            <div className="mb-12">
              <UserAppointments />
            </div>
          )}
          
          <DoctorTabs 
            isLoading={isLoading}
            error={error}
            doctors={doctors}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSelectDoctor={setSelectedDoctor}
          />
          
          <HowItWorks />
          
          {/* Doctor Consultation Dialog */}
          <DoctorConsultationDialog 
            doctor={selectedDoctor}
            consultationSuccess={consultationSuccess}
            onOpenChange={handleDialogOpenChange}
            onBookingSuccess={handleBookingSuccess}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorConsultation;
