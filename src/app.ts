import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import reqsanitizer from 'req-sanitizer';

import { betRouter, gameRouter, participantRouter } from '@/routes';
import { errorHandlingMiddleware } from '@/middlewares';

const app = express();

app
  .use(json())
  .use(reqsanitizer())
  .use(cors())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/participants', participantRouter)
  .use('/games', gameRouter)
  .use('/bets', betRouter)
  .use(errorHandlingMiddleware);

export default app;
