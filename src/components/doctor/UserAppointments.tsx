
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { fetchUserAppointments } from '@/services/doctorService';
import { useToast } from '@/hooks/use-toast';

interface AppointmentWithDoctor {
  id: string;
  date: string;
  time_slot: string;
  status: string;
  doctors: {
    name: string;
    specialty: string;
    image_url: string;
  };
}

const UserAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentWithDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchUserAppointments();
        setAppointments(data as AppointmentWithDoctor[]);
      } catch (error) {
        console.error("Error loading appointments:", error);
        toast({
          title: "Failed to load appointments",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [toast]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading your appointments...</p>
        </CardContent>
      </Card>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">You don't have any appointments yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-md p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3">
              <img
                src={appointment.doctors.image_url || "https://via.placeholder.com/50"}
                alt={appointment.doctors.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{appointment.doctors.name}</h4>
                <p className="text-sm text-gray-500">{appointment.doctors.specialty}</p>
              </div>
              <Badge 
                className={`ml-auto ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}
              >
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
            </div>
            
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-health-primary" />
                {new Date(appointment.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-health-primary" />
                {appointment.time_slot}
              </span>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-health-primary border-health-primary hover:bg-health-light"
              >
                <Video className="h-4 w-4 mr-1" />
                Join Consultation
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserAppointments;
