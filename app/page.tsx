import React from 'react';
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 Chatbot Project
          </h1>
          <p className="text-xl text-gray-600">
            Next.js + Supabase + OpenAI Integration
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Organized with Frontend, Backend, and Testing separation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Chat Interface Card */}
          <Link href="/chat" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold ml-3">Chat Interface</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Start chatting with your AI assistant (Frontend)
              </p>
              <div className="text-blue-500 group-hover:text-blue-600 font-medium">
                Start Chatting →
              </div>
            </div>
          </Link>

          {/* API Test Card */}
          <Link href="/testing/test-api" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold ml-3">API Test</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Test your OpenAI API integration (Testing)
              </p>
              <div className="text-blue-500 group-hover:text-blue-600 font-medium">
                Test API →
              </div>
            </div>
          </Link>

          {/* Database Test Card */}
          <Link href="/testing/test-supabase" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold ml-3">Database Test</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Test your Supabase database connection (Testing)
              </p>
              <div className="text-blue-500 group-hover:text-blue-600 font-medium">
                Test Connection →
              </div>
            </div>
          </Link>
        </div>

        {/* Architecture Overview */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Project Architecture</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-50 p-4 rounded-lg mb-3">
                <h4 className="font-semibold text-blue-900">Frontend</h4>
                <p className="text-sm text-blue-700 mt-1">Components, UI, Client Logic</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• React Components</li>
                <li>• UI Library</li>
                <li>• Client-side Logic</li>
                <li>• Types & Utils</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 p-4 rounded-lg mb-3">
                <h4 className="font-semibold text-purple-900">Backend</h4>
                <p className="text-sm text-purple-700 mt-1">APIs, Services, Business Logic</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• API Routes</li>
                <li>• OpenAI Service</li>
                <li>• Validation Utils</li>
                <li>• Backend Types</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-green-50 p-4 rounded-lg mb-3">
                <h4 className="font-semibold text-green-900">Testing</h4>
                <p className="text-sm text-green-700 mt-1">Test Pages, Dev Tools</p>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• API Testing</li>
                <li>• DB Testing</li>
                <li>• Development Tools</li>
                <li>• Local Testing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Setup Status</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Project structure organized</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Frontend components ready</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Backend services configured</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Testing environment set up</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready for deployment to Vercel!
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Deployment Ready:</strong>
            </p>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Frontend optimized for Vercel deployment</li>
              <li>2. Backend organized with proper separation</li>
              <li>3. Testing isolated for development</li>
              <li>4. Add your OpenAI API key to deploy</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
