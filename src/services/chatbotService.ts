
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
export const getChatbotResponse = async (userInput: string, messageHistory: ChatMessage[], language: 'english' | 'hindi' | 'bengali' = 'english'): Promise<string> => {
  console.log('Sending request to DeepSeek API with input:', userInput);
  console.log('Current language:', language);
  
  // Check if API key exists
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('DeepSeek API key is not configured');
    
    const errorMessages = {
      english: 'API key not configured. Please add your DeepSeek API key to the .env file.',
      hindi: 'API कुंजी कॉन्फ़िगर नहीं की गई है। कृपया अपनी DeepSeek API कुंजी को .env फ़ाइल में जोड़ें।',
      bengali: 'API কী কনফিগার করা হয়নি। অনুগ্রহ করে আপনার DeepSeek API কী .env ফাইলে যোগ করুন।'
    };
    
    throw new Error(errorMessages[language]);
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
    
    // Convert message history to the format expected by DeepSeek API
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
      // Modified endpoint to use OpenAI compatible API instead of DeepSeek
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
          const authErrorMessages = {
            english: "Authentication failed. Please check your API key and try again.",
            hindi: "प्रमाणीकरण विफल हुआ। कृपया अपनी API कुंजी जांचें और पुनः प्रयास करें।",
            bengali: "অথেনটিকেশন ব্যর্থ হয়েছে। অনুগ্রহ করে আপনার API কী চেক করুন এবং আবার চেষ্টা করুন।"
          };
          throw new Error(authErrorMessages[language]);
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
        
        // Create more realistic fallback responses based on the query
        const getRelevantFallbackResponse = (query: string) => {
          // Simple keywords matching for fallback responses
          const queryLower = query.toLowerCase();
          
          if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower === 'hi') {
            return {
              english: "Hello! I'm AmarHealth's AI assistant. How can I help you with your health and wellness questions today?",
              hindi: "नमस्ते! मैं अमरहेल्थ का AI सहायक हूँ। आज मैं आपके स्वास्थ्य और कल्याण संबंधी प्रश्नों में कैसे मदद कर सकता हूँ?",
              bengali: "হ্যালো! আমি অমরহেলথের AI সহকারী। আজ আমি আপনার স্বাস্থ্য এবং সুস্থতা সম্পর্কিত প্রশ্নে কীভাবে সাহায্য করতে পারি?"
            };
          } else if (queryLower.includes('diet') || queryLower.includes('food') || queryLower.includes('eat')) {
            return {
              english: "A balanced diet should include fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods and sugar. Would you like specific diet recommendations?",
              hindi: "संतुलित आहार में फल, सब्जियां, साबुत अनाज, दुबला प्रोटीन और स्वस्थ वसा शामिल होनी चाहिए। प्रोसेस्ड खाद्य पदार्थ और शक्कर को सीमित करने का प्रयास करें। क्या आप विशिष्ट आहार सिफारिशें चाहेंगे?",
              bengali: "একটি ভারসাম্যপূর্ণ খাদ্যতালিকায় ফল, শাকসবজি, সম্পূর্ণ শস্য, কম চর্বিযুক্ত প্রোটিন এবং স্বাস্থ্যকর চর্বি থাকা উচিত। প্রক্রিয়াজাত খাবার এবং চিনি সীমিত করার চেষ্টা করুন। আপনি কি নির্দিষ্ট খাদ্যতালিকার পরামর্শ চান?"
            };
          } else if (queryLower.includes('workout') || queryLower.includes('exercise') || queryLower.includes('fitness')) {
            return {
              english: "Regular exercise is key to good health. Aim for 150 minutes of moderate activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities twice a week. What type of workouts interest you?",
              hindi: "नियमित व्यायाम अच्छे स्वास्थ्य के लिए महत्वपूर्ण है। प्रति सप्ताह 150 मिनट की मध्यम गतिविधि या 75 मिनट की तीव्र गतिविधि, साथ ही सप्ताह में दो बार मांसपेशियों को मजबूत करने वाली गतिविधियों का लक्ष्य रखें। किस प्रकार के व्यायाम में आपकी रुचि है?",
              bengali: "নিয়মিত ব্যায়াম ভালো স্বাস্থ্যের চাবিকাঠি। প্রতি সপ্তাহে 150 মিনিট মাঝারি কার্যকলাপ বা 75 মিনিট তীব্র কার্যকলাপের লক্ষ্য রাখুন, এবং সপ্তাহে দুবার পেশী শক্তিশালী করার কার্যকলাপ করুন। কোন ধরনের ওয়ার্কআউট আপনার আগ্রহ জাগায়?"
            };
          }
          
          // Default fallback response
          return {
            english: `In a production environment, I would provide a helpful response to your question about "${query}". For now, I'm operating with limited access to my knowledge base due to development mode.`,
            hindi: `उत्पादन वातावरण में, मैं आपके "${query}" के बारे में आपके प्रश्न का एक उपयोगी उत्तर प्रदान करूंगा। अभी के लिए, मैं विकास मोड के कारण अपने ज्ञान आधार तक सीमित पहुंच के साथ काम कर रहा हूं।`,
            bengali: `একটি প্রোডাকশন পরিবেশে, আমি আপনার "${query}" সম্পর্কে প্রশ্নের একটি সহায়ক উত্তর দিতাম। এখন, আমি ডেভেলপমেন্ট মোডের কারণে আমার জ্ঞান ভাণ্ডারে সীমিত অ্যাক্সেস নিয়ে কাজ করছি।`
          };
        };
        
        const fallbackMessages = getRelevantFallbackResponse(userInput);
        return fallbackMessages[language];
      }
      
      throw error; // Re-throw to be handled by the caller
    }
  } catch (error) {
    console.error("Chatbot API Error:", error);
    // Provide a more specific error message
    if (error.toString().includes('API key')) {
      const apiKeyErrorMessages = {
        english: "I'm unable to respond right now due to an authentication issue. Please ensure the API key is correctly configured.",
        hindi: "प्रमाणीकरण समस्या के कारण मैं अभी जवाब देने में असमर्थ हूं। कृपया सुनिश्चित करें कि API कुंजी सही तरीके से कॉन्फ़िगर की गई है।",
        bengali: "একটি অথেনটিকেশন সমস্যার কারণে আমি এখন উত্তর দিতে অক্ষম। অনুগ্রহ করে নিশ্চিত করুন যে API কী সঠিকভাবে কনফিগার করা আছে।"
      };
      return apiKeyErrorMessages[language];
    } else if (error.toString().includes('network')) {
      const networkErrorMessages = {
        english: "I'm having trouble connecting to my knowledge database. Please check your internet connection and try again.",
        hindi: "मुझे अपने ज्ञान डेटाबेस से कनेक्ट करने में समस्या हो रही है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
        bengali: "আমি আমার জ্ঞান ডাটাবেসে সংযোগ করতে সমস্যা হচ্ছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।"
      };
      return networkErrorMessages[language];
    } else {
      const generalErrorMessages = {
        english: "I apologize, but I'm experiencing technical difficulties at the moment. Our team has been notified and is working on a solution.",
        hindi: "मैं क्षमा प्रार्थी हूं, लेकिन मैं वर्तमान में तकनीकी कठिनाइयों का अनुभव कर रहा हूं। हमारी टीम को सूचित कर दिया गया है और वे समाधान पर काम कर रहे हैं।",
        bengali: "আমি দুঃখিত, কিন্তু আমি এই মুহূর্তে প্রযুক্তিগত সমস্যার সম্মুখীন হচ্ছি। আমাদের টীমকে অবহিত করা হয়েছে এবং তারা একটি সমাধানের জন্য কাজ করছে।"
      };
      return generalErrorMessages[language];
    }
  }
};

// Function to detect medical urgency in a message
export const detectMedicalUrgency = (message: string): boolean => {
  const urgentTerms = [
    'emergency', 'severe pain', 'chest pain', 'difficulty breathing', 
    'unconscious', 'not breathing', 'heart attack', 'stroke', 'bleeding severely',
    // Hindi terms
    'आपातकालीन', 'गंभीर दर्द', 'छाती में दर्द', 'सांस लेने में कठिनाई',
    'बेहोश', 'सांस नहीं ले रहा', 'दिल का दौरा', 'स्ट्रोक', 'गंभीर रक्तस्राव',
    // Bengali terms
    'জরুরী', 'তীব্র ব্যথা', 'বুকে ব্যথা', 'শ্বাস নিতে অসুবিধা',
    'অচেতন', 'শ্বাস নিচ্ছে না', 'হার্ট অ্যাটাক', 'স্ট্রোক', 'মারাত্মক রক্তপাত'
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
