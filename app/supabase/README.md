# Supabase Edge Functions Deployment

This directory contains Supabase Edge Functions for the chatbot backend.

## Setup

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Initialize your project** (if first time):
   ```bash
   supabase init
   ```

4. **Link to your Supabase project**:
   ```bash
   supabase link --project-ref your-project-ref
   ```

## Deploy Edge Functions

1. **Deploy the chat function**:
   ```bash
   supabase functions deploy chat
   ```

2. **Set environment variables** in the Supabase dashboard:
   - Go to Project Settings > Edge Functions
   - Add `OPENAI_API_KEY` with your OpenAI API key

## Local Development

1. **Start local development server**:
   ```bash
   supabase start
   supabase functions serve
   ```

2. **Test the function locally**:
   ```bash
   curl -i --location --request POST 'http://localhost:54321/functions/v1/chat' \
     --header 'Authorization: Bearer [ANON_KEY]' \
     --header 'Content-Type: application/json' \
     --data '{
       "message": "Hello, how are you?"
     }'
   ```

## Frontend Configuration

Update your `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Function Details

### Chat Function (`/functions/v1/chat`)

**Endpoint**: `POST /functions/v1/chat`

**Request Body**:
```json
{
  "message": "User message here",
  "conversation": [
    {
      "role": "user|assistant",
      "content": "Previous message content"
    }
  ]
}
```

**Response**:
```json
{
  "response": "Assistant response",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}
```

**Features**:
- OpenAI GPT-3.5-turbo integration
- Conversation history support
- Input validation and sanitization
- Comprehensive error handling
- CORS support for frontend integration 