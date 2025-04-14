import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChatMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
  isSpeaking: boolean;
  onSpeakToggle: (text: string) => void;
  stopSpeaking: () => void;
}

const MessageBubble = ({ message, isSpeaking, onSpeakToggle, stopSpeaking }: MessageBubbleProps) => {
  const isAssistant = message.role === 'assistant';
  const { language } = useLanguage();
  
  // Animation classes based on message role
  const animationClass = isAssistant ? "animate-fade-in" : "animate-fade-in";
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} ${animationClass}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          isAssistant 
            ? 'bg-gray-100 text-gray-800 rounded-tl-none shadow-sm' 
            : 'bg-health-primary text-white rounded-tr-none shadow-sm'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
          
          {isAssistant && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => isSpeaking ? stopSpeaking() : onSpeakToggle(message.content)}
              title={isSpeaking ? 
                language === 'english' ? 'Stop Speaking' : 
                language === 'hindi' ? 'बोलना बंद करें' : 'কথা বলা বন্ধ করুন' : 
                language === 'english' ? 'Speak Message' : 
                language === 'hindi' ? 'संदेश बोलें' : 'বার্তা বলুন'
              }
            >
              {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
