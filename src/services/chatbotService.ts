
import { supabase } from '@/integrations/supabase/client';
import { SupportedLanguage, ChatMessage } from './types/chatTypes';
import { detectLanguage } from './utils/languageUtils';
import { getConfigErrorMessages, getErrorMessage } from './utils/errorUtils';
import { getRelevantFallbackResponse } from './utils/fallbackUtils';

/**
 * Main service function to get chatbot response from secure Edge Function
 */
export const getChatbotResponse = async (
  userInput: string, 
  messageHistory: ChatMessage[], 
  language: SupportedLanguage = 'english'
): Promise<string> => {
  console.log('Sending request to chat AI with input:', userInput);
  console.log('Current language:', language);
  
  try {
    // Detect language in user input
    const detectedLanguage = detectLanguage(userInput);
    console.log('Detected language:', detectedLanguage);
    
    // Use detected language if user preference is English
    const finalLanguage = language !== 'english' ? language : detectedLanguage;
    
    try {
      // Call secure Edge Function instead of OpenAI directly
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          userInput,
          messageHistory,
          language: finalLanguage
        }
      });

      if (error) {
        console.error('Edge Function Error:', error);
        throw new Error(error.message || 'Failed to get chatbot response');
      }

      if (!data || !data.content) {
        throw new Error('Invalid response from chatbot service');
      }

      console.log('Chat AI response received');
      return data.content;
      
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
    console.error("Chatbot Service Error:", error);
    return getErrorMessage(error, language);
  }
};

// Re-export language utilities
export { detectLanguage, detectMedicalUrgency } from './utils/languageUtils';
