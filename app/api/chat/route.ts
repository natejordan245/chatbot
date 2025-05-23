import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { message, conversation = [] } = body

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Get Supabase Edge Function URL from environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      )
    }

    // Call Supabase Edge Function
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/chat`
    
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        message: message.trim(),
        conversation
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to generate response' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)

  } catch (error: any) {
    console.error('Chat API proxy error:', error)
    
    return NextResponse.json(
      { error: 'Failed to connect to chat service. Please try again.' },
      { status: 500 }
    )
  }
} 