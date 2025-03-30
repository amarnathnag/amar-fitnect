
import React from 'react';
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Award, Heart, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <NavBar />
      
      <div className="container-custom py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            About Amar Healthy Health
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're on a mission to make healthcare accessible, personalized, and effective for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Amar Healthy Health was founded in 2023 with a simple but powerful vision: to revolutionize healthcare by combining cutting-edge technology with personalized medical expertise.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our founder, Dr. Amar Singh, experienced firsthand the challenges many people face when trying to access quality healthcare. Inspired by his own journey and the stories of countless patients, he assembled a team of healthcare professionals, AI experts, and tech innovators to create a platform that bridges the gap between traditional medicine and modern technology.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we serve thousands of users worldwide, providing them with personalized health guidance, expert consultations, and resources that empower them to take control of their wellbeing.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden h-80 bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-health-primary to-health-accent flex items-center justify-center text-white font-bold text-4xl">
                AH
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  We put care and empathy at the heart of everything we do, ensuring every user feels supported.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <Shield className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  We maintain the highest standards of privacy, security, and medical accuracy in our services.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <Activity className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  We continuously evolve our technology to provide cutting-edge healthcare solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  We design our platform to be accessible and beneficial for people from all walks of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Dr. Amar Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>Dr. Amar Singh</CardTitle>
                <CardDescription>Founder & Chief Medical Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Board-certified physician with 15+ years of experience in internal medicine and digital health.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Dr. Sarah Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>Dr. Sarah Chen</CardTitle>
                <CardDescription>Chief of AI Research</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Ph.D. in Computer Science with expertise in machine learning applications in healthcare.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/68.jpg" 
                    alt="Rajiv Mehta" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>Rajiv Mehta</CardTitle>
                <CardDescription>Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Technology leader with experience building secure, scalable healthcare platforms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="bg-white dark:bg-card rounded-lg p-8 text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-health-primary" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Our Commitment to You</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            At Amar Healthy Health, we're committed to empowering you with the tools, knowledge, and support you need to live your healthiest life. Whether through our AI-powered health assistant, our network of expert doctors, or our supportive community, we're here to guide you on your health journey every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
