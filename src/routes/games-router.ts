import { Router } from 'express';
import { schemaValidationMiddleware } from '@/middlewares';
import { createGame, getAllGames } from '@/controllers';
import { gameSchema } from '@/schemas';

const gameRouter = Router();

gameRouter.post('/', schemaValidationMiddleware(gameSchema), createGame).get('/', getAllGames);

export { gameRouter };
