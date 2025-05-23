import React from 'react';
import { cn, formatTimestamp } from '../../lib/utils';
import type { Message } from '../../lib/types';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export function MessageBubble({ message, isTyping = false }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'flex w-full mb-4',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[70%] rounded-lg px-4 py-2',
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-900'
      )}>
        <div className="whitespace-pre-wrap break-words">
          {message.content}
          {isTyping && (
            <span className="inline-block ml-1">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </span>
          )}
        </div>
        <div className={cn(
          'text-xs mt-1 opacity-70',
          isUser ? 'text-blue-100' : 'text-gray-500'
        )}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
} 