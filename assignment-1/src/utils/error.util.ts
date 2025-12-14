import { Response } from 'express';
import { ResponseUtil } from './response.util.js';

export class ErrorUtil {
  static handleValidationError(res: Response, errors: any[]): void {
    const errorMessages = errors.map((error: any) => {
      const constraints = error.constraints;
      return constraints ? Object.values(constraints).join(', ') : 'Validation error';
    });

    res.status(400).json(
      ResponseUtil.error('Validation failed', errorMessages.join('; '))
    );
  }

  static handleNotFound(res: Response, resource = 'Resource'): void {
    res.status(404).json(
      ResponseUtil.error(`${resource} not found`)
    );
  }

  static handleBadRequest(res: Response, message: string): void {
    res.status(400).json(
      ResponseUtil.error(message)
    );
  }

  static handleInternalError(res: Response, error: any): void {
    console.error('Internal server error:', error);
    res.status(500).json(
      ResponseUtil.error('Internal server error')
    );
  }
}