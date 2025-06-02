
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlanStatusCardProps {
  currentPlanId: string | null;
  selectedDay: string;
  selectedMealType: string;
}

const PlanStatusCard = ({ currentPlanId, selectedDay, selectedMealType }: PlanStatusCardProps) => {
  if (!currentPlanId) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-center">
          <Badge variant="outline" className="text-green-600 border-green-600">
            Plan Created Successfully! You can now add meals to your {selectedDay} {selectedMealType}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanStatusCard;
