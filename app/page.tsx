'use client';

import { useState } from 'react';
import { BMIInputFormEnhanced } from '@/components/bmi-input-form-enhanced';
import { BMIGauge } from '@/components/bmi-gauge';
// import { ReproductiveHealthImpactPanel } from '@/components/reproductive-health-impact';
import { AIInsights } from '@/components/ai-insights';
import { CalculationHistory, saveToHistory, type HistoryEntry } from '@/components/calculation-history';
import { calculateBMI, type BMIInput, type BMIResult } from '@/lib/bmi-calculator';
import { REPRODUCTIVE_HEALTH_DATA } from '@/lib/medical-data';

export default function Home() {
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [currentInput, setCurrentInput] = useState<BMIInput | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [showPreloader, setShowPreloader] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = async (input: BMIInput) => {
    // Show preloader
    setShowPreloader(true);

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

    // Hide preloader
    setShowPreloader(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative">
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

      {/* Preloader */}
      {showPreloader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
            </div>
            <p className="text-lg font-semibold text-blue-900">Generating Health Analysis...</p>
            <p className="text-sm text-slate-600">Please wait while we analyze your data</p>
          </div>
        </div>
      )}

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

              {/* Reproductive Health Impact - Commented out for now, may revert later */}
              {/* <ReproductiveHealthImpactPanel data={healthData} categoryColor={bmiResult.categoryColor} /> */}
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
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border-t border-slate-800">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        <div className="container mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand & About Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-3 rounded-xl">
                  <span className="text-3xl">🏥</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">BMI Health Analyzer</h3>
                  <p className="text-blue-300 text-sm">Evidence-Based Health Education</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-md">
                A comprehensive educational platform providing evidence-based information about BMI and reproductive health
                for young women ages 15-40. Powered by WHO guidelines and peer-reviewed medical research.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">WHO Certified</span>
                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">Evidence-Based</span>
              </div>
            </div>

            {/* Medical Sources */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Medical Sources</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-slate-400 text-sm hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>World Health Organization</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400 text-sm hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>PMC/PubMed Research</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400 text-sm hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>FIGO Guidelines</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400 text-sm hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>ASRM Standards</span>
                </li>
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span>→</span> About This Tool
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span>→</span> Medical Disclaimer
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span>→</span> Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-400 text-sm hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span>→</span> Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚕️</span>
              <div>
                <h5 className="text-amber-400 font-semibold text-sm mb-1">Medical Disclaimer</h5>
                <p className="text-slate-400 text-xs leading-relaxed">
                  This tool is for educational purposes only and does not provide medical diagnosis or treatment recommendations.
                  Always consult qualified healthcare professionals for personalized medical advice and health decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Developer Attribution */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://instagram.com/programmerscourt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 px-5 py-2.5 rounded-lg transition-all transform hover:scale-105 shadow-lg text-sm font-semibold group"
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform">⚡</span>
                  <span>Powered by Programmers Court LTD</span>
                </a>
                <div className="text-center sm:text-left">
                  <p className="text-slate-500 text-xs">Professional Software Development</p>
                  <p className="text-slate-600 text-xs">Building Healthcare Solutions</p>
                </div>
              </div>

              {/* Copyright & Legal */}
              <div className="text-center lg:text-right">
                <p className="text-slate-400 text-sm font-medium mb-1">© 2025 BMI Health Analyzer. All rights reserved.</p>
                <p className="text-slate-600 text-xs">Medical data from verified sources • WHO Compliant</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">🔒</span>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🔬</span>
                <span>Evidence-Based</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500">🎓</span>
                <span>Educational Purpose</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">⚡</span>
                <span>AI-Powered Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
