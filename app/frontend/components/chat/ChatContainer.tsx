import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Button } from '../ui/Button';
import { sendChatMessage, getErrorMessage } from '../../lib/api';
import { createMessage, scrollToBottom } from '../../lib/utils';
import type { Message } from '../../lib/types';

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    createMessage('system', 'Hello! I\'m your AI assistant. How can I help you today?')
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom(chatContainerRef.current);
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage = createMessage('user', content);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Prepare conversation history for API
      const conversation = messages.filter(msg => msg.role !== 'system');
      
      const response = await sendChatMessage(content, conversation);
      
      const assistantMessage = createMessage('assistant', response.response);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      // Add error message to chat
      const errorChatMessage = createMessage('system', `Error: ${errorMessage}`);
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      createMessage('system', 'Chat cleared. How can I help you today?')
    ]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">AI Chat Assistant</h1>
          <p className="text-sm text-gray-500">
            {isLoading ? 'AI is typing...' : 'Ready to help'}
          </p>
        </div>
        <Button
          onClick={handleClearChat}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          Clear Chat
        </Button>
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message}
            isTyping={isLoading && message === messages[messages.length - 1] && message.role === 'assistant'}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 max-w-[70%] rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border-x border-red-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">{error}</span>
            <Button
              onClick={() => setError(null)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 p-1"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder={isLoading ? "AI is responding..." : "Type your message..."}
      />
    </div>
  );
} 