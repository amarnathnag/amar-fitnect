import React from 'react';
import { useChat } from '@/hooks/useChat';
import { useSpeech } from '@/hooks/useSpeech';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ErrorDisplay from './ErrorDisplay';

const ChatContainer = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    errorMessage,
    scrollAreaRef,
    handleSendMessage,
    retryConfigConnection
  } = useChat();
  
  const { 
    isListening,
    isSpeaking,
    toggleSpeechRecognition,
    speakText,
    stopSpeaking
  } = useSpeech();

  const handleToggleSpeechRecognition = () => {
    toggleSpeechRecognition((transcript) => {
      setInputMessage(transcript);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[600px] border rounded-lg overflow-hidden bg-white shadow-md">
      <ChatHeader />
      
      <ErrorDisplay 
        errorMessage={errorMessage} 
        retryConfigConnection={retryConfigConnection} 
      />
      
      <MessageList 
        messages={messages}
        isLoading={isLoading}
        isSpeaking={isSpeaking}
        onSpeakToggle={speakText}
        stopSpeaking={stopSpeaking}
        scrollAreaRef={scrollAreaRef}
      />
      
      <ChatInput 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        isListening={isListening}
        toggleSpeechRecognition={handleToggleSpeechRecognition}
        errorMessage={errorMessage}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatContainer;
