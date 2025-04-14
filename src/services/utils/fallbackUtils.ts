
import { SupportedLanguage, LanguageErrorMessages } from '../types/chatTypes';

/**
 * Get a default fallback response for when the API is not available
 */
export const getDefaultFallbackResponse = (query: string): LanguageErrorMessages => {
  return {
    english: `In a production environment, I would provide a helpful response to your question about "${query}". For now, I'm operating with limited access to my knowledge base due to development mode.`,
    hindi: `उत्पादन वातावरण में, मैं आपके "${query}" के बारे में आपके प्रश्न का एक उपयोगी उत्तर प्रदान करूंगा। अभी के लिए, मैं विकास मोड के कारण अपने ज्ञान आधार तक सीमित पहुंच के साथ काम कर रहा हूं।`,
    bengali: `একটি প্রোডাকশন পরিবেশে, আমি আপনার "${query}" সম্পর্কে প্রশ্নের একটি সহায়ক উত্তর দিতাম। এখন, আমি ডেভেলপমেন্ট মোডের কারণে আমার জ্ঞান ভাণ্ডারে সীমিত অ্যাক্সেস নিয়ে কাজ করছি।`
  };
};

/**
 * Get a relevant fallback response based on query keywords
 */
export const getRelevantFallbackResponse = (query: string): LanguageErrorMessages => {
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
  
  // Default fallback response if no keywords match
  return getDefaultFallbackResponse(query);
};
