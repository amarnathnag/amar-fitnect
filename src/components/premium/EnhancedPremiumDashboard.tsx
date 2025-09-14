import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, Crown, Brain, FileText, 
  CheckCircle, Bot, Utensils, Dumbbell, 
  Activity, Moon, Heart, Zap, Star,
  TrendingUp, Users, Award, Shield,
  MessageSquare, Video, BookOpen, Target,
  BarChart3, Smartphone, Headphones
} from 'lucide-react';
import PremiumToolCard from './PremiumToolCard';

const EnhancedPremiumDashboard = () => {
  const [activeHealthScore, setActiveHealthScore] = useState(92);
  const [weeklyGoals, setWeeklyGoals] = useState(75);

  const premiumStats = [
    { icon: Target, label: 'Health Score', value: '92/100', progress: 92, color: 'text-green-600', gradient: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, label: 'Weekly Goals', value: '6/8', progress: 75, color: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Achievements', value: '24', progress: 80, color: 'text-yellow-600', gradient: 'from-yellow-500 to-orange-500' },
    { icon: Users, label: 'Community Rank', value: 'Top 5%', progress: 95, color: 'text-purple-600', gradient: 'from-purple-500 to-pink-500' }
  ];

  const aiTools = [
    {
      title: "AI Nutrition Coach",
      description: "Get personalized meal plans and nutrition advice powered by advanced AI",
      icon: <Utensils className="h-5 w-5" />,
      badge: "New",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Smart Workout Builder",
      description: "Create adaptive workout routines that evolve with your progress",
      icon: <Dumbbell className="h-5 w-5" />,
      badge: "Popular",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "AI Health Assistant",
      description: "24/7 AI companion for health questions and medical guidance",
      icon: <Bot className="h-5 w-5" />,
      badge: "Premium",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Condition Manager Pro",
      description: "Advanced management for chronic conditions with predictive insights",
      icon: <Activity className="h-5 w-5" />,
      badge: "Advanced",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Sleep Optimization AI",
      description: "Analyze sleep patterns and get AI-powered improvement strategies",
      icon: <Moon className="h-5 w-5" />,
      badge: "Smart",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Stress & Wellness Tracker",
      description: "Monitor mental health with personalized coping strategies",
      icon: <Heart className="h-5 w-5" />,
      badge: "Wellness",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const premiumContent = [
    {
      title: "Advanced HIIT Protocols for Fat Loss",
      description: "Science-backed high-intensity training methods for optimal results",
      badge: "New",
      category: "Fitness",
      readTime: "12 min read",
      premium: true
    },
    {
      title: "Nutrition Strategies for Hormonal Balance",
      description: "Dietary approaches to support optimal hormonal health",
      badge: "Research",
      category: "Nutrition",
      readTime: "18 min read",
      premium: true
    },
    {
      title: "Sleep Optimization Blueprint",
      description: "Comprehensive guide to improving sleep quality and recovery",
      badge: "Guide",
      category: "Wellness",
      readTime: "25 min read",
      premium: true
    },
    {
      title: "Mental Health & Productivity",
      description: "Evidence-based strategies for mental wellness and peak performance",
      badge: "Psychology",
      category: "Mental Health",
      readTime: "15 min read",
      premium: true
    },
    {
      title: "Biohacking Fundamentals",
      description: "Scientific approaches to optimizing human performance",
      badge: "Advanced",
      category: "Biohacking",
      readTime: "22 min read",
      premium: true
    },
    {
      title: "Longevity & Anti-Aging",
      description: "Latest research on healthy aging and lifespan extension",
      badge: "Research",
      category: "Longevity",
      readTime: "30 min read",
      premium: true
    }
  ];

  const consultationTypes = [
    {
      title: "AI-Powered Health Consultation",
      description: "Advanced AI analysis of your health data with personalized recommendations",
      icon: <Brain className="h-6 w-6" />,
      duration: "Instant",
      price: "Included",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Video Call with Experts",
      description: "One-on-one consultation with certified health professionals",
      icon: <Video className="h-6 w-6" />,
      duration: "30 min",
      price: "Premium",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Text-Based Coaching",
      description: "Ongoing support through our premium messaging platform",
      icon: <MessageSquare className="h-6 w-6" />,
      duration: "24/7",
      price: "Included",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="py-12 space-y-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 shadow-lg">
                Premium Active
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Premium Health Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Your personalized health command center with AI-powered insights
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button variant="outline" className="gap-2 bg-white/80 backdrop-blur-sm">
              <Calendar className="h-4 w-4" /> Manage Subscription
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg">
              <Shield className="h-4 w-4" /> Account Settings
            </Button>
          </div>
        </div>

        {/* Premium Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {premiumStats.map((stat, index) => (
            <Card key={index} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  {stat.label}
                </div>
                <Progress value={stat.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="ai-tools" className="space-y-8">
          <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
            <TabsTrigger value="ai-tools" className="text-center py-3 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              <Brain className="h-4 w-4 mr-2" /> AI Tools
            </TabsTrigger>
            <TabsTrigger value="premium-content" className="text-center py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <FileText className="h-4 w-4 mr-2" /> Premium Content
            </TabsTrigger>
            <TabsTrigger value="consultations" className="text-center py-3 data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Video className="h-4 w-4 mr-2" /> Consultations
            </TabsTrigger>
            <TabsTrigger value="health-reports" className="text-center py-3 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
              <CheckCircle className="h-4 w-4 mr-2" /> My Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-tools" className="mt-0">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI-Powered Health Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">Advanced artificial intelligence to support your health journey</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiTools.map((tool, index) => (
                  <Card key={index} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient} p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          {tool.icon}
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          {tool.badge}
                        </Badge>
                      </div>
                      
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg">
                        Launch Tool
                        <Zap className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="premium-content" className="mt-0">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Exclusive Premium Content</h3>
                <p className="text-gray-600 dark:text-gray-300">Access cutting-edge health research and expert insights</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumContent.map((content, index) => (
                  <Card key={index} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                          {content.badge}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {content.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {content.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {content.category}
                      </Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {content.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        Read Article
                        <Star className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="consultations" className="mt-0">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium Consultations</h3>
                <p className="text-gray-600 dark:text-gray-300">Connect with experts and AI for personalized health guidance</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {consultationTypes.map((consultation, index) => (
                  <Card key={index} className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${consultation.gradient} p-3 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        {consultation.icon}
                      </div>
                      
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {consultation.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                        {consultation.description}
                      </p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">Duration: {consultation.duration}</span>
                        <Badge className="bg-green-100 text-green-700">{consultation.price}</Badge>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg">
                        Book Consultation
                        <Headphones className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="health-reports" className="mt-0">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Health Analytics & Reports</h3>
                <p className="text-gray-600 dark:text-gray-300">Comprehensive insights into your health and wellness journey</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sample Report Card */}
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">Weekly Health Summary</h4>
                      <Badge className="bg-blue-500 text-white">This Week</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Overall Health Score</span>
                        <span className="font-semibold text-blue-600">92/100</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Great improvement in sleep quality and nutrition this week!
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                      View Full Report
                      <BarChart3 className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Coming Soon Card */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">AI Health Insights</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Personalized health reports powered by AI analysis of your data
                    </p>
                    <Badge className="mb-4 bg-purple-100 text-purple-700">Coming Soon</Badge>
                    <Button variant="outline" className="w-full">
                      Get Notified
                      <Smartphone className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedPremiumDashboard;