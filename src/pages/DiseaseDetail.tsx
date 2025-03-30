
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Utensils, Heart, X, Check, Info, AlertCircle, Dumbbell, Droplet } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Disease data object
const diseaseData = {
  diabetes: {
    name: "Diabetes Management",
    description: "Comprehensive management plan for Type 1 and Type 2 diabetes focusing on blood sugar control through diet, exercise, and lifestyle modifications.",
    overview: "Diabetes is a chronic condition that affects how your body turns food into energy. With diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should.",
    dietPlan: {
      title: "Diabetes-Friendly Diet Plan",
      description: "A balanced diet that helps regulate blood sugar levels while providing essential nutrients.",
      mealPlan: [
        {
          type: "Breakfast",
          options: [
            "Steel-cut oatmeal topped with nuts and cinnamon (no added sugar)",
            "Vegetable omelet with whole grain toast",
            "Greek yogurt with berries and flaxseeds"
          ]
        },
        {
          type: "Lunch",
          options: [
            "Grilled chicken salad with olive oil and vinegar dressing",
            "Quinoa bowl with roasted vegetables and lean protein",
            "Lentil soup with a side of leafy greens"
          ]
        },
        {
          type: "Dinner",
          options: [
            "Baked fish with steamed non-starchy vegetables",
            "Turkey and vegetable stir-fry with brown rice",
            "Grilled tofu with roasted vegetables and a small portion of sweet potato"
          ]
        },
        {
          type: "Snacks",
          options: [
            "Small apple with a tablespoon of almond butter",
            "Celery sticks with hummus",
            "A small handful of nuts and seeds"
          ]
        }
      ],
      foodsToEat: [
        "Leafy greens (spinach, kale, lettuce)",
        "Non-starchy vegetables (broccoli, cauliflower, bell peppers)",
        "Whole grains (brown rice, quinoa, whole wheat bread)",
        "Lean proteins (chicken, fish, tofu, legumes)",
        "Healthy fats (avocado, olive oil, nuts, seeds)",
        "Low glycemic fruits (berries, apples, pears)"
      ],
      foodsToAvoid: [
        "Refined carbohydrates (white bread, pasta, rice)",
        "Sugary beverages (soda, fruit juice, sports drinks)",
        "Processed snacks and desserts",
        "Fried foods and saturated fats",
        "Alcohol (limit consumption)",
        "Foods with added sugars"
      ]
    },
    lifestyle: {
      title: "Lifestyle Recommendations for Diabetes",
      routine: [
        { time: "7:00 AM", activity: "Wake up and check blood sugar levels" },
        { time: "7:30 AM", activity: "Morning walk (15-30 minutes)" },
        { time: "8:00 AM", activity: "Balanced breakfast" },
        { time: "10:30 AM", activity: "Healthy snack if needed" },
        { time: "12:30 PM", activity: "Balanced lunch" },
        { time: "3:00 PM", activity: "Afternoon snack if needed & blood sugar check" },
        { time: "5:00 PM", activity: "Exercise (30-45 minutes)" },
        { time: "7:00 PM", activity: "Balanced dinner" },
        { time: "9:00 PM", activity: "Evening blood sugar check" },
        { time: "10:30 PM", activity: "Bedtime" }
      ],
      exercise: [
        "Aim for 150 minutes of moderate aerobic activity per week",
        "Include resistance training 2-3 times per week",
        "Take short walking breaks throughout the day",
        "Consider activities like swimming, cycling, or yoga",
        "Always carry fast-acting carbohydrates during exercise"
      ],
      tips: [
        "Monitor blood sugar regularly as advised by your healthcare provider",
        "Take medications as prescribed",
        "Stay well-hydrated throughout the day",
        "Manage stress through meditation, deep breathing, or other relaxation techniques",
        "Get adequate sleep (7-8 hours per night)",
        "Attend regular check-ups with your healthcare team"
      ]
    },
    hydration: {
      title: "Hydration Guidelines for Diabetes",
      tips: [
        "Drink at least 8-10 cups (64-80 oz) of water daily",
        "Carry a water bottle to track intake",
        "Avoid sugary drinks and limit diet sodas",
        "Infuse water with cucumber, mint, or berries for flavor",
        "Drink water before, during, and after exercise",
        "Include hydrating foods in your diet (e.g., cucumber, watermelon)"
      ]
    }
  },
  hypertension: {
    name: "Hypertension Management",
    description: "Comprehensive plan for managing high blood pressure through dietary approaches, physical activity, and stress management techniques.",
    overview: "Hypertension, or high blood pressure, is a common condition where the force of blood against your artery walls is consistently too high, which can lead to heart disease and stroke if not properly managed.",
    dietPlan: {
      title: "DASH Diet Plan for Hypertension",
      description: "The Dietary Approaches to Stop Hypertension (DASH) diet is specially designed to help lower blood pressure.",
      mealPlan: [
        {
          type: "Breakfast",
          options: [
            "Overnight oats with berries and a sprinkle of flaxseeds",
            "Whole grain toast with avocado and poached egg",
            "Smoothie with spinach, banana, and low-fat yogurt"
          ]
        },
        {
          type: "Lunch",
          options: [
            "Quinoa salad with plenty of vegetables and olive oil dressing",
            "Grilled chicken sandwich on whole grain bread with lettuce and tomato",
            "Lentil soup with a side salad"
          ]
        },
        {
          type: "Dinner",
          options: [
            "Baked salmon with roasted vegetables and brown rice",
            "Turkey chili with beans and vegetables (low sodium)",
            "Stir-fried tofu with vegetables and a small portion of whole grain noodles"
          ]
        },
        {
          type: "Snacks",
          options: [
            "Handful of unsalted nuts",
            "Apple with a small piece of low-fat cheese",
            "Greek yogurt with berries"
          ]
        }
      ],
      foodsToEat: [
        "Fruits and vegetables (aim for 8-10 servings daily)",
        "Whole grains (brown rice, whole wheat bread, oats)",
        "Lean proteins (poultry, fish, legumes)",
        "Low-fat dairy products",
        "Nuts, seeds, and legumes",
        "Healthy oils (olive oil, avocado oil)"
      ],
      foodsToAvoid: [
        "High-sodium foods (processed foods, canned soups, deli meats)",
        "Saturated and trans fats",
        "Added sugars and sweets",
        "Alcohol (limit to moderate consumption)",
        "Caffeine (limit intake)",
        "Red meat (limit consumption)"
      ]
    },
    lifestyle: {
      title: "Lifestyle Recommendations for Hypertension",
      routine: [
        { time: "6:30 AM", activity: "Wake up and measure blood pressure" },
        { time: "7:00 AM", activity: "Light stretching or yoga (15 minutes)" },
        { time: "7:30 AM", activity: "Balanced breakfast" },
        { time: "9:30 AM", activity: "Take medications as prescribed" },
        { time: "12:30 PM", activity: "Balanced lunch" },
        { time: "2:00 PM", activity: "Brief relaxation breathing (5 minutes)" },
        { time: "5:00 PM", activity: "Exercise (30-45 minutes)" },
        { time: "6:30 PM", activity: "Balanced dinner (low sodium)" },
        { time: "8:00 PM", activity: "Relaxation activities (reading, gentle stretching)" },
        { time: "9:30 PM", activity: "Measure blood pressure" },
        { time: "10:00 PM", activity: "Bedtime" }
      ],
      exercise: [
        "Aim for 150 minutes of moderate aerobic activity weekly",
        "Include activities like walking, swimming, or cycling",
        "Add 2-3 days of strength training per week",
        "Incorporate flexibility exercises like yoga",
        "Avoid high-intensity exercises without medical clearance"
      ],
      tips: [
        "Monitor your blood pressure regularly",
        "Take medications exactly as prescribed",
        "Practice stress management techniques daily",
        "Maintain a healthy weight",
        "Limit alcohol consumption",
        "Quit smoking if applicable",
        "Get adequate sleep (7-8 hours nightly)"
      ]
    },
    hydration: {
      title: "Hydration Guidelines for Hypertension",
      tips: [
        "Drink 8-10 glasses of water daily",
        "Limit caffeine intake to 1-2 cups daily",
        "Avoid alcohol or limit significantly",
        "Choose water instead of sugary beverages",
        "Consider adding a slice of lemon or cucumber for flavor",
        "Stay consistent with hydration throughout the day"
      ]
    }
  },
  thyroid: {
    name: "Thyroid Disorder Management",
    description: "Personalized approach to managing hypothyroidism and hyperthyroidism through nutrition, lifestyle adjustments, and stress management.",
    overview: "Thyroid disorders affect the function of the thyroid gland, which produces hormones that regulate metabolism. Both hypothyroidism (underactive thyroid) and hyperthyroidism (overactive thyroid) require specific management approaches.",
    dietPlan: {
      title: "Thyroid-Supportive Diet Plan",
      description: "A nutrient-dense diet that supports thyroid function while avoiding foods that may interfere with thyroid medications or function.",
      mealPlan: [
        {
          type: "Breakfast",
          options: [
            "Greek yogurt with berries, nuts, and a drizzle of honey",
            "Scrambled eggs with vegetables and whole grain toast",
            "Smoothie with spinach, banana, almond milk, and chia seeds"
          ]
        },
        {
          type: "Lunch",
          options: [
            "Grilled salmon salad with mixed greens and olive oil dressing",
            "Turkey and avocado wrap with vegetable soup",
            "Quinoa bowl with roasted vegetables and chicken"
          ]
        },
        {
          type: "Dinner",
          options: [
            "Baked cod with roasted sweet potatoes and steamed broccoli",
            "Lentil and vegetable stew with a small portion of brown rice",
            "Grilled chicken with quinoa and sautéed greens"
          ]
        },
        {
          type: "Snacks",
          options: [
            "Apple slices with almond butter",
            "Small handful of brazil nuts and dried fruits",
            "Hummus with vegetable sticks"
          ]
        }
      ],
      foodsToEat: [
        "Selenium-rich foods (brazil nuts, seafood, eggs)",
        "Zinc-rich foods (oysters, beef, pumpkin seeds)",
        "Iodine-containing foods (seaweed, fish, iodized salt) - in moderation for Hashimoto's",
        "Protein-rich foods (lean meats, fish, legumes, eggs)",
        "Antioxidant-rich fruits and vegetables",
        "Healthy fats (olive oil, avocado, nuts)"
      ],
      foodsToAvoid: [
        "Highly processed foods with artificial additives",
        "Excessive soy products (especially with hypothyroidism)",
        "Cruciferous vegetables in large amounts when raw (especially with hypothyroidism)",
        "Gluten (if you have autoimmune thyroid disease)",
        "Excessive intake of goitrogenic foods",
        "Don't take calcium or iron supplements within 4 hours of thyroid medication"
      ]
    },
    lifestyle: {
      title: "Lifestyle Recommendations for Thyroid Health",
      routine: [
        { time: "6:00 AM", activity: "Take thyroid medication on empty stomach" },
        { time: "6:30 AM", activity: "Wait 30-60 minutes before eating" },
        { time: "7:30 AM", activity: "Balanced breakfast" },
        { time: "10:00 AM", activity: "Light snack if needed" },
        { time: "12:30 PM", activity: "Balanced lunch" },
        { time: "3:00 PM", activity: "Afternoon snack if needed" },
        { time: "5:00 PM", activity: "Gentle exercise (30 minutes)" },
        { time: "7:00 PM", activity: "Balanced dinner" },
        { time: "8:30 PM", activity: "Relaxation activities" },
        { time: "10:00 PM", activity: "Bedtime" }
      ],
      exercise: [
        "Focus on low to moderate intensity exercise",
        "Include walking, swimming, or cycling",
        "Add gentle strength training 2-3 times weekly",
        "Try yoga or tai chi for stress reduction",
        "Avoid excessive high-intensity exercise with untreated hyperthyroidism",
        "Listen to your body and adjust intensity based on energy levels"
      ],
      tips: [
        "Take medications consistently at the same time each day",
        "Wait 30-60 minutes before eating after taking thyroid medication",
        "Get regular blood tests to monitor thyroid levels",
        "Manage stress through mindfulness, meditation, or deep breathing",
        "Ensure adequate sleep (7-9 hours)",
        "Keep a symptom journal to track how you feel"
      ]
    },
    hydration: {
      title: "Hydration Guidelines for Thyroid Health",
      tips: [
        "Drink 8-10 glasses of filtered water daily",
        "Avoid drinking water with thyroid medication (wait 30 minutes)",
        "Consider herbal teas like chamomile or ginger",
        "Avoid excessive caffeine, especially with hyperthyroidism",
        "Stay well-hydrated to support metabolism and digestion",
        "Drink water between meals rather than with meals"
      ]
    }
  },
  "heart-disease": {
    name: "Heart Disease Management",
    description: "Comprehensive approach to managing and preventing cardiovascular disease through heart-healthy diet, appropriate exercise, and lifestyle modifications.",
    overview: "Heart disease encompasses various conditions affecting heart function and blood vessel health. A heart-healthy lifestyle can help manage existing conditions and prevent complications.",
    dietPlan: {
      title: "Heart-Healthy Diet Plan",
      description: "A Mediterranean-style diet approach that emphasizes foods that support cardiovascular health and limits those that may contribute to heart disease.",
      mealPlan: [
        {
          type: "Breakfast",
          options: [
            "Steel-cut oatmeal with berries, walnuts, and a drizzle of honey",
            "Whole grain toast with avocado and a poached egg",
            "Greek yogurt parfait with fruits, nuts, and a sprinkle of flaxseeds"
          ]
        },
        {
          type: "Lunch",
          options: [
            "Grilled fish with a large salad and olive oil dressing",
            "Mediterranean bowl with quinoa, chickpeas, vegetables, and tahini",
            "Lentil soup with a side of leafy greens"
          ]
        },
        {
          type: "Dinner",
          options: [
            "Baked salmon with roasted vegetables and brown rice",
            "Vegetable and bean stew with a small portion of whole grain bread",
            "Grilled chicken with steamed vegetables and sweet potato"
          ]
        },
        {
          type: "Snacks",
          options: [
            "Handful of unsalted nuts",
            "Apple or pear with almond butter",
            "Hummus with vegetable sticks"
          ]
        }
      ],
      foodsToEat: [
        "Fatty fish (salmon, mackerel, sardines) high in omega-3",
        "Plenty of fruits and vegetables (aim for a colorful variety)",
        "Whole grains (brown rice, quinoa, oats, whole wheat)",
        "Healthy fats (olive oil, avocados, nuts, seeds)",
        "Legumes (beans, lentils, chickpeas)",
        "Low-fat dairy or plant-based alternatives"
      ],
      foodsToAvoid: [
        "Foods high in saturated and trans fats",
        "High-sodium foods (processed foods, canned soups, etc.)",
        "Refined carbohydrates and added sugars",
        "Excessive red meat consumption",
        "Sugar-sweetened beverages",
        "Excessive alcohol consumption"
      ]
    },
    lifestyle: {
      title: "Lifestyle Recommendations for Heart Health",
      routine: [
        { time: "6:30 AM", activity: "Wake up and take medications as prescribed" },
        { time: "7:00 AM", activity: "Light activity (gentle stretching or short walk)" },
        { time: "7:30 AM", activity: "Heart-healthy breakfast" },
        { time: "10:00 AM", activity: "Healthy snack if needed" },
        { time: "12:30 PM", activity: "Balanced lunch" },
        { time: "2:00 PM", activity: "Short walk (10-15 minutes)" },
        { time: "3:30 PM", activity: "Afternoon snack if needed" },
        { time: "5:00 PM", activity: "Exercise (as approved by doctor)" },
        { time: "6:30 PM", activity: "Heart-healthy dinner" },
        { time: "8:00 PM", activity: "Relaxation activities" },
        { time: "9:30 PM", activity: "Bedtime" }
      ],
      exercise: [
        "Consult with your doctor before starting any exercise program",
        "Aim for 150 minutes of moderate aerobic activity weekly",
        "Include activities like walking, swimming, or cycling",
        "Add 2-3 days of light strength training",
        "Focus on consistency rather than intensity",
        "Monitor your heart rate during exercise",
        "Stop immediately if you experience chest pain, dizziness, or shortness of breath"
      ],
      tips: [
        "Take medications exactly as prescribed",
        "Monitor blood pressure regularly if recommended",
        "Manage stress through relaxation techniques",
        "Quit smoking and avoid secondhand smoke",
        "Maintain a healthy weight",
        "Get adequate sleep (7-8 hours)",
        "Attend all scheduled medical appointments"
      ]
    },
    hydration: {
      title: "Hydration Guidelines for Heart Health",
      tips: [
        "Drink 8-10 glasses of water daily",
        "Limit caffeine to moderate amounts",
        "Restrict alcohol consumption",
        "Choose water instead of sugary beverages",
        "Be consistent with hydration throughout the day",
        "Increase water intake during exercise and hot weather"
      ]
    }
  },
  obesity: {
    name: "Obesity Management",
    description: "Comprehensive approach to weight management through sustainable dietary changes, appropriate physical activity, and behavioral strategies.",
    overview: "Obesity is a complex condition involving excessive body fat accumulation that presents health risks. Sustainable lifestyle changes rather than quick fixes are essential for long-term management.",
    dietPlan: {
      title: "Balanced Weight Management Diet",
      description: "A nutritionally complete, calorie-controlled eating plan that focuses on whole foods while creating a small, sustainable calorie deficit.",
      mealPlan: [
        {
          type: "Breakfast",
          options: [
            "Veggie egg white omelet with a slice of whole grain toast",
            "Protein smoothie with spinach, berries, and plant-based protein",
            "Overnight oats with Greek yogurt and fresh fruit"
          ]
        },
        {
          type: "Lunch",
          options: [
            "Large salad with grilled chicken, plenty of vegetables, and light dressing",
            "Lentil soup with a side of mixed greens",
            "Turkey and vegetable wrap with hummus"
          ]
        },
        {
          type: "Dinner",
          options: [
            "Baked fish with roasted vegetables and a small portion of quinoa",
            "Stir-fried tofu with vegetables and a small portion of brown rice",
            "Lean protein with steamed vegetables and sweet potato"
          ]
        },
        {
          type: "Snacks",
          options: [
            "Apple slices with a tablespoon of nut butter",
            "Greek yogurt with berries",
            "Vegetable sticks with hummus"
          ]
        }
      ],
      foodsToEat: [
        "Vegetables (aim to fill half your plate)",
        "Fruits (in moderate portions)",
        "Lean proteins (chicken, fish, tofu, legumes)",
        "Whole grains in moderate portions",
        "Healthy fats (olive oil, avocado, nuts in controlled portions)",
        "Low-fat dairy or plant-based alternatives"
      ],
      foodsToAvoid: [
        "Ultra-processed foods high in refined carbohydrates",
        "Foods with added sugars",
        "Fried foods and those high in unhealthy fats",
        "Sugar-sweetened beverages",
        "Large portions and mindless eating",
        "Alcohol (limit consumption)"
      ]
    },
    lifestyle: {
      title: "Lifestyle Recommendations for Weight Management",
      routine: [
        { time: "6:30 AM", activity: "Wake up and drink a glass of water" },
        { time: "7:00 AM", activity: "Morning activity (15-30 minutes)" },
        { time: "7:30 AM", activity: "Balanced breakfast" },
        { time: "10:00 AM", activity: "Healthy snack if hungry" },
        { time: "12:30 PM", activity: "Portion-controlled lunch" },
        { time: "2:00 PM", activity: "Brief walk (10-15 minutes)" },
        { time: "3:30 PM", activity: "Afternoon snack if needed" },
        { time: "5:30 PM", activity: "Exercise (45-60 minutes)" },
        { time: "7:00 PM", activity: "Portion-controlled dinner" },
        { time: "8:30 PM", activity: "Evening walk (15 minutes)" },
        { time: "9:30 PM", activity: "Bedtime" }
      ],
      exercise: [
        "Aim for 150-300 minutes of moderate activity weekly",
        "Include both cardio and strength training",
        "Start slowly and gradually increase intensity",
        "Find activities you enjoy to maintain consistency",
        "Consider working with a fitness professional",
        "Include everyday movement (take stairs, park farther away)",
        "Break up sitting time with movement breaks"
      ],
      tips: [
        "Practice mindful eating (eat slowly, without distractions)",
        "Use smaller plates to help with portion control",
        "Plan meals ahead to avoid impulsive food choices",
        "Keep a food and activity journal",
        "Focus on behavior changes rather than the scale",
        "Seek support from family, friends, or support groups",
        "Consider working with healthcare professionals"
      ]
    },
    hydration: {
      title: "Hydration Guidelines for Weight Management",
      tips: [
        "Drink 8-10 glasses of water daily",
        "Have water before meals to help with portion control",
        "Replace sugary beverages with water or unsweetened options",
        "Carry a reusable water bottle to track intake",
        "Add natural flavors (lemon, cucumber, mint) if needed",
        "Be aware that thirst can be mistaken for hunger"
      ]
    }
  }
};

