import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.ts';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({
      success: false,
      error: `API route not found: ${req.method} ${req.originalUrl}`,
    });
    return;
  }
  next();
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    statusCode >= 500 && env.nodeEnv === 'production'
      ? 'Internal server error'
      : err.message || 'Unexpected error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
