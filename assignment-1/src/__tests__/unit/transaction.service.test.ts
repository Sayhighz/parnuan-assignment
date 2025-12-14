import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { TransactionType } from '../../types/transaction.js';
import { CreateTransactionDto } from '../../dtos/create-transaction.dto.js';
import { UpdateTransactionDto } from '../../dtos/update-transaction.dto.js';
import type { TransactionService as TransactionServiceType } from '../../services/transaction.service.js';

// Mock the model before importing the service
const mockSave = jest.fn() as jest.MockedFunction<any>;
const mockFind = jest.fn() as jest.MockedFunction<any>;
const mockFindOne = jest.fn() as jest.MockedFunction<any>;
const mockFindOneAndUpdate = jest.fn() as jest.MockedFunction<any>;
const mockCountDocuments = jest.fn() as jest.MockedFunction<any>;
const mockAggregate = jest.fn() as jest.MockedFunction<any>;

jest.unstable_mockModule('../../models/transaction.model.js', () => ({
  TransactionModel: jest.fn().mockImplementation(() => ({
    save: mockSave
  })),
}));

// Get the mocked module
const { TransactionModel } = await import('../../models/transaction.model.js');

// Assign static methods to the mock
(TransactionModel as any).find = mockFind;
(TransactionModel as any).findOne = mockFindOne;
(TransactionModel as any).findOneAndUpdate = mockFindOneAndUpdate;
(TransactionModel as any).countDocuments = mockCountDocuments;
(TransactionModel as any).aggregate = mockAggregate;

// Import service after mocking
const { TransactionService } = await import('../../services/transaction.service.js');

