
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GymDetailPage from '@/components/gyms/GymDetailPage';
import { gymService } from '@/services/gymService';

const GymDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGym = async () => {
      if (id) {
        try {
          const gymData = await gymService.getGymById(id);
          // Add mock data for enhanced features
          const enhancedGym = {
            ...gymData,
            images: [
              "/placeholder.svg",
              "/placeholder.svg",
              "/placeholder.svg"
            ],
            contact: {
              phone: gymData.contact_phone || "+1 234 567 8900",
              email: gymData.contact_email || "info@gym.com"
            },
            openingHours: {
              Monday: "6:00 AM - 10:00 PM",
              Tuesday: "6:00 AM - 10:00 PM", 
              Wednesday: "6:00 AM - 10:00 PM",
              Thursday: "6:00 AM - 10:00 PM",
              Friday: "6:00 AM - 10:00 PM",
              Saturday: "8:00 AM - 8:00 PM",
              Sunday: "8:00 AM - 8:00 PM"
            },
            trainers: [
              {
                name: "John Smith",
                specialty: "Strength Training",
                experience: "5 years",
                rating: 4.8
              },
              {
                name: "Sarah Johnson", 
                specialty: "Cardio & Weight Loss",
                experience: "3 years",
                rating: 4.9
              },
              {
                name: "Mike Wilson",
                specialty: "Bodybuilding",
                experience: "7 years", 
                rating: 4.7
              }
            ],
            membership: [
              {
                type: "Basic",
                price: "$29/month",
                duration: "Monthly",
                features: ["Gym Access", "Locker Room", "Basic Equipment"]
              },
              {
                type: "Premium", 
                price: "$49/month",
                duration: "Monthly",
                features: ["Gym Access", "Group Classes", "Personal Training Session", "Nutrition Guidance"]
              },
              {
                type: "VIP",
                price: "$79/month", 
                duration: "Monthly",
                features: ["All Premium Features", "Unlimited Personal Training", "Meal Planning", "Priority Booking"]
              }
            ],
            rating: 4.5,
            reviewCount: 124,
            priceRange: "$29 - $79/month"
          };
          setGym(enhancedGym);
        } catch (error) {
          console.error('Error fetching gym:', error);
        }
      }
      setLoading(false);
    };

    fetchGym();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">Loading gym details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">Gym not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          <GymDetailPage gym={gym} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GymDetail;
