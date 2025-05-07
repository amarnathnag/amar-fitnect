
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, MapPin, Clock, Video, MessageSquare, Calendar } from 'lucide-react';
import { Doctor } from '@/services/doctorService';

interface DoctorCardProps {
  doctor: Doctor;
  onBookNow: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookNow }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex items-start p-6">
        <img 
          src={doctor.image_url || "https://via.placeholder.com/150"} 
          alt={doctor.name} 
          className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-health-light" 
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <Badge variant="secondary" className="ml-2">{doctor.specialty}</Badge>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{doctor.rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({doctor.review_count} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm mb-3">
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <User className="h-3.5 w-3.5" /> {doctor.experience} exp
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5" /> Online
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock className="h-3.5 w-3.5" /> Available {doctor.next_available}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {doctor.bio || "Experienced healthcare professional providing quality consultation services."}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {doctor.languages && doctor.languages.map((lang: string) => (
              <Badge key={lang} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                {lang}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> Available days: 
            </span>
            {doctor.available_days && doctor.available_days.map((day: string) => (
              <Badge key={day} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                {day}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 border-t">
        <div>
          <p className="font-bold text-lg">₹{doctor.price}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Per consultation</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" /> Chat
          </Button>
          <Button size="sm" onClick={onBookNow} className="gap-1 bg-health-primary hover:bg-health-dark">
            <Video className="h-4 w-4" /> Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
