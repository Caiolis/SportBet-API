import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { InputParticipantBody } from '@/protocols';
import { participantService } from '@/services';

export async function createParticipant(req: Request, res: Response) {
  const { name, balance } = req.body as InputParticipantBody;

  const info = await participantService.createParticipant(name, balance);

  return res.status(httpStatus.OK).send(info);
}
