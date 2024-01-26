import { Router } from 'express';
import { schemaValidationMiddleware } from '@/middlewares';
import { participantSchema } from '@/schemas';
import { createParticipant } from '@/controllers';

const participantRouter = Router();

participantRouter.post('/', schemaValidationMiddleware(participantSchema), createParticipant);

export { participantRouter };
