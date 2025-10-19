// Unit conversion utilities

export type WeightUnit = 'kg' | 'lbs';
export type HeightUnit = 'cm' | 'm' | 'ft';

/**
 * Convert weight to kilograms
 */
export function convertToKg(value: number, unit: WeightUnit): number {
  if (unit === 'kg') return value;
  // lbs to kg: divide by 2.20462
  return value / 2.20462;
}

/**
 * Convert weight from kilograms
 */
export function convertFromKg(value: number, unit: WeightUnit): number {
  if (unit === 'kg') return value;
  // kg to lbs: multiply by 2.20462
  return value * 2.20462;
}

/**
 * Convert height to centimeters
 */
export function convertToCm(value: number, unit: HeightUnit): number {
  switch (unit) {
    case 'cm':
      return value;
    case 'm':
      return value * 100;
    case 'ft':
      // feet to cm: multiply by 30.48
      return value * 30.48;
    default:
      return value;
  }
}

/**
 * Convert height from centimeters
 */
export function convertFromCm(value: number, unit: HeightUnit): number {
  switch (unit) {
    case 'cm':
      return value;
    case 'm':
      return value / 100;
    case 'ft':
      // cm to feet: divide by 30.48
      return value / 30.48;
    default:
      return value;
  }
}

/**
 * Format height for display when in feet/inches
 */
export function formatHeightInFeetInches(totalFeet: number): string {
  const feet = Math.floor(totalFeet);
  const inches = Math.round((totalFeet - feet) * 12);
  return `${feet}'${inches}"`;
}

/**
 * Parse feet and inches input to decimal feet
 */
export function parseFeetInches(feet: number, inches: number): number {
  return feet + (inches / 12);
}

/**
 * Get unit label for display
 */
export function getUnitLabel(unit: WeightUnit | HeightUnit): string {
  const labels: Record<string, string> = {
    kg: 'kg',
    lbs: 'lbs',
    cm: 'cm',
    m: 'm',
    ft: 'ft/in'
  };
  return labels[unit] || unit;
}

/**
 * Get placeholder text for input
 */
export function getPlaceholder(type: 'weight' | 'height', unit: WeightUnit | HeightUnit): string {
  if (type === 'weight') {
    return unit === 'kg' ? 'e.g., 60' : 'e.g., 132';
  } else {
    switch (unit) {
      case 'cm':
        return 'e.g., 165';
      case 'm':
        return 'e.g., 1.65';
      case 'ft':
        return 'e.g., 5.4';
      default:
        return '';
    }
  }
}
