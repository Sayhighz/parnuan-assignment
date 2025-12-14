import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { TransactionType } from '../types/transaction.js';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;

  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  description!: string;
}