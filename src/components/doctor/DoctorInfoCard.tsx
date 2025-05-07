
import React from 'react';
import { Doctor } from '@/services/doctorService';
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from 'lucide-react';

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
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
            <span className="mx-1">•</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs ml-1">{doctor.rating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">{doctor.experience} experience</p>
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

      <div className="border rounded-md p-4 mb-4">
        <h4 className="font-medium mb-2">Available Days</h4>
        <div className="flex flex-wrap gap-2">
          {doctor.available_days && doctor.available_days.map((day: string) => (
            <Badge key={day} variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {day}
            </Badge>
          ))}
        </div>
        {doctor.bio && (
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            <h4 className="font-medium mb-1">About</h4>
            <p>{doctor.bio}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorInfoCard;
