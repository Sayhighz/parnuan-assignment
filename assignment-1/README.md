# Transaction API

A RESTful API for managing financial transactions built with Express.js, TypeScript, and MongoDB.

## Features

- ✅ CRUD operations for transactions
- ✅ Income and expense transaction types
- ✅ Soft delete functionality
- ✅ Input validation with class-validator
- ✅ TypeScript strict mode
- ✅ MongoDB with Mongoose
- ✅ Bonus: Transaction restore, summary, filtering, and pagination

## Tech Stack

- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: class-validator & class-transformer
- **Environment**: dotenv

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/transaction-api
   PORT=3000
   ```

5. Build the project:
   ```bash
   npm run build
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Create Transaction
```http
POST /transactions
Content-Type: application/json

{
  "type": "income",
  "amount": 5000.00,
  "description": "Salary payment",
  "date": "2024-01-15T00:00:00.000Z"
}
```

### Get All Transactions
```http
GET /transactions
GET /transactions?type=income
GET /transactions?page=1&limit=10
```

### Get Transaction by ID
```http
GET /transactions/:id
```

### Update Transaction
```http
PUT /transactions/:id
Content-Type: application/json

{
  "amount": 6000.00,
  "description": "Updated salary"
}
```

### Delete Transaction (Soft Delete)
```http
DELETE /transactions/:id
```

### Restore Transaction
```http
PATCH /transactions/:id/restore
```

### Get Summary
```http
GET /transactions/summary
GET /transactions/summary?startDate=2024-01-01&endDate=2024-01-31
```

## Transaction Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | ObjectId | Auto | MongoDB ID |
| type | string | Yes | 'income' or 'expense' |
| amount | number | Yes | Positive number > 0 |
| description | string | Yes | 1-500 characters |
| date | Date | Yes | Valid ISO date |
| createdAt | Date | Auto | Creation timestamp |
| updatedAt | Date | Auto | Last update timestamp |
| deletedAt | Date | No | Soft delete timestamp |

## Response Examples

### Success Response (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "type": "income",
  "amount": 5000,
  "description": "Salary payment",
  "date": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "deletedAt": null
}
```

### Summary Response
```json
{
  "totalIncome": 15000,
  "totalExpense": 8000,
  "balance": 7000
}
```

### Paginated Response
```json
{
  "data": [...],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

### Validation Error Example
```json
{
  "error": "Validation failed",
  "details": [
    "amount must be a positive number",
    "type must be either income or expense"
  ]
}
```

## Development

### Available Scripts

- `npm run build` - Compile TypeScript
- `npm run start` - Run production build
- `npm run dev` - Run development server with ts-node
- `npm test` - Run tests (when implemented)

### Project Structure

```
src/
├── controllers/     # HTTP request handlers
├── dtos/           # Data transfer objects
├── middlewares/    # Express middlewares
├── models/         # Mongoose models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript interfaces
└── index.ts        # Application entry point
```

## Testing

To test the API endpoints, you can use tools like:

- **Postman** - Import the collection and test endpoints
- **curl** - Command line testing
- **Thunder Client** - VS Code extension

Example curl command:
```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{"type":"income","amount":1000,"description":"Test","date":"2024-01-01"}'
```

## License

ISC
