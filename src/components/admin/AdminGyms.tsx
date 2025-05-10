
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGyms } from '@/services/gymService';
import { Gym } from '@/types/gym';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Pencil, CheckCircle, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dummyGyms } from '@/services/dummyData';

const AdminGyms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editGymId, setEditGymId] = useState<string | null>(null);
  const [showAddGym, setShowAddGym] = useState(false);
  const [gymsData, setGymsData] = useState(dummyGyms);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: gyms, isLoading } = useQuery({
    queryKey: ['admin-gyms'],
    queryFn: () => fetchGyms(),
  });
  
  const handleApproval = (id: string, approved: boolean) => {
    // For demo purposes, update the local state
    setGymsData(prevGyms => 
      prevGyms.map(gym => 
        gym.id === id ? { ...gym, is_approved: approved } : gym
      )
    );
    
    toast({
      title: "Gym Updated",
      description: "Gym approval status has been updated.",
    });
  };
  
  const handleGymCreated = () => {
    setShowAddGym(false);
    toast({
      title: "Gym Added",
      description: "New gym has been added successfully.",
    });
  };
  
  const handleGymUpdated = () => {
    setEditGymId(null);
    toast({
      title: "Gym Updated",
      description: "Gym details have been updated successfully.",
    });
  };
  
  const editGym = (gymId: string) => {
    setEditGymId(gymId);
  };
  
  const filteredGyms = gymsData.filter(gym => 
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
                      onClick={() => editGym(gym.id)}
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
            <div className="p-4">
              <p className="text-center text-gray-500">
                Gym editor would go here. For this demo, changes will be simulated.
              </p>
              <div className="flex justify-end mt-4">
                <Button onClick={handleGymUpdated}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Gym Dialog */}
      <Dialog open={showAddGym} onOpenChange={setShowAddGym}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Gym</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-center text-gray-500">
              Gym creation form would go here. For this demo, creation will be simulated.
            </p>
            <div className="flex justify-end mt-4">
              <Button onClick={handleGymCreated}>Add Gym</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGyms;
