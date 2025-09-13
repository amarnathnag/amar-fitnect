
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Zap, Target } from 'lucide-react';

const WorkoutHero = () => {
  const { language } = useLanguage();
  
  return (
    <section className="relative bg-gradient-to-br from-health-primary via-health-accent to-purple-600 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">Transform Your Body & Mind</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {translateText("workout_routines", language)}
              <span className="block text-2xl md:text-3xl text-white/90 font-normal mt-2">
                {translateText("motivational_tagline", language)}
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              {translateText("workout_description", language)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-health-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-full shadow-xl hover-scale"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3 rounded-full"
              >
                Explore Plans
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-white/90">
                <Target className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Personalized Plans</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Target className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Expert Guidance</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Target className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Real Results</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating workout cards */}
              <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">500+ cal</div>
                    <div className="text-white/70 text-sm">burned today</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-10 left-0 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Goal: 80%</div>
                    <div className="text-white/70 text-sm">completed</div>
                  </div>
                </div>
              </div>
              
              {/* Central image placeholder */}
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-12 w-12" />
                  </div>
                  <div className="text-xl font-semibold mb-2">Ready to Start?</div>
                  <div className="text-white/80">Your fitness journey begins here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutHero;
