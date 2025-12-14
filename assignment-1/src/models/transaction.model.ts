import mongoose, { Schema } from 'mongoose';
import { ITransaction, TransactionType } from '../types/transaction.js';

export interface ITransactionDocument extends Omit<ITransaction, '_id'> {
  _id: string; // using type&timestamp generated string ID
}

const TransactionSchema = new Schema<ITransactionDocument>({
  _id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(TransactionType),
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  _id: false // Disable auto-generated _id since we're providing our own
});

// Index for soft delete queries
TransactionSchema.index({ deletedAt: 1 });

// Index for filtering by type
TransactionSchema.index({ type: 1, deletedAt: 1 });

// Index for createdAt range queries
TransactionSchema.index({ createdAt: 1, deletedAt: 1 });

export const TransactionModel = mongoose.model<ITransactionDocument>('Transaction', TransactionSchema);