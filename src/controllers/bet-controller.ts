import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputBetBody } from '@/protocols';
import { betService } from '@/services';

export async function createBet(req: Request, res: Response) {
  const data = req.body as InputBetBody;

  const info = await betService.createBet(data);
  return res.status(httpStatus.OK).send(info);
}
