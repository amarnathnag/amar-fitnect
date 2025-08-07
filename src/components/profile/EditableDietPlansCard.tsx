
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, Plus, Eye, Loader2 } from 'lucide-react';
import { useDietPlans } from '@/hooks/useDietPlans';

const EditableDietPlansCard = () => {
  const navigate = useNavigate();
  const { dietPlans, isLoading } = useDietPlans();

  const handleViewAllDietPlans = () => {
    navigate('/diet-plans');
  };

  const handleNewPlan = () => {
    navigate('/diet-plans');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Diet Plans
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading diet plans...</span>
          </div>
        ) : dietPlans.length > 0 ? (
          dietPlans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
              <div>
                <h4 className="font-medium">{plan.name}</h4>
                <Badge variant="secondary" className="mt-1">
                  {plan.goal}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Utensils className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No diet plans created yet</p>
            <p className="text-sm">Create your first diet plan to get started</p>
          </div>
        )}
        
        <div className="flex justify-between gap-2 pt-4">
          <Button variant="outline" onClick={handleViewAllDietPlans} className="flex-1">
            View All Diet Plans
          </Button>
          <Button onClick={handleNewPlan} className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            New Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableDietPlansCard;
