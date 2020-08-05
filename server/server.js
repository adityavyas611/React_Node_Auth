import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger } from './utils/logger';
import './config/dbConfig';
import { PORT } from './constants';
import userRouter from './routes/userRouter';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);

app.listen(PORT, () => logger.info(`Server listening on PORT: ${PORT}`));

export default app;
