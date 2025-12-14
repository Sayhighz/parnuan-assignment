import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transactionRoutes from '../../routes/transaction.routes.js';
import { TransactionType } from '../../types/transaction.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/transactions', transactionRoutes);

describe('Transaction API E2E Tests', () => {
  let createdTransactionId: string;

  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-db';
    await mongoose.connect(mongoUri);
  });


  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /transactions', () => {
    it('should create a new transaction', async () => {
      const transactionData = {
        type: TransactionType.INCOME,
        amount: 1000,
        description: 'Salary payment'
      };

      const response = await request(app)
        .post('/transactions')
        .send(transactionData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data._id).toMatch(/^income\d{8}[A-F0-9]{8}$/);
      expect(response.body.data.type).toBe(TransactionType.INCOME);
      expect(response.body.data.amount).toBe(1000);
      expect(response.body.data.description).toBe('Salary payment');

      createdTransactionId = response.body.data._id;
    });

    it('should create a new transaction without date', async () => {
      const transactionData = {
        type: TransactionType.EXPENSE,
        amount: 500,
        description: 'Coffee'
      };

      const response = await request(app)
        .post('/transactions')
        .send(transactionData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data._id).toMatch(/^expense\d{8}[A-F0-9]{8}$/);
      expect(response.body.data.type).toBe(TransactionType.EXPENSE);
      expect(response.body.data.amount).toBe(500);
      expect(response.body.data.description).toBe('Coffee');
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        type: 'invalid-type',
        amount: -100,
        description: ''
      };

      await request(app)
        .post('/transactions')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /transactions', () => {
    beforeEach(async () => {
      // Create test data
      await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.INCOME,
          amount: 2000,
          description: 'Freelance work'
        });

      await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.EXPENSE,
          amount: 500,
          description: 'Groceries'
        });
    });

    it('should get all transactions', async () => {
      const response = await request(app)
        .get('/transactions')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(2);
    });

    it('should filter transactions by type', async () => {
      const response = await request(app)
        .get('/transactions?type=income')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].type).toBe(TransactionType.INCOME);
    });

    it('should paginate transactions', async () => {
      const response = await request(app)
        .get('/transactions?page=1&limit=1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
      expect(response.body.meta.page).toBe(1);
      expect(response.body.meta.limit).toBe(1);
      expect(response.body.meta.total).toBe(2);
    });
  });

  describe('GET /transactions/:id', () => {
    beforeEach(async () => {
      const response = await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.INCOME,
          amount: 1500,
          description: 'Bonus'
        });
      createdTransactionId = response.body.data._id;
    });

    it('should get transaction by id', async () => {
      const response = await request(app)
        .get(`/transactions/${createdTransactionId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(createdTransactionId);
      expect(response.body.data.amount).toBe(1500);
    });

    it('should return 404 for non-existent transaction', async () => {
      await request(app)
        .get('/transactions/invalid-id')
        .expect(404);
    });
  });

  describe('PUT /transactions/:id', () => {
    beforeEach(async () => {
      const response = await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.EXPENSE,
          amount: 300,
          description: 'Coffee'
        });
      createdTransactionId = response.body.data._id;
    });

    it('should update transaction', async () => {
      const updateData = {
        amount: 400,
        description: 'Coffee and snacks'
      };

      const response = await request(app)
        .put(`/transactions/${createdTransactionId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.amount).toBe(400);
      expect(response.body.data.description).toBe('Coffee and snacks');
    });

    it('should return 404 for non-existent transaction', async () => {
      await request(app)
        .put('/transactions/invalid-id')
        .send({ amount: 100 })
        .expect(404);
    });
  });

  describe('DELETE /transactions/:id', () => {
    beforeEach(async () => {
      const response = await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.EXPENSE,
          amount: 200,
          description: 'Lunch'
        });
      createdTransactionId = response.body.data._id;
    });

    it('should soft delete transaction', async () => {
      await request(app)
        .delete(`/transactions/${createdTransactionId}`)
        .expect(200);

      // Verify it's deleted
      await request(app)
        .get(`/transactions/${createdTransactionId}`)
        .expect(404);
    });

    it('should return 404 for non-existent transaction', async () => {
      await request(app)
        .delete('/transactions/invalid-id')
        .expect(404);
    });
  });

  describe('PATCH /transactions/:id/restore', () => {
    beforeEach(async () => {
      const response = await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.INCOME,
          amount: 800,
          description: 'Refund'
        });
      createdTransactionId = response.body.data._id;

      // Soft delete it
      await request(app)
        .delete(`/transactions/${createdTransactionId}`)
        .expect(200);
    });

    it('should restore deleted transaction', async () => {
      const response = await request(app)
        .patch(`/transactions/${createdTransactionId}/restore`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Transaction restored successfully');

      // Verify it's restored
      const getResponse = await request(app)
        .get(`/transactions/${createdTransactionId}`)
        .expect(200);

      expect(getResponse.body.data.deletedAt).toBeNull();
    });

    it('should return 404 for non-existent transaction', async () => {
      await request(app)
        .patch('/transactions/invalid-id/restore')
        .expect(404);
    });
  });

  describe('GET /transactions/summary', () => {
    beforeEach(async () => {
      // Create test data
      await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.INCOME,
          amount: 2000,
          description: 'Salary'
        });

      await request(app)
        .post('/transactions')
        .send({
          type: TransactionType.EXPENSE,
          amount: 500,
          description: 'Food'
        });
    });

    it('should get transaction summary', async () => {
      const response = await request(app)
        .get('/transactions/summary')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.totalIncome).toBe(2000);
      expect(response.body.data.totalExpense).toBe(500);
      expect(response.body.data.balance).toBe(1500);
    });

    it('should get summary with empty date params', async () => {
      const response = await request(app)
        .get('/transactions/summary?startDate=&endDate=')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.totalIncome).toBe(2000);
      expect(response.body.data.totalExpense).toBe(500);
      expect(response.body.data.balance).toBe(1500);
    });

    it('should get summary with date range', async () => {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Yesterday
      const endDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // Tomorrow

      const response = await request(app)
        .get(`/transactions/summary?startDate=${startDate}&endDate=${endDate}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.totalIncome).toBe(2000);
      expect(response.body.data.totalExpense).toBe(500);
      expect(response.body.data.balance).toBe(1500);
    });
  });

});