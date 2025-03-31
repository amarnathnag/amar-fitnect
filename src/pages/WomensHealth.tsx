
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ArrowRight, Calendar, Flower, Heart, Brain, Clock, Info, Activity, BarChart3, Check } from 'lucide-react';
import PCOSDietPlan from '@/components/womens-health/PCOSDietPlan';
import PregnancyDietPlan from '@/components/womens-health/PregnancyDietPlan';
import WeightManagementPlan from '@/components/womens-health/WeightManagementPlan';
import { useIsMobile } from '@/hooks/use-mobile';

const WomensHealth = () => {
  const [activeTab, setActiveTab] = useState("menstrual-health");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-100 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Women's Health & Disease Management</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Specialized care for women's unique health needs including hormonal disorders, 
                pregnancy, menstrual health and comprehensive wellness management.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container-custom">
            <Tabs 
              defaultValue="menstrual-health" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-6'} w-full max-w-4xl`}>
                  <TabsTrigger value="menstrual-health" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className={isMobile ? "text-xs" : ""}>Menstrual Health</span>
                  </TabsTrigger>
                  <TabsTrigger value="pregnancy" className="flex items-center gap-2">
                    <Flower className="h-4 w-4" />
                    <span className={isMobile ? "text-xs" : ""}>Pregnancy Care</span>
                  </TabsTrigger>
                  <TabsTrigger value="hormonal" className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    <span className={isMobile ? "text-xs" : ""}>Hormonal Health</span>
                  </TabsTrigger>
                  <TabsTrigger value="mental" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    <span className={isMobile ? "text-xs" : ""}>Mental Health</span>
                  </TabsTrigger>
                  <TabsTrigger value="breast-health" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className={isMobile ? "text-xs" : ""}>Breast Health</span>
                  </TabsTrigger>
                  <TabsTrigger value="lifestyle" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className={isMobile ? "text-xs" : ""}>Lifestyle Plans</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Menstrual Health Tab */}
              <TabsContent value="menstrual-health" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
                        <Calendar className="h-10 w-10" />
                      </div>
                      <CardTitle>Irregular Periods</CardTitle>
                      <CardDescription>
                        Causes, treatment options, and lifestyle changes to manage irregular menstrual cycles.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Missing periods", "Periods too close together", "Unpredictable cycles", "Heavy bleeding", "Spotting between periods"].map((symptom, index) => (
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
                      <Button className="flex-1 ml-2 btn-primary" onClick={() => setActiveTab("lifestyle")}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                        <Activity className="h-10 w-10" />
                      </div>
                      <CardTitle>PCOS/PCOD</CardTitle>
                      <CardDescription>
                        Comprehensive management of Polycystic Ovarian Syndrome through diet, exercise, and lifestyle modifications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Irregular periods", "Weight gain", "Acne", "Excess hair growth", "Fatigue", "Mood changes"].map((symptom, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2" onClick={() => setActiveTab("lifestyle")}>
                        View Diet Plan
                      </Button>
                      <Button className="flex-1 ml-2 btn-primary" asChild>
                        <Link to="/doctor-consultation">
                          Consult Doctor <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="health-card overflow-hidden md:col-span-2">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <Info className="h-10 w-10" />
                      </div>
                      <CardTitle>Menstrual Hygiene</CardTitle>
                      <CardDescription>
                        Best practices and safe products for maintaining proper menstrual hygiene and health.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Change Regularly
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Replace pads/tampons every 4-6 hours to prevent bacterial growth and infections.
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Consider Alternatives
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Menstrual cups and period underwear are eco-friendly options with less risk of toxic shock syndrome.
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Personal Hygiene
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Clean the genital area with warm water, avoid douches or scented products that disrupt pH balance.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                      <Link to="/community" className="w-full">
                        <Button className="w-full">Join Community Discussion</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              {/* Pregnancy Care Tab */}
              <TabsContent value="pregnancy" className="animate-fade-in">
                <div className="grid grid-cols-1 gap-6">
                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
                        <Clock className="h-10 w-10" />
                      </div>
                      <CardTitle>9-Month Pregnancy Care</CardTitle>
                      <CardDescription>
                        Comprehensive guide to maternal care through each trimester of pregnancy.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">First Trimester (1-3 months)</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Diet: Folic acid, iron, and calcium-rich foods</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Symptoms: Morning sickness, fatigue, breast tenderness</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Care: Regular checkups, first ultrasound, prenatal vitamins</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-pink-50/50 dark:bg-pink-900/10 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Second Trimester (4-6 months)</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Diet: Protein, vitamin D, omega-3 for baby's brain</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Symptoms: Weight gain, back pain, baby movements</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Care: Maternity yoga, blood sugar checks</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-purple-50/50 dark:bg-purple-900/10 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Third Trimester (7-9 months)</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Diet: Fiber, hydration, iron for avoiding anemia</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Symptoms: Frequent urination, breathing difficulty</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span>Care: Hospital bag preparation, labor signs</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2" onClick={() => setActiveTab("lifestyle")}>
                        View Diet Plan
                      </Button>
                      <Button className="flex-1 ml-2 btn-primary" asChild>
                        <Link to="/doctor-consultation">
                          Consult Doctor <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Pregnancy Diet Plan Component */}
                  <PregnancyDietPlan />
                </div>
              </TabsContent>

              {/* Hormonal Health Tab */}
              <TabsContent value="hormonal" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <Activity className="h-10 w-10" />
                      </div>
                      <CardTitle>Thyroid Disorders</CardTitle>
                      <CardDescription>
                        Management of hypothyroidism and hyperthyroidism through diet and lifestyle changes.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Common Symptoms</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Fatigue", "Weight changes", "Hair loss", "Cold/heat sensitivity", "Depression", "Irregular periods"].map((symptom, index) => (
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
                        <Link to="/disease-management/thyroid">
                          Management <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                        <BarChart3 className="h-10 w-10" />
                      </div>
                      <CardTitle>Osteoporosis Prevention</CardTitle>
                      <CardDescription>
                        Strategies for maintaining bone health and preventing bone density loss in women.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Risk Factors</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Menopause", "Low calcium intake", "Vitamin D deficiency", "Sedentary lifestyle", "Smoking", "Family history"].map((factor, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                              {factor}
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
                        <Link to="/daily-routine">
                          Exercise Plan <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* PCOS Diet Plan Component */}
                  <PCOSDietPlan />
                </div>
              </TabsContent>

              {/* Mental Health Tab */}
              <TabsContent value="mental" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        <Brain className="h-10 w-10" />
                      </div>
                      <CardTitle>Postpartum Depression</CardTitle>
                      <CardDescription>
                        Understanding, recognizing, and treating depression that can occur after childbirth.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Warning Signs</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Severe mood swings", "Excessive crying", "Withdrawing from loved ones", "Fatigue", "Hopelessness", "Thoughts of self-harm"].map((sign, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                              {sign}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2" asChild>
                        <Link to="/community">Join Support Group</Link>
                      </Button>
                      <Button className="flex-1 ml-2 btn-primary" asChild>
                        <Link to="/doctor-consultation">
                          Consult Therapist <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <Activity className="h-10 w-10" />
                      </div>
                      <CardTitle>Anxiety & Stress Management</CardTitle>
                      <CardDescription>
                        Practical techniques for managing anxiety and stress through lifestyle modifications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Helpful Techniques</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Deep breathing", "Meditation", "Regular exercise", "Adequate sleep", "Talk therapy", "Time management"].map((technique, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                              {technique}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2" asChild>
                        <Link to="/daily-routine">View Techniques</Link>
                      </Button>
                      <Button className="flex-1 ml-2 btn-primary" asChild>
                        <Link to="/doctor-consultation">
                          Get Support <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              {/* Breast Health Tab */}
              <TabsContent value="breast-health" className="animate-fade-in">
                <div className="grid grid-cols-1 gap-6">
                  <Card className="health-card overflow-hidden">
                    <CardHeader>
                      <div className="p-4 rounded-lg inline-block mb-2 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400">
                        <Heart className="h-10 w-10" />
                      </div>
                      <CardTitle>Breast Cancer Awareness</CardTitle>
                      <CardDescription>
                        Understanding breast cancer risk factors, prevention strategies, and early detection.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Self-Examination Steps</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Step 1: Visual Check</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Look at your breasts in the mirror with hands on hips. Look for any changes in size, shape, or color.
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Step 2: Lying Down</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Lie down and use your right hand to check your left breast, and left hand for right breast. Use circular motions with varying pressure.
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Step 3: Standing/Shower</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Repeat the examination while standing, such as in the shower when skin is wet and slippery.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-3">Warning Signs to Watch For</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Lump or thickening", "Swelling", "Skin irritation", "Nipple changes", "Nipple discharge", "Pain in any area"].map((sign, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                              {sign}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
                      <Link to="/doctor-consultation" className="w-full">
                        <Button className="w-full btn-primary">Schedule Screening Appointment</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              {/* Lifestyle Plans Tab */}
              <TabsContent value="lifestyle" className="animate-fade-in">
                <div className="grid grid-cols-1 gap-6">
                  {/* Weight Management Plan Component */}
                  <WeightManagementPlan />
                  
                  {/* PCOS Diet Plan Component */}
                  <PCOSDietPlan />
                  
                  {/* Pregnancy Diet Plan Component */}
                  <PregnancyDietPlan />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Doctor Consultation CTA */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/10">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Consult with experienced healthcare professionals specializing in women's health for personalized advice and treatment plans.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link to="/doctor-consultation">
                <Button size="lg" className="btn-primary">
                  Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WomensHealth;
