import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreateTransactionDto } from '../dtos/create-transaction.dto.js';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto.js';

const router = Router();
const transactionController = new TransactionController();

// POST /transactions - Create transaction
router.post(
  '/',
  validationMiddleware(CreateTransactionDto),
  transactionController.create.bind(transactionController)
);

// GET /transactions - Get all transactions (with optional filtering and pagination)
router.get('/', transactionController.findAll.bind(transactionController));

export default router;