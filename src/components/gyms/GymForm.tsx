
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createGym, updateGym } from '@/services/gymService';
import { Gym } from '@/types/gym';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface GymFormProps {
  existingGym?: Gym;
  onSuccess?: (gym: Gym) => void;
}

type FormValues = {
  name: string;
  owner_name: string;
  address: string;
  location_pincode: string;
  contact_phone: string;
  contact_email: string;
  description: string;
  opening_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  facilities: {
    weight_training: boolean;
    cardio: boolean;
    crossfit: boolean;
    zumba: boolean;
    personal_training: boolean;
    diet_consultant: boolean;
    yoga: boolean;
    pilates: boolean;
    swimming_pool: boolean;
  };
};

const defaultFacilities = {
  weight_training: false,
  cardio: false,
  crossfit: false,
  zumba: false,
  personal_training: false,
  diet_consultant: false,
  yoga: false,
  pilates: false,
  swimming_pool: false,
};

const defaultOpeningHours = {
  monday: '',
  tuesday: '',
  wednesday: '',
  thursday: '',
  friday: '',
  saturday: '',
  sunday: '',
};

const GymForm: React.FC<GymFormProps> = ({ existingGym, onSuccess }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: existingGym ? {
      name: existingGym.name,
      owner_name: existingGym.owner_name,
      address: existingGym.address,
      location_pincode: existingGym.location_pincode,
      contact_phone: existingGym.contact_phone || '',
      contact_email: existingGym.contact_email || '',
      description: existingGym.description || '',
      opening_hours: existingGym.opening_hours || defaultOpeningHours,
      facilities: existingGym.facilities || defaultFacilities,
    } : {
      name: '',
      owner_name: user?.name || '',
      address: '',
      location_pincode: '',
      contact_phone: '',
      contact_email: user?.email || '',
      description: '',
      opening_hours: defaultOpeningHours,
      facilities: defaultFacilities,
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to submit a gym",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const gymData = {
        ...data,
        owner_id: user.uid || '', // Changed from user.id to user.uid
        is_premium: false,  // Set by admin or through subscription
        is_approved: false, // Requires admin approval
      };
      
      let result;
      if (existingGym) {
        result = await updateGym(existingGym.id, gymData);
        toast({
          title: "Gym Updated",
          description: "Your gym details have been updated and are pending approval",
        });
      } else {
        result = await createGym(gymData);
        toast({
          title: "Gym Submitted",
          description: "Your gym has been submitted and is pending approval",
        });
      }
      
      if (onSuccess) onSuccess(result);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save gym details",
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
          <CardTitle>{existingGym ? 'Edit Gym' : 'Register New Gym'}</CardTitle>
          <CardDescription>
            {existingGym 
              ? 'Update your gym information below' 
              : 'Fill in the details to register your gym'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Gym Name *</Label>
                <Input 
                  id="name"
                  {...register('name', { required: 'Gym name is required' })}
                  placeholder="Enter gym name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="owner_name">Owner Name *</Label>
                <Input 
                  id="owner_name"
                  {...register('owner_name', { required: 'Owner name is required' })}
                  placeholder="Enter owner name"
                />
                {errors.owner_name && <p className="text-sm text-red-500">{errors.owner_name.message}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea 
                id="address"
                {...register('address', { required: 'Address is required' })}
                placeholder="Enter full address"
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location_pincode">Pincode *</Label>
                <Input 
                  id="location_pincode"
                  {...register('location_pincode', { required: 'Pincode is required' })}
                  placeholder="e.g. 400001"
                />
                {errors.location_pincode && <p className="text-sm text-red-500">{errors.location_pincode.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input 
                  id="contact_phone"
                  {...register('contact_phone')}
                  placeholder="Contact phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email Address</Label>
                <Input 
                  id="contact_email"
                  type="email"
                  {...register('contact_email')}
                  placeholder="Contact email address"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                {...register('description')}
                placeholder="Describe your gym, specialties, and unique offerings"
                rows={4}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Opening Hours</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="space-y-2">
                  <Label htmlFor={`opening_hours.${day}`} className="capitalize">{day}</Label>
                  <Input 
                    id={`opening_hours.${day}`}
                    {...register(`opening_hours.${day as keyof typeof defaultOpeningHours}`)}
                    placeholder="e.g. 6:00 AM - 10:00 PM"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Facilities</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Controller
                control={control}
                name="facilities.weight_training"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weight_training" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="weight_training">Weight Training</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.cardio"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cardio" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="cardio">Cardio</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.crossfit"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="crossfit" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="crossfit">CrossFit</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.zumba"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="zumba" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="zumba">Zumba</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.personal_training"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="personal_training" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="personal_training">Personal Training</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.diet_consultant"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="diet_consultant" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="diet_consultant">Diet Consultant</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.yoga"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="yoga" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="yoga">Yoga</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.pilates"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="pilates" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="pilates">Pilates</Label>
                  </div>
                )}
              />
              
              <Controller
                control={control}
                name="facilities.swimming_pool"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="swimming_pool" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="swimming_pool">Swimming Pool</Label>
                  </div>
                )}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : existingGym ? 'Update Gym' : 'Submit Gym'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default GymForm;
