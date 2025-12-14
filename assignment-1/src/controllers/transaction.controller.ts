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

  async findAll(req: Request, res: Response) {
    try {
      const { type, page, limit } = req.query;
      const result = await transactionService.findAll(
        type as TransactionType,
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined
      );

      if (page && limit) {
        const paginated = result as PaginatedTransactions;
        res.json(ResponseUtil.paginated(paginated.data, paginated.page, paginated.limit, paginated.total));
      } else {
        res.json(ResponseUtil.success(result as any[]));
      }
    } catch (error) {
      ErrorUtil.handleInternalError(res, error);
    }
  }

}