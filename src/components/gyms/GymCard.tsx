
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, MapPinIcon, Clock } from 'lucide-react';
import { Gym } from '@/types/gym';

interface GymCardProps {
  gym: Gym;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  // Format facilities for display
  const facilitiesArray = gym.facilities ? 
    Object.entries(gym.facilities)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace(/_/g, ' '))
    : [];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {gym.is_premium && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-amber-400 text-black font-semibold">
            Premium
          </Badge>
        </div>
      )}
      <div className="relative h-48 w-full bg-gray-200">
        {/* Placeholder for gym image - would be replaced by actual image fetched from gym_media */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* This would be replaced by an actual image */}
          <span className="text-gray-500">Gym Photo</span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{gym.name}</span>
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm">4.5</span>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center">
          <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
          <span className="truncate">{gym.address}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {facilitiesArray.slice(0, 3).map((facility, index) => (
            <Badge variant="outline" key={index} className="capitalize">
              {facility}
            </Badge>
          ))}
          {facilitiesArray.length > 3 && (
            <Badge variant="outline">+{facilitiesArray.length - 3} more</Badge>
          )}
        </div>
        
        {gym.opening_hours?.monday && (
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>Open: {gym.opening_hours.monday}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/gyms/${gym.id}`}>View Details</Link>
        </Button>
        <Button asChild>
          <Link to={`/gyms/${gym.id}/book-trial`}>Book Free Trial</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GymCard;
