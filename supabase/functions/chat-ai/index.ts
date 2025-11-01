import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  userInput: string;
  messageHistory: ChatMessage[];
  language: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { userInput, messageHistory, language }: ChatRequest = await req.json();

    // System message with language instruction
    let systemMessage = `You are a health assistant for AmarHealth, a wellness platform. 
        Provide helpful, accurate information about health, diet, fitness, and wellness topics.
        If users ask about serious medical conditions, advise them to consult a healthcare professional.
        Your responses should be concise, evidence-based, and supportive.`;
    
    // Add language instruction
    if (language === 'hindi') {
      systemMessage += " Respond in Hindi language.";
    } else if (language === 'bengali') {
      systemMessage += " Respond in Bengali language.";
    }

    const messages: ChatMessage[] = [
      { role: "system", content: systemMessage },
      ...messageHistory.slice(-5),
      { role: "user", content: userInput }
    ];

    console.log('Calling OpenAI API...');

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', response.status, errorText);
      
      let errorMessage = 'Failed to get chatbot response';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }

      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received');

    return new Response(
      JSON.stringify({ content: data.choices[0].message.content }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error("Error in chat-ai function:", error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
