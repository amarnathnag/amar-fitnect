
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Dumbbell, Heart, BarChart2, Flame, Award } from 'lucide-react';

interface Exercise {
  id: string;
  name: {
    english: string;
    hindi: string;
    bengali: string;
  };
  description: {
    english: string;
    hindi: string;
    bengali: string;
  };
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caloriesBurn: string;
  targetMuscles: string[];
  steps: {
    english: string[];
    hindi: string[];
    bengali: string[];
  };
  tips: {
    english: string[];
    hindi: string[];
    bengali: string[];
  };
  imageUrl?: string;
}

interface ExerciseCategory {
  id: string;
  name: {
    english: string;
    hindi: string;
    bengali: string;
  };
  description: {
    english: string;
    hindi: string;
    bengali: string;
  };
  exercises: Exercise[];
}

const ExerciseDetails = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('strength');

  // Exercise data with translations
  const exerciseCategories: ExerciseCategory[] = [
    {
      id: 'strength',
      name: {
        english: 'Strength Training',
        hindi: 'शक्ति प्रशिक्षण',
        bengali: 'শক্তি প্রশিক্ষণ'
      },
      description: {
        english: 'Build muscle and increase strength with these effective exercises.',
        hindi: 'इन प्रभावी व्यायामों से मांसपेशियों का निर्माण करें और ताकत बढ़ाएं।',
        bengali: 'এই কার্যকর ব্যায়ামগুলির সাথে পেশী তৈরি করুন এবং শক্তি বাড়ান।'
      },
      exercises: [
        {
          id: 'push-ups',
          name: {
            english: 'Push-ups',
            hindi: 'पुश-अप्स',
            bengali: 'পুশ-আপ'
          },
          description: {
            english: 'A classic bodyweight exercise that targets chest, shoulders, and triceps.',
            hindi: 'एक क्लासिक शरीर के वजन वाला व्यायाम जो छाती, कंधे और ट्राइसेप्स को लक्षित करता है।',
            bengali: 'একটি ক্লাসিক শরীরের ওজন ব্যায়াম যা বুক, কাঁধ এবং ট্রাইসেপস লক্ষ্য করে।'
          },
          duration: '5-10 min',
          difficulty: 'beginner',
          caloriesBurn: '100-200',
          targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
          steps: {
            english: [
              'Start in a plank position with hands slightly wider than shoulder-width apart',
              'Keep your body in a straight line from head to heels',
              'Lower your body until your chest nearly touches the floor',
              'Push yourself back up to the starting position',
              'Repeat for desired number of repetitions'
            ],
            hindi: [
              'हाथों को कंधे की चौड़ाई से थोड़ा चौड़ा रखकर प्लैंक स्थिति में शुरू करें',
              'अपने शरीर को सिर से एड़ी तक सीधी रेखा में रखें',
              'अपने शरीर को तब तक नीचे लाएं जब तक आपकी छाती फर्श को लगभग छू न ले',
              'खुद को वापस शुरुआती स्थिति में धकेलें',
              'वांछित दोहराव के लिए दोहराएं'
            ],
            bengali: [
              'হাত কাঁধের প্রস্থ থেকে সামান্য চওড়া রেখে প্ল্যাঙ্ক অবস্থানে শুরু করুন',
              'আপনার শরীরকে মাথা থেকে গোড়ালি পর্যন্ত একটি সোজা লাইনে রাখুন',
              'আপনার শরীর নামিয়ে আনুন যতক্ষণ না আপনার বুক মেঝে স্পর্শ করে',
              'নিজেকে আবার শুরুর অবস্থানে ঠেলে দিন',
              'কাঙ্ক্ষিত সংখ্যক পুনরাবৃত্তির জন্য পুনরাবৃত্তি করুন'
            ]
          },
          tips: {
            english: [
              'Keep your core engaged throughout the movement',
              'For easier version, do push-ups on your knees',
              'For harder version, elevate your feet on a step or bench'
            ],
            hindi: [
              'पूरी गति के दौरान अपने कोर को सक्रिय रखें',
              'आसान संस्करण के लिए, अपने घुटनों पर पुश-अप करें',
              'कठिन संस्करण के लिए, अपने पैरों को स्टेप या बेंच पर ऊंचा करें'
            ],
            bengali: [
              'সারা মুভমেন্ট জুড়ে আপনার কোর নিযুক্ত রাখুন',
              'সহজ সংস্করণের জন্য, আপনার হাঁটু পুশ-আপ করুন',
              'কঠিন সংস্করণের জন্য, আপনার পা একটি ধাপ বা বেঞ্চে উন্নীত করুন'
            ]
          },
          imageUrl: '/placeholder.svg'
        },
        {
          id: 'squats',
          name: {
            english: 'Squats',
            hindi: 'स्क्वाट्स',
            bengali: 'স্কোয়াট'
          },
          description: {
            english: 'A powerful lower body exercise that works multiple muscle groups simultaneously.',
            hindi: 'एक शक्तिशाली निचले शरीर का व्यायाम जो एक साथ कई मांसपेशी समूहों पर काम करता है।',
            bengali: 'একটি শক্তিশালী নিম্ন শরীরের ব্যায়াম যা একই সাথে একাধিক পেশী গ্রুপকে কার্য করে।'
          },
          duration: '5-10 min',
          difficulty: 'beginner',
          caloriesBurn: '150-250',
          targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Lower back'],
          steps: {
            english: [
              'Stand with feet shoulder-width apart',
              'Bend your knees and lower your hips as if sitting in a chair',
              'Keep your chest up and back straight',
              'Lower until thighs are parallel to the ground (or as low as comfortable)',
              'Push through your heels to return to standing position'
            ],
            hindi: [
              'पैरों को कंधे की चौड़ाई में खड़े हों',
              'अपने घुटनों को मोड़ें और अपने कूल्हों को इस तरह नीचे करें जैसे कुर्सी पर बैठे हों',
              'अपनी छाती को ऊपर और पीठ को सीधा रखें',
              'तब तक नीचे जाएं जब तक जांघें जमीन के समानांतर न हो जाएं (या जितना आरामदायक हो उतना नीचे)',
              'खड़ी स्थिति में वापस आने के लिए अपनी एड़ियों के माध्यम से धक्का दें'
            ],
            bengali: [
              'পা কাঁধের প্রস্থে দাঁড়ান',
              'আপনার হাঁটু বাঁকান এবং আপনার নিতম্ব নিচে করুন যেন চেয়ারে বসে আছেন',
              'আপনার বুক উপরে এবং পিছনে সোজা রাখুন',
              'উরু মাটির সমান্তরাল না হওয়া পর্যন্ত নিচে নামুন (অথবা যতটা আরামদায়ক ততটা নিচে)',
              'দাঁড়ানো অবস্থায় ফিরে যেতে আপনার গোড়ালি দিয়ে ঠেলুন'
            ]
          },
          tips: {
            english: [
              'Keep weight in your heels, not toes',
              'Don\'t let your knees extend past your toes',
              'Start with bodyweight before adding weights'
            ],
            hindi: [
              'वजन अपने पंजों में नहीं, एड़ियों में रखें',
              'अपने घुटनों को अपने पैर के अंगूठे से आगे न जाने दें',
              'वजन जोड़ने से पहले शरीर के वजन से शुरू करें'
            ],
            bengali: [
              'ওজন আপনার আঙ্গুলে নয়, গোড়ালিতে রাখুন',
              'আপনার হাঁটু আপনার পায়ের আঙ্গুল ছাড়িয়ে যেতে দেবেন না',
              'ওজন যোগ করার আগে শরীরের ওজন দিয়ে শুরু করুন'
            ]
          },
          imageUrl: '/placeholder.svg'
        }
      ]
    },
    {
      id: 'cardio',
      name: {
        english: 'Cardio Exercises',
        hindi: 'कार्डियो व्यायाम',
        bengali: 'কার্ডিও ব্যায়াম'
      },
      description: {
        english: 'Improve heart health and burn calories with these cardio workouts.',
        hindi: 'इन कार्डियो वर्कआउट के साथ हृदय स्वास्थ्य में सुधार करें और कैलोरी बर्न करें।',
        bengali: 'এই কার্ডিও ওয়ার্কআউটগুলির সাহায্যে হৃদয়ের স্বাস্থ্য উন্নত করুন এবং ক্যালোরি পোড়ান।'
      },
      exercises: [
        {
          id: 'jumping-jacks',
          name: {
            english: 'Jumping Jacks',
            hindi: 'जंपिंग जैक्स',
            bengali: 'জাম্পিং জ্যাকস'
          },
          description: {
            english: 'A simple but effective full-body cardio exercise.',
            hindi: 'एक सरल लेकिन प्रभावी पूरे शरीर का कार्डियो व्यायाम।',
            bengali: 'একটি সহজ কিন্তু কার্যকর সম্পূর্ণ-শরীরের কার্ডিও ব্যায়াম।'
          },
          duration: '5-15 min',
          difficulty: 'beginner',
          caloriesBurn: '200-300',
          targetMuscles: ['Full body', 'Cardiovascular system'],
          steps: {
            english: [
              'Stand with feet together and arms at your sides',
              'Jump while raising arms above your head and spreading legs to sides',
              'Jump again to return to starting position',
              'Repeat at a brisk pace'
            ],
            hindi: [
              'पैर एक साथ और हाथ अपने पार्श्व में खड़े हों',
              'हाथों को सिर के ऊपर उठाते हुए और पैरों को किनारों पर फैलाते हुए कूदें',
              'प्रारंभिक स्थिति पर लौटने के लिए फिर से कूदें',
              'तेज गति से दोहराएं'
            ],
            bengali: [
              'পা একসাথে এবং হাত পাশে রেখে দাঁড়ান',
              'হাত মাথার উপরে তুলে এবং পা পাশে ছড়িয়ে দিয়ে লাফান',
              'শুরুর অবস্থানে ফিরে আসতে আবার লাফান',
              'দ্রুত গতিতে পুনরাবৃত্তি করুন'
            ]
          },
          tips: {
            english: [
              'Maintain a steady rhythm',
              'Land softly to protect your joints',
              'For low impact, step out instead of jumping'
            ],
            hindi: [
              'एक स्थिर लय बनाए रखें',
              'अपने जोड़ों की रक्षा के लिए धीरे से लैंड करें',
              'कम प्रभाव के लिए, कूदने के बजाय बाहर कदम रखें'
            ],
            bengali: [
              'একটি স্থির ছন্দ বজায় রাখুন',
              'আপনার জয়েন্টগুলি রক্ষা করতে নরম ভাবে ল্যান্ড করুন',
              'কম প্রভাবের জন্য, লাফানোর পরিবর্তে বাইরে পা ফেলুন'
            ]
          },
          imageUrl: '/placeholder.svg'
        },
        {
          id: 'high-knees',
          name: {
            english: 'High Knees',
            hindi: 'हाई नीज',
            bengali: 'হাই নিস'
          },
          description: {
            english: 'A cardio exercise that also strengthens your legs and core.',
            hindi: 'एक कार्डियो व्यायाम जो आपके पैरों और कोर को भी मजबूत करता है।',
            bengali: 'একটি কার্ডিও ব্যায়াম যা আপনার পা এবং কোরকেও শক্তিশালী করে।'
          },
          duration: '3-5 min',
          difficulty: 'intermediate',
          caloriesBurn: '250-350',
          targetMuscles: ['Quadriceps', 'Hip flexors', 'Core', 'Cardiovascular system'],
          steps: {
            english: [
              'Stand with feet hip-width apart',
              'Run in place, bringing knees up to hip level',
              'Pump arms in coordination with legs',
              'Maintain an upright posture throughout'
            ],
            hindi: [
              'पैरों को कूल्हे की चौड़ाई में खड़े हों',
              'एक ही जगह पर दौड़ें, घुटनों को कूल्हे के स्तर तक ऊपर लाएं',
              'पैरों के समन्वय में हाथों को पंप करें',
              'पूरे समय सीधा मुद्रा बनाए रखें'
            ],
            bengali: [
              'পা নিতম্বের প্রস্থের দূরত্বে দাঁড়ান',
              'একই জায়গায় দৌড়ান, হাঁটু নিতম্বের লেভেলে উঠিয়ে',
              'পা সমন্বয়ে হাত পাম্প করুন',
              'পুরো সময় সোজা ভঙ্গি বজায় রাখুন'
            ]
          },
          tips: {
            english: [
              'Focus on height rather than speed initially',
              'Keep your core engaged to protect your lower back',
              'For more intensity, increase speed'
            ],
            hindi: [
              'शुरू में गति के बजाय ऊंचाई पर ध्यान दें',
              'अपनी निचली पीठ की रक्षा के लिए अपने कोर को सक्रिय रखें',
              'अधिक तीव्रता के लिए, गति बढ़ाएं'
            ],
            bengali: [
              'প্রাথমিকভাবে গতির পরিবর্তে উচ্চতার উপর ফোকাস করুন',
              'আপনার নিম্ন পিঠ রক্ষা করতে আপনার কোর নিযুক্ত রাখুন',
              'আরও তীব্রতার জন্য, গতি বাড়ান'
            ]
          },
          imageUrl: '/placeholder.svg'
        }
      ]
    },
    {
      id: 'flexibility',
      name: {
        english: 'Flexibility & Stretching',
        hindi: 'लचीलापन और स्ट्रेचिंग',
        bengali: 'নমনীয়তা ও স্ট্রেচিং'
      },
      description: {
        english: 'Improve your flexibility, reduce injury risk, and relieve muscle tension.',
        hindi: 'अपनी लचीलापन में सुधार करें, चोट के जोखिम को कम करें, और मांसपेशियों के तनाव को कम करें।',
        bengali: 'আপনার নমনীয়তা উন্নত করুন, আঘাতের ঝুঁকি কমান, এবং পেশী টেনশন কমান।'
      },
      exercises: [
        {
          id: 'hamstring-stretch',
          name: {
            english: 'Hamstring Stretch',
            hindi: 'हैमस्ट्रिंग स्ट्रेच',
            bengali: 'হ্যামস্ট্রিং স্ট্রেচ'
          },
          description: {
            english: 'A basic stretch that targets the back of your legs.',
            hindi: 'एक बुनियादी खिंचाव जो आपके पैरों के पीछे को लक्षित करता है।',
            bengali: 'একটি মৌলিক স্ট্রেচ যা আপনার পায়ের পিছনে লক্ষ্য করে।'
          },
          duration: '1-2 min per leg',
          difficulty: 'beginner',
          caloriesBurn: '5-10',
          targetMuscles: ['Hamstrings', 'Lower back'],
          steps: {
            english: [
              'Sit on the floor with one leg extended and the other bent',
              'Reach toward your toes of the extended leg',
              'Hold the stretch for 20-30 seconds',
              'Repeat with the other leg'
            ],
            hindi: [
              'एक पैर को विस्तारित और दूसरे को मुड़ा हुआ रखकर फर्श पर बैठें',
              'विस्तारित पैर के पंजों की ओर पहुंचें',
              'स्ट्रेच को 20-30 सेकंड तक पकड़े रखें',
              'दूसरे पैर के साथ दोहराएं'
            ],
            bengali: [
              'একটি পা প্রসারিত এবং অন্যটি বাঁকানো অবস্থায় মেঝেতে বসুন',
              'প্রসারিত পায়ের আঙ্গুলের দিকে পৌঁছান',
              'স্ট্রেচ 20-30 সেকেন্ড ধরে রাখুন',
              'অন্য পা দিয়ে পুনরাবৃত্তি করুন'
            ]
          },
          tips: {
            english: [
              'Don\'t bounce, hold the stretch steady',
              'Breathe deeply and relax into the stretch',
              'Only stretch to the point of mild tension, not pain'
            ],
            hindi: [
              'उछलें नहीं, स्ट्रेच को स्थिर रखें',
              'गहरी सांस लें और स्ट्रेच में आराम करें',
              'केवल हल्के तनाव के बिंदु तक खींचें, दर्द तक नहीं'
            ],
            bengali: [
              'বাউন্স করবেন না, স্ট্রেচ স্থির রাখুন',
              'গভীরভাবে শ্বাস নিন এবং স্ট্রেচে আরাম করুন',
              'শুধুমাত্র হালকা টেনশন পর্যন্ত স্ট্রেচ করুন, ব্যথা পর্যন্ত নয়'
            ]
          },
          imageUrl: '/placeholder.svg'
        },
        {
          id: 'shoulder-stretch',
          name: {
            english: 'Shoulder Stretch',
            hindi: 'कंधे का स्ट्रेच',
            bengali: 'কাঁধের স্ট্রেচ'
          },
          description: {
            english: 'Relieves tension in the shoulders and upper back.',
            hindi: 'कंधों और ऊपरी पीठ में तनाव को कम करता है।',
            bengali: 'কাঁধ এবং উপরের পিঠে টেনশন কমায়।'
          },
          duration: '1-2 min per side',
          difficulty: 'beginner',
          caloriesBurn: '5-10',
          targetMuscles: ['Shoulders', 'Upper back', 'Triceps'],
          steps: {
            english: [
              'Bring one arm across your chest',
              'Use the opposite hand to gently pull the elbow toward your chest',
              'Hold for 20-30 seconds',
              'Repeat with the other arm'
            ],
            hindi: [
              'एक हाथ को अपनी छाती के आर-पार लाएं',
              'कोहनी को अपनी छाती की ओर धीरे से खींचने के लिए विपरीत हाथ का उपयोग करें',
              '20-30 सेकंड तक पकड़े रखें',
              'दूसरे हाथ के साथ दोहराएं'
            ],
            bengali: [
              'একটি হাত আপনার বুকের আড়াআড়ি নিয়ে আসুন',
              'কনুইকে আপনার বুকের দিকে আলতো করে টানতে বিপরীত হাত ব্যবহার করুন',
              '20-30 সেকেন্ড ধরে রাখুন',
              'অন্য হাত দিয়ে পুনরাবৃত্তি করুন'
            ]
          },
          tips: {
            english: [
              'Keep shoulders relaxed, not hunched',
              'Pull gently - no pain should be felt',
              'Maintain good posture throughout'
            ],
            hindi: [
              'कंधों को आराम दें, झुकें नहीं',
              'धीरे से खींचें - कोई दर्द महसूस नहीं होना चाहिए',
              'पूरे समय अच्छी मुद्रा बनाए रखें'
            ],
            bengali: [
              'কাঁধ আরাম রাখুন, কুঁজো করবেন না',
              'আলতো করে টানুন - কোন ব্যথা অনুভব করা উচিত নয়',
              'পুরো সময় ভালো ভঙ্গি বজায় রাখুন'
            ]
          },
          imageUrl: '/placeholder.svg'
        }
      ]
    }
  ];

  // Function to render exercise details
  const renderExerciseDetails = (exercise: Exercise) => {
    return (
      <Card key={exercise.id} className="mb-6 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-health-primary/10 to-transparent">
          <CardTitle>{exercise.name[language]}</CardTitle>
          <CardDescription>{exercise.description[language]}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video mb-4 flex items-center justify-center">
                {exercise.imageUrl ? (
                  <img 
                    src={exercise.imageUrl} 
                    alt={exercise.name[language]} 
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Dumbbell size={48} className="text-gray-400" />
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-health-primary" />
                  <span className="text-sm">
                    {translateText("duration", language)}: {exercise.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-health-primary" />
                  <span className="text-sm">
                    {translateText("difficulty", language)}: {translateText(exercise.difficulty, language)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-health-primary" />
                  <span className="text-sm">
                    {translateText("calories", language)}: {exercise.caloriesBurn}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-health-primary" />
                  <span className="text-sm">
                    {translateText("targets", language)}: {exercise.targetMuscles.join(', ')}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{translateText("steps", language)}:</h4>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                {exercise.steps[language].map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              
              <h4 className="font-medium mb-2">{translateText("tips", language)}:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {exercise.tips[language].map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-health-primary mb-2">
              {translateText("exerciseDetailTitle", language)}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {translateText("exerciseDetailDescription", language)}
            </p>
          </div>
          
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8">
              {exerciseCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  {category.id === 'strength' && <Dumbbell className="h-4 w-4" />}
                  {category.id === 'cardio' && <Heart className="h-4 w-4" />}
                  {category.id === 'flexibility' && <Flame className="h-4 w-4" />}
                  {category.name[language]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {exerciseCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">{category.name[language]}</h2>
                  <p className="text-gray-600 mb-6">{category.description[language]}</p>
                  
                  {category.exercises.map((exercise) => renderExerciseDetails(exercise))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExerciseDetails;
