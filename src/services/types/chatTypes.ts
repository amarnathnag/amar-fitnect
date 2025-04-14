
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type SupportedLanguage = 'english' | 'hindi' | 'bengali';

export interface LanguageErrorMessages {
  english: string;
  hindi: string;
  bengali: string;
}
