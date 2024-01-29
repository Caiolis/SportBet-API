import Joi from 'joi';
import { InputBetBody } from '@/protocols';

export const betSchema = Joi.object<InputBetBody>({
  homeTeamScore: Joi.number().required().min(0),
  awayTeamScore: Joi.number().required().min(0),
  amountBet: Joi.number().required().min(1),
  gameId: Joi.number().required().min(1),
  participantId: Joi.number().required().min(1),
});
