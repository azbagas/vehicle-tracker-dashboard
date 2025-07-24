import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ResponseError } from '../error/response-error';

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    // Format Zod errors into a readable string
    const formattedErrors = error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');

    res.status(400).json({
      errors: `Validation Error: ${formattedErrors}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
