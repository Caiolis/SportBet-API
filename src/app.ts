import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';

// Routes
import { participantRouter } from '@/routes';
import { errorHandlingMiddleware } from '@/middlewares';

const app = express();

app
  .use(json())
  .use(cors())
  .get('/health', (_req, res) => res.send('OK!')) // Test route
  .use('/participants', participantRouter)
  .use(errorHandlingMiddleware);

export default app;
