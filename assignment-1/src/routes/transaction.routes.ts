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

// GET /transactions/summary - Get summary
router.get('/summary', transactionController.getSummary.bind(transactionController));

// GET /transactions/:id - Get transaction by ID
router.get('/:id', transactionController.findById.bind(transactionController));

// PUT /transactions/:id - Update transaction
router.put(
  '/:id',
  validationMiddleware(UpdateTransactionDto),
  transactionController.update.bind(transactionController)
);

export default router;