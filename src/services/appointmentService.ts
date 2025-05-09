
// Import the Appointment interface and remove the Supabase import
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

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctor_id: 'doc-1',
    doctor_name: 'Dr. John Smith',
    user_id: 'user-123',
    user_name: 'Regular User',
    date: '2025-06-15',
    time_slot: '10:00 AM',
    reason: 'Annual checkup',
    status: 'confirmed',
    created_at: '2025-06-01T10:30:00Z',
    updated_at: null
  },
  {
    id: '2',
    doctor_id: 'doc-2',
    doctor_name: 'Dr. Sarah Johnson',
    user_id: 'user-456',
    user_name: 'Premium User',
    date: '2025-06-20',
    time_slot: '2:30 PM',
    reason: 'Follow-up consultation',
    status: 'pending',
    created_at: '2025-06-05T14:45:00Z',
    updated_at: null
  }
];

export const fetchAppointments = async (): Promise<Appointment[]> => {
  // Return mock appointments
  return Promise.resolve([...mockAppointments]);
};

export const fetchUserAppointments = async (userId: string) => {
  // Filter appointments for the specified user
  const userAppointments = mockAppointments.filter(appt => appt.user_id === userId);
  return Promise.resolve(userAppointments);
};

export const fetchDoctorAppointments = async (doctorId: string) => {
  // Filter appointments for the specified doctor
  const doctorAppointments = mockAppointments.filter(appt => appt.doctor_id === doctorId);
  return Promise.resolve(doctorAppointments);
};

export const createAppointment = async (appointment: {
  user_id: string;
  doctor_id: string;
  date: string;
  time_slot: string;
  reason?: string;
}): Promise<Appointment> => {
  // Create a new appointment
  const newAppointment: Appointment = {
    id: `appt-${Date.now()}`,
    doctor_id: appointment.doctor_id,
    doctor_name: 'Dr. Example', // In a real app, you'd fetch the doctor's name
    user_id: appointment.user_id,
    user_name: 'Current User', // In a real app, you'd use the current user's name
    date: appointment.date,
    time_slot: appointment.time_slot,
    reason: appointment.reason || null,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: null
  };
  
  // In a real app, you'd save this to a database
  mockAppointments.push(newAppointment);
  
  return Promise.resolve(newAppointment);
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<Appointment> => {
  // Find the appointment to update
  const appointmentIndex = mockAppointments.findIndex(appt => appt.id === appointmentId);
  
  if (appointmentIndex === -1) {
    throw new Error('Appointment not found');
  }
  
  // Update the status
  const updatedAppointment = {
    ...mockAppointments[appointmentIndex],
    status,
    updated_at: new Date().toISOString()
  };
  
  mockAppointments[appointmentIndex] = updatedAppointment;
  
  return Promise.resolve(updatedAppointment);
};

export const deleteAppointment = async (appointmentId: string): Promise<boolean> => {
  // Find the appointment to delete
  const appointmentIndex = mockAppointments.findIndex(appt => appt.id === appointmentId);
  
  if (appointmentIndex === -1) {
    throw new Error('Appointment not found');
  }
  
  // Remove the appointment
  mockAppointments.splice(appointmentIndex, 1);
  
  return Promise.resolve(true);
};
