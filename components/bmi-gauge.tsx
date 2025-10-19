'use client';

import { BMIResult } from '@/lib/bmi-calculator';

interface BMIGaugeProps {
  result: BMIResult;
}

export function BMIGauge({ result }: BMIGaugeProps) {
  const { bmi, categoryLabel, categoryColor } = result;

  // Calculate position percentage (0-40 BMI range for display)
  const getPositionPercentage = (bmi: number): number => {
    const minBMI = 10;
    const maxBMI = 40;
    const percentage = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const position = getPositionPercentage(bmi);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-teal-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your BMI Result</h3>

      {/* BMI Value Display */}
      <div className="text-center mb-8">
        <div
          className="inline-block text-6xl font-extrabold mb-2"
          style={{ color: categoryColor }}
        >
          {bmi}
        </div>
        <div
          className="text-2xl font-semibold px-6 py-2 rounded-full inline-block"
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
          }}
        >
          {categoryLabel}
        </div>
      </div>

      {/* BMI Gauge Visualization */}
      <div className="relative mb-8">
        {/* Color segments */}
        <div className="h-8 rounded-full overflow-hidden flex">
          <div className="flex-1 bg-blue-400" title="Underweight" />
          <div className="flex-1 bg-green-400" title="Normal" />
          <div className="flex-1 bg-amber-400" title="Overweight" />
          <div className="flex-1 bg-red-400" title="Obese" />
        </div>

        {/* Pointer */}
        <div
          className="absolute top-0 transform -translate-x-1/2 transition-all duration-500"
          style={{ left: `${position}%` }}
        >
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[16px] border-l-transparent border-r-transparent border-t-gray-800" />
          <div className="w-1 h-8 bg-gray-800 mx-auto" />
        </div>
      </div>

      {/* BMI Range Labels */}
      <div className="grid grid-cols-4 gap-2 text-xs text-center">
        <div>
          <div className="font-semibold text-blue-600">Underweight</div>
          <div className="text-gray-600">&lt; 18.5</div>
        </div>
        <div>
          <div className="font-semibold text-green-600">Normal</div>
          <div className="text-gray-600">18.5-24.9</div>
        </div>
        <div>
          <div className="font-semibold text-amber-600">Overweight</div>
          <div className="text-gray-600">25-29.9</div>
        </div>
        <div>
          <div className="font-semibold text-red-600">Obese</div>
          <div className="text-gray-600">≥ 30</div>
        </div>
      </div>

      {/* African Context Note */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm">
        <p className="text-purple-900">
          <span className="font-semibold">🌍 African Context:</span> WHO standard BMI classifications apply.
          However, body composition may vary across populations. Individual clinical assessment is recommended for personalized health guidance.
        </p>
      </div>
    </div>
  );
}
