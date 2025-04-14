
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PremiumToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

const PremiumToolCard = ({ 
  title, 
  description, 
  icon, 
  action 
}: PremiumToolCardProps) => (
  <Card className="hover:shadow-md transition-all duration-300">
    <CardHeader>
      <div className="bg-health-light dark:bg-health-primary/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-health-primary">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="outline" className="w-full" onClick={action}>
        Launch Tool
      </Button>
    </CardFooter>
  </Card>
);

export default PremiumToolCard;
