import Joi from 'joi';
import { InputParticipantBody } from '@/protocols';

export const participantSchema = Joi.object<InputParticipantBody>({
  name: Joi.string().required(),
  balance: Joi.number().required(),
});
