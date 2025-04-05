
import React from 'react';
import { SendHorizontal, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  isListening: boolean;
  toggleSpeechRecognition: () => void;
  errorMessage: string | null;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  isListening,
  toggleSpeechRecognition,
  errorMessage,
  handleKeyDown
}: ChatInputProps) => {
  return (
    <div className="p-4 border-t">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSpeechRecognition}
          className={isListening ? 'bg-health-primary text-white' : ''}
          disabled={!!errorMessage}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        
        <Textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="resize-none min-h-10"
          disabled={isLoading || !!errorMessage}
        />
        
        <Button 
          onClick={handleSendMessage} 
          disabled={!inputMessage.trim() || isLoading || !!errorMessage}
          variant="default"
        >
          <SendHorizontal size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
