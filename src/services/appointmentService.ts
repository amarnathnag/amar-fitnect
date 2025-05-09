
import { supabase } from "@/integrations/supabase/client";

export interface Appointment {
  id: string;
  doctor_id: string;
  doctor_name?: string;
  user_id: string;
  user_name?: string;
  date: string;
  time_slot: string;
  reason: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string | null;
}

export const fetchAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      doctors:doctor_id (name),
      profiles:user_id (*)
    `)
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
  
  // Transform the data to flatten the structure
  const transformedData = data.map((appt) => ({
    id: appt.id,
    doctor_id: appt.doctor_id,
    doctor_name: appt.doctors?.name || 'Unknown Doctor',
    user_id: appt.user_id,
    // Use safe navigation with optional chaining and provide a fallback
    user_name: appt.profiles?.full_name || 'Unknown User',
    date: appt.date,
    time_slot: appt.time_slot,
    reason: appt.reason,
    status: appt.status,
    created_at: appt.created_at,
    updated_at: appt.updated_at
  }));
  
  return transformedData as Appointment[];
};

export const fetchUserAppointments = async (userId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      doctors:doctor_id (name, specialty, image_url)
    `)
    .eq('user_id', userId)
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching user appointments:', error);
    throw error;
  }
  
  return data;
};

export const fetchDoctorAppointments = async (doctorId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      profiles:user_id (*)
    `)
    .eq('doctor_id', doctorId)
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching doctor appointments:', error);
    throw error;
  }
  
  return data;
};

export const createAppointment = async (appointment: {
  user_id: string;
  doctor_id: string;
  date: string;
  time_slot: string;
  reason?: string;
}) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert([{
      ...appointment,
      status: 'pending'
    }])
    .select();
  
  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
  
  return data[0];
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', appointmentId)
    .select();
  
  if (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
  
  return data[0];
};

export const deleteAppointment = async (appointmentId: string) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId);
  
  if (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
  
  return true;
};
