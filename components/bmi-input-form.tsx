'use client';

import { useState } from 'react';
import { BMIInput } from '@/lib/bmi-calculator';

interface BMIInputFormProps {
  onCalculate: (input: BMIInput) => void;
  isLoading?: boolean;
}

export function BMIInputForm({ onCalculate, isLoading }: BMIInputFormProps) {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!age || isNaN(ageNum)) {
      newErrors.age = 'Please enter a valid age';
    } else if (ageNum < 15 || ageNum > 40) {
      newErrors.age = 'Age must be between 15 and 40 years';
    }

    if (!height || isNaN(heightNum)) {
      newErrors.height = 'Please enter a valid height';
    } else if (heightNum < 100 || heightNum > 250) {
      newErrors.height = 'Height must be between 100 and 250 cm';
    }

    if (!weight || isNaN(weightNum)) {
      newErrors.weight = 'Please enter a valid weight';
    } else if (weightNum < 30 || weightNum > 200) {
      newErrors.weight = 'Weight must be between 30 and 200 kg';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onCalculate({
        age: parseFloat(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-3xl">📊</span>
          Enter Your Information
        </h2>

        {/* Age Input */}
        <div className="mb-5">
          <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
            Age (years)
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.age
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'
            }`}
            placeholder="e.g., 25"
            min="15"
            max="40"
            step="1"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.age}
            </p>
          )}
        </div>

        {/* Height Input */}
        <div className="mb-5">
          <label htmlFor="height" className="block text-sm font-semibold text-gray-700 mb-2">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.height
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'
            }`}
            placeholder="e.g., 165"
            min="100"
            max="250"
            step="0.1"
          />
          {errors.height && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.height}
            </p>
          )}
        </div>

        {/* Weight Input */}
        <div className="mb-6">
          <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.weight
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-200 focus:border-teal-500 focus:ring-teal-200'
            }`}
            placeholder="e.g., 60"
            min="30"
            max="200"
            step="0.1"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.weight}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <span className="text-xl">🔬</span>
              Calculate BMI & Analyze
            </>
          )}
        </button>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 text-sm">
        <p className="text-amber-900">
          <span className="font-semibold">⚕️ Medical Disclaimer:</span> This tool is for educational purposes only and does not replace professional medical advice.
          BMI is a screening tool and may not account for individual factors like muscle mass or body composition variations.
          Please consult a healthcare provider for personalized health assessment.
        </p>
      </div>
    </form>
  );
}
