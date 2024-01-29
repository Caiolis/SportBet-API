import { Router } from 'express';
import { createBet } from '@/controllers/bet-controller';
import { schemaValidationMiddleware } from '@/middlewares';
import { betSchema } from '@/schemas';

const betRouter = Router();

betRouter.post('/', schemaValidationMiddleware(betSchema), createBet);

export { betRouter };
