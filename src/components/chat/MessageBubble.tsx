
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: ChatMessage;
  isSpeaking: boolean;
  onSpeakToggle: (text: string) => void;
  stopSpeaking: () => void;
}

const MessageBubble = ({ message, isSpeaking, onSpeakToggle, stopSpeaking }: MessageBubbleProps) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          isAssistant 
            ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
            : 'bg-health-primary text-white rounded-tr-none'
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
              className="h-6 w-6 p-0"
              onClick={() => isSpeaking ? stopSpeaking() : onSpeakToggle(message.content)}
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
