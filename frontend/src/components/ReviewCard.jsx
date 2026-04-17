const ReviewCard = ({ review, setReview, onAnalyze, onReset, loading, hasResult }) => {
  const charCount = review.length
  const isReady = review.trim().length > 0

  return (
    <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-black/40 animate-slide-up">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse-slow" />
          <span className="text-slate-400 text-sm font-medium">Input Review</span>
        </div>
        <span className={`text-xs font-mono ${charCount > 800 ? 'text-amber-400' : 'text-slate-600'}`}>
          {charCount} / 1000
        </span>
      </div>

      {/* Textarea */}
      <textarea
        id="review-input"
        value={review}
        onChange={(e) => setReview(e.target.value.slice(0, 1000))}
        placeholder="Paste your product review here... e.g. 'This laptop has an amazing battery life and the display is stunning. However, the keyboard feels a bit mushy.'"
        rows={6}
        disabled={loading}
        className="w-full bg-transparent text-slate-200 placeholder-slate-600 text-sm leading-relaxed resize-none outline-none
                   border border-white/5 rounded-xl p-4 focus:border-violet-500/40 focus:bg-violet-500/5
                   transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-4 gap-3">
        {hasResult && (
          <button
            id="reset-btn"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 text-sm
                       border border-white/5 hover:border-white/10 hover:text-white
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        )}

        <button
          id="analyze-btn"
          onClick={onAnalyze}
          disabled={!isReady || loading}
          className={`ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                      transition-all duration-300 shadow-lg
                      ${isReady && !loading
                        ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500 shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                      }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Analyze Review
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ReviewCard
