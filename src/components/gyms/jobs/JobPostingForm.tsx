
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createJobPosting, updateJobPosting } from '@/services/gymService';
import { JobPosting } from '@/types/gym';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

interface JobPostingFormProps {
  gymId: string;
  existingJob?: JobPosting;
  onSuccess?: (job: JobPosting) => void;
}

type FormValues = {
  title: string;
  description: string;
  experience_required: string;
  working_hours: string;
  salary_range: string;
};

const JobPostingForm: React.FC<JobPostingFormProps> = ({ gymId, existingJob, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deadline, setDeadline] = useState<Date | undefined>(
    existingJob?.deadline ? new Date(existingJob.deadline) : undefined
  );
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: existingJob ? {
      title: existingJob.title,
      description: existingJob.description,
      experience_required: existingJob.experience_required || '',
      working_hours: existingJob.working_hours || '',
      salary_range: existingJob.salary_range || '',
    } : {
      title: '',
      description: '',
      experience_required: '',
      working_hours: '',
      salary_range: '',
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to post a job",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const jobData = {
        ...data,
        gym_id: gymId,
        deadline: deadline ? deadline.toISOString().split('T')[0] : null,
        is_active: true,
      };
      
      let result;
      if (existingJob) {
        result = await updateJobPosting(existingJob.id, jobData);
        toast({
          title: "Job Updated",
          description: "Your job posting has been updated",
        });
      } else {
        result = await createJobPosting(jobData);
        toast({
          title: "Job Posted",
          description: "Your job posting has been created",
        });
      }
      
      if (onSuccess) onSuccess(result);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save job posting",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>{existingJob ? 'Edit Job Posting' : 'Create New Job Posting'}</CardTitle>
          <CardDescription>
            {existingJob 
              ? 'Update your job posting information below' 
              : 'Fill in the details to create a new job posting'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input 
              id="title"
              {...register('title', { required: 'Job title is required' })}
              placeholder="e.g. Fitness Trainer, Gym Manager"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea 
              id="description"
              {...register('description', { required: 'Job description is required' })}
              placeholder="Describe the job role, responsibilities, and requirements"
              rows={5}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience_required">Experience Required</Label>
              <Input 
                id="experience_required"
                {...register('experience_required')}
                placeholder="e.g. 2+ years, Entry level"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="working_hours">Working Hours</Label>
              <Input 
                id="working_hours"
                {...register('working_hours')}
                placeholder="e.g. Full-time, Part-time, 9 AM - 5 PM"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary_range">Salary Range</Label>
              <Input 
                id="salary_range"
                {...register('salary_range')}
                placeholder="e.g. $40,000 - $50,000 per year"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Application Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : existingJob ? 'Update Job' : 'Post Job'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default JobPostingForm;
