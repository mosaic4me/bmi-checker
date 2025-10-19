'use client';

import { useState } from 'react';
import { BMIInputFormEnhanced } from '@/components/bmi-input-form-enhanced';
import { BMIGauge } from '@/components/bmi-gauge';
import { ReproductiveHealthImpactPanel } from '@/components/reproductive-health-impact';
import { AIInsights } from '@/components/ai-insights';
import { CalculationHistory, saveToHistory, type HistoryEntry } from '@/components/calculation-history';
import { calculateBMI, type BMIInput, type BMIResult } from '@/lib/bmi-calculator';
import { REPRODUCTIVE_HEALTH_DATA } from '@/lib/medical-data';

export default function Home() {
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [currentInput, setCurrentInput] = useState<BMIInput | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = async (input: BMIInput) => {
    // Calculate BMI
    const result = calculateBMI(input);
    setBmiResult(result);
    setCurrentInput(input);
    setShowResults(true);
    setAiAnalysis('');
    setAiError('');

    // Save to history
    saveToHistory({
      age: input.age,
      height: input.height,
      weight: input.weight,
      bmi: result.bmi,
      category: result.category,
      categoryLabel: result.categoryLabel,
    });

    // Get AI analysis
    await fetchAIAnalysis(input, result);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const fetchAIAnalysis = async (input: BMIInput, result: BMIResult) => {
    setIsLoadingAI(true);
    setAiError('');

    try {
      const healthData = REPRODUCTIVE_HEALTH_DATA[result.category];

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bmi: result.bmi,
          category: result.categoryLabel,
          age: input.age,
          impacts: healthData.impacts,
          statistics: healthData.statistics,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate AI analysis');
      }

      setAiAnalysis(data.analysis);
    } catch (error) {
      console.error('AI Analysis error:', error);
      setAiError(error instanceof Error ? error.message : 'Failed to generate AI analysis. Please check your API key configuration.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    const input: BMIInput = {
      age: entry.age,
      height: entry.height,
      weight: entry.weight,
    };
    handleCalculate(input);
  };

  const healthData = bmiResult ? REPRODUCTIVE_HEALTH_DATA[bmiResult.category] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-800 text-white shadow-xl border-b-4 border-emerald-600">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center gap-4">
            <div className="bg-white bg-opacity-10 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-5xl">🏥</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">BMI & Reproductive Health Analyzer</h1>
              <p className="text-blue-100 text-lg mt-2 font-light">Evidence-Based Health Education for Young Women</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Form */}
          <BMIInputFormEnhanced onCalculate={handleCalculate} isLoading={isLoadingAI && !showResults} />

          {/* Calculation History */}
          <CalculationHistory onSelectEntry={handleSelectHistoryEntry} />

          {/* Results Section */}
          {showResults && bmiResult && healthData && currentInput && (
            <div id="results" className="space-y-8">
              {/* BMI Gauge */}
              <BMIGauge result={bmiResult} />

              {/* AI Insights */}
              <AIInsights analysis={aiAnalysis} isLoading={isLoadingAI} error={aiError} />

              {/* Reproductive Health Impact */}
              <ReproductiveHealthImpactPanel data={healthData} categoryColor={bmiResult.categoryColor} />
            </div>
          )}

          {/* Educational Footer */}
          {!showResults && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <span className="text-3xl">📖</span>
                </div>
                <h2 className="text-2xl font-bold text-blue-900">About This Tool</h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  This educational tool helps young women (ages 15-40) understand the relationship between Body Mass Index (BMI)
                  and reproductive health outcomes including fertility, pregnancy, and menstrual health.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <span>🔬</span> Evidence-Based Information
                  </h3>
                  <p className="text-blue-800 text-sm">
                    All health information is based on WHO classifications and peer-reviewed medical research including
                    systematic reviews and meta-analyses published in 2023-2024.
                  </p>
                </div>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-5 rounded-lg">
                  <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <span>💡</span> Personalized Health Education
                  </h3>
                  <p className="text-emerald-800 text-sm">
                    This tool provides personalized educational insights tailored to your BMI category and age,
                    making complex medical research accessible and easy to understand for better health decisions.
                  </p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-600 p-5 rounded-lg">
                  <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <span>⚕️</span> Educational Purpose
                  </h3>
                  <p className="text-amber-800 text-sm">
                    This tool is designed for educational purposes only. It does not provide medical diagnosis or treatment
                    recommendations. Always consult qualified healthcare professionals for personalized medical advice.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-10 mt-16 border-t-4 border-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-slate-200 mb-2 text-xl font-bold">BMI & Reproductive Health Analyzer</p>
            <p className="text-slate-300 text-sm mb-4">
              Evidence-based health education for young women
            </p>
            <p className="text-slate-400 text-xs">
              Medical data sources: WHO, PMC/PubMed Research, FIGO, ASRM | For educational use only
            </p>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center">
            <a
              href="https://instagram.com/programmerscourt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              <span className="text-2xl">⚡</span>
              <span>Powered by Programmers Court LTD</span>
            </a>
            <p className="text-slate-400 text-sm mt-3">
              Professional software development solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
