export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface ITransaction {
  _id?: string;
  type: TransactionType;
  amount: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface PaginatedTransactions {
  data: ITransaction[];
  total: number;
  page: number;
  limit: number;
}