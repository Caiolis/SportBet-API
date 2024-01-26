import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export type AppError = Error & {
  name: string;
};

export function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // Error cases
  if (error.name === 'insufficientBalanceError') {
    return res.status(httpStatus.EXPECTATION_FAILED).send(error.message);
  }

  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
