
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Utensils, Plus, Eye } from 'lucide-react';

const EditableDietPlansCard = () => {
  const navigate = useNavigate();

  // Mock diet plans data
  const dietPlans = [
    { id: 1, name: 'Amarnath', goal: 'muscle gain' },
    { id: 2, name: 'gain weight', goal: 'muscle gain' },
    { id: 3, name: 'Muscle Building', goal: 'muscle gain' }
  ];

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
        {dietPlans.map((plan) => (
          <div key={plan.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
            <div>
              <h4 className="font-medium">{plan.name}</h4>
              <Badge className="bg-blue-100 text-blue-800 mt-1">
                {plan.goal}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                Delete
              </Button>
            </div>
          </div>
        ))}
        
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
