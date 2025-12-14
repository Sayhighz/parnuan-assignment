# Panuan Assignments Summary

This repository contains three interconnected assignments that form a complete personal finance management system:

## Assignment 1: Transaction API

A RESTful API for managing financial transactions built with Express.js, TypeScript, and MongoDB.

### Key Features
- CRUD operations for transactions (income/expense)
- Soft delete functionality
- Input validation with class-validator
- Transaction restore, summary, filtering, and pagination
- MongoDB with Mongoose

### Tech Stack
- Node.js with ES Modules
- Express.js
- TypeScript
- MongoDB with Mongoose
- class-validator & class-transformer

### Setup
```bash
cd assignment-1
npm install
cp .env.example .env
# Configure MongoDB URI in .env
npm run build
npm run dev
```
API available at `http://localhost:3000`

## Assignment 2: Transaction Dashboard

A React frontend application for managing and visualizing financial transactions, connecting to the Transaction API.

### Key Features
- Interactive dashboard with summary cards
- Transaction list with pagination and filtering
- Search functionality
- Charts and visualizations using Recharts
- Responsive design with Tailwind CSS

### Tech Stack
- React 19 with TypeScript
- Vite
- Tailwind CSS
- Recharts
- Axios for API communication
- shadcn/ui components

### Setup
```bash
cd assignment-2
npm install
npm run dev
```
Application available at `http://localhost:5173`

## Assignment 3: Transaction Categorizer

A TypeScript library using Groq's Llama model to categorize transaction descriptions into predefined categories.

### Key Features
- AI-powered categorization using LLM
- Supports Thai and English transaction descriptions
- 5 predefined categories: food, transport, utilities, shopping, other
- Error handling with fallback to 'other' category
- Unit testing with mocked LLM calls

### Tech Stack
- TypeScript
- Groq SDK
- Jest for testing
- Node.js

### Categories
- **food**: Food, beverages, restaurants, cafes, etc.
- **transport**: Transportation, fuel, parking, etc.
- **utilities**: Bills, subscriptions, rent, etc.
- **shopping**: Retail, clothing, electronics, etc.
- **other**: Anything not fitting above categories

### Setup
```bash
cd assignment-3
npm install
cp .env.example .env
# Add GROQ_API_KEY to .env
npm run build
npm test
```