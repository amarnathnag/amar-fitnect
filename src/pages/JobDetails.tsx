
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJobPostingById } from '@/services/gymService';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Calendar, 
  Clock, 
  MapPin, 
  Briefcase, 
  DollarSign,
  Mail,
  Phone,
  Loader2,
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJobPostingById(id!),
    enabled: !!id,
  });
  
  if (isLoading) {
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
  
  if (!job) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="container-custom mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">The job posting you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/jobs">Back to Jobs</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate days remaining for application deadline
  const daysRemaining = job.deadline 
    ? Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-1">
                <Link to="/jobs" className="text-sm text-primary">Jobs</Link>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm font-medium truncate">{job.title}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <Building className="h-5 w-5 mr-2" />
                <Link to={`/gyms/${job.gym_id}`} className="hover:text-primary transition-colors">
                  {job.gyms.name}
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Job Description</h2>
                  <div className="prose max-w-none">
                    {job.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="font-bold mb-4">Job Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-700">{job.gyms.address}</p>
                      </div>
                    </div>
                    
                    {job.experience_required && (
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">Experience</p>
                          <p className="text-gray-700">{job.experience_required}</p>
                        </div>
                      </div>
                    )}
                    
                    {job.working_hours && (
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">Working Hours</p>
                          <p className="text-gray-700">{job.working_hours}</p>
                        </div>
                      </div>
                    )}
                    
                    {job.salary_range && (
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">Salary Range</p>
                          <p className="text-gray-700">{job.salary_range}</p>
                        </div>
                      </div>
                    )}
                    
                    {job.deadline && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">Application Deadline</p>
                          <p className="text-gray-700">
                            {new Date(job.deadline).toLocaleDateString()}
                            {daysRemaining !== null && daysRemaining > 0 && (
                              <span className={`ml-2 ${daysRemaining < 7 ? 'text-red-500' : ''}`}>
                                ({daysRemaining} days left)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="font-bold mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    {job.gyms.contact_email && (
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-700">{job.gyms.contact_email}</p>
                        </div>
                      </div>
                    )}
                    
                    {job.gyms.contact_phone && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-700">{job.gyms.contact_phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button asChild className="w-full">
                  <Link to={`/jobs/${job.id}/apply`}>Apply for this Job</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link to="/jobs">Back to Jobs</Link>
              </Button>
              
              <Button asChild>
                <Link to={`/jobs/${job.id}/apply`}>Apply for this Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetails;
