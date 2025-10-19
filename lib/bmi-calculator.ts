export interface BMIInput {
  age: number;
  height: number; // in cm
  weight: number; // in kg
}

export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  categoryLabel: string;
  categoryColor: string;
  healthRisk: 'low' | 'moderate' | 'high' | 'very-high';
}

/**
 * Calculate BMI using WHO formula: weight (kg) / height² (m)
 */
export function calculateBMI(input: BMIInput): BMIResult {
  const { weight, height } = input;

  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  // Determine category based on WHO BMI classifications
  let category: BMIResult['category'];
  let categoryLabel: string;
  let categoryColor: string;
  let healthRisk: BMIResult['healthRisk'];

  if (bmi < 18.5) {
    category = 'underweight';
    categoryLabel = 'Underweight';
    categoryColor = '#3B82F6'; // blue
    healthRisk = 'moderate';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'normal';
    categoryLabel = 'Normal Weight';
    categoryColor = '#10B981'; // green
    healthRisk = 'low';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'overweight';
    categoryLabel = 'Overweight';
    categoryColor = '#F59E0B'; // amber
    healthRisk = 'moderate';
  } else {
    category = 'obese';
    categoryLabel = 'Obese';
    categoryColor = '#EF4444'; // red
    healthRisk = 'high';
  }

  return {
    bmi: Math.round(bmi * 10) / 10, // Round to 1 decimal place
    category,
    categoryLabel,
    categoryColor,
    healthRisk,
  };
}

/**
 * Get BMI category ranges for visualization
 */
export const BMI_RANGES = [
  { min: 0, max: 18.5, label: 'Underweight', color: '#3B82F6' },
  { min: 18.5, max: 25, label: 'Normal', color: '#10B981' },
  { min: 25, max: 30, label: 'Overweight', color: '#F59E0B' },
  { min: 30, max: 40, label: 'Obese', color: '#EF4444' },
];
