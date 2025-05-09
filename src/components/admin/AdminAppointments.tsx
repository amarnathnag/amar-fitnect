
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAppointments, updateAppointmentStatus } from '@/services/appointmentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Search, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const AdminAppointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: fetchAppointments,
  });
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }) => 
      updateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
      toast({
        title: "Status Updated",
        description: "Appointment status has been updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update appointment status",
        variant: "destructive",
      });
    },
  });
  
  const handleStatusChange = (appointmentId: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    updateStatusMutation.mutate({ id: appointmentId, status });
  };
  
  const filteredAppointments = appointments?.filter(appt => {
    // Apply search filter
    const matchesSearch = 
      appt.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.date.includes(searchTerm);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredAppointments?.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {filteredAppointments?.map(appointment => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {format(new Date(appointment.date), 'PPP')} at {appointment.time_slot}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold">Dr. {appointment.doctor_name}</h3>
                    <p className="text-gray-600">Patient: {appointment.user_name}</p>
                    
                    {appointment.reason && (
                      <p className="text-sm text-gray-500 mt-2">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Status:</span>
                      <Select 
                        value={appointment.status} 
                        onValueChange={(status) => handleStatusChange(
                          appointment.id, 
                          status as 'pending' | 'confirmed' | 'completed' | 'cancelled'
                        )}
                      >
                        <SelectTrigger className="h-8 w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
