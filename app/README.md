# Chatbot Project

A modern chatbot application built with Next.js, TypeScript, Tailwind CSS, OpenAI integration, and **Supabase Edge Functions**.
Organized with clear separation between Frontend, Backend, and Testing.

## 🏗️ Project Structure

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home page
├── globals.css                   # Global styles
├── favicon.ico                   # Favicon
├── chat/                         # Frontend pages (Next.js routing)
│   └── page.tsx                  # Main chat page
├── frontend/                     # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx        # Button component
│   │   │   └── Input.tsx         # Input component
│   │   ├── chat/                 # Chat-specific components
│   │   │   ├── ChatContainer.tsx # Main chat container
│   │   │   ├── ChatInput.tsx     # Message input component
│   │   │   └── MessageBubble.tsx # Message display component
│   │   ├── layout/               # Layout components
│   │   │   └── Header.tsx        # Navigation header
│   │   └── index.ts              # Component exports
│   ├── lib/                      # Frontend utilities
│   │   ├── api.ts                # API client functions
│   │   ├── types.ts              # Frontend TypeScript types
│   │   ├── utils.ts              # Utility functions
│   │   └── index.ts              # Library exports
│   └── index.ts                  # Frontend exports
├── backend/                      # Backend source code (for local dev)
│   ├── services/                 # Business logic services
│   │   └── openai.ts             # OpenAI service
│   ├── utils/                    # Backend utilities
│   │   └── validation.ts         # Input validation
│   ├── types/                    # Backend TypeScript types
│   │   └── api.ts                # API-specific types
│   └── index.ts                  # Backend exports
├── supabase/                     # **Supabase Edge Functions**
│   ├── functions/
│   │   └── chat/
│   │       └── index.ts          # Chat edge function (Deno/TypeScript)
│   ├── config.toml               # Supabase configuration
│   ├── env.example               # Environment variables template
│   └── README.md                 # Edge functions deployment guide
├── api/                          # API routes (Next.js routing)
│   └── chat/
│       └── route.ts              # Chat API proxy (calls edge function)
├── testing/                      # Testing environment
│   ├── test-api/                 # API testing page
│   │   └── page.tsx
│   └── test-supabase/            # Database testing page
│       └── page.tsx
└── documentation/                # Project documentation
    └── HACKATHON-GUIDE.MD
```

## 🚀 Features

- **Edge Function Architecture**: Backend logic runs on Supabase Edge Functions (Deno)
- **Clean Architecture**: Separated frontend, backend, and testing concerns
- **Serverless Backend**: OpenAI integration via Supabase Edge Functions
- **Reusable Components**: Modular UI components with TypeScript support
- **Type Safety**: Full TypeScript integration with proper type definitions
- **Modern UI**: Tailwind CSS with responsive design
- **API Integration**: OpenAI chat completion with comprehensive error handling
- **Real-time Chat**: Interactive chat interface with loading states
- **Testing Environment**: Isolated testing pages for development
- **Cloud Ready**: Frontend on Vercel, Backend on Supabase Edge

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase Edge Functions (Deno Runtime)
- **AI**: OpenAI GPT-3.5-turbo
- **Database**: Supabase
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Home Page** (`/`): Overview and navigation to different features
2. **Chat Interface** (`/chat`): Main chatbot interaction
3. **API Test** (`/testing/test-api`): Test API integration
4. **Database Test** (`/testing/test-supabase`): Test Supabase connection

## 🏗️ Architecture Benefits

### Frontend Organization (`/frontend/`)
- **`components/`**: Organized by purpose (ui, chat, layout)
- **`lib/`**: Client-side utilities, types, and API functions
- **Clean imports**: Centralized exports for better developer experience
- **Vercel ready**: Optimized for Vercel deployment

### **Edge Functions (`/supabase/`)**
- **`functions/chat/`**: OpenAI integration running on Deno
- **Serverless**: Auto-scaling, globally distributed
- **Environment**: OpenAI API key managed in Supabase dashboard
- **CORS**: Proper cross-origin support for frontend

### Backend Organization (`/backend/`)
- **Local development**: Services for testing without edge functions
- **Service layer**: Clean separation of concerns
- **Migration ready**: Easy to move logic to edge functions

### Testing Environment (`/testing/`)
- **Isolated testing**: Separate from production code
- **Development tools**: API and database testing pages
- **Local testing**: Tools for development and debugging

### API Routes (`/api/`)
- **Proxy pattern**: Routes proxy requests to edge functions
- **Error handling**: Proper validation and error responses
- **Fallback ready**: Can switch between local and edge functions

## 🔧 Development

### Frontend Development
1. Create components in `frontend/components/[category]/`
2. Export from `frontend/components/index.ts`
3. Import using: `import { ComponentName } from '../frontend/components'`

### **Edge Function Development**
1. Edit functions in `supabase/functions/`
2. Test locally: `supabase functions serve`
3. Deploy: `supabase functions deploy chat`

### Local Backend Development
1. Use services in `backend/services/`
2. Update API routes to use local services instead of edge functions
3. Switch back to edge functions for production

## 📝 Key Improvements

1. **Serverless Backend**: Edge functions for scalable, global performance
2. **Clear Separation**: Frontend, Backend, and Testing clearly separated
3. **Cloud Architecture**: Frontend (Vercel) + Backend (Supabase Edge)
4. **Better Performance**: Edge functions run closer to users globally
5. **Cost Effective**: Pay-per-execution model for backend
6. **Type Safety**: Full TypeScript coverage across all layers
7. **Developer Experience**: Local development + cloud deployment
8. **Maintainability**: Consistent structure and clear documentation

## 🚀 Deployment

### **Production Architecture**
- **Frontend**: Vercel (Next.js app)
- **Backend**: Supabase Edge Functions (OpenAI integration)
- **Database**: Supabase (if needed)

### **Deployment Steps**

1. **Deploy Edge Functions**:
   ```bash
   cd supabase
   supabase login
   supabase link --project-ref your-project-ref
   supabase functions deploy chat
   ```

2. **Configure Environment**:
   - Go to Supabase Dashboard → Project Settings → Edge Functions
   - Add `OPENAI_API_KEY` environment variable

3. **Deploy Frontend to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Test Production**:
   - Frontend calls API routes
   - API routes proxy to Supabase Edge Functions
   - Edge Functions call OpenAI API

This architecture provides **global scalability**, **cost efficiency**, and **developer-friendly** local development while maintaining production performance. 