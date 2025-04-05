import { toast } from '@/hooks/use-toast';

export type Language = 'english' | 'hindi' | 'bengali';

type TranslationKey = 
  'language' | 'english' | 'hindi' | 'bengali' | 
  'login' | 'signup' | 'logout' | 'profile' |
  'home' | 'about' | 'contact' | 'chat' |
  'welcomeMessage' | 'aboutTitle' | 'contactTitle' |
  'errorTitle' | 'errorMessage' | 'retry' |
  'apiKeyMissing' | 'apiKeyInvalid' | 'networkError' |
  'duration' | 'difficulty' | 'calories' | 'targets' |
  'steps' | 'tips' | 'beginner' | 'intermediate' | 'advanced' |
  'exerciseDetailTitle' | 'exerciseDetailDescription';

interface Translations {
  [key: string]: {
    english: string;
    hindi: string;
    bengali: string;
  };
}

// Main translations object
export const translations: Record<TranslationKey, Record<Language, string>> = {
  // Navigation
  "home": {
    english: "Home",
    hindi: "होम",
    bengali: "হোম"
  },
  "workouts": {
    english: "Workouts",
    hindi: "व्यायाम",
    bengali: "ব্যায়াম"
  },
  "diet_plans": {
    english: "Diet Plans",
    hindi: "आहार योजना",
    bengali: "খাদ্য পরিকল্পনা"
  },
  "bmi_calculator": {
    english: "BMI Calculator",
    hindi: "बीएमआई कैलकुलेटर",
    bengali: "বিএমআই ক্যালকুলেটর"
  },
  
  // Workout Page
  "workout_routines": {
    english: "Workout Routines",
    hindi: "व्यायाम दिनचर्या",
    bengali: "ব্যায়াম রুটিন"
  },
  "workout_description": {
    english: "Discover effective exercise programs tailored to your fitness goals, whether you're looking to lose weight, build muscle, or maintain your current fitness level.",
    hindi: "अपने फिटनेस लक्ष्यों के अनुरूप प्रभावी व्यायाम कार्यक्रम खोजें, चाहे आप वजन कम करना चाहते हों, मांसपेशियां बनाना चाहते हों, या अपने वर्तমান फिटनेस स्तर को बनाए रखना चाहते हों।",
    bengali: "আপনার ফিটনেস লক্ষ্য অনুযায়ী কার্যকর ব্যায়াম প্রোগ্রাম আবিষ্কার করুন, আপনি ওজন কমাতে চান, পেশী তৈরি করতে চান বা আপনার বর্তমান ফিটনেস স্তর বজায় রাখতে চান।"
  },
  "weight_loss": {
    english: "Weight Loss",
    hindi: "वजन घटाना",
    bengali: "ওজন কমানো"
  },
  "muscle_gain": {
    english: "Muscle Gain",
    hindi: "मांसपेशी वृद्धि",
    bengali: "পেশী বৃদ্ধি"
  },
  "maintenance": {
    english: "Maintenance",
    hindi: "रखरखाव",
    bengali: "রক্ষণাবেক্ষণ"
  },
  "exercises": {
    english: "Exercises:",
    hindi: "व्यायाम:",
    bengali: "ব্যায়াম:"
  },
  "sets": {
    english: "sets",
    hindi: "सेट",
    bengali: "সেট"
  },
  "more_exercises": {
    english: "more exercises",
    hindi: "अधिक व्यायाम",
    bengali: "আরও ব্যায়াম"
  },
  "start_workout": {
    english: "Start Workout",
    hindi: "व्यायाम शुरू करें",
    bengali: "ব্যায়াম শুরু করুন"
  },
  "personalized_workout_plan": {
    english: "Need a Personalized Workout Plan?",
    hindi: "एक व्यक्तिगत व्यायाम योजना की आवश्यकता है?",
    bengali: "একটি ব্যক্তিগতকৃত ব্যায়াম পরিকল্পনা প্রয়োজন?"
  },
  "custom_workout_routine": {
    english: "Get a custom workout routine designed specifically for your fitness level, goals, and preferences.",
    hindi: "अपने फिटनेस स्तर, लक्ष्यों और प्राथমिकताओं के लिए विशेष रूप से डिज़ाइन की गई कस্টম ओয়ার্কআउট रूটीन प्राप्त करें।",
    bengali: "আপনার ফিটনেস লেভেল, লক্ষ্য এবং পছন্দের জন্য বিশেষভাবে ডিজাইন করা একটি কাস্টম ওয়ার্কআউট রুটিন পান।"
  },
  "check_bmi_first": {
    english: "Check Your BMI First",
    hindi: "पहले अपना बीएमआई जांचें",
    bengali: "প্রথমে আপনার বিএমআই চেক করুন"
  },
  
  // Language Switcher
  "language": {
    english: "Language",
    hindi: "भाषा",
    bengali: "ভাষা"
  },
  "english": {
    english: "English",
    hindi: "अंग्रेजी",
    bengali: "ইংরেজি"
  },
  "hindi": {
    english: "Hindi",
    hindi: "हिंदी",
    bengali: "হিন্দি"
  },
  "bengali": {
    english: "Bengali",
    hindi: "बंगाली",
    bengali: "বাংলা"
  },
  "language_changed": {
    english: "Language changed to English",
    hindi: "भाषा हिंदी में बदल गई",
    bengali: "ভাষা বাংলায় পরিবর্তন করা হয়েছে"
  },
  
  // Exercise page translations
  "exerciseDetailTitle": {
    english: 'Exercise Details & Tutorials',
    hindi: 'व्यायाम विवरण और ट्यूटोरियल',
    bengali: 'ব্যায়াম বিবরণ এবং টিউটোরিয়াল'
  },
  "exerciseDetailDescription": {
    english: 'Explore detailed exercise guides with step-by-step instructions for strength training, cardio workouts, and flexibility exercises.',
    hindi: 'शक्ति प्रशिक्षण, कार्डियो वर्कआउट और लचीলापन व्यायाम के लिए चरण-দर-चरण निर्देशों के साथ विस्तृत व्यायाम गाइड का अन्वेषण करें।',
    bengali: 'শক্তি প্রশিক্ষণ, কার্ডিও ওয়ার্কআউট এবং নমনীয়তা ব্যায়ামের জন্য ধাপে ধাপে নির্দেশাবলী সহ বিস্তারিত ব্যায়াম গাইড অন্বেষণ করুন।'
  },
  "duration": {
    english: 'Duration',
    hindi: 'अवधि',
    bengali: 'সময়কাল'
  },
  "difficulty": {
    english: 'Difficulty',
    hindi: 'कठिनाई',
    bengali: 'কঠি��তা'
  },
  "beginner": {
    english: 'Beginner',
    hindi: 'शुरुआती',
    bengali: 'শিক্ষানবিস'
  },
  "intermediate": {
    english: 'Intermediate',
    hindi: 'मध्यवर्ती',
    bengali: 'মধ্যবর্তী'
  },
  "advanced": {
    english: 'Advanced',
    hindi: 'उन্নत',
    bengali: 'উন্নত'
  },
  "calories": {
    english: 'Calories',
    hindi: 'कैलोरी',
    bengali: 'ক্যালোরি'
  },
  "targets": {
    english: 'Targets',
    hindi: 'लक्ष्य',
    bengali: 'লক্ষ্য'
  },
  "steps": {
    english: 'Steps',
    hindi: 'कदम',
    bengali: 'পদক্ষেপ'
  },
  "tips": {
    english: 'Tips',
    hindi: 'युक्तियाँ',
    bengali: 'টিপস'
  }
};

export const translateText = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translations[key][language] || translations[key].english;
};

export const notifyLanguageChange = (language: Language): void => {
  toast({
    title: translateText("language_changed", language),
    duration: 2000,
  });
};
