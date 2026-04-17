import { useState } from 'react'
import axios from 'axios'
import ReviewCard from './components/ReviewCard'
import ResultCard from './components/ResultCard'

function App() {
  const [review, setReview] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!review.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        review: review.trim(),
      })
      setResult(response.data)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'Failed to connect to Cortex AI server. Make sure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setReview('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden font-sans">
      {/* Background gradient orbs */}
      <div className="bg-orb w-[600px] h-[600px] bg-violet-600 top-[-200px] left-[-200px]" />
      <div className="bg-orb w-[500px] h-[500px] bg-blue-600 bottom-[-150px] right-[-150px]" />
      <div className="bg-orb w-[300px] h-[300px] bg-emerald-500 top-[40%] left-[50%]" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">Cortex AI</h1>
              <p className="text-slate-500 text-xs">Intelligent Analysis Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Phase 2
            </span>
          </div>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
            {/* Title */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">Analyze Reviews</span>
                <br />
                <span className="text-white">with AI Precision</span>
              </h2>
              <p className="text-slate-400 text-base max-w-md mx-auto">
                Paste any product review and Cortex AI will clean, process, and analyze it instantly.
              </p>
            </div>

            {/* Review Input Card */}
            <ReviewCard
              review={review}
              setReview={setReview}
              onAnalyze={handleAnalyze}
              onReset={handleReset}
              loading={loading}
              hasResult={!!result}
            />

            {/* Error */}
            {error && (
              <div className="animate-slide-up glass-card rounded-2xl p-4 border border-red-500/20 bg-red-500/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-400 font-medium text-sm">Connection Error</p>
                    <p className="text-slate-400 text-xs mt-0.5">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Result Card */}
            {result && <ResultCard result={result} />}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-white/5 text-center">
          <p className="text-slate-600 text-xs">
            Cortex AI © 2026 · Built with FastAPI + React + Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
