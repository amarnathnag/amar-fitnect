
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJobPostingById } from '@/services/gymService';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import JobApplicationForm from '@/components/gyms/jobs/JobApplicationForm';
import { Loader2 } from 'lucide-react';

const JobApplication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJobPostingById(id!),
    enabled: !!id,
  });
  
  const handleSuccess = () => {
    navigate('/jobs/application-success');
  };

  // Transform job data to include address field for compatibility
  const transformedJob = job ? {
    ...job,
    gyms: {
      ...job.gyms,
      address: job.gyms.location // Map location to address for compatibility
    }
  } : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                {isLoading ? 'Loading...' : `Apply for ${job?.title}`}
              </h1>
              {!isLoading && job && (
                <p className="text-gray-600">
                  at {job.gyms.name}
                </p>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : transformedJob ? (
              <JobApplicationForm job={transformedJob} onSuccess={handleSuccess} />
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">Job posting not found.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobApplication;
