'use client';

import { useState } from 'react';
import { BMIInputForm } from '@/components/bmi-input-form';
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-5xl">🏥</span>
            <div>
              <h1 className="text-4xl font-extrabold">BMI & Reproductive Health Analyzer</h1>
              <p className="text-teal-100 text-lg mt-1">Evidence-Based Health Education for Young Women</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span>🌍</span>
              <span>WHO-Based Classifications</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span>💡</span>
              <span>Personalized Health Insights</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span>📚</span>
              <span>Research-Backed Evidence</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Form */}
          <BMIInputForm onCalculate={handleCalculate} isLoading={isLoadingAI && !showResults} />

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
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-teal-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">📖</span>
                About This Tool
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  This educational tool helps young women (ages 15-40) understand the relationship between Body Mass Index (BMI)
                  and reproductive health outcomes including fertility, pregnancy, and menstrual health.
                </p>
                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded">
                  <h3 className="font-semibold text-teal-900 mb-2">🔬 Evidence-Based Information</h3>
                  <p className="text-teal-800 text-sm">
                    All health information is based on WHO classifications and peer-reviewed medical research including
                    systematic reviews and meta-analyses published in 2023-2024.
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <h3 className="font-semibold text-purple-900 mb-2">💡 Personalized Health Education</h3>
                  <p className="text-purple-800 text-sm">
                    This tool provides personalized educational insights tailored to your BMI category and age,
                    making complex medical research accessible and easy to understand for better health decisions.
                  </p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <h3 className="font-semibold text-amber-900 mb-2">⚕️ Educational Purpose</h3>
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
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <p className="text-gray-300 mb-2 text-lg font-semibold">BMI & Reproductive Health Analyzer</p>
            <p className="text-gray-400 text-sm mb-4">
              Evidence-based health education for young women
            </p>
            <p className="text-gray-500 text-xs">
              Medical data sources: WHO, PMC/PubMed Research, FIGO, ASRM | For educational use only
            </p>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <a
              href="https://instagram.com/programmerscourt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              <span className="text-xl">⚡</span>
              <span>Powered by Programmers Court LTD</span>
            </a>
            <p className="text-gray-500 text-xs mt-2">
              Professional software development solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
