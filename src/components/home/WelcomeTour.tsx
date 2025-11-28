import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Heart, 
  ShoppingBag, 
  Users, 
  Crown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Activity,
  Target
} from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  action?: {
    label: string;
    path: string;
  };
}

const WelcomeTour: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps: TourStep[] = [
    {
      title: "Welcome to WellnessGuide!",
      description: "Your personalized health and fitness companion. Let's take a quick tour of the amazing features waiting for you.",
      icon: <Sparkles className="h-12 w-12" />,
      gradient: "from-primary to-primary/60"
    },
    {
      title: "Fitness Dashboard",
      description: "Track your workouts, monitor progress with beautiful charts, and stay motivated with achievement badges and streaks.",
      icon: <Activity className="h-12 w-12" />,
      gradient: "from-emerald-500 to-teal-500",
      action: {
        label: "Explore Dashboard",
        path: "/fitness-dashboard"
      }
    },
    {
      title: "Personalized Health",
      description: "Get gender-specific health content, workout plans, and nutrition advice tailored just for you.",
      icon: <Heart className="h-12 w-12" />,
      gradient: "from-rose-500 to-pink-500",
      action: {
        label: "View Health Section",
        path: user?.gender === 'female' ? "/womens-health" : "/mens-health"
      }
    },
    {
      title: "Workout Library",
      description: "Access hundreds of workouts for all fitness levels - from beginners to advanced athletes.",
      icon: <Dumbbell className="h-12 w-12" />,
      gradient: "from-orange-500 to-amber-500",
      action: {
        label: "Browse Workouts",
        path: "/workouts"
      }
    },
    {
      title: "Health Marketplace",
      description: "Shop for supplements, fitness gear, and wellness products with health scores and expert recommendations.",
      icon: <ShoppingBag className="h-12 w-12" />,
      gradient: "from-violet-500 to-purple-500",
      action: {
        label: "Visit Marketplace",
        path: "/marketplace"
      }
    },
    {
      title: "Set Your Goals",
      description: "Complete your profile to get personalized recommendations and track your fitness journey effectively.",
      icon: <Target className="h-12 w-12" />,
      gradient: "from-blue-500 to-cyan-500",
      action: {
        label: "Setup Profile",
        path: "/profile-setup"
      }
    },
    {
      title: "You're All Set!",
      description: "Start your wellness journey today. Remember, every step counts towards a healthier you!",
      icon: <Crown className="h-12 w-12" />,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  useEffect(() => {
    if (user) {
      const hasSeenTour = localStorage.getItem(`welcome_tour_seen_${user.id}`);
      if (!hasSeenTour) {
        // Small delay to let the page load first
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  const handleClose = () => {
    if (user) {
      localStorage.setItem(`welcome_tour_seen_${user.id}`, 'true');
    }
    setIsOpen(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAction = (path: string) => {
    handleClose();
    navigate(path);
  };

  const handleSkip = () => {
    handleClose();
  };

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0">
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon with gradient background */}
          <div className={`mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
            {step.icon}
          </div>

          {/* Text content */}
          <div className="text-center space-y-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>

          {/* Action button if available */}
          {step.action && (
            <Button
              variant="outline"
              className="w-full mb-4 group"
              onClick={() => handleAction(step.action!.path)}
            >
              {step.action.label}
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}

          {/* Step indicators */}
          <div className="flex justify-center gap-1.5 mb-6">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-6 bg-primary' 
                    : index < currentStep 
                      ? 'w-2 bg-primary/50' 
                      : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip Tour
            </Button>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                className="min-w-[100px]"
              >
                {currentStep === tourSteps.length - 1 ? "Get Started" : "Next"}
                {currentStep < tourSteps.length - 1 && (
                  <ChevronRight className="h-4 w-4 ml-1" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
