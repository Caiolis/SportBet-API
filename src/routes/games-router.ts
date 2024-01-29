import { Router } from 'express';
import { schemaValidationMiddleware } from '@/middlewares';
import { createGame, getAllGames, getGameById } from '@/controllers';
import { gameSchema } from '@/schemas';

const gameRouter = Router();

gameRouter.post('/', schemaValidationMiddleware(gameSchema), createGame).get('/', getAllGames).get('/:id', getGameById);

export { gameRouter };
