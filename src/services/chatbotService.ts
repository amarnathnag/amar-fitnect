
import { SupportedLanguage, ChatMessage, DeepSeekMessage } from './types/chatTypes';
import { detectLanguage } from './utils/languageUtils';
import { getConfigErrorMessages, getErrorMessage } from './utils/errorUtils';
import { getRelevantFallbackResponse } from './utils/fallbackUtils';

/**
 * Main service function to get chatbot response from API
 */
export const getChatbotResponse = async (
  userInput: string, 
  messageHistory: ChatMessage[], 
  language: SupportedLanguage = 'english'
): Promise<string> => {
  console.log('Sending request to DeepSeek API with input:', userInput);
  console.log('Current language:', language);
  
  // Check if API key exists
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('DeepSeek API key is not configured');
    throw new Error(getConfigErrorMessages()[language]);
  }
  
  try {
    // Detect language in user input
    const detectedLanguage = detectLanguage(userInput);
    console.log('Detected language:', detectedLanguage);
    
    // System message with language instruction
    let systemMessage = `You are a health assistant for AmarHealth, a wellness platform. 
        Provide helpful, accurate information about health, diet, fitness, and wellness topics.
        If users ask about serious medical conditions, advise them to consult a healthcare professional.
        Your responses should be concise, evidence-based, and supportive.`;
    
    // Add language instruction
    if (language !== 'english' || detectedLanguage !== 'english') {
      const respondInLanguage = language !== 'english' ? language : detectedLanguage;
      if (respondInLanguage === 'hindi') {
        systemMessage += " Respond in Hindi language.";
      } else if (respondInLanguage === 'bengali') {
        systemMessage += " Respond in Bengali language.";
      }
    }
    
    // Convert message history to the format expected by the API
    const messages: DeepSeekMessage[] = [
      // System message to provide context to the AI
      {
        role: "system",
        content: systemMessage
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

    console.log('Creating request with API key:', apiKey ? 'API key exists' : 'API key missing');
    
    try {
      // API request to OpenAI compatible endpoint
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Using OpenAI model
          messages,
          max_tokens: 500
        })
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to get chatbot response';
        
        try {
          // Try to parse as JSON, but handle case where it's not JSON
          const errorData = JSON.parse(errorText);
          console.error('API Error:', errorData);
          errorMessage = errorData.error?.message || errorMessage;
        } catch (e) {
          // Not JSON, use as plain text error
          console.error('API Error (non-JSON):', errorText);
          errorMessage = errorText || errorMessage;
        }
        
        // If authentication error, provide more specific message
        if (response.status === 401) {
          throw new Error(getConfigErrorMessages()[language]);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      return data.choices[0].message.content;
      
    } catch (error) {
      console.error("Chatbot API Error:", error);
      
      // For a better user experience in development, provide a fallback response
      if (import.meta.env.MODE === 'development') {
        console.log("Using fallback response for development");
        return getRelevantFallbackResponse(userInput)[language];
      }
      
      throw error; // Re-throw to be handled by the caller
    }
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return getErrorMessage(error, language);
  }
};

// Re-export language utilities
export { detectLanguage, detectMedicalUrgency } from './utils/languageUtils';
