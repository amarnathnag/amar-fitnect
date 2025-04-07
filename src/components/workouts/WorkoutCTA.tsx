
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';

const WorkoutCTA = () => {
  const { language } = useLanguage();
  
  return (
    <section className="bg-gradient-to-r from-health-primary to-health-accent text-white py-16">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translateText("personalized_workout_plan", language)}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {translateText("custom_workout_routine", language)}
          </p>
          <Button className="bg-white text-health-primary hover:bg-gray-100 hover:text-health-dark" size="lg" asChild>
            <Link to="/bmi-calculator">
              {translateText("check_bmi_first", language)} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkoutCTA;
