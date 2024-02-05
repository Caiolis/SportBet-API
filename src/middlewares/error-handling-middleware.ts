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
  if (error.name === 'insufficientBalanceError') {
    return res.status(httpStatus.EXPECTATION_FAILED).send(error.message);
  }

  if (error.name === 'nonExistentGameError') {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }

  if (error.name === 'gameDoesNotExistError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  if (error.name === 'participantDoesNotExistError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  if (error.name === 'betGreaterThanAmmountError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  if (error.name === 'gameAlreadyFinishedError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
