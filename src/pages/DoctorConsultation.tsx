
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { fetchDoctors } from '@/services/doctorService';
import { Doctor } from '@/services/doctorService';
import UserAppointments from '@/components/doctor/UserAppointments';
import DoctorTabs from '@/components/doctor/DoctorTabs';
import HowItWorks from '@/components/doctor/HowItWorks';
import DoctorConsultationDialog from '@/components/doctor/DoctorConsultationDialog';

const DoctorConsultation = () => {
  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

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
