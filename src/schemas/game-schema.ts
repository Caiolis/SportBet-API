import Joi from 'joi';
import { InputFinishGameBody, InputGameBody } from '@/protocols';

export const gameSchema = Joi.object<InputGameBody>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const finishGameSchema = Joi.object<InputFinishGameBody>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});
