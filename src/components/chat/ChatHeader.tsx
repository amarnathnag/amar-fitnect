
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ChatHeader = () => {
  const { language } = useLanguage();
  
  return (
    <div className="p-4 border-b bg-health-primary text-white flex justify-between items-center">
      <div>
        <h2 className="font-semibold">AmarHealth Assistant</h2>
        <p className="text-xs opacity-80">
          {language === 'english' && "Ask me anything about health, diet, or wellness"}
          {language === 'hindi' && "स्वास्थ्य, आहार, या तंदुरुस्ती के बारे में कुछ भी पूछें"}
          {language === 'bengali' && "স্বাস্থ্য, খাদ্য, বা সুস্থতা সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন"}
        </p>
      </div>
      <LanguageSwitcher />
    </div>
  );
};

export default ChatHeader;
