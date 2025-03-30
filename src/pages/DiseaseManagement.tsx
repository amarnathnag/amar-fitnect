import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Heart, Droplet, Dumbbell, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface DiseaseCard {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  icon: React.ReactNode;
  color: string;
}

const DiseaseManagement = () => {
  const diseases: DiseaseCard[] = [
    {
      id: 'diabetes',
      title: 'Diabetes',
      description: 'Comprehensive management of Type 1 and Type 2 diabetes through diet, exercise, and lifestyle changes.',
      symptoms: ['Increased thirst', 'Frequent urination', 'Extreme hunger', 'Unexplained weight loss', 'Fatigue', 'Blurred vision'],
      icon: <Droplet className="h-10 w-10" />,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      id: 'hypertension',
      title: 'Hypertension',
      description: 'Managing high blood pressure with specialized meal plans, stress reduction techniques, and appropriate physical activity.',
      symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds', 'Flushing', 'Dizziness', 'Chest pain'],
      icon: <Activity className="h-10 w-10" />,
      color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    },
    {
      id: 'thyroid',
      title: 'Thyroid Disorders',
      description: 'Nutritional and lifestyle recommendations for managing hypothyroidism and hyperthyroidism.',
      symptoms: ['Fatigue', 'Weight changes', 'Cold/heat sensitivity', 'Hair loss', 'Irregular heart rate', 'Mood changes'],
      icon: <Brain className="h-10 w-10" />,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    },
    {
      id: 'heart-disease',
      title: 'Heart Disease',
      description: 'Heart-healthy diet plans and exercise routines to support cardiovascular health and reduce risk factors.',
      symptoms: ['Chest pain', 'Shortness of breath', 'Pain in arms/shoulder', 'Fatigue', 'Irregular heartbeat', 'Dizziness'],
      icon: <Heart className="h-10 w-10" />,
      color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
    },
    {
      id: 'obesity',
      title: 'Obesity',
      description: 'Sustainable weight loss strategies combining nutritional guidance, physical activity, and behavioral changes.',
      symptoms: ['BMI over 30', 'Excess body fat', 'Shortness of breath', 'Joint/back pain', 'Fatigue', 'Increased sweating'],
      icon: <Dumbbell className="h-10 w-10" />,
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-health-light to-blue-50 dark:from-health-dark/30 dark:to-blue-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Disease Management</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Specialized diet plans, daily routines, and lifestyle modifications to help manage common health conditions and improve your quality of life.
              </p>
            </div>
          </div>
        </section>

        {/* Disease Cards Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diseases.map((disease) => (
                <Card key={disease.id} className="health-card overflow-hidden">
                  <CardHeader>
                    <div className={`p-4 rounded-lg inline-block mb-2 ${disease.color}`}>
                      {disease.icon}
                    </div>
                    <CardTitle>{disease.title}</CardTitle>
                    <CardDescription>{disease.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
                      <div className="flex flex-wrap gap-2">
                        {disease.symptoms.map((symptom, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
                    <Button variant="outline" className="flex-1 mr-2" asChild>
                      <Link to="/diet-plans">View Diet Plan</Link>
                    </Button>
                    <Button className="flex-1 ml-2 btn-primary" asChild>
                      <Link to={`/disease-management/${disease.id}`}>
                        Management <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* General Health Tips Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/10">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="section-title">General Health Recommendations</h2>
              <p className="section-subtitle mx-auto">
                While each condition requires specific management, these general guidelines benefit overall health
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Recommendation 1 */}
              <div className="bg-white dark:bg-card rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-health-primary/10 flex items-center justify-center">
                    <Droplet className="h-4 w-4 text-health-primary" />
                  </div>
                  Stay Hydrated
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Drink at least 8 glasses of water daily to support metabolism, digestion, and overall health. Limit sugary beverages and alcohol.
                </p>
              </div>

              {/* Recommendation 2 */}
              <div className="bg-white dark:bg-card rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-health-primary/10 flex items-center justify-center">
                    <Dumbbell className="h-4 w-4 text-health-primary" />
                  </div>
                  Regular Exercise
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Aim for at least 150 minutes of moderate activity weekly. Include both cardiovascular exercise and strength training for optimal health.
                </p>
              </div>

              {/* Recommendation 3 */}
              <div className="bg-white dark:bg-card rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-health-primary/10 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-health-primary" />
                  </div>
                  Stress Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Practice relaxation techniques such as meditation, deep breathing, or yoga to reduce stress levels and improve mental well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Consult a Professional CTA */}
        <section className="py-12">
          <div className="container-custom">
            <div className="bg-health-primary/10 dark:bg-health-primary/5 rounded-xl p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-health-dark dark:text-health-primary">Medical Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                The information provided on this website is for general informational purposes only. Always consult with qualified healthcare providers for medical advice, diagnosis, or treatment.
              </p>
              <Button className="bg-health-primary hover:bg-health-dark">Contact a Healthcare Professional</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiseaseManagement;
