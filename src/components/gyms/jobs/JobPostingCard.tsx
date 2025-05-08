
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPinIcon, Briefcase, DollarSign } from 'lucide-react';
import { JobPosting } from '@/types/gym';

interface JobPostingCardProps {
  job: JobPosting & { gyms: { name: string, address: string } };
  showApplyButton?: boolean;
}

const JobPostingCard: React.FC<JobPostingCardProps> = ({ job, showApplyButton = true }) => {
  // Calculate days remaining for application deadline
  const daysRemaining = job.deadline 
    ? Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : null;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{job.title}</CardTitle>
          {daysRemaining !== null && daysRemaining > 0 ? (
            <Badge variant="outline" className={daysRemaining < 7 ? "bg-red-50 text-red-700 border-red-200" : ""}>
              {daysRemaining} days left
            </Badge>
          ) : daysRemaining !== null ? (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Expired
            </Badge>
          ) : null}
        </div>
        <div className="text-sm font-medium">
          {job.gyms.name}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>{job.gyms.address}</span>
          </div>
          
          {job.experience_required && (
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>Experience: {job.experience_required}</span>
            </div>
          )}
          
          {job.working_hours && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>Hours: {job.working_hours}</span>
            </div>
          )}
          
          {job.salary_range && (
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>Salary: {job.salary_range}</span>
            </div>
          )}
          
          {job.deadline && (
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        {job.description && (
          <div className="mt-3">
            <p className="text-sm line-clamp-3">{job.description}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end pt-0">
        {showApplyButton ? (
          <Button asChild>
            <Link to={`/jobs/${job.id}/apply`}>Apply Now</Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobPostingCard;
