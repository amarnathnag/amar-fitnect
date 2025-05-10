
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

  // Get gym image based on ID
  const getGymImage = (id: string) => {
    const imageMap: {[key: string]: string} = {
      'gym-001': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
      'gym-002': 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1000&auto=format&fit=crop',
      'gym-003': 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
    };
    return imageMap[id] || 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000&auto=format&fit=crop';
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {gym.is_premium && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-amber-400 text-black font-semibold">
            Premium
          </Badge>
        </div>
      )}
      <div className="relative h-48 w-full">
        <img 
          src={getGymImage(gym.id)} 
          alt={`${gym.name} gym`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
          <span className="truncate">{gym.location}</span>
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
