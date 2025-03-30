
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import { Send, Bot, Crown, Zap, AlertCircle, CheckCircle, Clock, Download, Brain, HeartPulse, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PremiumAi = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Health Assistant. How can I help you today? You can ask me about symptoms, health conditions, or general wellness advice."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [isPremium, setIsPremium] = useState(false);

  // Sample responses for demo
  const sampleResponses: Record<string, string> = {
    headache: "Based on your description, you might be experiencing a tension headache. These are often caused by stress, dehydration, or poor posture. I recommend drinking water, taking a short break from screens, and considering over-the-counter pain relievers if needed. If your headache is severe, sudden, or accompanied by fever, vision changes, or neck stiffness, please consult a doctor immediately.",
    diet: "A balanced diet should include vegetables, fruits, whole grains, lean proteins, and healthy fats. For weight management, focus on portion control and minimize processed foods. Consider consulting with a nutritionist for a personalized plan based on your specific health needs and goals.",
    sleep: "For better sleep, maintain a consistent schedule, create a relaxing bedtime routine, limit screen time before bed, ensure your bedroom is cool and dark, and avoid caffeine and heavy meals close to bedtime. If you consistently have trouble sleeping, consider speaking with a healthcare provider about possible sleep disorders.",
    stress: "To manage stress, try deep breathing exercises, regular physical activity, adequate sleep, mindfulness meditation, limiting caffeine and alcohol, and connecting with supportive people. If stress becomes overwhelming, consider speaking with a mental health professional.",
    exercise: "For general fitness, aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus strength training twice a week. Start gradually and choose activities you enjoy. Always warm up, cool down, and listen to your body to prevent injury.",
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const newChatHistory = [...chatHistory, { role: "user", content: message }];
    setChatHistory(newChatHistory);
    setMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'm not sure I understand your query. Could you please provide more details or rephrase your question?";
      
      // Check for keywords in the message
      const lowerMessage = message.toLowerCase();
      for (const [key, value] of Object.entries(sampleResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }
      
      // Check if user is asking about symptoms that might need doctor consultation
      if (
        lowerMessage.includes("chest pain") || 
        lowerMessage.includes("difficulty breathing") || 
        lowerMessage.includes("severe") || 
        lowerMessage.includes("emergency")
      ) {
        response = "The symptoms you're describing may require immediate medical attention. Please consult with a healthcare professional as soon as possible or visit your nearest emergency room if you feel it's urgent.";
      }
      
      setChatHistory([...newChatHistory, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePremiumSubscription = () => {
    toast({
      title: "Premium Subscription Activated!",
      description: "You now have access to all premium AI health features.",
    });
    setIsPremium(true);
  };

  const handleGenerateReport = () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Please subscribe to our premium plan to access detailed health reports.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Health Report Generated",
      description: "Your comprehensive health report is ready for download.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <NavBar />
      
      <div className="container-custom py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI Health Assistant <span className="inline-block"><Crown className="h-6 w-6 text-yellow-500 inline ml-2" /></span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get instant health guidance, symptom analysis, and personalized advice from our advanced AI system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="chat" className="flex items-center justify-center gap-2">
                  <Bot className="h-4 w-4" />
                  Chat Assistant
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center justify-center gap-2">
                  <Activity className="h-4 w-4" />
                  Health Reports
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat">
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-health-primary" />
                      AI Health Chat
                      {isPremium && <Badge className="ml-2 bg-yellow-500 text-white">Premium</Badge>}
                    </CardTitle>
                    <CardDescription>
                      Ask about symptoms, nutrition advice, exercise recommendations, or general health questions.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-md mb-4">
                      {chatHistory.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
                        >
                          <div 
                            className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                              msg.role === "user" 
                                ? "bg-health-primary text-white" 
                                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="text-left mb-4">
                          <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow">
                            <div className="flex space-x-1">
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Type your health question here..." 
                        className="flex-1 resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button 
                        className="bg-health-primary hover:bg-health-dark"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-health-primary" />
                      Health Reports
                      {isPremium && <Badge className="ml-2 bg-yellow-500 text-white">Premium</Badge>}
                    </CardTitle>
                    <CardDescription>
                      Get comprehensive AI-generated health reports based on your conversations and data.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <Card className="bg-gray-50 dark:bg-gray-900">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <HeartPulse className="h-4 w-4 mr-2 text-health-primary" />
                            Comprehensive Health Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm mb-3">
                            {isPremium 
                              ? "Based on your conversations, we'll generate a detailed health analysis with personalized recommendations."
                              : "Upgrade to Premium to access detailed health analysis reports."
                            }
                          </p>
                          <Button 
                            className="w-full bg-health-primary hover:bg-health-dark"
                            onClick={handleGenerateReport}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-900">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Brain className="h-4 w-4 mr-2 text-health-primary" />
                            Mental Health Assessment
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm mb-3">
                            {isPremium 
                              ? "Receive a professional-grade mental wellness assessment with stress management techniques."
                              : "Upgrade to Premium to access mental health assessment reports."
                            }
                          </p>
                          <Button 
                            className="w-full bg-health-primary hover:bg-health-dark"
                            onClick={handleGenerateReport}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-50 dark:bg-gray-900">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Activity className="h-4 w-4 mr-2 text-health-primary" />
                            Lifestyle & Nutrition Plan
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm mb-3">
                            {isPremium 
                              ? "Get a customized nutrition and lifestyle plan based on your health goals and preferences."
                              : "Upgrade to Premium to access personalized lifestyle and nutrition plans."
                            }
                          </p>
                          <Button 
                            className="w-full bg-health-primary hover:bg-health-dark"
                            onClick={handleGenerateReport}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Premium Features</CardTitle>
                <CardDescription>
                  Upgrade to unlock advanced AI health capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Detailed Health Reports</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Comprehensive analysis of your health based on your conversations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Personalized Recommendations</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Custom diet, exercise, and lifestyle advice tailored for you
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Symptom Analysis</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Advanced AI-powered symptom checking and risk assessment
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Unlimited Consultations</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No limits on chat interactions with our advanced AI
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isPremium ? (
                  <Button className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200" disabled>
                    <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                    Premium Activated
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                    onClick={handlePremiumSubscription}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Health Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-100 dark:border-green-900/30">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">Stay Hydrated</h4>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Aim to drink at least 8 glasses of water daily for optimal health.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-900/30">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Regular Exercise</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    30 minutes of moderate activity 5 days a week can significantly improve your health.
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md border border-purple-100 dark:border-purple-900/30">
                  <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">Quality Sleep</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    Adults should aim for 7-9 hours of quality sleep each night for mental and physical well-being.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumAi;
