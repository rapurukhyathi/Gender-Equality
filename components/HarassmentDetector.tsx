
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { HarassmentAnalysisResult } from '../types';

const HarassmentDetector: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HarassmentAnalysisResult | null>(null);

  const handleDetect = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const data = await geminiService.detectHarassment(text);
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
          <h2 className="text-2xl font-bold mb-2">Harassment Guard</h2>
          <p className="text-gray-500">Identify gender-based harassment or offensive comments to maintain digital safety.</p>
        </div>

        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-sdg-5 focus:border-transparent transition-all outline-none resize-none text-gray-700"
            placeholder="Paste suspicious comment or message here..."
          />
          <button
            onClick={handleDetect}
            disabled={loading || !text}
            className="w-full mt-4 bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-circle-notch animate-spin mr-2"></i> : <i className="fa-solid fa-shield-virus mr-2"></i>}
            Run Safety Scan
          </button>
        </div>

        {result && (
          <div className={`rounded-2xl p-6 border-2 transition-all duration-500 ${result.isHarassment ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${result.isHarassment ? 'bg-red-500' : 'bg-green-500'}`}>
                <i className={`fa-solid ${result.isHarassment ? 'fa-triangle-exclamation' : 'fa-check'} text-white text-xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-bold ${result.isHarassment ? 'text-red-700' : 'text-green-700'}`}>
                    {result.isHarassment ? 'Harassment Detected' : 'Content Safe'}
                  </h3>
                  {result.isHarassment && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase">
                      {result.severity} Risk
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-4 font-medium ${result.isHarassment ? 'text-red-600' : 'text-green-600'}`}>
                  Category: {result.category}
                </p>
                <div className="bg-white/50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed border border-white/50">
                  {result.explanation}
                </div>
                {result.isHarassment && (
                  <div className="mt-4 flex gap-3">
                    <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-bold border border-red-200 hover:bg-red-50 transition-colors">
                      Report Incident
                    </button>
                    <button className="bg-white text-gray-600 px-4 py-2 rounded-lg text-sm font-bold border border-gray-200 hover:bg-gray-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarassmentDetector;
