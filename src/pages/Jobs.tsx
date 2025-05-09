import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobPostings } from '@/services/gymService';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import JobPostingCard from '@/components/gyms/jobs/JobPostingCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Filter, Briefcase } from 'lucide-react';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => fetchJobPostings(),
  });
  
  // Initialize filtered jobs when jobs data is loaded
  React.useEffect(() => {
    if (jobs) {
      // Transform jobs to include address compatibility
      const transformedJobs = jobs.map(job => ({
        ...job,
        gyms: {
          ...job.gyms,
          address: job.gyms.location
        }
      }));
      setFilteredJobs(transformedJobs);
    }
  }, [jobs]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobs) return;
    
    if (!searchTerm.trim()) {
      // Transform jobs to include address compatibility
      const transformedJobs = jobs.map(job => ({
        ...job,
        gyms: {
          ...job.gyms,
          address: job.gyms.location
        }
      }));
      setFilteredJobs(transformedJobs);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(lowerCaseSearch) ||
      job.description.toLowerCase().includes(lowerCaseSearch) ||
      job.gyms.name.toLowerCase().includes(lowerCaseSearch) ||
      job.gyms.location.toLowerCase().includes(lowerCaseSearch)
    ).map(job => ({
      ...job,
      gyms: {
        ...job.gyms,
        address: job.gyms.location
      }
    }));
    
    setFilteredJobs(filtered);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold mb-3">Find Your Perfect Job</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse open positions at fitness centers and gyms around you
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for jobs, gyms, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            
            {/* Jobs List */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Available Positions {filteredJobs?.length ? `(${filteredJobs.length})` : ''}
              </h2>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : filteredJobs?.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No Jobs Found</p>
                <p className="text-gray-500 mb-6">
                  We couldn't find any jobs matching your search criteria.
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setFilteredJobs(jobs || []);
                }}>
                  View All Jobs
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs?.map((job) => (
                  <JobPostingCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
