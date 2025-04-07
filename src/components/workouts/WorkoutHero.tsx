
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';

const WorkoutHero = () => {
  const { language } = useLanguage();
  
  return (
    <section className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-12">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{translateText("workout_routines", language)}</h1>
          <p className="text-xl text-health-primary dark:text-health-accent font-semibold mb-4">
            {translateText("motivational_tagline", language)}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {translateText("workout_description", language)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkoutHero;
