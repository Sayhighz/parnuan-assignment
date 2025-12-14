import { TransactionModel, ITransactionDocument } from '../models/transaction.model.js';
import { ITransaction, TransactionType, TransactionSummary, PaginatedTransactions } from '../types/transaction.js';
import { CreateTransactionDto } from '../dtos/create-transaction.dto.js';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto.js';
import { ValidationUtil } from '../utils/validation.util.js';
import { randomBytes } from 'crypto';

interface TransactionQuery {
  deletedAt: Date | null;
  type?: TransactionType;
  createdAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

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


    async findAll(
        type?: TransactionType,
        page?: number,
        limit?: number
    ): Promise<ITransaction[] | PaginatedTransactions> {
        const query: TransactionQuery = { deletedAt: null };

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

    async findById(id: string): Promise<ITransaction | null> {
        if (!ValidationUtil.isValidObjectId(id)) {
            return null;
        }

        const transaction = await TransactionModel.findOne({ _id: id, deletedAt: null });
        return transaction ? this.toTransactionResponse(transaction) : null;
    }

    async update(id: string, updateDto: UpdateTransactionDto): Promise<ITransaction | null> {
        if (!ValidationUtil.isValidObjectId(id)) {
            return null;
        }

        const transaction = await TransactionModel.findOneAndUpdate(
            { _id: id, deletedAt: null },
            { ...updateDto, updatedAt: new Date() },
            { new: true }
        );

        return transaction ? this.toTransactionResponse(transaction) : null;
    }

    async getSummary(startDate?: string, endDate?: string): Promise<TransactionSummary> {
        const matchQuery: TransactionQuery = { deletedAt: null };

        if (startDate !== undefined && startDate.trim() !== '') {
            const start = new Date(startDate);
            if (!isNaN(start.getTime())) {
                matchQuery.createdAt = matchQuery.createdAt || {};
                matchQuery.createdAt.$gte = start;
            }
        }

        if (endDate !== undefined && endDate.trim() !== '') {
            const end = new Date(endDate);
            if (!isNaN(end.getTime())) {
                matchQuery.createdAt = matchQuery.createdAt || {};
                matchQuery.createdAt.$lte = end;
            }
        }

        const result = await TransactionModel.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
                        }
                    }
                }
            }
        ]);

        const summary = result[0] || { totalIncome: 0, totalExpense: 0 };
        return {
            totalIncome: summary.totalIncome,
            totalExpense: summary.totalExpense,
            balance: summary.totalIncome - summary.totalExpense
        };
    }

    async delete(id: string): Promise<{ success: boolean; deletedAt: Date } | null> {
        if (!ValidationUtil.isValidObjectId(id)) {
            return null;
        }

        const transaction = await TransactionModel.findOneAndUpdate(
            { _id: id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        );

        return transaction ? { success: true, deletedAt: transaction.deletedAt! } : null;
    }

    async restore(id: string): Promise<ITransaction | null> {
        if (!ValidationUtil.isValidObjectId(id)) {
            return null;
        }

        const transaction = await TransactionModel.findOneAndUpdate(
            { _id: id, deletedAt: { $ne: null } },
            { deletedAt: null, updatedAt: new Date() },
            { new: true }
        );

        return transaction ? this.toTransactionResponse(transaction) : null;
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
}