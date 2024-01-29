import { Router } from 'express';
import { schemaValidationMiddleware } from '@/middlewares';
import { createGame, finishGame, getAllGames, getGameById } from '@/controllers';
import { finishGameSchema, gameSchema } from '@/schemas';

const gameRouter = Router();

gameRouter
  .post('/', schemaValidationMiddleware(gameSchema), createGame)
  .get('/', getAllGames)
  .get('/:id', getGameById)
  .post('/:id/finish', schemaValidationMiddleware(finishGameSchema), finishGame);

export { gameRouter };
