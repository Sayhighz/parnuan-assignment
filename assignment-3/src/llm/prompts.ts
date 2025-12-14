import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

const groq = new Groq({ apiKey });

export async function callLLM(prompt: string): Promise<string> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
      max_tokens: 50,
    });
    return chatCompletion.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('LLM API error:', error);
    throw error;
  }
}