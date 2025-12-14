# Transaction Dashboard

A React frontend application for managing and visualizing financial transactions, built with TypeScript, Vite, and Tailwind CSS. This dashboard connects to the Transaction API (assignment-1) to provide a user-friendly interface for transaction management.

## Features

- ✅ Interactive dashboard with summary cards
- ✅ Transaction list with pagination and filtering
- ✅ Search functionality for transactions
- ✅ Charts and visualizations using Recharts
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Axios for API communication
- ✅ Modern UI components with shadcn/ui

## Tech Stack

- **Runtime**: Node.js with ES Modules
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React & Tabler Icons
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Animation**: Motion, MagicUI

## Setup

### Prerequisites

- Node.js (v16 or higher)

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Usage

The dashboard provides the following main sections:

- **Dashboard**: Overview with summary cards showing total income, expenses, and balance
- **Transaction List**: View all transactions with filtering and search capabilities
- **Charts**: Visual representations of transaction data

### Connecting to API

The application expects the Transaction API to be running. Update the API base URL in the code if necessary (currently hardcoded to `http://localhost:3000`).

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ChartSection.tsx
│   ├── FilterBar.tsx
│   ├── SearchBar.tsx
│   ├── SummaryCards.tsx
│   ├── TransactionItem.tsx
│   └── TransactionList.tsx
├── data/               # Mock data (for development)
├── layouts/            # Layout components
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Masterlayout.tsx
├── lib/                # Utility functions
├── pages/              # Page components
│   └── Dashboard/
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Environment Setup

No environment variables

## Dependencies

This project uses the following key dependencies:

- **React**: UI framework
- **TypeScript**: Type safety
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library
- **Axios**: HTTP client
- **React Router DOM**: Client-side routing
- **Motion**: Animation library
