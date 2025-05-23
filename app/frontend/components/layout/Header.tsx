import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-gray-900">Chatbot</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="primary" size="sm">
                Chat
              </Button>
            </Link>
            <Link href="/test-api">
              <Button variant="ghost" size="sm">
                Test API
              </Button>
            </Link>
            <Link href="/test-supabase">
              <Button variant="ghost" size="sm">
                Test DB
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 