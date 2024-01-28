import Joi from 'joi';
import { InputGameBody } from '@/protocols';

export const gameSchema = Joi.object<InputGameBody>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
