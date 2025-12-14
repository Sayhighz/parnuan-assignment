import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { ErrorUtil } from '../utils/error.util.js';

export function validationMiddleware<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObject as object);

    if (errors.length > 0) {
      return ErrorUtil.handleValidationError(res, errors);
    }

    req.body = dtoObject;
    next();
  };
}