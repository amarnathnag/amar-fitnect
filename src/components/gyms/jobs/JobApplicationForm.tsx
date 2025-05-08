
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { submitJobApplication } from '@/services/gymService';
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
import { supabase } from '@/integrations/supabase/client';

interface JobApplicationFormProps {
  job: JobPosting & { gyms: { name: string, address: string } };
  onSuccess?: () => void;
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  role: string;
  years_experience: string;
  preferred_location: string;
  cover_letter: string;
};

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: job.title,
      years_experience: '',
      preferred_location: job.gyms.address,
      cover_letter: '',
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const uploadResume = async (): Promise<string | null> => {
    if (!resumeFile) return null;
    
    const fileExt = resumeFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${job.id}/${fileName}`;
    
    try {
      const { error: uploadError } = await supabase
        .storage
        .from('job-applications')
        .upload(filePath, resumeFile);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase
        .storage
        .from('job-applications')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw new Error('Failed to upload resume');
    }
  };
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      let resumeUrl = null;
      if (resumeFile) {
        resumeUrl = await uploadResume();
      }
      
      await submitJobApplication({
        job_id: job.id,
        applicant_name: data.name,
        applicant_email: data.email,
        applicant_phone: data.phone,
        desired_role: data.role,
        years_experience: Number(data.years_experience) || undefined,
        resume_url: resumeUrl || undefined,
        preferred_location: data.preferred_location,
      });
      
      toast({
        title: "Application Submitted",
        description: "Your job application has been successfully submitted",
      });
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
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
          <CardTitle>Job Application</CardTitle>
          <CardDescription>
            Apply for {job.title} at {job.gyms.name}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Your email address"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                id="phone"
                {...register('phone', { required: 'Phone number is required' })}
                placeholder="Your phone number"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Desired Role *</Label>
              <Input 
                id="role"
                {...register('role', { required: 'Role is required' })}
                defaultValue={job.title}
              />
              {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Experience</Label>
              <Input 
                id="years_experience"
                type="number"
                min="0"
                {...register('years_experience')}
                placeholder="e.g. 2"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferred_location">Preferred Location</Label>
              <Input 
                id="preferred_location"
                {...register('preferred_location')}
                defaultValue={job.gyms.address}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resume">Resume / CV</Label>
            <Input 
              id="resume"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cover_letter">Cover Letter / Additional Information</Label>
            <Textarea 
              id="cover_letter"
              {...register('cover_letter')}
              placeholder="Tell us why you're a great fit for this position"
              rows={4}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default JobApplicationForm;
