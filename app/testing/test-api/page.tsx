'use client'
import { useState } from 'react'

export default function TestAPI() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const testAPI = async () => {
    if (!message.trim()) {
      setError('Please enter a message')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          conversation: [] // Empty conversation for testing
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to get response')
        return
      }

      setResponse(data.response)
    } catch (err) {
      setError('Network error: Failed to connect to API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">OpenAI API Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Test Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message to test the OpenAI API..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <button
            onClick={testAPI}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Testing API...' : 'Test OpenAI API'}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="text-red-800 font-medium">Error:</h3>
              <p className="text-red-600 text-sm">{error}</p>
              {error.includes('API key not configured') && (
                <div className="mt-2 text-sm text-red-600">
                  <p>To fix this:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" className="underline">OpenAI</a></li>
                    <li>Add it to your <code className="bg-gray-100 px-1 rounded">.env.local</code> file</li>
                    <li>Replace <code className="bg-gray-100 px-1 rounded">your_openai_key_here</code> with your actual key</li>
                    <li>Restart the dev server</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {response && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h3 className="text-green-800 font-medium mb-2">✅ API Response:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
            </div>
          )}

          <div className="text-center">
            <a href="/" className="text-blue-500 hover:underline">← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  )
} 