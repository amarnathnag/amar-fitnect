
import { toast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// This is a frontend service to handle API communication
// In a production environment, this should be handled by a backend service
export const getChatbotResponse = async (userInput: string, messageHistory: ChatMessage[]): Promise<string> => {
  console.log('Sending request to DeepSeek API with input:', userInput);
  
  try {
    // Convert message history to the format expected by DeepSeek API
    const messages: DeepSeekMessage[] = [
      // System message to provide context to the AI
      {
        role: "system",
        content: `You are a health assistant for AmarHealth, a wellness platform. 
        Provide helpful, accurate information about health, diet, fitness, and wellness topics.
        If users ask about serious medical conditions, advise them to consult a healthcare professional.
        Your responses should be concise, evidence-based, and supportive.`
      },
      // Include conversation history (last 5 messages)
      ...messageHistory.slice(-5).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      // Add the current user message
      {
        role: "user",
        content: userInput
      }
    ];

    // For demo purposes only! 
    // In a real app, this API call should be made from a backend service
    console.log('Creating request with API key:', import.meta.env.VITE_DEEPSEEK_API_KEY ? 'API key exists' : 'API key missing');
    
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // IMPORTANT: In production, NEVER include API keys directly in frontend code
        // This is only for demonstration purposes
        "Authorization": `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY || ""}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // Update with correct model if needed
        messages,
        max_tokens: 500
      })
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API Error:', errorData);
      throw new Error(errorData.message || 'Failed to get chatbot response');
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    // Provide a more specific error message
    if (error.toString().includes('API key')) {
      return "I'm unable to respond right now due to an authentication issue. Please ensure the API key is correctly configured.";
    } else if (error.toString().includes('network')) {
      return "I'm having trouble connecting to my knowledge database. Please check your internet connection and try again.";
    } else {
      return "I apologize, but I'm experiencing technical difficulties at the moment. Our team has been notified and is working on a solution.";
    }
  }
};

// Function to detect medical urgency in a message
export const detectMedicalUrgency = (message: string): boolean => {
  const urgentTerms = [
    'emergency', 'severe pain', 'chest pain', 'difficulty breathing', 
    'unconscious', 'not breathing', 'heart attack', 'stroke', 'bleeding severely'
  ];
  
  return urgentTerms.some(term => 
    message.toLowerCase().includes(term.toLowerCase())
  );
};

// Function to detect language in user message
export const detectLanguage = (message: string): 'english' | 'hindi' | 'bengali' | 'unknown' => {
  // Simplified language detection based on common words/characters
  // In a production app, use a proper language detection library
  const hindiPattern = /[\u0900-\u097F]/;  // Hindi Unicode range
  const bengaliPattern = /[\u0980-\u09FF]/; // Bengali Unicode range
  
  if (hindiPattern.test(message)) return 'hindi';
  if (bengaliPattern.test(message)) return 'bengali';
  
  // Default to English if no specific patterns detected
  return 'english';
};
