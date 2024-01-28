import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputGameBody } from '@/protocols';
import { gameService } from '@/services';

export async function createGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as InputGameBody;

  const info = await gameService.createGame(homeTeamName, awayTeamName);
  return res.status(httpStatus.OK).send(info);
}
