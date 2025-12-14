import { TransactionModel, ITransactionDocument } from '../models/transaction.model.js';
import { ITransaction, TransactionType, TransactionSummary, PaginatedTransactions } from '../types/transaction.js';
import { CreateTransactionDto } from '../dtos/create-transaction.dto.js';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto.js';
import { ValidationUtil } from '../utils/validation.util.js';
import { randomBytes } from 'crypto';

export class TransactionService {
  async create(createDto: CreateTransactionDto): Promise<ITransaction> {
    const transactionDate = new Date();
    const dateStr = transactionDate.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const shortUUID = randomBytes(4).toString('hex').toUpperCase(); // 8 character hex
    const customId = `${createDto.type}${dateStr}${shortUUID}`;

    const transaction = new TransactionModel({
      _id: customId,
      ...createDto
    });
    const savedTransaction = await transaction.save();
    return this.toTransactionResponse(savedTransaction);
  }

  private toTransactionResponse(doc: ITransactionDocument): ITransaction {
    return {
      _id: doc._id.toString(),
      type: doc.type,
      amount: doc.amount,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt
    };
  }

  async findAll(
    type?: TransactionType,
    page?: number,
    limit?: number
  ): Promise<ITransaction[] | PaginatedTransactions> {
    const query: any = { deletedAt: null };

    if (type) {
      query.type = type;
    }

    if (page && limit) {
      const skip = (page - 1) * limit;
      const [transactions, total] = await Promise.all([
        TransactionModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        TransactionModel.countDocuments(query)
      ]);

      return {
        data: transactions.map(t => this.toTransactionResponse(t)),
        total,
        page,
        limit
      };
    }

    const transactions = await TransactionModel.find(query).sort({ createdAt: -1 });
    return transactions.map(t => this.toTransactionResponse(t));
  }

}