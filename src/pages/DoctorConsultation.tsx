
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Star, 
  Video, 
  Phone, 
  MessageSquare, 
  User, 
  MapPin, 
  Ban, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Sample doctor data - would come from API in real implementation
const doctors = [
  {
    id: 1,
    name: "Dr. Anjali Sharma",
    specialty: "Nutritionist",
    experience: "8 years",
    languages: ["English", "Hindi"],
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Specializing in diabetes management and weight loss through dietary interventions.",
    price: 899,
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    nextAvailable: "Today"
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "General Physician",
    experience: "12 years",
    languages: ["English", "Hindi", "Bengali"],
    rating: 4.9,
    reviewCount: 211,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Board-certified physician with expertise in preventive medicine and chronic disease management.",
    price: 999,
    availableDays: ["Monday", "Wednesday", "Saturday"],
    nextAvailable: "Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    specialty: "Dietitian",
    experience: "6 years",
    languages: ["English", "Gujarati", "Hindi"],
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Expert in developing personalized diet plans for various health conditions including PCOS and thyroid disorders.",
    price: 799,
    availableDays: ["Tuesday", "Thursday", "Friday", "Sunday"],
    nextAvailable: "Today"
  },
  {
    id: 4,
    name: "Dr. Arjun Singh",
    specialty: "Fitness Expert",
    experience: "9 years",
    languages: ["English", "Hindi", "Punjabi"],
    rating: 4.6,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    bio: "Specializing in sports nutrition and personalized fitness plans for all age groups.",
    price: 849,
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
    nextAvailable: "In 2 days"
  }
];

// Time slots - typically would be dynamic based on doctor's schedule
const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
];

const DoctorConsultation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  const handleBookConsultation = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to book a consultation",
        variant: "destructive",
      });
      return;
    }
    
    if (!date || !selectedTimeSlot) {
      toast({
        title: "Incomplete Booking",
        description: "Please select both date and time for your consultation",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would make an API call to book the appointment
    toast({
      title: "Consultation Booked!",
      description: `Your appointment with ${selectedDoctor.name} is confirmed for ${date.toLocaleDateString()} at ${selectedTimeSlot}`,
    });
    
    setConsultationSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Expert Health Consultations</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with certified doctors and health experts for personalized guidance on your wellness journey.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Experts</TabsTrigger>
                <TabsTrigger value="nutritionists">Nutritionists</TabsTrigger>
                <TabsTrigger value="physicians">Physicians</TabsTrigger>
                <TabsTrigger value="fitness">Fitness Experts</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map(doctor => (
                  <DoctorCard 
                    key={doctor.id} 
                    doctor={doctor} 
                    onBookNow={() => setSelectedDoctor(doctor)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nutritionists" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {doctors
                  .filter(d => d.specialty === "Nutritionist" || d.specialty === "Dietitian")
                  .map(doctor => (
                    <DoctorCard 
                      key={doctor.id} 
                      doctor={doctor} 
                      onBookNow={() => setSelectedDoctor(doctor)} 
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="physicians" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {doctors
                  .filter(d => d.specialty === "General Physician")
                  .map(doctor => (
                    <DoctorCard 
                      key={doctor.id} 
                      doctor={doctor} 
                      onBookNow={() => setSelectedDoctor(doctor)} 
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="fitness" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {doctors
                  .filter(d => d.specialty === "Fitness Expert")
                  .map(doctor => (
                    <DoctorCard 
                      key={doctor.id} 
                      doctor={doctor} 
                      onBookNow={() => setSelectedDoctor(doctor)} 
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-gray-50 dark:bg-gray-800/30 p-8 rounded-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">How It Works</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our online consultation process is designed to be simple, secure, and effective.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Choose an Expert</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select a doctor or specialist based on your health needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Book a Slot</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select a convenient date and time for your consultation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Pay Securely</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete your booking with our secure payment system.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-health-light dark:bg-health-dark/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-health-primary font-bold">4</span>
                </div>
                <h3 className="font-medium mb-2">Connect Online</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Join the video call at your appointment time for your consultation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Doctor Selection Dialog */}
          {selectedDoctor && (
            <Dialog open={!!selectedDoctor} onOpenChange={(open) => {
              if (!open) {
                setSelectedDoctor(null);
                setSelectedTimeSlot(null);
                setConsultationSuccess(false);
              }
            }}>
              <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
                {!consultationSuccess ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Book Consultation</DialogTitle>
                      <DialogDescription>
                        Select a date and time for your appointment with {selectedDoctor.name}.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 md:grid-cols-2 py-4">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={selectedDoctor.image} 
                            alt={selectedDoctor.name} 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium">{selectedDoctor.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedDoctor.specialty}</p>
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
                              <span className="font-medium">₹{selectedDoctor.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 dark:text-gray-400">Platform</span>
                              <span>Google Meet</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Available Time Slots</h4>
                          {date ? (
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots.map((time) => (
                                <Button 
                                  key={time} 
                                  variant={selectedTimeSlot === time ? "default" : "outline"} 
                                  size="sm"
                                  className={selectedTimeSlot === time ? "bg-health-primary" : ""}
                                  onClick={() => setSelectedTimeSlot(time)}
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                Please select a date first
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Select Date</h4>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="border rounded-md p-3"
                          disabled={(date) => {
                            // Disable past dates
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                        />
                        
                        {user ? (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Your Information</h4>
                            <div className="space-y-2">
                              <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue={user.name || ""} readOnly={!!user.name} />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue={user.email} readOnly />
                              </div>
                              <div>
                                <Label htmlFor="reason">Reason for visit</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a reason" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="general">General Health Checkup</SelectItem>
                                    <SelectItem value="nutrition">Nutrition Consultation</SelectItem>
                                    <SelectItem value="fitness">Fitness Guidance</SelectItem>
                                    <SelectItem value="condition">Specific Health Condition</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Alert className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Please <a href="/auth" className="text-health-primary font-medium">sign in</a> to book a consultation.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleBookConsultation} 
                        disabled={!user || !date || !selectedTimeSlot}
                        className="bg-health-primary hover:bg-health-dark"
                      >
                        Confirm & Pay
                      </Button>
                    </DialogFooter>
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
                    </div>
                    <DialogTitle className="text-2xl mb-2">Booking Confirmed!</DialogTitle>
                    <DialogDescription className="mb-6">
                      Your appointment with {selectedDoctor.name} is scheduled for {date?.toLocaleDateString()} at {selectedTimeSlot}.
                    </DialogDescription>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-medium mb-2">Consultation Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Doctor</span>
                          <span>{selectedDoctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Date</span>
                          <span>{date?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Time</span>
                          <span>{selectedTimeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Fee</span>
                          <span className="font-medium">₹{selectedDoctor.price}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      You will receive an email with the consultation details and Google Meet link.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button onClick={() => setSelectedDoctor(null)}>
                        Close
                      </Button>
                      <Button variant="outline">
                        View in Profile
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Doctor Card component
const DoctorCard = ({ doctor, onBookNow }: { doctor: any, onBookNow: () => void }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex items-start p-6">
        <img 
          src={doctor.image} 
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
            <span className="text-sm text-gray-500 dark:text-gray-400">({doctor.reviewCount} reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm mb-3">
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <User className="h-3.5 w-3.5" /> {doctor.experience} exp
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5" /> Online
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Clock className="h-3.5 w-3.5" /> Available {doctor.nextAvailable}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {doctor.bio}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {doctor.languages.map((lang: string) => (
              <Badge key={lang} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                {lang}
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

export default DoctorConsultation;
