
import React from 'react';
import { Check, X } from 'lucide-react';

interface GymFacilitiesProps {
  facilities: {
    [key: string]: boolean | undefined;
  } | undefined;
}

const facilityLabels: { [key: string]: string } = {
  weight_training: "Weight Training",
  cardio: "Cardio",
  crossfit: "CrossFit",
  zumba: "Zumba",
  personal_training: "Personal Training",
  diet_consultant: "Diet Consultant",
  yoga: "Yoga",
  pilates: "Pilates",
  swimming_pool: "Swimming Pool",
  sauna: "Sauna",
  steam_room: "Steam Room",
  locker_rooms: "Locker Rooms",
  shower: "Shower",
  parking: "Parking",
  wifi: "WiFi",
  juice_bar: "Juice Bar",
};

const GymFacilities: React.FC<GymFacilitiesProps> = ({ facilities }) => {
  if (!facilities || Object.keys(facilities).length === 0) {
    return <div className="text-gray-500">No facilities information available</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Object.entries(facilityLabels).map(([key, label]) => (
        <div key={key} className="flex items-center gap-2">
          {facilities[key] ? (
            <Check className="text-green-500 w-5 h-5" />
          ) : (
            <X className="text-gray-400 w-5 h-5" />
          )}
          <span className={facilities[key] ? "font-medium" : "text-gray-500"}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GymFacilities;
