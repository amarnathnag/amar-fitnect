
import { SupportedLanguage, LanguageErrorMessages } from '../types/chatTypes';

/**
 * Get localized error messages for API key issues
 */
export const getApiKeyErrorMessages = (): LanguageErrorMessages => {
  return {
    english: "Authentication failed. Please check your API key and try again.",
    hindi: "प्रमाणीकरण विफल हुआ। कृपया अपनी API कुंजी जांचें और पुनः प्रयास करें।",
    bengali: "অথেনটিকেশন ব্যর্থ হয়েছে। অনুগ্রহ করে আপনার API কী চেক করুন এবং আবার চেষ্টা করুন।"
  };
};

/**
 * Get localized error messages for network issues
 */
export const getNetworkErrorMessages = (): LanguageErrorMessages => {
  return {
    english: "I'm having trouble connecting to my knowledge database. Please check your internet connection and try again.",
    hindi: "मुझे अपने ज्ञान डेटाबेस से कनेक्ट करने में समस्या हो रही है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    bengali: "আমি আমার জ্ঞান ডাটাবেসে সংযোগ করতে সমস্যা হচ্ছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।"
  };
};

/**
 * Get localized general error messages
 */
export const getGeneralErrorMessages = (): LanguageErrorMessages => {
  return {
    english: "I apologize, but I'm experiencing technical difficulties at the moment. Our team has been notified and is working on a solution.",
    hindi: "मैं क्षमा प्रार्थी हूं, लेकिन मैं वर्तमान में तकनीकी कठिनाइयों का अनुभव कर रहा हूं। हमारी टीम को सूचित कर दिया गया है और वे समाधान पर काम कर रहे हैं।",
    bengali: "আমি দুঃখিত, কিন্তু আমি এই মুহূর্তে প্রযুক্তিগত সমস্যার সম্মুখীন হচ্ছি। আমাদের টীমকে অবহিত করা হয়েছে এবং তারা একটি সমাধানের জন্য কাজ করছে।"
  };
};

/**
 * Get localized configuration error messages
 */
export const getConfigErrorMessages = (): LanguageErrorMessages => {
  return {
    english: "API key not configured. Please add your DeepSeek API key to the .env file.",
    hindi: "API कुंजी कॉन्फ़िगर नहीं की गई है। कृपया अपनी DeepSeek API कुंजी को .env फ़ाइल में जोड़ें।",
    bengali: "API কী কনফিগার করা হয়নি। অনুগ্রহ করে আপনার DeepSeek API কী .env ফাইলে যোগ করুন।"
  };
};

/**
 * Get appropriate error message based on error type and language
 */
export const getErrorMessage = (error: Error, language: SupportedLanguage): string => {
  const errorString = error.toString().toLowerCase();
  
  if (errorString.includes('api key')) {
    return getApiKeyErrorMessages()[language];
  } else if (errorString.includes('network')) {
    return getNetworkErrorMessages()[language];
  } else {
    return getGeneralErrorMessages()[language];
  }
};
