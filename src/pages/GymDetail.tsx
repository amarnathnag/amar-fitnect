import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchGymById, fetchGymMedia, fetchGymReviews, fetchJobPostings } from '@/services/gymService';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import GymFacilities from '@/components/gyms/GymFacilities';
import GymReviews from '@/components/gyms/GymReviews';
import JobPostingCard from '@/components/gyms/jobs/JobPostingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PhoneIcon, 
  Mail, 
  MapPin, 
  Clock,
  Star,
  Dumbbell,
  Briefcase,
  Camera,
  Video,
  Loader2
} from 'lucide-react';
import { GymReview } from '@/types/gym';

const GymDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  const { data: gym, isLoading: isGymLoading } = useQuery({
    queryKey: ['gym', id],
    queryFn: () => fetchGymById(id!),
    enabled: !!id,
  });
  
  const { data: gymMedia, isLoading: isMediaLoading } = useQuery({
    queryKey: ['gymMedia', id],
    queryFn: () => fetchGymMedia(id!),
    enabled: !!id,
  });
  
  const { 
    data: reviews, 
    isLoading: isReviewsLoading,
    refetch: refetchReviews 
  } = useQuery({
    queryKey: ['gymReviews', id],
    queryFn: () => fetchGymReviews(id!),
    enabled: !!id,
  });
  
  const { data: jobs, isLoading: isJobsLoading } = useQuery({
    queryKey: ['gymJobs', id],
    queryFn: () => fetchJobPostings(id!),
    enabled: !!id,
  });
  
  const handleNewReview = (review: GymReview) => {
    refetchReviews();
  };

  // Check if this is the owner of the gym - handle potential undefined user.id
  const isOwner = user && gym && user.id && user.id === gym.owner_id;
  
  if (isGymLoading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container-custom mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!gym) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container-custom mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Gym Not Found</h1>
          <p className="mb-6">The gym you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/gyms">Back to Gyms</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const featuredMedia = gymMedia?.find(media => media.is_featured) || gymMedia?.[0];
  
  // Calculate average rating
  const averageRating = reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 0;
  const ratingValue = reviews?.length ? (averageRating / reviews.length).toFixed(1) : '--';
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-6 pb-16">
        <div className="container-custom mx-auto px-4">
          {/* Gym Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{gym.name}</h1>
                  {gym.is_premium && (
                    <Badge variant="secondary" className="bg-amber-400 text-black font-semibold">
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-600 mt-1">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{gym.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{ratingValue} ({reviews?.length || 0} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button asChild>
                  <Link to={`/gyms/${gym.id}/book-trial`}>Book Free Trial</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/gyms/${gym.id}/contact`}>Contact</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Gym Media */}
          <div className="mb-8 bg-gray-200 rounded-lg overflow-hidden relative h-[400px]">
            {featuredMedia ? (
              featuredMedia.media_type === 'image' ? (
                <img 
                  src={featuredMedia.url} 
                  alt={gym.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <video 
                  src={featuredMedia.url} 
                  controls 
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full">
                <Dumbbell className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Gym Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="jobs">Jobs {jobs?.length ? `(${jobs.length})` : ''}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2">
                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">About</h2>
                    <p className="text-gray-700">
                      {gym.description || 'No description available for this gym.'}
                    </p>
                  </div>
                  
                  {/* Media Gallery */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Gallery</h2>
                    {isMediaLoading ? (
                      <div className="text-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-2" />
                        <p>Loading media...</p>
                      </div>
                    ) : gymMedia && gymMedia.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gymMedia.map((media) => (
                          <div key={media.id} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                            {media.media_type === 'image' ? (
                              <>
                                <img 
                                  src={media.url} 
                                  alt="Gym" 
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                                  <Camera className="h-4 w-4 text-white" />
                                </div>
                              </>
                            ) : (
                              <>
                                <video 
                                  src={media.url} 
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                                  <Video className="h-4 w-4 text-white" />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No media available</p>
                    )}
                  </div>
                </div>
                
                <div className="col-span-1">
                  {/* Contact & Hours */}
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <PhoneIcon className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-700">
                            {gym.contact_phone || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-700">
                            {gym.contact_email || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-gray-700">{gym.location}</p>
                          <p className="text-gray-700">Pincode: {gym.location_pincode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Opening Hours */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="font-semibold">Opening Hours</h3>
                    </div>
                    
                    {gym.opening_hours && Object.keys(gym.opening_hours).length > 0 ? (
                      <div className="space-y-1">
                        {Object.entries(gym.opening_hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}</span>
                            <span className="text-gray-700">{hours || 'Closed'}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Hours not provided</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="facilities" className="pt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Available Facilities</h2>
                <GymFacilities facilities={gym.facilities} />
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <GymReviews 
                  gymId={gym.id} 
                  reviews={(reviews || []).map(review => ({
                    ...review,
                    user_profiles: review.profiles // Map profiles to user_profiles for compatibility
                  }))}
                  onNewReview={handleNewReview}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="jobs" className="pt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Job Openings</h2>
                  {isOwner && (
                    <Button asChild>
                      <Link to={`/gyms/${gym.id}/jobs/create`}>
                        Post New Job
                      </Link>
                    </Button>
                  )}
                </div>
                
                {isJobsLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-2" />
                    <p>Loading job postings...</p>
                  </div>
                ) : jobs && jobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job) => (
                      <JobPostingCard key={job.id} job={{
                        ...job,
                        gyms: {
                          ...job.gyms,
                          address: job.gyms.location // Map location to address for compatibility
                        }
                      }} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-xl text-gray-600 mb-2">No Open Positions</p>
                    <p className="text-gray-500 mb-6">This gym is not hiring at the moment</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GymDetail;
