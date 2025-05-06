
import React from 'react';
import { Doctor } from '@/services/doctorService';

interface DoctorInfoCardProps {
  doctor: Doctor;
}

const DoctorInfoCard: React.FC<DoctorInfoCardProps> = ({ doctor }) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={doctor.image_url || "https://via.placeholder.com/150"} 
          alt={doctor.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{doctor.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
        </div>
      </div>
      
      <div className="border rounded-md p-4 mb-4">
        <h4 className="font-medium mb-2">Consultation Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Duration</span>
            <span>30 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Fee</span>
            <span className="font-medium">₹{doctor.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Platform</span>
            <span>Google Meet</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorInfoCard;
