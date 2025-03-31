
import React from 'react';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond soon.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <NavBar />
      
      <div className="container-custom py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help! Reach out to our team with any questions, concerns, or feedback.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 mx-auto mb-2 text-health-primary" />
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                For general inquiries and support
              </p>
              <a 
                href="mailto:amarnathnag0609@gmail.com" 
                className="mt-2 inline-block text-health-primary hover:text-health-accent font-medium"
              >
                amarnathnag0609@gmail.com
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-health-primary" />
              <CardTitle>Call Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Available Monday-Friday, 9am-6pm
              </p>
              <a 
                href="tel:+919883810559" 
                className="mt-2 inline-block text-health-primary hover:text-health-accent font-medium"
              >
                +91 9883810559
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-health-primary" />
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Our headquarters location
              </p>
              <address className="mt-2 not-italic text-health-primary">
                123 Health Avenue, Bangalore<br />
                Karnataka, India 560001
              </address>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-health-primary" />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>
                </div>
                
                <div className="mb-4 space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is your message about?" required />
                </div>
                
                <div className="mb-6 space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help you..." 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-health-primary hover:bg-health-dark">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">How do I book a doctor consultation?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    You can book a consultation through our Consultancy section. Simply choose a doctor, select your preferred time slot, and complete the payment.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Is my health data secure?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Yes, we take data security seriously. All your health information is encrypted and stored securely following industry best practices.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">How accurate is the AI Health Assistant?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Our AI is trained on extensive medical data, but it's designed to complement, not replace, professional medical advice. Always consult with healthcare providers for serious concerns.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Can I get a refund if I'm not satisfied?</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    We offer refunds in certain situations. Please reach out to our customer support team to discuss your specific case.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All FAQs
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Our Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span className="text-health-primary">Closed</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Note: Online AI assistance is available 24/7. Doctor consultations are subject to their individual availability.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
