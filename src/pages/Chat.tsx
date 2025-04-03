
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
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
