
import { Gym } from '@/types/gym';

// Dummy gym data
export const dummyGyms: Gym[] = [
  {
    id: 'gym-001',
    name: 'FitZone Premium',
    owner_name: 'John Doe',
    owner_id: 'owner-001',
    location: '123 Main Street, New York',
    location_pincode: '10001',
    contact_phone: '+1 555-123-4567',
    contact_email: 'info@fitzone.com',
    opening_hours: {
      monday: '6:00 AM - 10:00 PM',
      tuesday: '6:00 AM - 10:00 PM',
      wednesday: '6:00 AM - 10:00 PM',
      thursday: '6:00 AM - 10:00 PM',
      friday: '6:00 AM - 10:00 PM',
      saturday: '8:00 AM - 8:00 PM',
      sunday: '8:00 AM - 6:00 PM'
    },
    facilities: {
      weight_training: true,
      cardio: true,
      crossfit: true,
      zumba: true,
      personal_training: true,
      diet_consultant: true,
      pool: true
    },
    description: 'A premium fitness facility with state-of-the-art equipment and expert trainers.',
    is_premium: true,
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gym-002',
    name: 'Iron Warriors Gym',
    owner_name: 'Mike Johnson',
    owner_id: 'owner-002',
    location: '456 Fitness Avenue, Los Angeles',
    location_pincode: '90001',
    contact_phone: '+1 555-987-6543',
    contact_email: 'info@ironwarriors.com',
    opening_hours: {
      monday: '5:00 AM - 11:00 PM',
      tuesday: '5:00 AM - 11:00 PM',
      wednesday: '5:00 AM - 11:00 PM',
      thursday: '5:00 AM - 11:00 PM',
      friday: '5:00 AM - 11:00 PM',
      saturday: '6:00 AM - 10:00 PM',
      sunday: '6:00 AM - 8:00 PM'
    },
    facilities: {
      weight_training: true,
      cardio: true,
      crossfit: true,
      zumba: false,
      personal_training: true,
      diet_consultant: false,
      boxing: true
    },
    description: 'Specializing in strength training and bodybuilding with experienced coaches.',
    is_premium: false,
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gym-003',
    name: 'Wellness Hub',
    owner_name: 'Sarah Williams',
    owner_id: 'owner-003',
    location: '789 Health Street, Chicago',
    location_pincode: '60601',
    contact_phone: '+1 555-456-7890',
    contact_email: 'contact@wellnesshub.com',
    opening_hours: {
      monday: '6:00 AM - 9:00 PM',
      tuesday: '6:00 AM - 9:00 PM',
      wednesday: '6:00 AM - 9:00 PM',
      thursday: '6:00 AM - 9:00 PM',
      friday: '6:00 AM - 9:00 PM',
      saturday: '7:00 AM - 7:00 PM',
      sunday: '7:00 AM - 5:00 PM'
    },
    facilities: {
      weight_training: true,
      cardio: true,
      crossfit: false,
      zumba: true,
      personal_training: true,
      diet_consultant: true,
      yoga: true
    },
    description: 'A holistic fitness center focused on wellness, health, and balanced lifestyle.',
    is_premium: true,
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Dummy job postings 
export const dummyJobs = [
  {
    id: 'job-001',
    gym_id: 'gym-001',
    title: 'Senior Fitness Trainer',
    description: 'We are looking for an experienced fitness trainer to join our team. The ideal candidate should have at least 3 years of experience in personal training and group fitness classes.\n\nResponsibilities include developing personalized fitness plans, conducting group classes, and providing nutritional guidance to our members.',
    experience_required: '3+ years',
    working_hours: 'Full-time, flexible shifts',
    salary_range: '$40,000 - $55,000 annually',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    gyms: {
      name: 'FitZone Premium',
      location: '123 Main Street, New York',
      contact_email: 'info@fitzone.com',
      contact_phone: '+1 555-123-4567'
    }
  },
  {
    id: 'job-002',
    gym_id: 'gym-002',
    title: 'Strength and Conditioning Coach',
    description: 'Iron Warriors Gym is seeking a passionate Strength and Conditioning Coach to join our team. You will work with athletes and fitness enthusiasts to improve their performance and reach their goals.\n\nQualifications include certification in strength training, experience with athletic performance, and excellent communication skills.',
    experience_required: '2+ years with athletes',
    working_hours: 'Part-time, evenings and weekends',
    salary_range: '$25 - $35 per hour',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    gyms: {
      name: 'Iron Warriors Gym',
      location: '456 Fitness Avenue, Los Angeles',
      contact_email: 'info@ironwarriors.com',
      contact_phone: '+1 555-987-6543'
    }
  },
  {
    id: 'job-003',
    gym_id: 'gym-003',
    title: 'Yoga and Wellness Instructor',
    description: 'Wellness Hub is looking for a certified Yoga Instructor to lead classes and provide personalized guidance to our members. The ideal candidate should have experience in various yoga styles and a holistic approach to wellness.\n\nResponsibilities include teaching yoga classes, conducting wellness workshops, and supporting members in their wellness journey.',
    experience_required: '1+ years teaching experience',
    working_hours: 'Part-time, morning and evening classes',
    salary_range: '$30 - $40 per hour',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    gyms: {
      name: 'Wellness Hub',
      location: '789 Health Street, Chicago',
      contact_email: 'contact@wellnesshub.com',
      contact_phone: '+1 555-456-7890'
    }
  }
];
