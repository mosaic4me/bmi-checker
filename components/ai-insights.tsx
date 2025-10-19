'use client';

interface AIInsightsProps {
  analysis: string;
  isLoading: boolean;
  error?: string;
}

export function AIInsights({ analysis, isLoading, error }: AIInsightsProps) {
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">❌</span>
          <div>
            <h4 className="font-bold text-red-900 mb-2">AI Analysis Error</h4>
            <p className="text-red-700 text-sm">{error}</p>
            <p className="text-red-600 text-xs mt-2">
              Note: Make sure you&apos;ve added your OpenAI API key to the .env.local file.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 text-lg">Generating Personalized Insights</h4>
            <p className="text-purple-700 text-sm">Analyzing your health data for tailored recommendations...</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-purple-200 rounded animate-pulse w-full"></div>
          <div className="h-3 bg-purple-200 rounded animate-pulse w-5/6"></div>
          <div className="h-3 bg-purple-200 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">💡</span>
        <div>
          <h4 className="font-bold text-purple-900 text-xl">Personalized Health Insights</h4>
          <p className="text-purple-700 text-sm">Tailored educational guidance for your health journey</p>
        </div>
      </div>

      <div className="bg-white bg-opacity-80 rounded-lg p-5 leading-relaxed">
        <div
          className="prose prose-sm max-w-none text-gray-800"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
          dangerouslySetInnerHTML={{
            __html: analysis
              .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
              .replace(/\n\n/g, '</p><p class="mb-3">')
              .replace(/^(.*)$/, '<p class="mb-3">$1</p>')
              .replace(/- /g, '<br/>• ')
          }}
        />
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-purple-700 bg-purple-100 rounded-lg p-3">
        <span>💡</span>
        <span>
          This personalized analysis is for educational purposes and should not replace professional medical advice.
          Always consult with a healthcare provider for personalized health guidance.
        </span>
      </div>
    </div>
  );
}
