
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClipboardList, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';

const HeroSection = () => {
  const { language } = useLanguage();
  
  const translations = {
    title: {
      english: "Women's Health & Disease Management",
      hindi: "महिला स्वास्थ्य और रोग प्रबंधन",
      bengali: "মহিলাদের স্বাস্থ্য এবং রোগ ব্যবস্থাপনা"
    },
    description: {
      english: "Specialized care for women's unique health needs including hormonal disorders, pregnancy, menstrual health and comprehensive wellness management.",
      hindi: "हार्मोनल विकारों, गर्भावस्था, मासिक धर्म स्वास्थ्य और व्यापक कल्याण प्रबंधन सहित महिलाओं की अनूठी स्वास्थ्य जरूरतों के लिए विशेष देखभाल।",
      bengali: "হরমোনাল ব্যাধি, গর্ভাবস্থা, মাসিক স্বাস্থ্য এবং সামগ্রিক সুস্থতা ব্যবস্থাপনা সহ মহিলাদের অনন্য স্বাস্থ্য চাহিদার জন্য বিশেষায়িত যত্ন।"
    },
    exploreDietPlans: {
      english: "Explore Diet Plans",
      hindi: "आहार योजनाएँ देखें",
      bengali: "ডায়েট প্ল্যান দেখুন"
    },
    dietCostCalculator: {
      english: "Diet Cost Calculator",
      hindi: "आहार लागत कैलकुलेटर",
      bengali: "ডায়েট খরচ ক্যালকুলেটর"
    }
  };

  return (
    <section className="bg-gradient-to-r from-pink-100 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 py-12 relative overflow-hidden">
      {/* Animated circles in background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-pink-200/50 dark:bg-pink-800/30 animate-pulse" style={{ animationDuration: "7s" }}></div>
      <div className="absolute top-20 -right-12 w-32 h-32 rounded-full bg-purple-200/50 dark:bg-purple-800/30 animate-pulse" style={{ animationDuration: "5s" }}></div>
      <div className="absolute bottom-8 left-16 w-24 h-24 rounded-full bg-pink-200/50 dark:bg-pink-800/30 animate-pulse" style={{ animationDuration: "8s" }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {translations.title[language]}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {translations.description[language]}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/diet-plans">
              <Button variant="outline" className="gap-2 hover-scale">
                <ClipboardList className="h-4 w-4" />
                {translations.exploreDietPlans[language]}
              </Button>
            </Link>
            <Link to="/diet-plans#diet-ingredients">
              <Button variant="outline" className="gap-2 hover-scale">
                <Calculator className="h-4 w-4" />
                {translations.dietCostCalculator[language]}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
