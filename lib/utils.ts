import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertCmToMeters = (cm: number): string => {
  if (cm <= 0) {
    return '';
  }
  const meters = (cm / 100).toFixed(2);
  return `${meters} m`;
};

export const convertKgToString = (kg: number): string => {
  return `${kg} kg`;
};
