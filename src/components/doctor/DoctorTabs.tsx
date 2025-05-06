
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Doctor } from '@/services/doctorService';
import DoctorCard from '@/components/doctor/DoctorCard';

interface DoctorTabsProps {
  isLoading: boolean;
  error: unknown;
  doctors: Doctor[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorTabs: React.FC<DoctorTabsProps> = ({
  isLoading,
  error,
  doctors,
  activeTab,
  onTabChange,
  onSelectDoctor
}) => {
  const specialties = ["Nutritionist", "General Physician", "Fitness Expert", "Dietitian"];

  const renderTabContent = (tabValue: string) => {
    if (isLoading) {
      return <div className="text-center py-8">Loading doctors...</div>;
    }
    
    if (error) {
      return (
        <div className="text-center py-8 text-red-500">
          Error loading doctors. Please try again later.
        </div>
      );
    }

    const filteredDoctors = tabValue === "all" 
      ? doctors
      : doctors.filter(d => d.specialty === tabValue);

    return (
      <div className="grid md:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onBookNow={() => onSelectDoctor(doctor)} 
          />
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="mb-12">
      <div className="flex justify-center mb-8">
        <TabsList>
          <TabsTrigger value="all">All Experts</TabsTrigger>
          {specialties.map((specialty) => (
            <TabsTrigger key={specialty} value={specialty}>
              {specialty === "General Physician" ? "Physicians" : `${specialty}s`}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      <TabsContent value="all" className="mt-0">
        {renderTabContent("all")}
      </TabsContent>
      
      {specialties.map((specialty) => (
        <TabsContent key={specialty} value={specialty} className="mt-0">
          {renderTabContent(specialty)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DoctorTabs;
