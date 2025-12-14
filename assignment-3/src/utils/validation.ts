import { Category, VALID_CATEGORIES } from '../types';

export function isValidCategory(category: string): category is Category {
  return VALID_CATEGORIES.includes(category as Category);
}

export function validateAndNormalizeResponse(response: string): Category {
  const normalized = response.toLowerCase().trim();
  if (isValidCategory(normalized)) {
    return normalized;
  }
  return 'other';
}