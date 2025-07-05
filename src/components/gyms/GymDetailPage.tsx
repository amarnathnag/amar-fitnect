
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star, 
  Users, 
  Dumbbell,
  Wifi,
  Car,
  ShowerHead,
  AirVent,
  Heart,
  Trophy,
  Calendar
} from 'lucide-react';

interface GymDetailPageProps {
  gym: {
    id: string;
    name: string;
    location: string;
    description: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    facilities: string[];
    openingHours: Record<string, string>;
    images: string[];
    contact: {
      phone: string;
      email: string;
    };
    trainers: Array<{
      name: string;
      specialty: string;
      experience: string;
      rating: number;
    }>;
    membership: Array<{
      type: string;
      price: string;
      duration: string;
      features: string[];
    }>;
  };
}

const GymDetailPage = ({ gym }: GymDetailPageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const facilityIcons: Record<string, React.ReactNode> = {
    'Free Weights': <Dumbbell className="h-4 w-4" />,
    'Cardio Equipment': <Heart className="h-4 w-4" />,
    'Group Classes': <Users className="h-4 w-4" />,
    'Personal Training': <Trophy className="h-4 w-4" />,
    'Locker Rooms': <ShowerHead className="h-4 w-4" />,
    'Parking': <Car className="h-4 w-4" />,
    'WiFi': <Wifi className="h-4 w-4" />,
    'Air Conditioning': <AirVent className="h-4 w-4" />
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Images */}
      <Card>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-4 p-6">
            <div className="space-y-4">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={gym.images[selectedImage] || "/placeholder.svg"} 
                  alt={gym.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {gym.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${gym.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{gym.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{gym.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{gym.rating}</span>
                  <span className="text-gray-500">({gym.reviewCount} reviews)</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">{gym.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{gym.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{gym.contact.email}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="flex-1" asChild>
                  <Link to={`/gyms/${gym.id}/book-trial`}>
                    Book Trial Session
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="flex-1" asChild>
                  <a 
                    href={`https://wa.me/${gym.contact.phone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Contact Gym
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="facilities" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="trainers">Trainers</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="facilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Facilities</CardTitle>
              <CardDescription>Everything available at this gym</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gym.facilities.map((facility) => (
                  <div key={facility} className="flex items-center gap-3 p-3 border rounded-lg">
                    {facilityIcons[facility] || <Dumbbell className="h-4 w-4" />}
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
              <CardDescription>When you can visit us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(gym.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">{day}</span>
                    <span className="text-gray-600 dark:text-gray-400">{hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trainers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Trainers</CardTitle>
              <CardDescription>Professional trainers available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {gym.trainers.map((trainer, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{trainer.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{trainer.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{trainer.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm">{trainer.experience} experience</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Plans</CardTitle>
              <CardDescription>Choose the best plan for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {gym.membership.map((plan, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="text-center">
                      <h4 className="font-bold text-lg">{plan.type}</h4>
                      <p className="text-2xl font-bold text-primary">{plan.price}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{plan.duration}</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Choose Plan</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Reviews</CardTitle>
              <CardDescription>What our members say about us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1,2,3].map((review) => (
                  <div key={review} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Member {review}</h5>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Great gym with excellent facilities and friendly staff. The trainers are very knowledgeable and helpful.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GymDetailPage;
