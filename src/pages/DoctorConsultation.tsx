
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import { Search, Filter, Star, Video, Phone, MessageSquare, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    specialization: "Cardiologist",
    experience: 15,
    rating: 4.8,
    fees: 1200,
    location: "Delhi",
    availability: ["Mon", "Wed", "Fri"],
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    about: "Dr. Sharma is a leading cardiologist with over 15 years of experience in treating heart-related issues. He specializes in preventive cardiology and heart failure management.",
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialization: "Endocrinologist",
    experience: 12,
    rating: 4.7,
    fees: 1000,
    location: "Mumbai",
    availability: ["Tue", "Thu", "Sat"],
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    about: "Dr. Patel specializes in diabetes management, thyroid disorders, and metabolic conditions. She has helped thousands of patients manage their endocrine disorders effectively.",
  },
  {
    id: 3,
    name: "Dr. Amit Kumar",
    specialization: "Neurologist",
    experience: 18,
    rating: 4.9,
    fees: 1500,
    location: "Bangalore",
    availability: ["Mon", "Tue", "Thu", "Sat"],
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    about: "Dr. Kumar is a renowned neurologist specializing in stroke management, epilepsy, and headache disorders. He uses advanced diagnostic techniques for accurate diagnosis.",
  },
  {
    id: 4,
    name: "Dr. Meera Singh",
    specialization: "Dermatologist",
    experience: 10,
    rating: 4.6,
    fees: 900,
    location: "Kolkata",
    availability: ["Wed", "Fri", "Sat"],
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    about: "Dr. Singh specializes in cosmetic dermatology, skin allergies, and acne treatment. She provides personalized skin care regimens based on patient needs.",
  },
  {
    id: 5,
    name: "Dr. Vijay Reddy",
    specialization: "Orthopedic Surgeon",
    experience: 20,
    rating: 4.9,
    fees: 1800,
    location: "Chennai",
    availability: ["Mon", "Wed", "Fri"],
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    about: "Dr. Reddy is an experienced orthopedic surgeon specializing in joint replacements, sports injuries, and spine disorders. He uses minimally invasive techniques for faster recovery.",
  },
  {
    id: 6,
    name: "Dr. Kavita Joshi",
    specialization: "Gynecologist",
    experience: 14,
    rating: 4.8,
    fees: 1100,
    location: "Hyderabad",
    availability: ["Tue", "Thu", "Sat"],
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    about: "Dr. Joshi specializes in women's health, obstetrics, and fertility issues. She provides compassionate care for women of all ages, from adolescence to menopause.",
  },
];

// Time slots
const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const specializations = [
  "All Specializations", "Cardiologist", "Endocrinologist", "Neurologist", 
  "Dermatologist", "Orthopedic Surgeon", "Gynecologist"
];

const locations = ["All Locations", "Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad"];

const DoctorConsultation = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [consultationMode, setConsultationMode] = useState("video");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Filter doctors based on search term, specialization, and location
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === "All Specializations" || doctor.specialization === selectedSpecialization;
    const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation;
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handlePayAndBook = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment and booking success
    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${selectedDoctor.name} is confirmed for ${selectedDate} at ${selectedTime}.`,
    });

    // Reset form
    setSelectedDoctor(null);
    setConsultationMode("video");
    setSelectedDate("");
    setSelectedTime("");
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <NavBar />
      
      <div className="container-custom py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Doctor Consultation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with top specialists for personalized healthcare. Search, filter, and book appointments with doctors based on your health needs.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-card rounded-lg shadow-md p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search doctors by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {showBookingForm ? (
          <div className="bg-white dark:bg-card rounded-lg shadow-md overflow-hidden mb-8 transition-all">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start gap-6">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedDoctor.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedDoctor.specialization} • {selectedDoctor.experience} years experience
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                      {selectedDoctor.rating} • ₹{selectedDoctor.fees} per consultation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Book Your Appointment</h3>
              
              <div className="mb-6">
                <Label htmlFor="consultation-mode" className="block mb-2">Consultation Mode</Label>
                <Tabs value={consultationMode} onValueChange={setConsultationMode} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger value="video" className="flex items-center justify-center">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="audio" className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Audio
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="appointment-date" className="block mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Appointment Date
                  </Label>
                  <Input 
                    id="appointment-date" 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Available days: {selectedDoctor.availability.join(", ")}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="appointment-time" className="block mb-2">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Appointment Time
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="appointment-time">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Consultation Fee</span>
                  <span className="font-semibold">₹{selectedDoctor.fees}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Platform Fee</span>
                  <span className="font-semibold">₹100</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Amount</span>
                  <span className="font-bold text-health-primary">₹{selectedDoctor.fees + 100}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-health-primary hover:bg-health-dark"
                  onClick={handlePayAndBook}
                >
                  Pay & Book Appointment
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Doctor listing
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="font-bold text-gray-900 dark:text-white">
                            {doctor.name}
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {doctor.specialization} • {doctor.experience} years experience
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                              {doctor.rating} • {doctor.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        {doctor.about}
                      </p>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Consultation Fee:</span>
                          <span className="font-semibold text-health-primary">₹{doctor.fees}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Available on:</span>
                          <div className="flex gap-1">
                            {doctor.availability.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          className="w-full bg-health-primary hover:bg-health-dark"
                          onClick={() => handleBookAppointment(doctor)}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center p-8">
                <div className="text-gray-500 dark:text-gray-400">
                  No doctors found matching your criteria. Try changing your filters.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorConsultation;
