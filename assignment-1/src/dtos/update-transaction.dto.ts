import { IsEnum, IsOptional, IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { TransactionType } from '../types/transaction.js';

export class UpdateTransactionDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  @IsString()
  @Length(1, 500)
  @IsOptional()
  description?: string;
}