
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Doctor = Tables<"doctors">;
export type Appointment = Tables<"appointments">;

export const fetchDoctors = async (specialty?: string) => {
  let query = supabase.from("doctors").select("*");
  
  if (specialty && specialty !== "all") {
    query = query.eq("specialty", specialty);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
  
  return data;
};

export const fetchDoctorById = async (doctorId: string) => {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", doctorId)
    .single();
    
  if (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
  
  return data;
};

export const createAppointment = async (appointment: {
  doctor_id: string;
  date: string;
  time_slot: string;
  reason?: string;
}) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        user_id: userData.user.id,
        doctor_id: appointment.doctor_id,
        date: appointment.date,
        time_slot: appointment.time_slot,
        reason: appointment.reason || null
      }
    ])
    .select();
    
  if (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
  
  return data[0];
};

export const fetchUserAppointments = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      *,
      doctors:doctor_id (
        name,
        specialty,
        image_url
      )
    `)
    .eq("user_id", userData.user.id)
    .order("date", { ascending: true });
    
  if (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
  
  return data;
};
