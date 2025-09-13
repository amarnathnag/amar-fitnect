import React from 'react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Award, Heart, Shield, Users, Target, Globe, Lightbulb, TrendingUp, Clock, CheckCircle, Star, Brain } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <NavBar />
      
      <div className="container-custom py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent mb-4">
            About SmartDoc AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Revolutionizing healthcare through intelligent technology, personalized care, and comprehensive wellness solutions for millions worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>500K+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>50+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>98% Satisfaction Rate</span>
            </div>
          </div>
        </div>
        
        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="text-lg">
                SmartDoc AI was born from a personal mission. In 2023, our founder Dr. Amar Singh witnessed his grandmother struggle to access quality healthcare in rural India. Despite having decades of medical knowledge, even he felt overwhelmed navigating the complex healthcare system for his own family.
              </p>
              <p>
                This experience sparked a realization: if a doctor found healthcare challenging to navigate, how difficult must it be for millions of others? Dr. Singh envisioned a world where advanced medical knowledge, personalized care, and cutting-edge technology could be accessible to everyone, regardless of location or economic status.
              </p>
              <p>
                Starting with a small team of passionate healthcare professionals and AI researchers, we began building what would become the world's most comprehensive digital health platform. From our first AI consultation to our current ecosystem of diet plans, fitness programs, and marketplace solutions, every feature has been designed with one goal: democratizing healthcare.
              </p>
              <p className="font-semibold text-health-primary">
                Today, we're proud to serve over 500,000 users across 50+ countries, with 98% reporting improved health outcomes through our platform.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-health-primary via-health-accent to-purple-600 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">AI-Powered Healthcare</h3>
                <p className="text-white/90">Intelligent solutions for better health</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">2023</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Founded</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Users Served</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <Target className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To democratize healthcare by making personalized, AI-driven medical guidance accessible to everyone, everywhere. We believe quality healthcare should not be a privilege but a fundamental right.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <Lightbulb className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A world where every individual has instant access to personalized health guidance, preventive care, and comprehensive wellness solutions powered by advanced AI and human expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-8 w-8 text-health-primary mb-2" />
                <CardTitle>AI Health Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  24/7 intelligent health guidance with personalized recommendations based on your health profile and goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-health-primary mb-2" />
                <CardTitle>Expert Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with verified healthcare professionals for personalized consultations and specialized care.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Activity className="h-8 w-8 text-health-primary mb-2" />
                <CardTitle>Wellness Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive diet plans, workout routines, and lifestyle programs tailored to your specific needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-health-primary mb-2" />
                <CardTitle>Health Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Curated selection of health products, supplements, and wellness items with verified quality ratings.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-health-primary mb-2" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced analytics to monitor your health journey and celebrate your achievements along the way.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-8 w-8 text-health-primary mb-2" />
                <CardTitle>Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Join a supportive community of health-conscious individuals sharing experiences and motivation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Our Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-health-primary mb-2">500K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-health-primary mb-2">50M+</div>
              <div className="text-gray-600 dark:text-gray-400">AI Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-health-primary mb-2">250K+</div>
              <div className="text-gray-600 dark:text-gray-400">Diet Plans Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-health-primary mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">User Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Every interaction is guided by empathy and genuine care for our users' wellbeing and health journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-500" />
                </div>
                <CardTitle>Trust & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We maintain the highest standards of privacy, security, and medical accuracy in all our services.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We continuously push boundaries to deliver cutting-edge healthcare technology and solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <CardTitle>Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Healthcare should be accessible to everyone, regardless of background, location, or circumstances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-health-primary/20">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Dr. Amar Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">Dr. Amar Singh</CardTitle>
                <CardDescription className="text-health-primary font-medium">Founder & Chief Medical Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Board-certified physician with 15+ years in internal medicine and digital health innovation. Former WHO consultant and Stanford University medical researcher.
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">MD</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">MPH</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-health-primary/20">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Dr. Sarah Chen" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">Dr. Sarah Chen</CardTitle>
                <CardDescription className="text-health-primary font-medium">Chief AI Research Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ph.D. in Computer Science from MIT with 12+ years in machine learning for healthcare. Former lead researcher at Google Health and IBM Watson Health.
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">Ph.D.</span>
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">AI Expert</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-health-primary/20">
                  <img 
                    src="https://randomuser.me/api/portraits/men/68.jpg" 
                    alt="Rajiv Mehta" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-xl">Rajiv Mehta</CardTitle>
                <CardDescription className="text-health-primary font-medium">Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Technology leader with 18+ years building secure, scalable platforms. Previously CTO at major fintech and healthcare companies, expert in cloud architecture.
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">Engineering</span>
                  <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-full">Security</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Achievements & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Healthcare Innovation Award 2024</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Recognized for outstanding AI innovation in healthcare accessibility</p>
            </Card>
            
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">HIPAA Compliant Platform</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Certified for highest standards of healthcare data security and privacy</p>
            </Card>
            
            <Card className="text-center p-6">
              <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Top 10 Health Tech Startup</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Listed among fastest-growing health technology companies globally</p>
            </Card>
          </div>
        </div>
        
        {/* Our Commitment */}
        <div className="bg-gradient-to-r from-health-primary to-health-accent rounded-2xl p-8 md:p-12 text-center text-white mb-16">
          <Award className="h-16 w-16 mx-auto mb-6 text-white/90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Commitment to You</h2>
          <p className="text-white/90 max-w-4xl mx-auto text-lg leading-relaxed mb-8">
            At SmartDoc AI, we're committed to empowering you with the tools, knowledge, and support you need to live your healthiest life. Whether through our AI-powered health assistant, our network of expert doctors, or our supportive community, we're here to guide you on your health journey every step of the way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-white/90" />
              <span className="text-white/90">24/7 AI Support</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-white/90" />
              <span className="text-white/90">Expert Medical Team</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <CheckCircle className="h-6 w-6 text-white/90" />
              <span className="text-white/90">Personalized Care Plans</span>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">The Future of Healthcare</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We're building a future where healthcare is predictive, preventive, and personalized. Our roadmap includes advanced AI diagnostics, virtual reality therapy sessions, genomic analysis integration, and global health monitoring systems that will revolutionize how we approach wellness and medical care.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