const DiseaseDetail = () => {
  const { diseaseId } = useParams();
  
  // Check if disease exists in our data
  if (!diseaseId || !diseaseData[diseaseId as keyof typeof diseaseData]) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Disease Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The disease information you're looking for doesn't exist or isn't available yet.
            </p>
            <Button asChild>
              <Link to="/disease-management">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Disease Management
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const disease = diseaseData[diseaseId as keyof typeof diseaseData];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Back button and title */}
        <div className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <div>
                <Button variant="outline" className="mb-4" asChild>
                  <Link to="/disease-management">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Disease Management
                  </Link>
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold">{disease.name}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 max-w-3xl">
                  {disease.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="py-10">
          <div className="container-custom">
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-health-primary" /> Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {disease.overview}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Diet Plan Section */}
        <section className="py-10 bg-gray-50 dark:bg-gray-800/10">
          <div className="container-custom">
            <h2 className="section-title mb-6">{disease.dietPlan.title}</h2>
            <p className="section-subtitle mb-8 max-w-3xl mx-auto">
              {disease.dietPlan.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Foods to eat */}
              <Card className="health-card">
                <CardHeader className="bg-health-light/50 dark:bg-health-dark/20">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Check className="h-5 w-5 text-green-600" /> Foods to Include
                  </CardTitle>
                  <CardDescription>
                    Incorporate these foods regularly in your diet
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {disease.dietPlan.foodsToEat.map((food, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Foods to avoid */}
              <Card className="health-card">
                <CardHeader className="bg-red-50 dark:bg-red-900/10">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <X className="h-5 w-5 text-red-600" /> Foods to Limit or Avoid
                  </CardTitle>
                  <CardDescription>
                    Minimize or eliminate these foods from your diet
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    {disease.dietPlan.foodsToAvoid.map((food, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sample Meal Plan */}
            <h3 className="text-xl font-semibold mb-4">Sample Meal Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {disease.dietPlan.mealPlan.map((meal, index) => (
                <Card key={index} className="health-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Utensils className="h-4 w-4 text-health-primary" /> {meal.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {meal.options.map((option, optIndex) => (
                        <li key={optIndex} className="text-sm pl-4 border-l-2 border-health-primary/30">
                          {option}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button className="btn-primary" asChild>
                <Link to="/diet-plans">
                  View Detailed Diet Plans
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Daily Routine Section */}
        <section className="py-10">
          <div className="container-custom">
            <h2 className="section-title mb-8">{disease.lifestyle.title}</h2>

            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Recommended Daily Routine</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {disease.lifestyle.routine.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/20 rounded-lg">
                    <div className="w-20 text-center">
                      <span className="font-semibold text-health-primary">{item.time}</span>
                    </div>
                    <div className="h-full w-px bg-health-primary/30 mx-4"></div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{item.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Exercise Recommendations */}
              <Card className="health-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-health-primary" /> Exercise Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {disease.lifestyle.exercise.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-health-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-health-primary">{index + 1}</span>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Hydration Guidelines */}
              <Card className="health-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-health-primary" /> {disease.hydration.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {disease.hydration.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-health-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-health-primary">{index + 1}</span>
                        </div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Additional Tips */}
            <Card className="health-card mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-health-primary" /> Additional Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {disease.lifestyle.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-health-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-health-primary">{index + 1}</span>
                      </div>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-health-primary/10 dark:bg-health-primary/5">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-health-dark dark:text-health-primary">Need More Personalized Guidance?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get expert help with a tailored plan specific to your health condition, goals, and preferences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-health-primary hover:bg-health-dark" asChild>
                <Link to="/daily-routine">
                  View Daily Routines
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/workouts">
                  Explore Workouts
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="py-8">
          <div className="container-custom">
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-500 mb-1">Medical Disclaimer</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    The information provided is for general informational purposes only and should not be considered as 
                    medical advice. Always consult with qualified healthcare providers for medical advice, diagnosis, 
                    or treatment that's specific to your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiseaseDetail;
