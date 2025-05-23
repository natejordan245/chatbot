'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSupabase() {
  const [connected, setConnected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Simple test - just check if we can create a client and get session
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          setError(error.message)
          setConnected(false)
        } else {
          setConnected(true)
          setError(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setConnected(false)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Supabase Connection Test</h1>
        
        {connected === null && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Testing connection...</p>
          </div>
        )}

        {connected === true && (
          <div className="text-center">
            <div className="text-green-500 text-4xl mb-2">✅</div>
            <h2 className="text-xl font-semibold text-green-600">Connected!</h2>
            <p className="text-gray-600 mt-2">Supabase is properly configured</p>
          </div>
        )}

        {connected === false && (
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-2">❌</div>
            <h2 className="text-xl font-semibold text-red-600">Connection Failed</h2>
            <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">{error}</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/" className="text-blue-500 hover:underline">← Back to Home</a>
        </div>
      </div>
    </div>
  )
} 