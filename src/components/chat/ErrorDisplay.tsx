
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ErrorDisplayProps {
  errorMessage: string | null;
  retryConfigConnection: () => void;
}

const ErrorDisplay = ({ errorMessage, retryConfigConnection }: ErrorDisplayProps) => {
  const { language } = useLanguage();
  
  if (!errorMessage) return null;
  
  const translations = {
    configError: {
      english: "Configuration Error",
      hindi: "कॉन्फ़िगरेशन त्रुटि",
      bengali: "কনফিগারেশন ত্রুটি"
    },
    retry: {
      english: "Retry",
      hindi: "पुनः प्रयास करें",
      bengali: "পুনরায় চেষ্টা করুন"
    }
  };
  
  return (
    <Alert variant="destructive" className="m-2">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{translations.configError[language]}</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{errorMessage}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={retryConfigConnection} 
          className="ml-2"
        >
          <RefreshCcw className="h-4 w-4 mr-1" />
          {translations.retry[language]}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
