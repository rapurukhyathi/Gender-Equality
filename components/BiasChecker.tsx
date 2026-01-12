
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { BiasAnalysisResult } from '../types';

const BiasChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BiasAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await geminiService.analyzeGenderBias(text);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Gender Bias Content Analyzer</h2>
          <p className="text-gray-500">Paste your job description or article text below to detect non-inclusive language.</p>
        </div>

        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-sdg-5 focus:border-transparent transition-all outline-none resize-none text-gray-700"
            placeholder="Enter job description text here..."
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !text}
            className="absolute bottom-4 right-4 bg-sdg-5 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {loading ? <i className="fa-solid fa-circle-notch animate-spin mr-2"></i> : <i className="fa-solid fa-magnifying-glass mr-2"></i>}
            Analyze Content
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Neutrality Score</span>
                <span className={`text-4xl font-bold ${result.score > 70 ? 'text-green-500' : 'text-orange-500'}`}>
                  {result.score}/100
                </span>
              </div>
              <div className="md:col-span-2 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation text-orange-500"></i>
                  Detected Biases
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.detectedBiases.map((bias, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                      {bias}
                    </span>
                  ))}
                  {result.detectedBiases.length === 0 && <p className="text-gray-400 italic">No specific biases detected.</p>}
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Inclusion Suggestions
              </h3>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-sm text-green-700 flex gap-2">
                    <span className="text-green-400">•</span> {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiasChecker;
