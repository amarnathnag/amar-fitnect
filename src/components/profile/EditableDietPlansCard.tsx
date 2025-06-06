
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Utensils, Plus, Edit, Trash2 } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';
import { useToast } from '@/hooks/use-toast';

const EditableDietPlansCard = () => {
  const { dietPlans, createDietPlan, isLoading } = useDietPlans();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanGoal, setNewPlanGoal] = useState('');
  const { toast } = useToast();

  const handleCreatePlan = async () => {
    if (!newPlanName.trim() || !newPlanGoal) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const result = await createDietPlan(newPlanName.trim(), newPlanGoal);
    if (result) {
      setNewPlanName('');
      setNewPlanGoal('');
      setIsCreateDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-green-500" />
          Diet Plans
        </CardTitle>
        <CardDescription>Your saved diet plans and nutrition tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Plans Created</span>
            <Badge variant="outline">{dietPlans.length}</Badge>
          </div>
          
          {dietPlans.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Recent Plans:</p>
              {dietPlans.slice(0, 3).map((plan) => (
                <div key={plan.id} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <div className="flex-1">
                    <span className="text-sm font-medium">{plan.name}</span>
                    <Badge variant="secondary" className="text-xs ml-2">
                      {plan.goal.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 hover:text-red-700">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No diet plans created yet</p>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              View All Diet Plans
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  New Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Diet Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Plan Name</label>
                    <Input 
                      value={newPlanName} 
                      onChange={(e) => setNewPlanName(e.target.value)}
                      placeholder="Enter plan name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Goal</label>
                    <Select value={newPlanGoal} onValueChange={setNewPlanGoal}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="maintain-weight">Maintain Weight</SelectItem>
                        <SelectItem value="bulking">Bulking</SelectItem>
                        <SelectItem value="cutting">Cutting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCreatePlan} 
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Create Plan
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableDietPlansCard;
