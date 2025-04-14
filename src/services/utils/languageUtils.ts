
import { SupportedLanguage } from '../types/chatTypes';

/**
 * Detects the language in a user message based on character sets
 */
export const detectLanguage = (message: string): SupportedLanguage | 'unknown' => {
  // Simplified language detection based on common words/characters
  // In a production app, use a proper language detection library
  const hindiPattern = /[\u0900-\u097F]/;  // Hindi Unicode range
  const bengaliPattern = /[\u0980-\u09FF]/; // Bengali Unicode range
  
  if (hindiPattern.test(message)) return 'hindi';
  if (bengaliPattern.test(message)) return 'bengali';
  
  // Default to English if no specific patterns detected
  return 'english';
};

/**
 * Function to detect medical urgency in a message
 */
export const detectMedicalUrgency = (message: string): boolean => {
  const urgentTerms = [
    'emergency', 'severe pain', 'chest pain', 'difficulty breathing', 
    'unconscious', 'not breathing', 'heart attack', 'stroke', 'bleeding severely',
    // Hindi terms
    'आपातकालीन', 'गंभीर दर्द', 'छाती में दर्द', 'सांस लेने में कठिनाई',
    'बेहोश', 'सांस नहीं ले रहा', 'दिल का दौरा', 'स्ट्रोक', 'गंभीर रक्तस्राव',
    // Bengali terms
    'जरुरी', 'तीव्र ब्यथा', 'बुकে ब्यथा', 'श्वास निते असुबिधा',
    'अचेतन', 'श्वास निच्छे ना', 'हार्ट अ्याटाक', 'स्ट्रोक', 'मारात्मक रक्तपात'
  ];
  
  return urgentTerms.some(term => 
    message.toLowerCase().includes(term.toLowerCase())
  );
};
