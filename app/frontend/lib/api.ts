import type { ChatRequest, ChatResponse, ApiErrorResponse, Message } from './types';

const API_BASE_URL = '/api';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic API request function
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
}

/**
 * Send a chat message and get AI response
 */
export async function sendChatMessage(
  message: string,
  conversation: Message[] = []
): Promise<ChatResponse> {
  const payload: ChatRequest = {
    message,
    conversation: conversation.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp), // Ensure proper date format
    })),
  };

  return apiRequest<ChatResponse>('/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Test API connection
 */
export async function testApiConnection(): Promise<{ status: string }> {
  return apiRequest<{ status: string }>('/health', {
    method: 'GET',
  });
}

/**
 * Handle API errors with user-friendly messages
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return 'Authentication failed. Please check your API configuration.';
      case 429:
        return 'Rate limit exceeded. Please try again later.';
      case 500:
        return 'Server error. Please try again.';
      default:
        return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
} 