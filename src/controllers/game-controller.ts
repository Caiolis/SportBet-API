import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputGameBody, InputFinishGameBody } from '@/protocols';
import { betService, gameService } from '@/services';

export async function createGame(req: Request, res: Response) {
  const { homeTeamName, awayTeamName } = req.body as InputGameBody;

  const info = await gameService.createGame(homeTeamName, awayTeamName);
  return res.status(httpStatus.OK).send(info);
}

export async function getAllGames(req: Request, res: Response) {
  const info = await gameService.getAllGames();

  return res.status(httpStatus.OK).send(info);
}

export async function getGameById(req: Request, res: Response) {
  const { id } = req.params;

  const info = await gameService.getById(Number(id));
  return res.status(httpStatus.OK).send(info);
}

export async function finishGame(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore } = req.body as InputFinishGameBody;
  const { id } = req.params;

  const finishGameInfo = await gameService.finishGame(Number(id), homeTeamScore, awayTeamScore);
  betService.finishBet(Number(id));

  return res.status(httpStatus.OK).send(finishGameInfo);
}
