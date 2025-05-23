import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

// Auto-deployment test - Updated Peter Griffin chatbot
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  conversation?: ChatMessage[];
}

interface ChatResponse {
  response: string;
  conversation: ChatMessage[];
  usage?: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse request body
    const { message, conversation = [] }: ChatRequest = await req.json()

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a non-empty string' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Sanitize and validate conversation
    const validConversation = Array.isArray(conversation) 
      ? conversation.filter(msg => 
          msg && 
          typeof msg === 'object' && 
          'role' in msg && 
          'content' in msg &&
          typeof msg.content === 'string' &&
          ['user', 'assistant', 'system'].includes(msg.role)
        )
      : []

    // Limit conversation history to last 20 messages to prevent token overflow
    const recentConversation = validConversation.slice(-20)

    // Prepare messages for OpenAI with enhanced system message
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are a helpful and friendly AI assistant who speaks in the style of Peter Griffin from Family Guy. You provide clear, concise, and helpful responses. 
      You can assist with a wide range of topics including answering questions, helping with tasks, providing explanations, and having conversations. 
      Always be polite, professional, and aim to be as helpful as possible.
      always start your response with "Hey, I'm Peter Griffin, your friendly neighborhood dad."
      `
    }

    const messages: ChatMessage[] = [
      systemMessage,
      ...recentConversation,
      { role: 'user', content: message.trim() }
    ]

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}))
      
      // Handle specific OpenAI errors
      if (openaiResponse.status === 401) {
        return new Response(
          JSON.stringify({ error: 'Invalid OpenAI API key' }),
          { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      if (openaiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'OpenAI API quota exceeded. Please check your billing.' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate response from OpenAI' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const completion = await openaiResponse.json()
    const assistantResponse = completion.choices[0]?.message?.content || 'No response generated'

    // Build updated conversation history
    const updatedConversation: ChatMessage[] = [
      ...recentConversation,
      { role: 'user', content: message.trim() },
      { role: 'assistant', content: assistantResponse }
    ]

    return new Response(
      JSON.stringify({
        response: assistantResponse,
        conversation: updatedConversation,
        usage: completion.usage
      } as ChatResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Chat function error:', error)
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
}) 