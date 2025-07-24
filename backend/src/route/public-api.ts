import express from 'express';
import { HealthController } from '../controller/health.controller';

const publicRouter = express.Router();

publicRouter.get('/ping', HealthController.ping);

export { publicRouter };
