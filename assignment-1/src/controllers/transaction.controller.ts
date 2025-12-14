import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service.js';
import { TransactionType, PaginatedTransactions } from '../types/transaction.js';
import { ResponseUtil } from '../utils/response.util.js';
import { ErrorUtil } from '../utils/error.util.js';

const transactionService = new TransactionService();

export class TransactionController {
  async create(req: Request, res: Response) {
    try {
      const transaction = await transactionService.create(req.body);
      res.status(201).json(ResponseUtil.created(transaction));
    } catch (error) {
      ErrorUtil.handleInternalError(res, error);
    }
  }

}