
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { fetchDoctors } from '@/services/doctorService';
import DoctorCard from '@/components/doctor/DoctorCard';
import BookAppointmentForm from '@/components/doctor/BookAppointmentForm';
import UserAppointments from '@/components/doctor/UserAppointments';
import { Doctor } from '@/services/doctorService';

const DoctorConsultation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Experts</TabsTrigger>
                <TabsTrigger value="Nutritionist">Nutritionists</TabsTrigger>
                <TabsTrigger value="General Physician">Physicians</TabsTrigger>
                <TabsTrigger value="Fitness Expert">Fitness Experts</TabsTrigger>
                <TabsTrigger value="Dietitian">Dietitians</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="text-center py-8">Loading doctors...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  Error loading doctors. Please try again later.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {doctors.map((doctor: Doctor) => (
                    <DoctorCard 
                      key={doctor.id} 
                      doctor={doctor} 
                      onBookNow={() => setSelectedDoctor(doctor)} 
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {["Nutritionist", "General Physician", "Fitness Expert", "Dietitian"].map((specialty) => (
              <TabsContent key={specialty} value={specialty} className="mt-0">
                {isLoading ? (
                  <div className="text-center py-8">Loading doctors...</div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    Error loading doctors. Please try again later.
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {doctors
                      .filter((d: Doctor) => d.specialty === specialty)
                      .map((doctor: Doctor) => (
                        <DoctorCard 
                          key={doctor.id} 
                          doctor={doctor} 
                          onBookNow={() => setSelectedDoctor(doctor)} 
                        />
                      ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 p-8 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">How It Works</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our online consultation process is designed to be simple, secure, and effective.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Choose an Expert</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select a doctor or specialist based on your health needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Book a Slot</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select a convenient date and time for your consultation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Pay Securely</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete your booking with our secure payment system.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Connect Online</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Join the video call at your appointment time for your consultation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Doctor Selection Dialog */}
          {selectedDoctor && (
            <Dialog open={!!selectedDoctor} onOpenChange={(open) => {
              if (!open) {
                setSelectedDoctor(null);
                setConsultationSuccess(false);
              }
            }}>
              <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
                {!consultationSuccess ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Book Consultation</DialogTitle>
                      <DialogDescription>
                        Select a date and time for your appointment with {selectedDoctor.name}.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <BookAppointmentForm 
                      doctor={selectedDoctor} 
                      onBookingSuccess={handleBookingSuccess}
                    />
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
                    </div>
                    <DialogTitle className="text-2xl mb-2">Booking Confirmed!</DialogTitle>
                    <DialogDescription className="mb-6">
                      Your appointment with {selectedDoctor.name} has been scheduled successfully.
                    </DialogDescription>
                    <div className="flex justify-center space-x-3">
                      <Button onClick={() => setSelectedDoctor(null)}>
                        Close
                      </Button>
                      <Button variant="outline">
                        View in Profile
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorConsultation;
