# Assignment 3: Transaction Categorizer

A TypeScript library that uses Groq's Llama model to categorize transaction descriptions into predefined categories for a Thai personal finance app.

## Tech Stack

- **TypeScript**: Strongly typed programming language for building robust applications
- **Groq SDK**: Client library for interacting with Groq's Llama large language models
- **Jest**: JavaScript testing framework for unit testing with mocking capabilities
- **dotenv**: Module for loading environment variables from a .env file
- **Node.js**: JavaScript runtime for server-side development

## Categories

- **food**: Food, beverages, restaurants, cafes, food delivery, supermarkets, convenience stores
- **transport**: Transportation, fuel, parking, vehicle maintenance, ride-hailing, public transport
- **utilities**: Bills, utilities, subscriptions, recurring services (electricity, water, internet, phone, rent, insurance)
- **shopping**: Retail shopping, clothing, electronics, online shopping, personal items
- **healthcare**: Medical expenses, pharmacy, health products, fitness
- **entertainment**: Movies, games, hobbies, leisure activities, travel, tourism
- **education**: Tuition, courses, books, learning materials
- **transfer**: Money transfers between accounts, transfers to other people
- **income**: Salary, wages, received payments, refunds, cashback
- **other**: Anything that doesn't clearly fit into above categories

## Setup

1. Clone the repository and navigate to the `assignment-3` directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run tests:
   ```bash
   npm test
   ```

6. Run the example:
   ```bash
   npm run example
   ```

7. For development mode:
   ```bash
   npm run dev
   ```

8. To start the built application:
   ```bash
   npm run start
   ```

## Usage

```typescript
import { categorize } from './dist/index';

async function example() {
  const category = await categorize('กาแฟ Starbucks');
  console.log(category); // 'food'
}
```

## API

### `categorize(description: string): Promise<Category>`

Categorizes a transaction description.

- **Parameters**:
  - `description`: The transaction description (string)
- **Returns**: A promise that resolves to one of the 10 categories: `'food' | 'transport' | 'utilities' | 'shopping' | 'healthcare' | 'entertainment' | 'education' | 'transfer' | 'income' | 'other'`

## Prompt Design

The system uses a carefully crafted prompt to ensure accurate categorization:

- **System Prompt**: Defines the role and categories with examples.
- **User Prompt**: Simple template: "Categorize this transaction: {description}"
- **Rules**: Respond only with lowercase category name, handle Thai/English input, default to 'other' if unsure.

## Error Handling

- API errors fallback to 'other'
- Invalid LLM responses are normalized to 'other'
- Empty/whitespace inputs return 'other'
- Long inputs are truncated to 500 characters

## Testing

Run unit tests with mocked LLM calls:
```bash
npm test
```

Tests cover:
- All 10 categories
- Thai and English inputs
- Edge cases (empty, long, invalid responses)
- Error scenarios

## Direct LLM Testing

To test the LLM directly without mocks:

```bash
node test-categorize.js
```

This script sends a test transaction to the LLM and displays the raw response and normalized result.