import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs', 'requests.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(logFile))) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const logToFile = (message: string) => {
  const logEntry = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFile, logEntry);
  console.log(message); // Also log to console
};

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const method = req.method;
  const url = req.originalUrl;

  logToFile(`[${timestamp}] ${ip} - ${method} ${url} - Request received`);

  // Capture response body
  const originalJson = res.json;
  let responseBody: any;
  res.json = function (body) {
    responseBody = body;
    return originalJson.call(this, body);
  };

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    logToFile(`[${new Date().toISOString()}] ${ip} - ${method} ${url} - ${status} - ${duration}ms - Response: ${JSON.stringify(responseBody)}`);
  });

  next();
};