import { describe, test, expect, beforeEach, mock, spyOn } from 'bun:test';
import { testCases } from './fixtures/test-cases';

// Mock the module before importing the code that uses it
mock.module('../src/llm/prompts', () => ({
  callLLM: mock(() => Promise.resolve('other')),
}));

import { categorize } from '../src/categorizer';
import { callLLM } from '../src/llm/prompts';

describe('categorize', () => {
  beforeEach(() => {
    (callLLM as ReturnType<typeof mock>).mockClear();
  });

  test.each(testCases)('categorizes "$description" as $expected', async ({ description, expected }) => {
    (callLLM as ReturnType<typeof mock>).mockResolvedValue(expected);
    const result = await categorize(description);
    expect(result).toBe(expected);
  });

  test('returns "other" when LLM returns invalid category', async () => {
    (callLLM as ReturnType<typeof mock>).mockResolvedValue('invalid');
    const result = await categorize('some description');
    expect(result).toBe('other');
  });

  test('returns "other" on LLM error', async () => {
    (callLLM as ReturnType<typeof mock>).mockImplementation(() => Promise.reject(new Error('API error')));
    const result = await categorize('some description');
    expect(result).toBe('other');
  });

  test('handles empty string', async () => {
    const result = await categorize('');
    expect(result).toBe('other');
    expect(callLLM).not.toHaveBeenCalled();
  });

  test('handles whitespace only', async () => {
    const result = await categorize('   ');
    expect(result).toBe('other');
    expect(callLLM).not.toHaveBeenCalled();
  });

  test('truncates long input', async () => {
    const longDescription = 'a'.repeat(600);
    (callLLM as ReturnType<typeof mock>).mockResolvedValue('food');
    await categorize(longDescription);
    expect(callLLM).toHaveBeenCalledWith(
      expect.stringContaining('a'.repeat(500))
    );
  });
});