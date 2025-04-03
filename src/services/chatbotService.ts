
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
  try {
    // In a real implementation, you would call your backend API here
    // For demo purposes, we're calling the DeepSeek API directly from the frontend
    // This is NOT recommended for production as it exposes your API key
    
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get chatbot response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return "I'm sorry, I encountered an error. Please try again or contact support if the issue persists.";
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
