import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import { ChatMessage } from '@/types/chat';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isSpeaking: boolean;
  onSpeakToggle: (text: string) => void;
  stopSpeaking: () => void;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ 
  messages, 
  isLoading, 
  isSpeaking, 
  onSpeakToggle, 
  stopSpeaking,
  scrollAreaRef 
}: MessageListProps) => {
  return (
    <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isSpeaking={isSpeaking}
            onSpeakToggle={onSpeakToggle} 
            stopSpeaking={stopSpeaking}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 rounded-tl-none max-w-[80%]">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
