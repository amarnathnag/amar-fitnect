
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, Calendar, Brain, Activity, Flower, 
  Stethoscope, Baby, PlusCircle, Leaf, Moon, 
  HeartPulse, Pill, Video, MessageSquare, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const WomensHealth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-100 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-800 dark:text-purple-300">
                Women's Health & Disease Management
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive health information, care plans, and management solutions designed specifically for women's unique health needs.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-12">
          <div className="container-custom">
            <Tabs defaultValue="menstrual" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
                <TabsTrigger value="menstrual" className="flex flex-col items-center py-3">
                  <Moon className="h-5 w-5 mb-1 text-purple-600" />
                  <span>Menstrual Health</span>
                </TabsTrigger>
                <TabsTrigger value="pregnancy" className="flex flex-col items-center py-3">
                  <Baby className="h-5 w-5 mb-1 text-pink-500" />
                  <span>Pregnancy Care</span>
                </TabsTrigger>
                <TabsTrigger value="hormonal" className="flex flex-col items-center py-3">
                  <Leaf className="h-5 w-5 mb-1 text-green-600" />
                  <span>Hormonal Health</span>
                </TabsTrigger>
                <TabsTrigger value="mental" className="flex flex-col items-center py-3">
                  <Brain className="h-5 w-5 mb-1 text-blue-600" />
                  <span>Mental Health</span>
                </TabsTrigger>
                <TabsTrigger value="breast" className="flex flex-col items-center py-3">
                  <HeartPulse className="h-5 w-5 mb-1 text-red-500" />
                  <span>Breast Health</span>
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="flex flex-col items-center py-3">
                  <Activity className="h-5 w-5 mb-1 text-orange-500" />
                  <span>Lifestyle</span>
                </TabsTrigger>
                <TabsTrigger value="consult" className="flex flex-col items-center py-3">
                  <Stethoscope className="h-5 w-5 mb-1 text-health-primary" />
                  <span>Consultation</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Menstrual Health Tab */}
              <TabsContent value="menstrual" className="space-y-6">
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4">
                  <Moon className="h-6 w-6 inline-block mr-2" />
                  Menstrual Health
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Irregular Periods</CardTitle>
                      <CardDescription>Causes, treatment, and lifestyle changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Irregular periods can be caused by stress, hormonal imbalances, thyroid issues, PCOS, or significant weight changes. Maintaining a healthy lifestyle with regular exercise and balanced nutrition can help regulate your cycle.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Recommended Actions:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Track your cycle with a period tracking app</li>
                          <li>Maintain a healthy weight</li>
                          <li>Practice stress-reduction techniques</li>
                          <li>Consider hormonal tests if irregularity persists</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">PCOS/PCOD</CardTitle>
                      <CardDescription>Symptoms, diet plans, and home remedies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Polycystic ovary syndrome affects hormone levels, causing irregular periods, acne, weight gain, and fertility issues. Lifestyle changes and diet modifications can significantly help manage PCOS symptoms.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Recommended Actions:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Follow a low-glycemic diet</li>
                          <li>Regular exercise (30 minutes daily)</li>
                          <li>Maintain adequate sleep</li>
                          <li>Consider supplements like inositol and omega-3</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Diet Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Severe Menstrual Cramps</CardTitle>
                      <CardDescription>Natural and medical solutions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Dysmenorrhea (painful periods) can significantly impact quality of life. Both natural remedies and medical interventions can help manage the pain and discomfort.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Relief Methods:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Heat therapy (heating pad on lower abdomen)</li>
                          <li>Anti-inflammatory foods (ginger, turmeric)</li>
                          <li>Gentle exercise like walking or yoga</li>
                          <li>Over-the-counter pain relievers</li>
                          <li>Herbal teas (chamomile, peppermint)</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Menstrual Hygiene</CardTitle>
                      <CardDescription>Best practices and safe products</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Proper menstrual hygiene is essential for preventing infections and ensuring comfort during your period. Understanding the options available helps you make informed choices.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Product Options:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Sanitary pads (disposable and reusable)</li>
                          <li>Tampons (with proper usage guidelines)</li>
                          <li>Menstrual cups (eco-friendly option)</li>
                          <li>Period underwear</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Pregnancy Care Tab */}
              <TabsContent value="pregnancy" className="space-y-6">
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-4">
                  <Baby className="h-6 w-6 inline-block mr-2" />
                  Pregnancy & Maternal Care
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="bg-pink-50 dark:bg-pink-900/20 border-b">
                      <CardTitle className="text-xl">First Trimester (1-3 months)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Diet
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Focus on folic acid, iron, and calcium-rich foods. Leafy greens, fortified cereals, dairy, and lean proteins are essential.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Common Symptoms
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <li>Morning sickness and nausea</li>
                            <li>Fatigue and tiredness</li>
                            <li>Breast tenderness</li>
                            <li>Frequent urination</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Essential Care
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <li>Start prenatal vitamins</li>
                            <li>Schedule first ultrasound</li>
                            <li>Gentle exercise like walking</li>
                            <li>Avoid alcohol, smoking, and raw foods</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-pink-50/50 dark:bg-pink-900/10">
                      <Button variant="outline" className="w-full">
                        First Trimester Guide
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-pink-50 dark:bg-pink-900/20 border-b">
                      <CardTitle className="text-xl">Second Trimester (4-6 months)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Diet
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Increase protein intake, vitamin D, and omega-3 fatty acids for baby's brain development. Add nuts, seeds, fish, and whole grains.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Common Symptoms
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <li>Weight gain becomes noticeable</li>
                            <li>Baby movements begin</li>
                            <li>Back pain and round ligament pain</li>
                            <li>Skin changes and stretch marks</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Essential Care
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <li>Prenatal yoga and mild exercise</li>
                            <li>Blood sugar screening</li>
                            <li>Monitor weight gain</li>
                            <li>Begin planning for baby's arrival</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-pink-50/50 dark:bg-pink-900/10">
                      <Button variant="outline" className="w-full">
                        Second Trimester Guide
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="bg-pink-50 dark:bg-pink-900/20 border-b">
                      <CardTitle className="text-xl">Third Trimester (7-9 months)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Diet
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Focus on fiber-rich foods to help with digestion, stay well-hydrated, and maintain iron intake to prevent anemia in the final stages.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Common Symptoms
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <li>Frequent urination</li>
                            <li>Braxton Hicks contractions</li>
                            <li>Breathing difficulty</li>
                            <li>Sleep challenges</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2 text-pink-500" /> Essential Care
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <li>Prepare hospital bag</li>
                            <li>Learn about labor signs</li>
                            <li>Complete birthing plan</li>
                            <li>Regular monitoring of baby's position</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-pink-50/50 dark:bg-pink-900/10">
                      <Button variant="outline" className="w-full">
                        Third Trimester Guide
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-pink-700 dark:text-pink-300">
                    Complete Pregnancy Care
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our comprehensive pregnancy care guides cover everything from preconception to postpartum. Get access to detailed nutrition plans, exercise routines safe for each trimester, and expert advice.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                      Pregnancy Diet Plans
                    </Button>
                    <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                      Prenatal Exercise Guide
                    </Button>
                    <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                      Consult a Specialist
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Placeholders for other tabs */}
              <TabsContent value="hormonal">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-300 mb-4">
                  <Leaf className="h-6 w-6 inline-block mr-2" />
                  Hormonal Imbalance & Bone Health
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Thyroid Disorders</CardTitle>
                      <CardDescription>Symptoms, foods to eat & avoid</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Thyroid disorders affect millions of women and can cause weight fluctuations, fatigue, and mood changes. Understanding your condition and making dietary adjustments can help manage symptoms.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-600">Foods to Include:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                            <li>Iodine-rich foods (seaweed)</li>
                            <li>Selenium sources (brazil nuts)</li>
                            <li>Zinc-rich foods</li>
                            <li>Whole grains</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-600">Foods to Limit:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                            <li>Processed foods</li>
                            <li>Excessive soy products</li>
                            <li>Cruciferous vegetables (in large amounts)</li>
                            <li>Gluten (for some people)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Thyroid Management Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Weight Fluctuations</CardTitle>
                      <CardDescription>Diet plans for hormonal balance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Hormonal fluctuations can cause unexpected weight changes. Balanced nutrition and regular physical activity help stabilize hormones and maintain a healthy weight.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Recommendations:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Eat regular, balanced meals</li>
                          <li>Include protein with each meal</li>
                          <li>Manage stress levels</li>
                          <li>Prioritize quality sleep</li>
                          <li>Consider food sensitivity testing</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Balanced Diet Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Osteoporosis Prevention</CardTitle>
                      <CardDescription>Calcium intake, exercise routines</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Women are at higher risk for osteoporosis, especially after menopause. Building strong bones early and maintaining bone density through diet and exercise is crucial.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Calcium-Rich Foods:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Dairy products, fortified plant milks, leafy greens, almonds, and calcium-set tofu
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Recommended Exercises:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Weight-bearing exercises (walking, jogging), resistance training, and balance exercises
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Bone Health Program
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="mental">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-4">
                  <Brain className="h-6 w-6 inline-block mr-2" />
                  Mental Health & Emotional Well-being
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Postpartum Depression</CardTitle>
                      <CardDescription>Symptoms, support groups, therapy options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Postpartum depression affects many new mothers and requires proper support and treatment. Recognizing the signs early can help in seeking timely intervention.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Warning Signs:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Persistent sadness or emptiness</li>
                          <li>Overwhelming fatigue</li>
                          <li>Severe anxiety or panic attacks</li>
                          <li>Difficulty bonding with the baby</li>
                          <li>Thoughts of harming yourself or the baby</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Find Support Resources
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Anxiety & Stress</CardTitle>
                      <CardDescription>Meditation, breathing exercises, herbal remedies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Women often face unique stressors related to balancing multiple roles. Learning effective stress management techniques can improve overall well-being.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Daily Practices:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                            <li>5-minute mindfulness meditation</li>
                            <li>Deep breathing exercises</li>
                            <li>Progressive muscle relaxation</li>
                            <li>Journaling worries and gratitude</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Anxiety Management Techniques
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Sleep Disorders</CardTitle>
                      <CardDescription>Tips for better sleep cycles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Hormonal fluctuations, pregnancy, and menopause can all affect sleep quality. Creating healthy sleep habits is essential for mental and physical health.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Sleep Hygiene Tips:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                          <li>Consistent sleep-wake schedule</li>
                          <li>Create a dark, cool sleeping environment</li>
                          <li>Limit screen time before bed</li>
                          <li>Avoid caffeine after noon</li>
                          <li>Consider magnesium or herbal teas</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Sleep Improvement Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="breast">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-300 mb-4">
                  <HeartPulse className="h-6 w-6 inline-block mr-2" />
                  Breast Health & Common Infections
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Breast Cancer Awareness</CardTitle>
                      <CardDescription>Self-examination steps</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Regular breast self-examinations and screenings are essential for early detection of breast cancer. Learning proper techniques can help you identify changes early.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Monthly Self-Exam Steps:</h4>
                          <ol className="list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                            <li>Stand before a mirror with shoulders straight and arms on hips to visually check for changes</li>
                            <li>Raise arms and look for visual changes or discharge</li>
                            <li>Lie down and use right hand to check left breast in circular motions, then repeat for right breast</li>
                            <li>Feel for changes while sitting or standing as well</li>
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Complete Self-Exam Guide
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Common Infections</CardTitle>
                      <CardDescription>UTIs, vaginal infections, and their treatments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Women are more susceptible to certain infections due to their anatomy. Understanding prevention and early symptoms can help manage these common issues.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">UTI Prevention:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                            <li>Stay well-hydrated</li>
                            <li>Urinate after sexual activity</li>
                            <li>Wipe from front to back</li>
                            <li>Consider cranberry supplements</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Vaginal Health Tips:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                            <li>Wear breathable cotton underwear</li>
                            <li>Avoid douches and scented products</li>
                            <li>Consider probiotics for gut and vaginal health</li>
                            <li>Change out of wet swimwear promptly</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Infection Prevention Guide
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="lifestyle">
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-4">
                  <Activity className="h-6 w-6 inline-block mr-2" />
                  Lifestyle Plans & Solutions
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Pregnancy Diet Plan</CardTitle>
                      <CardDescription>Balanced nutrition for mothers-to-be</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Proper nutrition during pregnancy is essential for both mother and baby's health. Our plans are customized for different dietary preferences.
                      </p>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Pill className="h-4 w-4 mb-1" />
                          Vegetarian
                        </Button>
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Pill className="h-4 w-4 mb-1" />
                          Non-Vegetarian
                        </Button>
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Pill className="h-4 w-4 mb-1" />
                          Vegan
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        Get Full Meal Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Weight Management</CardTitle>
                      <CardDescription>Healthy plans for women's unique needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Women's weight management needs change throughout life stages. Our plans consider hormonal influences and nutritional requirements.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <Button variant="outline" className="w-full text-sm">
                          Weight Loss Plan
                        </Button>
                        <Button variant="outline" className="w-full text-sm">
                          Weight Gain Plan
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        Personalized Plan
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-xl">Fitness & Exercise</CardTitle>
                      <CardDescription>Workouts tailored for women's health</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Regular physical activity is essential for maintaining health, managing stress, and preventing many conditions that affect women.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Activity className="h-4 w-4 mb-1" />
                          Pregnancy Yoga
                        </Button>
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Activity className="h-4 w-4 mb-1" />
                          Strength Training
                        </Button>
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Activity className="h-4 w-4 mb-1" />
                          PCOS Workouts
                        </Button>
                        <Button variant="outline" className="w-full text-xs flex flex-col h-auto py-3">
                          <Activity className="h-4 w-4 mb-1" />
                          Home Exercises
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        View Exercise Plans
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="consult">
                <h2 className="text-2xl font-bold text-health-primary dark:text-health-primary mb-4">
                  <Stethoscope className="h-6 w-6 inline-block mr-2" />
                  Consult a Doctor (Premium Feature)
                </h2>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-health-primary">
                        Expert Women's Health Consultation
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Connect with specialist doctors experienced in women's health issues for personalized advice, treatment plans, and ongoing care.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Video className="h-5 w-5 text-health-primary mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium">Video Consultation</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Face-to-face virtual appointments with doctors
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MessageSquare className="h-5 w-5 text-health-primary mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium">Chat Consultation</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Text-based medical advice for non-urgent concerns
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-health-primary mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium">Audio Consultation</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Voice call appointments for medical discussions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Card className="bg-white dark:bg-card border-0 shadow-md">
                        <CardHeader>
                          <CardTitle className="text-xl">Find a Specialist</CardTitle>
                          <CardDescription>
                            Connect with experienced women's health professionals
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Available Specialists:</h4>
                              <ul className="space-y-2">
                                <li className="flex items-center">
                                  <Stethoscope className="h-4 w-4 mr-2 text-health-primary" />
                                  <span>Gynecologists</span>
                                </li>
                                <li className="flex items-center">
                                  <Stethoscope className="h-4 w-4 mr-2 text-health-primary" />
                                  <span>Obstetricians</span>
                                </li>
                                <li className="flex items-center">
                                  <Stethoscope className="h-4 w-4 mr-2 text-health-primary" />
                                  <span>Endocrinologists</span>
                                </li>
                                <li className="flex items-center">
                                  <Stethoscope className="h-4 w-4 mr-2 text-health-primary" />
                                  <span>Breast Health Specialists</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Link to="/doctor-consultation">
                            <Button className="w-full bg-health-primary hover:bg-health-dark">
                              Book an Appointment
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
                    Why Choose Our Premium Consultation?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-card p-4 rounded-md">
                      <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Expert Specialists</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Board-certified doctors with specialized women's health training
                      </p>
                    </div>
                    <div className="bg-white dark:bg-card p-4 rounded-md">
                      <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Privacy Assured</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Encrypted consultations and secure health data protection
                      </p>
                    </div>
                    <div className="bg-white dark:bg-card p-4 rounded-md">
                      <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">24/7 Availability</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Access medical advice anytime, including emergencies
                      </p>
                    </div>
                    <div className="bg-white dark:bg-card p-4 rounded-md">
                      <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Personalized Care</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Customized treatment plans addressing your unique needs
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-12 bg-purple-50 dark:bg-purple-900/10">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                Women's Health Resources
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Access educational articles, support groups, and community resources dedicated to women's health and wellness.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/80 dark:bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Educational Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Flower className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Understanding Your Menstrual Cycle
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Flower className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Nutrition Through the Ages: Women's Guide
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Flower className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Breast Health: Prevention and Awareness
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Flower className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Managing Menopause Naturally
                      </a>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Articles
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/80 dark:bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Support Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        PCOS Warriors Community
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Maternal Health Connect
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Breast Cancer Survivors Network
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Menopause Support Circle
                      </a>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Join a Group
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-white/80 dark:bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Health Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Menstrual Cycle Tracker
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Pregnancy Due Date Calculator
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Ovulation Calendar
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                      <a href="#" className="text-purple-600 hover:underline">
                        Hormone Symptom Tracker
                      </a>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Access Tools
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl overflow-hidden">
              <div className="p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Take Control of Your Health Journey
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl">
                  Our comprehensive women's health tools, resources, and professional consultations empower you to make informed decisions about your well-being.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-purple-700 hover:bg-gray-100">
                    Explore Health Plans
                  </Button>
                  <Link to="/doctor-consultation">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Consult a Specialist
                    </Button>
                  </Link>
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

export default WomensHealth;
