import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getChatbotResponse, detectMedicalUrgency, detectLanguage } from '@/services/chatbotService';
import { ChatMessage } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m AmarHealth\'s AI assistant. How can I help with your health and wellness needs today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Check if API key is configured
  useEffect(() => {
    const checkApiKey = async () => {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      if (!apiKey) {
        setErrorMessage("API key not configured. Please add your DeepSeek API key to the .env file.");
        toast({
          title: "Configuration Error",
          description: "DeepSeek API key is missing. Please check the setup instructions.",
          variant: "destructive"
        });
      } else {
        setErrorMessage(null);
        console.log("API key is configured");
      }
    };
    
    checkApiKey();
  }, [toast]);

  const retryConfigConnection = () => {
    // Force re-check of API configuration
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    if (apiKey) {
      setErrorMessage(null);
      toast({
        title: "Configuration Check",
        description: "API key is now configured. You can start chatting!",
      });
      
      // Add a test message to confirm configuration is working
      const testMessage: ChatMessage = {
        id: 'system-check',
        content: 'API connection restored. You can now continue your conversation.',
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, testMessage]);
    } else {
      setErrorMessage("API key not configured. Please add your DeepSeek API key to the .env file.");
      toast({
        title: "Configuration Error",
        description: "DeepSeek API key is still missing. Please check the setup instructions.",
        variant: "destructive"
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setErrorMessage(null);
    
    // Check if the message suggests medical urgency
    const isUrgent = detectMedicalUrgency(inputMessage);
    if (isUrgent) {
      toast({
        title: "Medical Concern Detected",
        description: "Based on your message, you may need immediate medical attention. Please consider consulting a doctor.",
        variant: "destructive"
      });
    }

    // Detect language
    const detectedLanguage = detectLanguage(inputMessage);
    console.log(`Detected language: ${detectedLanguage}`);
    
    try {
      const response = await getChatbotResponse(inputMessage, messages);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      
      if (error.message && error.message.includes('API key')) {
        setErrorMessage("API key not configured or invalid. Please check your API key in the .env file.");
      } else {
        setErrorMessage("Failed to get a response. Please try again later.");
      }
      
      toast({
        title: "Error",
        description: error.message || "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    errorMessage,
    scrollAreaRef,
    handleSendMessage,
    retryConfigConnection
  };
};

export type { ChatMessage };
