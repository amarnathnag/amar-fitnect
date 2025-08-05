import { supabase } from '@/integrations/supabase/client';

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

export const fetchUserAppointments = async (userId: string): Promise<Appointment[]> => {
  try {
    console.log('Fetching appointments for user:', userId);
    
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        user_id,
        doctor_id,
        date,
        time_slot,
        status,
        reason,
        created_at,
        updated_at,
        doctors!inner(name)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }

    // Transform the data to include doctor name
    const appointments: Appointment[] = (data || []).map(appointment => ({
      id: appointment.id,
      user_id: appointment.user_id,
      doctor_id: appointment.doctor_id,
      doctor_name: appointment.doctors?.name || 'Unknown Doctor',
      date: appointment.date,
      time_slot: appointment.time_slot,
      status: appointment.status as Appointment['status'],
      reason: appointment.reason,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    }));

    console.log('Appointments fetched successfully:', appointments.length);
    return appointments;
  } catch (error) {
    console.error('Error in fetchUserAppointments:', error);
    return [];
  }
};

export const createAppointment = async (appointmentData: {
  user_id: string;
  doctor_id: string;
  date: string;
  time_slot: string;
  reason?: string;
}): Promise<Appointment> => {
  try {
    console.log('Creating appointment:', appointmentData);
    
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        user_id: appointmentData.user_id,
        doctor_id: appointmentData.doctor_id,
        date: appointmentData.date,
        time_slot: appointmentData.time_slot,
        reason: appointmentData.reason || null,
        status: 'pending'
      }])
      .select(`
        id,
        user_id,
        doctor_id,
        date,
        time_slot,
        status,
        reason,
        created_at,
        updated_at,
        doctors!inner(name)
      `)
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }

    const appointment: Appointment = {
      id: data.id,
      user_id: data.user_id,
      doctor_id: data.doctor_id,
      doctor_name: data.doctors?.name || 'Unknown Doctor',
      date: data.date,
      time_slot: data.time_slot,
      status: data.status as Appointment['status'],
      reason: data.reason,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    console.log('Appointment created successfully:', appointment);
    return appointment;
  } catch (error) {
    console.error('Error in createAppointment:', error);
    throw error;
  }
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<Appointment> => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .select(`
        id,
        user_id,
        doctor_id,
        date,
        time_slot,
        status,
        reason,
        created_at,
        updated_at,
        doctors!inner(name)
      `)
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }

    const appointment: Appointment = {
      id: data.id,
      user_id: data.user_id,
      doctor_id: data.doctor_id,
      doctor_name: data.doctors?.name || 'Unknown Doctor',
      date: data.date,
      time_slot: data.time_slot,
      status: data.status as Appointment['status'],
      reason: data.reason,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    return appointment;
  } catch (error) {
    console.error('Error in updateAppointmentStatus:', error);
    throw error;
  }
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    console.log('Fetching all appointments for admin');
    
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        user_id,
        doctor_id,
        date,
        time_slot,
        status,
        reason,
        created_at,
        updated_at,
        doctors!inner(name)
      `)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }

    // Transform the data to include doctor name
    const appointments: Appointment[] = (data || []).map(appointment => ({
      id: appointment.id,
      user_id: appointment.user_id,
      doctor_id: appointment.doctor_id,
      doctor_name: appointment.doctors?.name || 'Unknown Doctor',
      date: appointment.date,
      time_slot: appointment.time_slot,
      status: appointment.status as Appointment['status'],
      reason: appointment.reason,
      created_at: appointment.created_at,
      updated_at: appointment.updated_at,
    }));

    console.log('All appointments fetched successfully:', appointments.length);
    return appointments;
  } catch (error) {
    console.error('Error in fetchAppointments:', error);
    return [];
  }
};

export const deleteAppointment = async (appointmentId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', appointmentId);

    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    throw error;
  }
};