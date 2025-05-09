
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGyms, updateGym } from '@/services/gymService';
import { Gym } from '@/types/gym';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Pencil, CheckCircle, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GymForm from '@/components/gyms/GymForm';

const AdminGyms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editGymId, setEditGymId] = useState<string | null>(null);
  const [showAddGym, setShowAddGym] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: gyms, isLoading } = useQuery({
    queryKey: ['admin-gyms'],
    queryFn: () => fetchGyms(),
  });
  
  const updateGymMutation = useMutation({
    mutationFn: ({ id, approved }: { id: string, approved: boolean }) => 
      updateGym(id, { is_approved: approved }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gyms'] });
      toast({
        title: "Gym Updated",
        description: "Gym approval status has been updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update gym status",
        variant: "destructive",
      });
    },
  });
  
  const handleApproval = (id: string, approved: boolean) => {
    updateGymMutation.mutate({ id, approved });
  };
  
  const handleGymCreated = () => {
    setShowAddGym(false);
    queryClient.invalidateQueries({ queryKey: ['admin-gyms'] });
    toast({
      title: "Gym Added",
      description: "New gym has been added successfully.",
    });
  };
  
  const handleGymUpdated = () => {
    setEditGymId(null);
    queryClient.invalidateQueries({ queryKey: ['admin-gyms'] });
    toast({
      title: "Gym Updated",
      description: "Gym details have been updated successfully.",
    });
  };
  
  const filteredGyms = gyms?.filter(gym => 
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gym.location_pincode.includes(searchTerm)
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search gyms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setShowAddGym(true)}>Add New Gym</Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredGyms?.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No gyms found.</p>
      ) : (
        <div className="space-y-4">
          {filteredGyms?.map(gym => (
            <Card key={gym.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{gym.name}</h3>
                      {gym.is_premium && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Premium
                        </span>
                      )}
                      {gym.is_approved ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Approved
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {gym.location}, {gym.location_pincode}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditGymId(gym.id)}
                    >
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    
                    {gym.is_approved ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproval(gym.id, false)}
                      >
                        <XCircle className="h-4 w-4 mr-1 text-red-500" /> Unapprove
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproval(gym.id, true)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Approve
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Edit Gym Dialog */}
      <Dialog open={!!editGymId} onOpenChange={() => setEditGymId(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Gym</DialogTitle>
          </DialogHeader>
          {editGymId && (
            <GymForm 
              existingGym={gyms?.find(g => g.id === editGymId)} 
              onSuccess={handleGymUpdated} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Gym Dialog */}
      <Dialog open={showAddGym} onOpenChange={setShowAddGym}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Gym</DialogTitle>
          </DialogHeader>
          <GymForm onSuccess={handleGymCreated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGyms;
