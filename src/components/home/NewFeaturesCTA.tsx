import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ActivitySquare, Dumbbell, TrendingUp, Calendar, Heart, Zap } from 'lucide-react';

const NewFeaturesCTA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPremium = user?.isPremium;
  const isMale = user?.gender === 'male';

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-health-primary bg-clip-text text-transparent">
            New Premium Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress, achieve your goals, and unlock your full potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Fitness Dashboard CTA */}
          <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-health-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-health-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ActivitySquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Fitness Dashboard</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your complete fitness command center. Track workouts, monitor nutrition, visualize progress with stunning charts, and stay on top of your wellness goals.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Real-time progress tracking & analytics</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Nutrition insights & calorie monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Daily wellness & exercise stats</span>
                </div>
              </div>

              <Button 
                onClick={() => navigate('/fitness-dashboard')}
                className="w-full group-hover:scale-105 transition-transform duration-200 shadow-lg"
                size="lg"
              >
                Launch Dashboard
                <ActivitySquare className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Men's Health CTA - Only show for male users or if gender not set */}
          {(isMale || !user?.gender) && (
            <Card className="group relative overflow-hidden border-2 hover:border-health-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-health-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-health-primary to-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Men's Health Hub</h3>
                    {!isPremium && (
                      <span className="text-xs font-semibold text-primary">PREMIUM</span>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Specialized workout programs, muscle building strategies, testosterone optimization, and comprehensive progress tracking designed specifically for men.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Dumbbell className="h-5 w-5 text-health-primary flex-shrink-0" />
                    <span>Advanced muscle building programs</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <TrendingUp className="h-5 w-5 text-health-primary flex-shrink-0" />
                    <span>Testosterone health optimization</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-health-primary flex-shrink-0" />
                    <span>Workout tracking & consistency metrics</span>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/mens-health')}
                  className="w-full group-hover:scale-105 transition-transform duration-200 shadow-lg"
                  size="lg"
                  variant={isPremium ? "default" : "outline"}
                >
                  {isPremium ? 'Access Men\'s Health' : 'Unlock Premium'}
                  <Dumbbell className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewFeaturesCTA;
