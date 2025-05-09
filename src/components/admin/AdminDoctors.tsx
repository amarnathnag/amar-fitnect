
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDoctors } from '@/services/doctorService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Pencil, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DoctorForm from '@/components/admin/DoctorForm';

const AdminDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editDoctorId, setEditDoctorId] = useState<string | null>(null);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: doctors, isLoading } = useQuery({
    queryKey: ['admin-doctors'],
    queryFn: () => fetchDoctors(),
  });
  
  const handleDoctorCreated = () => {
    setShowAddDoctor(false);
    queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
    toast({
      title: "Doctor Added",
      description: "New doctor has been added successfully.",
    });
  };
  
  const handleDoctorUpdated = () => {
    setEditDoctorId(null);
    queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
    toast({
      title: "Doctor Updated",
      description: "Doctor details have been updated successfully.",
    });
  };
  
  const filteredDoctors = doctors?.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.location && doctor.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setShowAddDoctor(true)}>Add New Doctor</Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredDoctors?.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No doctors found.</p>
      ) : (
        <div className="space-y-4">
          {filteredDoctors?.map(doctor => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4 items-center">
                    {doctor.image_url && (
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">
                        {doctor.experience} • {doctor.location || 'No location specified'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditDoctorId(doctor.id)}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Edit Doctor Dialog */}
      <Dialog open={!!editDoctorId} onOpenChange={() => setEditDoctorId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
          </DialogHeader>
          {editDoctorId && (
            <DoctorForm 
              doctorId={editDoctorId}
              onSuccess={handleDoctorUpdated} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Doctor Dialog */}
      <Dialog open={showAddDoctor} onOpenChange={setShowAddDoctor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
          </DialogHeader>
          <DoctorForm onSuccess={handleDoctorCreated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDoctors;
