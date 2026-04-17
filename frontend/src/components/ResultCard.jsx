const ResultCard = ({ result }) => {
  const sentimentConfig = {
    pending: {
      label: 'Pending Analysis',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    positive: {
      label: 'Positive',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    negative: {
      label: 'Negative',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    neutral: {
      label: 'Neutral',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
  }

  const sentiment = sentimentConfig[result.sentiment] || sentimentConfig.pending

  return (
    <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-black/40 animate-fade-in">
      {/* Card header */}
      <div className="flex items-center gap-2 mb-5 animate-slide-up">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="text-slate-400 text-sm font-medium">Analysis Result</span>
      </div>

      <div className="space-y-4">
        {/* Sentiment Badge */}
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${sentiment.bg} ${sentiment.border} animate-slide-up [animation-delay:100ms]`}>
          <div className={`w-9 h-9 rounded-lg ${sentiment.bg} border ${sentiment.border} flex items-center justify-center flex-shrink-0`}>
            <svg className={`w-5 h-5 ${sentiment.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {sentiment.icon}
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs">Sentiment</p>
            <p className={`font-semibold text-sm ${sentiment.color}`}>{sentiment.label}</p>
          </div>
          <div className="ml-auto">
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono uppercase tracking-wider ${sentiment.bg} ${sentiment.color} border ${sentiment.border}`}>
              {result.sentiment}
            </span>
          </div>
        </div>

        {/* Cleaned Text */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] animate-slide-up [animation-delay:200ms]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Cleaned Text</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{result.cleaned_text}</p>
        </div>

        {/* Original */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] animate-slide-up [animation-delay:300ms]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Original Input</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed italic">"{result.review}"</p>
        </div>
      </div>
    </div>
  )
}

export default ResultCard
