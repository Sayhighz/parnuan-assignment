const { callLLM } = require('./dist/llm/prompts');
const { SYSTEM_PROMPT, createUserPrompt } = require('./dist/llm/client');
const { validateAndNormalizeResponse } = require('./dist/utils/validation');

async function testCategorize() {
  try {
    console.log('Testing LLM directly...');
    const prompt = `${SYSTEM_PROMPT}\n\n${createUserPrompt('ลาบ')}`;
    console.log('Prompt:', prompt.slice(0, 200) + '...');
    const rawResponse = await callLLM(prompt);
    console.log('Raw LLM response:', JSON.stringify(rawResponse));
    const normalized = validateAndNormalizeResponse(rawResponse);
    console.log('Normalized result:', normalized);
  } catch (error) {
    console.error('Error:', error);
  }
}

testCategorize();