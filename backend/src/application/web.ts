import cors from 'cors';
import express from 'express';
import { publicRouter } from '../route/public-api';

export const web = express();
web.use(express.json());
web.use(
  cors({
    credentials: true,
  })
);
web.use(publicRouter);