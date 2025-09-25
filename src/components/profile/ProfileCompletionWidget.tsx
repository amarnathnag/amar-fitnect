import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Heart, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CompletionStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  action?: () => void;
}

const ProfileCompletionWidget = () => {
  const { user, profileData } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Calculate completion steps
  const steps: CompletionStep[] = [
    {
      id: 'basic_info',
      label: 'Basic Information',
      description: 'Name, age, gender',
      icon: <User className="h-4 w-4" />,
      completed: !!(profileData?.full_name && profileData?.date_of_birth && profileData?.gender),
      action: () => navigate('/profile-setup')
    },
    {
      id: 'physical_stats',
      label: 'Physical Stats',
      description: 'Height, weight, measurements',
      icon: <Target className="h-4 w-4" />,
      completed: !!(profileData?.height && profileData?.weight),
      action: () => navigate('/profile-setup')
    },
    {
      id: 'health_goals',
      label: 'Health Goals',
      description: 'Fitness goals, dietary preferences',
      icon: <Heart className="h-4 w-4" />,
      completed: !!(profileData?.fitness_goal && profileData?.food_preference),
      action: () => navigate('/profile-setup')
    },
    {
      id: 'health_data',
      label: 'Health Information',
      description: 'Medical history, allergies',
      icon: <AlertCircle className="h-4 w-4" />,
      completed: !!(profileData?.health_issues !== undefined || profileData?.allergies !== undefined),
      action: () => navigate('/profile?tab=health')
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const completionPercentage = (completedSteps / steps.length) * 100;
  const isFullyComplete = completedSteps === steps.length;

  if (isFullyComplete) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Profile Complete! 🎉
              </h3>
              <p className="text-sm text-green-600 dark:text-green-300">
                You're all set to start your health journey
              </p>
            </div>
            <Sparkles className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Complete Your Profile</CardTitle>
            <CardDescription>
              {completedSteps} of {steps.length} steps completed
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm">
            {Math.round(completionPercentage)}%
          </Badge>
        </div>
        <Progress value={completionPercentage} className="w-full h-2 mt-3" />
      </CardHeader>
      
      <CardContent className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              step.completed 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className={`p-2 rounded-full ${
              step.completed 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
            }`}>
              {step.completed ? <CheckCircle2 className="h-4 w-4" /> : step.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`font-medium text-sm ${
                step.completed ? 'text-green-800 dark:text-green-200' : 'text-gray-900 dark:text-gray-100'
              }`}>
                {step.label}
              </p>
              <p className={`text-xs ${
                step.completed ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {step.description}
              </p>
            </div>
            
            {!step.completed && step.action && (
              <Button
                size="sm"
                variant="ghost"
                onClick={step.action}
                className="h-8 px-2 text-xs"
              >
                Complete
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            )}
            
            {step.completed && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
          </div>
        ))}
        
        {!isFullyComplete && (
          <div className="pt-2">
            <Button 
              onClick={() => navigate('/profile-setup')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              size="sm"
            >
              Continue Setup
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionWidget;