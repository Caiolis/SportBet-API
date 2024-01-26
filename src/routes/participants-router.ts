import { Router } from 'express';
import { schemaValidationMiddleware } from '@/middlewares';
import { participantSchema } from '@/schemas';
import { createParticipant, getParticipants } from '@/controllers';

const participantRouter = Router();

participantRouter.post('/', schemaValidationMiddleware(participantSchema), createParticipant).get('/', getParticipants);

export { participantRouter };
