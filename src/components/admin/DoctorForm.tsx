
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  fetchDoctorById, 
  createDoctor, 
  updateDoctor, 
  uploadDoctorImage 
} from '@/services/doctorService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DoctorFormProps {
  doctorId?: string;
  onSuccess?: () => void;
}

type FormValues = {
  name: string;
  specialty: string;
  experience: string;
  price: number;
  bio: string;
  location: string;
  email: string;
  phone: string;
  languages: string;
  available_days: string;
  next_available: string;
};

const DoctorForm: React.FC<DoctorFormProps> = ({ doctorId, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { data: doctor, isLoading } = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => doctorId ? fetchDoctorById(doctorId) : null,
    enabled: !!doctorId,
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  
  useEffect(() => {
    if (doctor) {
      reset({
        name: doctor.name,
        specialty: doctor.specialty,
        experience: doctor.experience,
        price: doctor.price,
        bio: doctor.bio || '',
        location: doctor.location || '',
        email: doctor.email || '',
        phone: doctor.phone || '',
        languages: doctor.languages?.join(', ') || 'English',
        available_days: doctor.available_days?.join(', ') || 'Monday, Tuesday, Wednesday, Thursday, Friday',
        next_available: doctor.next_available || 'Next Week'
      });
      
      if (doctor.image_url) {
        setImagePreview(doctor.image_url);
      }
    }
  }, [doctor, reset]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Process form data
      const doctorData = {
        ...data,
        price: Number(data.price),
        languages: data.languages.split(',').map(lang => lang.trim()),
        available_days: data.available_days.split(',').map(day => day.trim()),
        next_available: data.next_available
      };
      
      let imageUrl = doctor?.image_url;
      
      // Upload image if selected
      if (imageFile) {
        const uploadResult = await uploadDoctorImage(imageFile);
        imageUrl = uploadResult.url;
      }
      
      if (doctorId) {
        // Update existing doctor
        await updateDoctor(doctorId, {
          ...doctorData,
          image_url: imageUrl,
        });
        
        toast({
          title: "Doctor Updated",
          description: "Doctor information has been updated successfully.",
        });
      } else {
        // Create new doctor
        await createDoctor({
          ...doctorData,
          image_url: imageUrl,
          rating: 4.5,
          review_count: 0,
        });
        
        toast({
          title: "Doctor Added",
          description: "New doctor has been added successfully.",
        });
      }
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save doctor information",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter doctor's name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty *</Label>
            <Input
              id="specialty"
              {...register('specialty', { required: 'Specialty is required' })}
              placeholder="e.g. Cardiologist, Dermatologist"
            />
            {errors.specialty && <p className="text-sm text-red-500">{errors.specialty.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Experience *</Label>
            <Input
              id="experience"
              {...register('experience', { required: 'Experience is required' })}
              placeholder="e.g. 5+ years in cardiology"
            />
            {errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Consultation Fee *</Label>
            <Input
              id="price"
              type="number"
              {...register('price', { 
                required: 'Consultation fee is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              placeholder="Enter fee amount"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="doctor@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="Contact number"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="City, State"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="languages">Languages (comma separated)</Label>
            <Input
              id="languages"
              {...register('languages')}
              placeholder="English, Hindi, Spanish"
              defaultValue="English"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="next_available">Next Available</Label>
            <Input
              id="next_available"
              {...register('next_available')}
              placeholder="e.g. Next Week, Today"
              defaultValue="Next Week"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="available_days">Available Days (comma separated)</Label>
            <Input
              id="available_days"
              {...register('available_days')}
              placeholder="Monday, Tuesday, Wednesday"
              defaultValue="Monday, Tuesday, Wednesday, Thursday, Friday"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              {...register('bio')}
              placeholder="Brief description about the doctor's background and expertise"
              rows={4}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image">Doctor's Photo</Label>
          
          <div className="flex items-center space-x-4">
            {imagePreview && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            
            <label htmlFor="image" className="cursor-pointer">
              <div className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                <Upload className="h-4 w-4" />
                <span>{imagePreview ? 'Change Photo' : 'Upload Photo'}</span>
              </div>
              <input 
                id="image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {doctorId ? 'Updating...' : 'Creating...'}
            </>
          ) : doctorId ? 'Update Doctor' : 'Add Doctor'}
        </Button>
      </div>
    </form>
  );
};

export default DoctorForm;
