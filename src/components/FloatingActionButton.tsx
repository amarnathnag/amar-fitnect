import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, X, Activity, Dumbbell, Droplets, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import ProgressDialog from '@/components/profile/daily-progress/ProgressDialog';
import { useDailyProgress } from '@/hooks/useDailyProgress';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { saveDailyProgress, isLoading } = useDailyProgress();

  // Don't show FAB if user is not logged in
  if (!user) return null;

  // Don't show on certain pages
  const hiddenPaths = ['/auth', '/admin'];
  if (hiddenPaths.some(path => location.pathname.startsWith(path))) return null;

  const handleProgressSave = async (data: any) => {
    await saveDailyProgress(data);
    setShowProgressDialog(false);
    setIsOpen(false);
  };

  const actions = [
    {
      icon: Activity,
      label: 'Track Progress',
      color: 'bg-primary hover:bg-primary/90',
      onClick: () => {
        setShowProgressDialog(true);
        setIsOpen(false);
      },
    },
    {
      icon: Dumbbell,
      label: 'Workouts',
      color: 'bg-secondary hover:bg-secondary/90',
      onClick: () => {
        navigate('/workouts');
        setIsOpen(false);
      },
    },
    {
      icon: ClipboardList,
      label: 'Dashboard',
      color: 'bg-accent hover:bg-accent/90',
      onClick: () => {
        navigate('/fitness-dashboard');
        setIsOpen(false);
      },
    },
  ];

  return (
    <>
      {/* Mobile FAB - only visible on small screens */}
      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        {/* Action buttons */}
        <div className={cn(
          "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {actions.map((action, index) => (
            <div 
              key={action.label}
              className="flex items-center gap-2 justify-end"
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              <span className={cn(
                "bg-background/95 backdrop-blur-sm text-foreground text-sm px-3 py-1.5 rounded-full shadow-lg border border-border whitespace-nowrap transition-all duration-200",
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
              )}>
                {action.label}
              </span>
              <Button
                size="icon"
                className={cn(
                  "h-12 w-12 rounded-full shadow-lg transition-all duration-200",
                  action.color,
                  isOpen ? "scale-100" : "scale-0"
                )}
                onClick={action.onClick}
              >
                <action.icon className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Main FAB button */}
        <Button
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-xl transition-all duration-300",
            isOpen 
              ? "bg-destructive hover:bg-destructive/90 rotate-45" 
              : "bg-primary hover:bg-primary/90"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Backdrop when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Progress Dialog - controlled externally */}
      <ProgressDialog 
        onSave={handleProgressSave} 
        isLoading={isLoading}
        open={showProgressDialog}
        onOpenChange={setShowProgressDialog}
      />
    </>
  );
};

export default FloatingActionButton;
