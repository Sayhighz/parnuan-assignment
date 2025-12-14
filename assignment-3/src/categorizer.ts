import { Category } from './types';
import { SYSTEM_PROMPT, createUserPrompt } from './llm/client';
import { callLLM } from './llm/prompts';
import { validateAndNormalizeResponse } from './utils/validation';

export async function categorize(description: string): Promise<Category> {
  if (!description || description.trim() === '') {
    return 'other';
  }

  const sanitizedDescription = description.trim().slice(0, 500);

  try {
    const prompt = `${SYSTEM_PROMPT}\n\n${createUserPrompt(sanitizedDescription)}`;
    const response = await callLLM(prompt);
    return validateAndNormalizeResponse(response);
  } catch (error) {
    console.error('Categorization error:', error);
    return 'other';
  }
}