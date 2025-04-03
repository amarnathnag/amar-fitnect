
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/chat/ChatInterface';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Chat = () => {
  // Check if we're in development and API key is missing
  const isDevelopment = import.meta.env.MODE === 'development';
  const apiKeyMissing = !import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container-custom mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-health-primary mb-2">AmarHealth AI Assistant</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ask our AI-powered health assistant about diet plans, workout routines, general health questions, and more.
              Get personalized guidance for your wellness journey.
            </p>
          </div>
          
          {isDevelopment && apiKeyMissing && (
            <Alert variant="destructive" className="max-w-3xl mx-auto mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Developer Notice:</strong> DeepSeek API key not configured. 
                Please create a <code>.env</code> file with <code>VITE_DEEPSEEK_API_KEY=your_api_key</code> to enable chat functionality.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="max-w-3xl mx-auto">
            <ChatInterface />
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Note: This AI assistant provides general guidance and is not a substitute for professional medical advice. 
              Always consult with healthcare professionals for medical concerns.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
