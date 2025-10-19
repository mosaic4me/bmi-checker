'use client';

import { useState } from 'react';
import { BMIInput } from '@/lib/bmi-calculator';
import {
  convertToKg,
  convertToCm,
  type WeightUnit,
  type HeightUnit,
  getPlaceholder
} from '@/lib/unit-converter';

interface BMIInputFormProps {
  onCalculate: (input: BMIInput) => void;
  isLoading?: boolean;
}

export function BMIInputFormEnhanced({ onCalculate, isLoading }: BMIInputFormProps) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    let heightNum: number;

    // Validate age
    if (!age || isNaN(ageNum)) {
      newErrors.age = 'Please enter a valid age';
    } else if (ageNum < 15 || ageNum > 40) {
      newErrors.age = 'Age must be between 15 and 40 years';
    }

    // Validate weight
    if (!weight || isNaN(weightNum)) {
      newErrors.weight = 'Please enter a valid weight';
    } else {
      // Convert to kg for validation
      const weightInKg = convertToKg(weightNum, weightUnit);
      if (weightInKg < 30 || weightInKg > 200) {
        newErrors.weight = weightUnit === 'kg'
          ? 'Weight must be between 30 and 200 kg'
          : 'Weight must be between 66 and 440 lbs';
      }
    }

    // Validate height
    if (heightUnit === 'ft') {
      const feetNum = parseFloat(feet);
      const inchesNum = parseFloat(inches);

      if (!feet || isNaN(feetNum)) {
        newErrors.height = 'Please enter valid feet';
      } else if (!inches || isNaN(inchesNum)) {
        newErrors.height = 'Please enter valid inches';
      } else {
        const totalFeet = feetNum + (inchesNum / 12);
        heightNum = convertToCm(totalFeet, 'ft');
        if (heightNum < 100 || heightNum > 250) {
          newErrors.height = 'Height must be between 3\'3" and 8\'2"';
        }
      }
    } else {
      heightNum = parseFloat(height);
      if (!height || isNaN(heightNum)) {
        newErrors.height = 'Please enter a valid height';
      } else {
        const heightInCm = convertToCm(heightNum, heightUnit);
        if (heightInCm < 100 || heightInCm > 250) {
          newErrors.height = heightUnit === 'cm'
            ? 'Height must be between 100 and 250 cm'
            : 'Height must be between 1.0 and 2.5 m';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const weightNum = parseFloat(weight);
      let heightNum: number;

      if (heightUnit === 'ft') {
        const feetNum = parseFloat(feet);
        const inchesNum = parseFloat(inches);
        const totalFeet = feetNum + (inchesNum / 12);
        heightNum = convertToCm(totalFeet, 'ft');
      } else {
        heightNum = convertToCm(parseFloat(height), heightUnit);
      }

      const weightInKg = convertToKg(weightNum, weightUnit);

      onCalculate({
        age: parseFloat(age),
        height: heightNum,
        weight: weightInKg,
      });
    }
  };

  const UnitToggle = <T extends string>({
    options,
    value,
    onChange
  }: {
    options: readonly T[];
    value: T;
    onChange: (val: T) => void
  }) => (
    <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-300">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            value === option
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <span className="text-2xl">📊</span>
          </div>
          Enter Your Information
        </h2>

        {/* Age Input */}
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-semibold text-slate-700 mb-2">
            Age (years)
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-lg ${
              errors.age
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="e.g., 25"
            min="15"
            max="40"
            step="1"
          />
          {errors.age && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.age}
            </p>
          )}
        </div>

        {/* Weight Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="weight" className="block text-sm font-semibold text-slate-700">
              Weight
            </label>
            <UnitToggle
              options={['kg', 'lbs'] as const}
              value={weightUnit}
              onChange={setWeightUnit}
            />
          </div>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-lg ${
              errors.weight
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder={getPlaceholder('weight', weightUnit)}
            step="0.1"
          />
          {errors.weight && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.weight}
            </p>
          )}
        </div>

        {/* Height Input */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="height" className="block text-sm font-semibold text-slate-700">
              Height
            </label>
            <UnitToggle
              options={['cm', 'm', 'ft'] as const}
              value={heightUnit}
              onChange={setHeightUnit}
            />
          </div>

          {heightUnit === 'ft' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  id="feet"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-lg ${
                    errors.height
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="Feet (e.g., 5)"
                  step="1"
                  min="3"
                  max="8"
                />
              </div>
              <div>
                <input
                  type="number"
                  id="inches"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-lg ${
                    errors.height
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="Inches (e.g., 5)"
                  step="1"
                  min="0"
                  max="11"
                />
              </div>
            </div>
          ) : (
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-lg ${
                errors.height
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder={getPlaceholder('height', heightUnit)}
              step={heightUnit === 'm' ? '0.01' : '0.1'}
            />
          )}

          {errors.height && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.height}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <span className="text-2xl">🔬</span>
              Calculate BMI & Get Health Insights
            </>
          )}
        </button>
      </div>
    </form>
  );
}