describe('TransactionService', () => {
  let service: TransactionServiceType;

  beforeEach(() => {
    service = new TransactionService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new transaction', async () => {
      const createDto: CreateTransactionDto = {
        type: TransactionType.INCOME,
        amount: 1000,
        description: 'Salary'
      };

      const expectedId = 'income20230101A1B2C3D4';
      const mockSavedTransaction = {
        _id: expectedId,
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      mockSave.mockResolvedValue(mockSavedTransaction);

      const result = await service.create(createDto);

      expect(result).toEqual({
        _id: expectedId,
        type: TransactionType.INCOME,
        amount: 1000,
        description: 'Salary',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null
      });
    });

    it('should create a new expense transaction', async () => {
      const createDto: CreateTransactionDto = {
        type: TransactionType.EXPENSE,
        amount: 500,
        description: 'Food'
      };

      const currentDate = new Date();
      const dateStr = currentDate.toISOString().slice(0, 10).replace(/-/g, '');
      const expectedId = `expense${dateStr}A1B2C3D4`;
      const mockSavedTransaction = {
        _id: expectedId,
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      mockSave.mockResolvedValue(mockSavedTransaction);

      const result = await service.create(createDto);

      expect(result._id).toMatch(/^expense\d{8}[A-F0-9]{8}$/);
      expect(result.type).toBe(TransactionType.EXPENSE);
      expect(result.amount).toBe(500);
      expect(result.description).toBe('Food');
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all transactions without pagination', async () => {
      const mockTransactions = [
        {
          _id: '507f1f77bcf86cd799439011',
          type: TransactionType.INCOME,
          amount: 1000,
          description: 'Salary',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ];

      mockFind.mockReturnValue({
        sort: jest.fn<() => Promise<typeof mockTransactions>>().mockResolvedValue(mockTransactions)
      });

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect((result as any[])[0]).toHaveProperty('_id');
    });

    it('should return paginated transactions', async () => {
      const mockTransactions = [
        {
          _id: '507f1f77bcf86cd799439011',
          type: TransactionType.INCOME,
          amount: 1000,
          description: 'Salary',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ];

      mockFind.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn<() => Promise<typeof mockTransactions>>().mockResolvedValue(mockTransactions)
          })
        })
      });

      mockCountDocuments.mockResolvedValue(1);

      const result = await service.findAll(undefined, 1, 10);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('limit');
    });

    it('should filter by type', async () => {
      const mockTransactions = [
        {
          _id: '507f1f77bcf86cd799439011',
          type: TransactionType.EXPENSE,
          amount: 500,
          description: 'Food',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ];

      mockFind.mockReturnValue({
        sort: jest.fn<() => Promise<typeof mockTransactions>>().mockResolvedValue(mockTransactions)
      });

      const result = await service.findAll(TransactionType.EXPENSE);

      expect(result).toHaveLength(1);
      expect((result as any[])[0].type).toBe(TransactionType.EXPENSE);
    });
  });

  describe('findById', () => {
    it('should return transaction by id', async () => {
      const mockTransaction = {
        _id: '507f1f77bcf86cd799439011',
        type: TransactionType.INCOME,
        amount: 1000,
        description: 'Salary',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      mockFindOne.mockResolvedValue(mockTransaction);

      const result = await service.findById('507f1f77bcf86cd799439011');

      expect(result).toBeTruthy();
      expect(result?._id).toBe('507f1f77bcf86cd799439011');
    });

    it('should return null for invalid ObjectId', async () => {
      const result = await service.findById('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update transaction', async () => {
      const updateDto: UpdateTransactionDto = {
        amount: 1500,
        description: 'Updated Salary'
      };

      const mockUpdatedTransaction = {
        _id: '507f1f77bcf86cd799439011',
        type: TransactionType.INCOME,
        amount: 1500,
        description: 'Updated Salary',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      mockFindOneAndUpdate.mockResolvedValue(mockUpdatedTransaction);

      const result = await service.update('507f1f77bcf86cd799439011', updateDto);

      expect(result).toBeTruthy();
      expect(result?.amount).toBe(1500);
    });

    it('should return null for invalid ObjectId', async () => {
      const result = await service.update('invalid-id', { amount: 100 });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should soft delete transaction', async () => {
      const mockDeletedTransaction = {
        _id: '507f1f77bcf86cd799439011',
        deletedAt: new Date()
      };

      mockFindOneAndUpdate.mockResolvedValue(mockDeletedTransaction);

      const result = await service.delete('507f1f77bcf86cd799439011');

      expect(result).toBeTruthy();
      expect(result?.success).toBe(true);
    });

    it('should return null for invalid ObjectId', async () => {
      const result = await service.delete('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('restore', () => {
    it('should restore soft deleted transaction', async () => {
      const mockRestoredTransaction = {
        _id: '507f1f77bcf86cd799439011',
        type: TransactionType.INCOME,
        amount: 1000,
        description: 'Salary',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      mockFindOneAndUpdate.mockResolvedValue(mockRestoredTransaction);

      const result = await service.restore('507f1f77bcf86cd799439011');

      expect(result).toBeTruthy();
      expect(result?.deletedAt).toBeNull();
    });

    it('should return null for invalid ObjectId', async () => {
      const result = await service.restore('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('getSummary', () => {
    it('should return transaction summary', async () => {
      const mockAggregateResult = [
        {
          totalIncome: 2000,
          totalExpense: 500
        }
      ];

      mockAggregate.mockResolvedValue(mockAggregateResult);

      const result = await service.getSummary();

      expect(result.totalIncome).toBe(2000);
      expect(result.totalExpense).toBe(500);
      expect(result.balance).toBe(1500);
    });

    it('should return summary with date range', async () => {
      const mockAggregateResult = [
        {
          totalIncome: 1000,
          totalExpense: 200
        }
      ];

      mockAggregate.mockResolvedValue(mockAggregateResult);

      const result = await service.getSummary('2023-01-01', '2023-12-31');

      expect(result.totalIncome).toBe(1000);
      expect(result.totalExpense).toBe(200);
      expect(result.balance).toBe(800);
    });

    it('should return summary with empty date params', async () => {
      const mockAggregateResult = [
        {
          totalIncome: 2000,
          totalExpense: 500
        }
      ];

      mockAggregate.mockResolvedValue(mockAggregateResult);

      const result = await service.getSummary('', '');

      expect(result.totalIncome).toBe(2000);
      expect(result.totalExpense).toBe(500);
      expect(result.balance).toBe(1500);
    });
  });
});