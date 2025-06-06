
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Edit, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface HealthGoal {
  id: string;
  name: string;
  status: 'In Progress' | 'Active' | 'Achieved' | 'Paused';
}

const EditableHealthGoalsCard = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<HealthGoal[]>([
    { id: '1', name: 'Weight Goal', status: 'In Progress' },
    { id: '2', name: 'Muscle Gain', status: 'Active' },
    { id: '3', name: 'Cardio Fitness', status: 'Achieved' }
  ]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalStatus, setNewGoalStatus] = useState<HealthGoal['status']>('In Progress');
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!newGoalName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a goal name",
        variant: "destructive",
      });
      return;
    }

    const newGoal: HealthGoal = {
      id: Date.now().toString(),
      name: newGoalName.trim(),
      status: newGoalStatus
    };

    setGoals([...goals, newGoal]);
    setNewGoalName('');
    setNewGoalStatus('In Progress');
    setIsEditDialogOpen(false);
    
    toast({
      title: "Goal Added",
      description: "Your health goal has been added successfully",
    });
  };

  const updateGoalStatus = (goalId: string, newStatus: HealthGoal['status']) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, status: newStatus } : goal
    ));
    
    toast({
      title: "Goal Updated",
      description: "Goal status has been updated",
    });
  };

  const getStatusColor = (status: HealthGoal['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-50 dark:bg-green-900/20';
      case 'In Progress': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'Achieved': return 'bg-purple-50 dark:bg-purple-900/20';
      case 'Paused': return 'bg-gray-50 dark:bg-gray-900/20';
      default: return 'bg-gray-50 dark:bg-gray-900/20';
    }
  };

  if (user?.gender === 'female') return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          Health Goals
        </CardTitle>
        <CardDescription>Your fitness and wellness objectives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {goals.map((goal) => (
            <div key={goal.id} className={`flex justify-between items-center p-2 ${getStatusColor(goal.status)} rounded`}>
              <span className="text-sm font-medium">{goal.name}</span>
              <Select 
                value={goal.status} 
                onValueChange={(value: string) => updateGoalStatus(goal.id, value as HealthGoal['status'])}
              >
                <SelectTrigger className="w-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Achieved">Achieved</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                Update Goals
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Health Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Goal Name</label>
                  <Input 
                    value={newGoalName} 
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder="Enter goal name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Initial Status</label>
                  <Select value={newGoalStatus} onValueChange={(value: string) => setNewGoalStatus(value as HealthGoal['status'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Achieved">Achieved</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddGoal} className="flex-1">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Goal
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableHealthGoalsCard;
